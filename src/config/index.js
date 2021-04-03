require('dotenv').config();

const REQUIRED_KEYS = [
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
  'DB_HOST',
  'DB_PORT',
  'JWT_TOKEN',
  'TOKEN_EXPIRATION_TIME',
  'PORT',
];

REQUIRED_KEYS.forEach((key) => {
  if (!(key in process.env)) {
    throw new Error(`Key ${key} is missing in .env`);
  }
});

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
  DB_PORT,
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME,
  PORT,
} = process.env;

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT,
  },
});

module.exports = {
  JWT_TOKEN,
  TOKEN_EXPIRATION_TIME: Number(TOKEN_EXPIRATION_TIME),
  db: knex,
  port: PORT || 8000,
};
