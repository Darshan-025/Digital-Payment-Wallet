import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Container, Typography, Grid, Card, CardContent, Box, CircularProgress } from '@mui/material';
import axios from 'axios';

const Home = () => {
    const [realTimeInfo, setRealTimeInfo] = useState('');
    const [loading, setLoading] = useState(true);

    // Simulating an API call to fetch real-time payment-related data
    useEffect(() => {
        const fetchRealTimeInfo = async () => {
            setLoading(true);
            try {
                // Replace with actual API endpoint for payment-related real-time data
                const response = await axios.get('https://api.example.com/payment-info'); // Example API URL
                setRealTimeInfo(response.data.message); // Set the real-time data
            } catch (error) {
                console.error('Error fetching real-time payment info:', error);
                setRealTimeInfo('Transaction fees are at a 0.5% rate today. Payment Services Open 24/7.');
            } finally {
                setLoading(false);
            }
        };

        fetchRealTimeInfo();

        const interval = setInterval(fetchRealTimeInfo, 30000); // Update data every 30 seconds
        return () => clearInterval(interval); // Clean up the interval when the component is unmounted
    }, []);

    return (
        <div>
            {/* App Bar for navigation */}
            <AppBar position="static" sx={{ padding: '16px 0' }}> {/* Increased padding for top bar */}
                <Toolbar>
                    <Typography variant="h3" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: '2.5rem' }}>
                        Payment App
                    </Typography>
                    {/* Navigation buttons with custom background color */}
                    <Button 
                        component={Link} 
                        to="/signup" 
                        sx={{ 
                            backgroundColor: '#1976d2',  // Blue color for Sign Up
                            color: 'white', 
                            '&:hover': { backgroundColor: '#1565c0' }, // Darker blue on hover
                            marginLeft: 2, // Adds space between buttons
                        }}
                    >
                        Sign Up
                    </Button>
                    <Button 
                        component={Link} 
                        to="/login" 
                        sx={{ 
                            backgroundColor: '#90caf9',  // Light blue color for Login
                            color: 'black', 
                            '&:hover': { backgroundColor: '#64b5f6' }, // Slightly darker light blue on hover
                        }}
                    >
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

            {/* Small Navigation Bar under AppBar for animated text */}
            <Box sx={{
                backgroundColor: '#3f51b5', // Different color for the new navigation bar
                padding: '8px', // Slightly bigger padding for bottom bar
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1300,
            }}>
                {/* Real-time animated bar for payment-related info */}
                <Box sx={{
                    color: 'white',
                    padding: '10px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    animation: 'scrollText 20s linear infinite', // Slower animation speed
                    height: '10px', // Increased height for bottom bar to create a visible difference
                }}>
                    {loading ? (
                        <CircularProgress color="inherit" />
                    ) : (
                        <Typography variant="body1" sx={{
                            fontSize: '1.1rem',
                        }}>
                            {realTimeInfo}
                        </Typography>
                    )}
                </Box>
            </Box>

            {/* Home Page Content */}
            <Container sx={{ marginTop: '120px' }}> {/* Adjust margin-top to avoid overlap */}
                <Typography variant="h4" align="center" gutterBottom>
                    Welcome to the Payment App
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    Manage your transactions, send payments, and track your balance with ease. Get started by logging in or signing up.
                </Typography>

                {/* Grid of cards to display app features */}
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Dashboard</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    View your balance, recent transactions, and more.
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth component={Link} to="/dashboard" sx={{ marginTop: '20px' }}>
                                    Go to Dashboard
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Send Payment</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Send payments to anyone using their UPI ID.
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth component={Link} to="/send-payment" sx={{ marginTop: '20px' }}>
                                    Send Payment
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Transactions</Typography>
                                <Typography variant="body2" color="textSecondary">
                                    View all your transaction history in one place.
                                </Typography>
                                <Button variant="contained" color="primary" fullWidth component={Link} to="/transaction" sx={{ marginTop: '20px' }}>
                                    View Transactions
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* CSS for the scrolling animation */}
            <style>
                {`
                    @keyframes scrollText {
                        0% {
                            transform: translateX(100%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                `}
            </style>
        </div>
    );
};

export default Home;
