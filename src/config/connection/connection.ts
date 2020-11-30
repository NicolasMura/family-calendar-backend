import * as mongoose from 'mongoose';
import config from '../env/index';

interface IConnectOptions {
  useUnifiedTopology: boolean;
  // autoReconnect: boolean;
  // reconnectTries: number; // Never stop trying to reconnect
  // reconnectInterval: number;
  useCreateIndex: boolean;
  loggerLevel ? : string;
  useNewUrlParser ? : boolean;
}

const connectOptions: IConnectOptions = {
  useUnifiedTopology: true,
  // autoReconnect: true,
  // reconnectTries: Number.MAX_VALUE,
  // reconnectInterval: 1000,
  useCreateIndex: true,
  useNewUrlParser: true,
};

const MONGO_URI: string = `${config.database.MONGODB_URI}${config.database.MONGODB_DB_MAIN}`;

export const db: mongoose.Connection = mongoose.createConnection(MONGO_URI, connectOptions);

// handlers
db.on('connecting', (): void => {
  console.log('\x1b[32m', 'MongoDB :: connecting');
  console.log(MONGO_URI);
});

db.on('error', (error): void => {
  console.log('\x1b[31m', `MongoDB :: connection ${error}`);
  mongoose.disconnect();
});

db.on('connected', (): void => {
  console.log('\x1b[32m', 'MongoDB :: connected');
  console.log(MONGO_URI);
});

db.once('open', (): void => {
  console.log('\x1b[32m', 'MongoDB :: connection opened');
  console.log(MONGO_URI);
});

db.on('reconnected', (): void => {
  console.log('\x1b[33m"', 'MongoDB :: reconnected');
});

db.on('reconnectFailed', (): void => {
  console.log('\x1b[31m', 'MongoDB :: reconnectFailed');
});

db.on('disconnected', (): void => {
  console.log('\x1b[31m', 'MongoDB :: disconnected');
});

db.on('fullsetup', (): void => {
  console.log('\x1b[33m"', 'MongoDB :: reconnecting... %d');
});
