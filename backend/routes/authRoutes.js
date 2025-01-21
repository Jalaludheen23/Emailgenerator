const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); // SQLite database connection
const generateOTP = require('../utils/generateOTP'); // OTP generation utility
const transporter = require('../utils/nodemailerConfig'); // Nodemailer configuration

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    console.log('Incoming data:', { email, password }); // Debug incoming data

    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Check if the email already exists
        db.get(`SELECT email FROM users WHERE email = ?`, [email], async (err, row) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (row) {
                // Email already exists
                return res.status(400).json({ error: 'Email already registered' });
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the user into the database
            db.run(
                `INSERT INTO users (email, password) VALUES (?, ?)`,
                [email, hashedPassword],
                (insertErr) => {
                    if (insertErr) {
                        console.error('Database error:', insertErr);
                        return res.status(500).json({ error: 'Failed to register user' });
                    }

                    // Generate OTP
                    const otp = generateOTP();
                    db.run(
                        `UPDATE users SET otp = ? WHERE email = ?`,
                        [otp, email],
                        (updateErr) => {
                            if (updateErr) {
                                return res
                                    .status(500)
                                    .json({ error: 'Failed to update OTP' });
                            }

                            // Send OTP email
                            const mailOptions = {
                                from: process.env.EMAIL_USER, // Replace with your email
                                to: email,
                                subject: 'Your OTP for Registration',
                                text: `Your OTP is ${otp}`,
                            };

                            transporter.sendMail(mailOptions, (mailErr) => {
                                if (mailErr) {
                                    return res
                                        .status(500)
                                        .json({ error: 'Failed to send OTP' });
                                }
                                res.status(200).json({
                                    message: 'User registered and OTP sent',
                                });
                            });
                        }
                    );
                }
            );
        });
    } catch (error) {
        console.error('Unexpected error:', error);
        res.status(500).json({ error: 'Unexpected error occurred' });
    }
});



// OTP Verification endpoint
router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;

    db.get(`SELECT otp FROM users WHERE email = ?`, [email], (err, row) => {
        if (err || !row) {
            return res.status(400).json({ error: 'Invalid email or OTP' });
        }

        if (row.otp === otp) {
            db.run(
                `UPDATE users SET otp = NULL WHERE email = ?`,
                [email],
                (updateErr) => {
                    if (updateErr) {
                        return res.status(500).json({ error: 'Failed to verify OTP' });
                    }
                    res.status(200).json({ message: 'OTP verified successfully' });
                }
            );
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
        if (err || !user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const otp = generateOTP();
        db.run(`UPDATE users SET otp = ? WHERE email = ?`, [otp, email], (updateErr) => {
            if (updateErr) {
                return res.status(500).json({ error: 'Failed to update OTP' });
            }

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Your OTP for Login',
                text: `Your OTP is ${otp}`,
            };

            transporter.sendMail(mailOptions, (mailErr) => {
                if (mailErr) {
                    return res.status(500).json({ error: 'Failed to send OTP' });
                }
                res.status(200).json({ message: 'OTP sent to email' });
            });
        });
    });
});

module.exports = router;
