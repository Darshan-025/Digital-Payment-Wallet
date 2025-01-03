const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transaction');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS setup to allow frontend requests from localhost:3000 (or wherever your frontend is)
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests only from localhost:3000
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/auth', authRoutes);
app.use('/transaction', transactionRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});
