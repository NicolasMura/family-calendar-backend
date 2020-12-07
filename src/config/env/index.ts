import * as dotenv from 'dotenv';

dotenv.config();
// console.log('*****************');
// console.log(process.env);
// console.log('*****************');


interface IConfig {
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
  wsEndpointHost: string;
}

const NODE_ENV: string = process.env.NODE_ENV || 'development';

const development: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'family_calendar_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  wsEndpointHost: process.env.WS_ENDPOINT_HOST || 'locahost'
};

const production: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://production_uri/',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'family_calendar_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  wsEndpointHost: process.env.WS_ENDPOINT_HOST || 'family-calendar.nicolasmura.com'
};

const test: IConfig = {
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || 'family_calendar_db'
  },
  secret: process.env.SECRET || '@QEGTUI',
  wsEndpointHost: process.env.WS_ENDPOINT_HOST || 'locahost'
};

const config: {
  [name: string]: IConfig
} = {
  test,
  development,
  production
};

// console.log(config[NODE_ENV]);

export default config[NODE_ENV];
