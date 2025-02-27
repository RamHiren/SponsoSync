const express = require('express');
const router = express.Router();
const User = require('../Model/user');
const { generateToken, jwtAuthMiddleware } = require('../middleware/jwt');
const nodemailer = require('nodemailer');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yashrajsharma1910@gmail.com',
        pass: 'skdj zswr tkzz glmu'
    }
});

// Generate a random OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs temporarily (in production, use a database or cache like Redis)
const otpStore = {};

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newUser = new User(data);
        const savedUser = await newUser.save()
        console.log("Data saved Successfully");
        // assign jwt token
        const payload = {
            id: savedUser.id,
            username: savedUser.username
        }

        const token = generateToken(payload);
        console.log("token :", token);
        res.status(200).json({ savedUser: savedUser, token: token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(user.password === password)) {
            return res.status(401).json({ error: 'Invalid Credentials' });
        }
        // generate token
        const payload = {
            id: user.id,
            username: user.username
        }
        const token = generateToken(payload);
        res.status(200).json({ token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
    }
});

router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const otp = generateOTP();
        otpStore[email] = otp;

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: 'Failed to send OTP' });
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({ message: 'OTP sent successfully' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/verify-otp', async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (otpStore[email] === otp) {
            delete otpStore[email];
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ error: 'Invalid OTP' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;