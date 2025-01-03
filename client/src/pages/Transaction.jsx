import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Box } from '@mui/material';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTransactions = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert("Please log in to view transactions.");
                return;
            }

            try {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
                const response = await axios.get(`${API_URL}/transaction`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ marginTop: 5 }}>
            {/* Page Heading */}
            <Typography
                variant="h4"
                gutterBottom
                align="center"
                sx={{
                    fontWeight: 600,
                    color: '#333',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    marginBottom: 3
                }}
            >
                Transaction History
            </Typography>

            {/* Loading State */}
            {loading ? (
                <Box display="flex" justifyContent="center" sx={{ marginTop: 5 }}>
                    <CircularProgress color="primary" size={50} />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, overflow: 'hidden', marginTop: 3 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#f9f9f9', boxShadow: 1 }}>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>Description</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>Amount (₹)</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>Receiver UPI ID</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold', color: '#333' }}>Date and Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <TableRow key={transaction._id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                                        <TableCell align="center">{transaction.description}</TableCell>
                                        <TableCell align="center">{transaction.amount}</TableCell>
                                        <TableCell align="center">{transaction.receiverUpiId || 'N/A'}</TableCell>
                                        <TableCell align="center">
                                            {/* Display date and time */}
                                            {new Date(transaction.date).toLocaleString()}
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                        No transactions available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Transactions;
