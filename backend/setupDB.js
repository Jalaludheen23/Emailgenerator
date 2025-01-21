const sqlite3 = require('sqlite3').verbose();

// Initialize the SQLite database file
const db = new sqlite3.Database('./database.sqlite', sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error('Error connecting to SQLite database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Initialize Tables
db.serialize(() => {
  // Create Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  // Create OTP Table
  db.run(`
    CREATE TABLE IF NOT EXISTS otp (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      otp TEXT NOT NULL,
      FOREIGN KEY (email) REFERENCES users(email)
    )
  `, (err) => {
    if (err) {
      console.error('Error creating otp table:', err.message);
    } else {
      console.log('OTP table created or already exists.');
    }
  });
});

// Close the Database Connection
db.close((err) => {
  if (err) {
    console.error('Error closing the database:', err.message);
  } else {
    console.log('Database connection closed.');
  }
});
