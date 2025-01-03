const express = require('express');
const Transaction = require('../models/Transaction');
const User = require('../models/User');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// Create Transaction (Send Payment)
router.post('/payment', requireAuth, async (req, res) => {
    const { amount, description, receiverUpiId } = req.body;

    // Input validation
    if (!amount || !description || !receiverUpiId) {
        return res.status(400).json({ message: 'Amount, description, and receiver\'s UPI ID are required' });
    }

    if (amount <= 0) {
        return res.status(400).json({ message: 'Amount must be greater than zero' });
    }

    try {
        // Get the user making the payment
        const user = await User.findById(req.userId);

        // Check if user has sufficient balance
        if (user.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Create the transaction
        const transaction = new Transaction({
            userId: req.userId,
            amount,
            description,
            receiverUpiId, // Store the receiver's UPI ID
        });

        // Save the transaction
        await transaction.save();

        // Update the sender's balance
        user.balance -= amount;
        await user.save();

        // Find the receiver using the UPI ID
        const receiver = await User.findOne({ upiId: receiverUpiId });
        if (receiver) {
            // Update the receiver's balance
            receiver.balance += amount;
            await receiver.save();
        } else {
            // Handle case if the receiver's UPI ID does not exist
            return res.status(404).json({ message: 'Receiver not found' });
        }

        // Return a success response with the transaction details
        res.status(201).json({ message: 'Payment successful', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error processing payment' });
    }
});

// /transactions route to fetch all transactions for the logged-in user
router.get('/', requireAuth, async (req, res) => {
    try {
        const transaction = await Transaction.find({ userId: req.userId });
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});


// /transactions/balance route
router.get('/balance', requireAuth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ balance: user.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching balance' });
    }
});

// /transactions route to fetch all transactions for the logged-in user
router.get('/', requireAuth, async (req, res) => {
    try {
        const transaction = await Transaction.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .limit(2); // Get 5 recent transactions
        res.status(200).json(transaction);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching transactions' });
    }
});


module.exports = router;
