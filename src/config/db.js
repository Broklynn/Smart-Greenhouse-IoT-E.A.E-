const sql = require('mssql');

const config = {
  user: 'sa',
  password: '1234567890',
  server: 'localhost',
  port: 1433,
  database: 'eae',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

async function getConnection() {
  const pool = await sql.connect(config);
  return pool;
}

module.exports = { sql, getConnection };