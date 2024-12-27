import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    };

    // Function to navigate to Home page
    const handleGoToHome = () => {
        navigate('/'); // Navigate to Home page
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: '50px' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant="h4" gutterBottom align="center">Login</Typography>
                <TextField
                    label="Email"
                    type="email"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Login
                </Button>
                
                {/* Go to Home button */}
                <Button 
                    variant="outlined" 
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

export default Login;
