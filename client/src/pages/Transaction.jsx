import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import dayjs from 'dayjs';  
import { useNavigate } from 'react-router-dom';  

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();  

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
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Transaction History
            </Typography>

            {/* Table for displaying transactions */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="transaction table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Transaction ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Description</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Receiver UPI ID</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Amount (₹)</TableCell>
                            <TableCell sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>Date & Time</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.length > 0 ? (
                            transactions.map((transaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{transaction._id}</TableCell>
                                    <TableCell>{transaction.description}</TableCell>
                                    <TableCell>{transaction.receiverUpiId}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{dayjs(transaction.date).format('YYYY-MM-DD HH:mm:ss')}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5}>No transactions available.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/')}>
                    Go to Home
                </Button>
            </div>
        </div>
    );
};

export default Transactions;
