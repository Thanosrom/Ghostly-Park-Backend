/* eslint-disable no-undef */
const mysql = require('mysql2/promise');

async function createDbConnection() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });
  return connection;
}

module.exports = {
  createDbConnection,
};
