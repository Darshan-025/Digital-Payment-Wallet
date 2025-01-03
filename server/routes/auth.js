const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');  // Import requireAuth

const router = express.Router();

// Generate Unique UPI ID
const generateUPIId = () => {
    return `upi_${Math.random().toString(36).substr(2, 9)}`;
};

// Signup Route
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Input validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please provide username, email, and password' });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password and create user
        const hashedPassword = await bcrypt.hash(password, 10);
        const upiId = generateUPIId();
        const user = new User({ username, email, password: hashedPassword, upiId });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', upiId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to register user' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ message: 'JWT_SECRET is not defined in environment variables' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, upiId: user.upiId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to login' });
    }
});

// Fetch user details (for dashboard)
router.get('/me', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);  // Use req.userId from the token
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ username: user.username, upiId: user.upiId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user details' });
    }
});

module.exports = router;
