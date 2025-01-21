const db = require('../database/db');

db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE,
        otp TEXT,
        is_verified INTEGER DEFAULT 0
    )
`);
