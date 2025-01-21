const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');
const generateOTP = require('../utils/generateOTP');
const transporter = require('../utils/nodemailerConfig');

const router = express.Router();

// Registration endpoint
router.post('/', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    db.run(
        `INSERT INTO users (email, password, otp) VALUES (?, ?, ?)`,
        [email, hashedPassword, otp],
        (err) => {
            if (err) {
                return res.status(500).json({ error: 'User already exists' });
            }

            // Send OTP email
            const mailOptions = {
                from: 'your_email@gmail.com',
                to: email,
                subject: 'Your OTP for Registration',
                text: `Your OTP is ${otp}`,
            };

            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    return res.status(500).json({ error: 'Failed to send OTP' });
                }
                res.status(200).json({ message: 'OTP sent to email' });
            });
        }
    );
});

module.exports = router;
