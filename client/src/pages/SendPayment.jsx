import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const SendPayment = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [receiverUpiId, setReceiverUpiId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const navigate = useNavigate();  // Initialize the navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || !description || !receiverUpiId) {
            setError('All fields are required!');
            return;
        }

        if (parseFloat(amount) <= 0) {
            setError('Amount must be greater than zero!');
            return;
        }

        const token = localStorage.getItem('token');
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/transaction/payment', 
                { amount: parseFloat(amount), description, receiverUpiId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setSuccessMessage('Payment successful!');
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error sending payment');
        } finally {
            setLoading(false);
        }
    };

    // Function to navigate to Home page
    const handleGoToHome = () => {
        navigate('/'); // Navigate to Home page
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant="h4" gutterBottom align="center">Send Payment</Typography>
                <TextField
                    label="Amount"
                    type="number"
                    variant="outlined"
                    onChange={(e) => setAmount(e.target.value)}
                    value={amount}
                />
                <TextField
                    label="Description"
                    type="text"
                    variant="outlined"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />
                <TextField
                    label="Receiver's UPI ID"
                    type="text"
                    variant="outlined"
                    onChange={(e) => setReceiverUpiId(e.target.value)}
                    value={receiverUpiId}
                />
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={24} color="secondary" /> : 'Send Payment'}
                </Button>
                {error && <Typography color="error">{error}</Typography>}
                {successMessage && <Typography color="success.main">{successMessage}</Typography>}

                {/* Go to Home button */}
                <Button 
                    variant="contained" 
                    color="secondary" 
                    fullWidth 
                    onClick={handleGoToHome} 
                    sx={{ marginTop: '20px' }}
                >
                    Go to Home
                </Button>
            </Box>
        </Container>
    );
};

export default SendPayment;
