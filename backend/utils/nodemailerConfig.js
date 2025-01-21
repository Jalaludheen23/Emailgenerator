const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Configure Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use Gmail service
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('Error with Nodemailer transporter:', error);
    } else {
        console.log('Nodemailer transporter is ready');
    }
});

module.exports = transporter;
