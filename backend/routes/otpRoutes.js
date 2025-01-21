const express = require('express');
const db = require('../db');

const router = express.Router();

// Verify OTP
router.post('/verify', (req, res) => {
    const { email, otp } = req.body;

    db.get(`SELECT * FROM users WHERE email = ? AND otp = ?`, [email, otp], (err, row) => {
        if (err) {
            return res.status(500).json({ error: 'Error verifying OTP' });
        }
        if (!row) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }
        res.status(200).json({ message: 'OTP verified successfully' });
    });
});

module.exports = router;
