import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const HomePage = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', // Full height of the viewport
                backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1663931932646-15ceb9c0033f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', // Example valid background image
                backgroundSize: 'cover', // Ensures the image covers the entire screen
                backgroundPosition: 'center', // Centers the image
                backgroundRepeat: 'no-repeat', // Prevents the image from repeating
                position: 'relative', // Allows the overlay to be positioned correctly
            }}
        >
            {/* Overlay for Text Contrast */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darker overlay for better text visibility
                    zIndex: 1,
                }}
            />

            {/* Content Box */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2,
                    padding: 3,
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                {/* Welcome Message */}
                <Typography
                    variant="h4"
                    align="center"
                    sx={{
                        fontWeight: '700',
                        marginBottom: 2,
                        textTransform: 'uppercase',
                        letterSpacing: 1,
                    }}
                >
                    Welcome to the Digital Payment App
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    sx={{
                        marginBottom: 4,
                        color: '#e0e0e0',
                        fontSize: '1.2rem',
                    }}
                >
                    Your one-stop solution for easy and secure transactions.
                </Typography>

                {/* Image */}
                <Paper
                    sx={{
                        padding: 4,
                        backgroundColor: '#ffffff',
                        borderRadius: 2,
                        boxShadow: 3,
                        width: '80%',
                        maxWidth: 500,
                        textAlign: 'center',
                        zIndex: 2,
                    }}
                >
                    {/* Add your image here */}
                    <img
                        src="https://cdn.sanity.io/images/9sed75bn/production/7a6cddc4a6cc60c40be31ebc1f9424bf21be0384-896x504.png" // Example valid image URL
                        alt="Payment"
                        style={{
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default HomePage;
