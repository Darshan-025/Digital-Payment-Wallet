import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';

const Dashboard = () => {
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/transaction/balance', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error('Error fetching balance', error);
            }
        };

        fetchBalance();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const handleGoToHome = () => {
        navigate('/'); // Navigate to the Home page
    };

    return (
        <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
            <Card>
                <CardContent>
                    <Typography variant="h4" gutterBottom>Dashboard</Typography>
                    {balance !== null ? (
                        <>
                            <Typography variant="h6">Your Balance</Typography>
                            <Typography variant="h5" color="primary">₹{balance}</Typography>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                fullWidth 
                                onClick={handleLogout} 
                                sx={{ marginTop: '20px' }}
                            >
                                Logout
                            </Button>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                fullWidth 
                                onClick={handleGoToHome} 
                                sx={{ marginTop: '20px' }}
                            >
                                Go to Home
                            </Button>
                        </>
                    ) : (
                        <CircularProgress />
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};

export default Dashboard;
