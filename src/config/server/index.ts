import config from '../env/index';
import * as http from 'http';
import * as https from 'https';
// import * as fs from 'fs';
import * as serverHandlers from './serverHandlers';
import server from './server';
import * as WebSocket from 'ws';

let Server: http.Server | https.Server;
let wss: WebSocket.Server;

Server = http.createServer(server);
const ServerOptions: WebSocket.ServerOptions = {
  host: config.wsEndpointHost,
  server: Server
};

wss = new WebSocket.Server(ServerOptions);

// if (process.env.NODE_ENV === 'production') {
//   console.log('production');
//   console.log(process.env.WS_ENDPOINT_HOST);
//   Server = https.createServer(
//     {
//       // cert: fs.readFileSync('/etc/letsencrypt/live/family-calendar.nicolasmura.com/fullchain.pem'),
//       // key: fs.readFileSync('/etc/letsencrypt/live/family-calendar.nicolasmura.com/privkey.pem'),
//     },
//     server
//   );
//   const ServerOptions: WebSocket.ServerOptions = {
//     host: config.wsEndpointHost,
//     // port = 3000;
//     server: Server
//   };

//   wss = new WebSocket.Server(ServerOptions);
// } else {
//   console.log('development');
//   console.log(process.env.WS_ENDPOINT_HOST);
//   // ServerOptions.port = 3000;
//   Server = http.createServer(server);
//   const ServerOptions: WebSocket.ServerOptions = {
//     host: config.wsEndpointHost,
//     // port: 3000,
//     server: Server
//   };

//   wss = new WebSocket.Server(ServerOptions);
// }

// initialize the WebSocket server instance

interface ExtWebSocket extends WebSocket {
  isAlive: boolean;
}

export class CalendarEvent {
  title: string;
  startDate: string;
  endDate: string;
  usersEmails: string[];
  reminders?: string[];
  color?: string;
  category?: string;
  humanStartDate?: string;
  humanEndDate?: string;
  _id?: string;
  _deleted: boolean = false;

  constructor(
    title: string,
    startDate: string,
    endDate: string,
    usersEmails: string[],
    reminders?: string[],
    color?: string,
    category?: string,
    humanStartDate?: string,
    humanEndDate?: string,
    _id?: string,
    _deleted: boolean = false
  ) {
    this.title = title;
    this.startDate = startDate;
    this.endDate = endDate;
    this.usersEmails = usersEmails;
    this.reminders = reminders;
    this.color = color;
    this.category = category;
    this.humanStartDate = humanStartDate;
    this.humanEndDate = humanEndDate;
    this._id = _id;
    this._deleted = _deleted;
  }
}

export class WebbSocketMessage {
  constructor(
    public content: string,
    public isBroadcast: boolean = false,
    public sender: string,
    public data: { type: string, content: CalendarEvent}
  ) { }
}

function createWebSocketMessage(
  content: string,
  isBroadcast: boolean = false,
  sender: string = 'WebSocketServer',
  data?: { type: string, content: CalendarEvent}
): string {
  return JSON.stringify(new WebbSocketMessage(
    content,
    isBroadcast,
    sender,
    data
  ));
}

wss.on('connection', (ws: WebSocket) => {

  const extWs: ExtWebSocket = ws as ExtWebSocket;

  extWs.isAlive = true;

  ws.on('pong', () => {
    extWs.isAlive = true;
  });

  // connection is up, let's add a simple simple event
  ws.on('message', (msg: string) => {

    const message: WebbSocketMessage = JSON.parse(msg);

    console.log(message);

    if (message.isBroadcast) {
      // send back the message to the other clients
      wss.clients.forEach((client: WebSocket) => {
        if (client !== ws) {
          client.send(createWebSocketMessage(message.content, message.isBroadcast, message.sender, message.data));
        }
      });
    }

    ws.send(createWebSocketMessage(`You sent -> ${message.content}`, message.isBroadcast));

  });

  // send immediatly a feedback to the incoming connection
  ws.send(createWebSocketMessage('Connected to WebSocket server!'));

  ws.on('error', (err) => {
    console.warn(`Client disconnected - reason: ${err}`);
  });
});

setInterval(() => {
  wss.clients.forEach((ws: WebSocket) => {

    const extWs: ExtWebSocket = ws as ExtWebSocket;

    if (!extWs.isAlive) return ws.terminate();

    extWs.isAlive = false;
    ws.ping(null, undefined);
  });
}, 10000);

/**
* Binds and listens for connections on the specified host
*/
Server.listen(server.get('port'));

/**
* Server Events
*/
Server.on('error',
  (error: Error): void => serverHandlers.onError(error, server.get('port')));
Server.on('listening',
serverHandlers.onListening.bind(Server));
