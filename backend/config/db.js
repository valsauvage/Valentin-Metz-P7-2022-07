// MODULES
const mysql = require('mysql');
require('dotenv').config();
// FIN MODULES

// CONNEXION BASE DE DONNEE
exports.connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// FIN CONNEXION 