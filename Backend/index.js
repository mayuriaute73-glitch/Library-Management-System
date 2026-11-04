console.log("MY BACKEND FILE RUNNING");

const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= USERS ================= */

// Get users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add user
app.post("/users", (req, res) => {
  const { name, email, phone } = req.body;

  db.query(
    "INSERT INTO users (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: results.insertId });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length > 0) {
        res.json({ success: true, user: results[0] });
      } else {
        res.json({ success: false });
      }
    }
  );
});

// Register
app.post("/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  db.query(
    "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)",
    [name, email, phone, password],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

// Update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  db.query(
    "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?",
    [name, email, phone, id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM users WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

/* ================= BOOKS ================= */

// Get books
app.get("/books", (req, res) => {
  db.query("SELECT * FROM books", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add book
app.post("/books", (req, res) => {
  const {
    title,
    author
  } = req.body;

  const sql = `
    INSERT INTO books 
    (title, author, available) 
    VALUES (?, ?, TRUE)
  `;

  db.query(
    sql,
    [title, author],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Book Added Successfully" });
    }
  );
});

// Update book
app.put("/books/:id", (req, res) => {
  const { id } = req.params;
  const { title, author } = req.body;

  db.query(
    "UPDATE books SET title = ?, author = ? WHERE id = ?",
    [title, author, id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

// Delete book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM books WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

/* ================= ISSUE BOOK ================= */

// Get issued books
app.get("/issue", (req, res) => {
  db.query("SELECT * FROM issued_books", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add issued book
app.post("/issue", (req, res) => {
  const { user_id, book_id, issue_date, return_date } = req.body;

  const sql = `
    INSERT INTO issued_books (user_id, book_id, issue_date, return_date)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [user_id, book_id, issue_date, return_date], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Book Issued Successfully", success: true });
  });
});

// Delete issued book
app.delete("/issue/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM issued_books WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

// Return book and auto-calculate fine if late
app.post("/issue/:id/return", (req, res) => {
  const { id } = req.params;
  const { user_id, return_actual_date } = req.body;

  console.log("POST /issue/:id/return called with:", { id, user_id, return_actual_date });

  // First, get the issued book details
  db.query(
    "SELECT * FROM issued_books WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: "Issued book record not found" });
      }

      const issuedBook = results[0];
      const returnDate = new Date(issuedBook.return_date);
      const actualReturnDate = new Date(return_actual_date);
      
      let fineGenerated = false;
      let fineAmount = 0;
      let daysLate = 0;

      // Calculate days late
      if (actualReturnDate > returnDate) {
        const timeDiff = actualReturnDate - returnDate;
        daysLate = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert ms to days
        fineAmount = daysLate * 10; // ₹10 per day
        fineGenerated = true;
      }

      // Update the issued book status to 'Returned'
      db.query(
        "UPDATE issued_books SET status = 'Returned', return_actual_date = ? WHERE id = ?",
        [return_actual_date, id],
        (err) => {
          if (err) return res.status(500).json({ success: false, message: err.message });

          // If fine is generated, insert it into fines table
          if (fineGenerated) {
            db.query(
              "INSERT INTO fines (user_id, issue_id, days_late, amount, status) VALUES (?, ?, ?, ?, 'Unpaid')",
              [user_id, id, daysLate, fineAmount],
              (err) => {
                if (err) {
                  console.error("Error inserting fine:", err);
                  return res.status(500).json({ success: false, message: err.message });
                }
                console.log("Fine generated and inserted:", { fineAmount, daysLate });
                res.json({ 
                  success: true, 
                  fine_generated: true,
                  fine_amount: fineAmount,
                  days_late: daysLate
                });
              }
            );
          } else {
            // No fine needed
            res.json({ 
              success: true, 
              fine_generated: false,
              message: "Book returned on time!"
            });
          }
        }
      );
    }
  );
});

/* ================= FINE MANAGEMENT ================= */

// Get fines
app.get("/fine", (req, res) => {
  console.log("GET /fine called");
  db.query("SELECT * FROM fines", (err, results) => {
    if (err) {
      console.error("Error fetching fines:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Fines fetched:", results);
    res.json(results);
  });
});

// Add fine
app.post("/fine", (req, res) => {
  const { user_id, issue_id, days_late, amount, status } = req.body;

  console.log("POST /fine received:", { user_id, issue_id, days_late, amount, status });

  db.query(
    "INSERT INTO fines (user_id, issue_id, days_late, amount, status) VALUES (?, ?, ?, ?, ?)",
    [user_id, issue_id, days_late, amount, status || "Unpaid"],
    (err, results) => {
      if (err) {
        console.error("Error inserting fine:", err);
        return res.status(500).json({ error: err.message });
      }
      console.log("Fine inserted successfully with ID:", results.insertId);
      res.json({ success: true, id: results.insertId });
    }
  );
});

// Update fine status (mark as paid)
app.put("/fine/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  db.query(
    "UPDATE fines SET status = ? WHERE id = ?",
    [status, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Delete fine
app.delete("/fine/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM fines WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true });
    }
  );
});

/* ================= START SERVER ================= */

app.listen(5000, () => {
  console.log("Server running on port 5000");
});