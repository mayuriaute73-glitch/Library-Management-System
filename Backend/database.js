const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M@yuri90aute",
  database: "library_db"
});

db.on('error', (err) => console.log("DB error:", err));

console.log("Connected to MySQL");

module.exports = db;