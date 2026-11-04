const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "M@yuri90aute",
  database: "library_db"
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
  
  console.log("Connected to database");

  // Check if phone column exists in users table
  db.query("SHOW COLUMNS FROM users LIKE 'phone'", (err, results) => {
    if (err) {
      console.error("Error checking phone column:", err);
    }
    
    if (results.length === 0) {
      console.log("Adding phone column to users table...");
      db.query("ALTER TABLE users ADD COLUMN phone VARCHAR(15) AFTER email", (err) => {
        if (err) {
          console.error("Error adding phone column:", err);
        } else {
          console.log("✓ Phone column added to users table");
        }
      });
    } else {
      console.log("✓ Phone column already exists in users table");
    }
  });

  // Check if user_id column exists in fines table
  db.query("SHOW COLUMNS FROM fines LIKE 'user_id'", (err, results) => {
    if (err) {
      console.error("Error checking user_id column:", err);
    }
    
    if (results.length === 0) {
      console.log("Adding user_id column to fines table...");
      db.query("ALTER TABLE fines ADD COLUMN user_id INT AFTER id", (err) => {
        if (err) {
          console.error("Error adding user_id column:", err);
        } else {
          console.log("✓ user_id column added to fines table");
        }
        
        // Close connection after all operations
        setTimeout(() => {
          db.end();
          console.log("Database fixes completed!");
        }, 1000);
      });
    } else {
      console.log("✓ user_id column already exists in fines table");
      db.end();
    }
  });
});
