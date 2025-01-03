import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography, CircularProgress } from '@mui/material';

const SendPayment = () => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [receiverUpiId, setReceiverUpiId] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!amount || !description || !receiverUpiId) {
            setError('All fields are required!');
            return;
        }

        if (parseFloat(amount) <= 0) {
            setError('Amount must be greater than zero!');
            return;
        }

        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Set loading state
        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/transaction/payment', 
                { amount: parseFloat(amount), description, receiverUpiId }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // Handle success
            setSuccessMessage('Payment successful!');
            console.log('Payment successful:', response.data);
        } catch (error) {
            // Handle error
            setError(error.response ? error.response.data.message : 'Error sending payment');
        } finally {
            // Set loading state back to false
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: 5, paddingBottom: 5 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 3,
                    borderRadius: 3,
                    boxShadow: 5,
                    backgroundColor: '#ffffff',
                    border: '1px solid #e0e0e0',
                    minHeight: '60vh',
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        fontWeight: '600',
                        color: '#333',
                        marginBottom: 3,
                        textTransform: 'uppercase',
                    }}
                >
                    Send Payment
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    {/* Amount Input */}
                    <TextField
                        fullWidth
                        label="Amount"
                        variant="outlined"
                        margin="normal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                        type="number"
                        inputProps={{ min: 0 }}
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Description Input */}
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        sx={{ marginBottom: 2 }}
                    />

                    {/* Receiver's UPI ID Input */}
                    <TextField
                        fullWidth
                        label="Receiver's UPI ID"
                        variant="outlined"
                        margin="normal"
                        value={receiverUpiId}
                        onChange={(e) => setReceiverUpiId(e.target.value)}
                        required
                        sx={{ marginBottom: 3 }}
                    />

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{
                            marginTop: 2,
                            padding: 1.5,
                            backgroundColor: '#007BFF',
                            '&:hover': {
                                backgroundColor: '#0056b3',
                            },
                        }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Payment'}
                    </Button>
                </form>

                {/* Display error message */}
                {error && <Typography variant="body2" color="error" sx={{ marginTop: 2, textAlign: 'center' }}>{error}</Typography>}

                {/* Display success message */}
                {successMessage && <Typography variant="body2" color="success" sx={{ marginTop: 2, textAlign: 'center' }}>{successMessage}</Typography>}
            </Box>
        </Container>
    );
};

export default SendPayment;
