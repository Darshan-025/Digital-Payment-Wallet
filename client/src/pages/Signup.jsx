import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords don't match!");
            return;
        }

        if (!username || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post('http://localhost:5000/auth/signup', { username, email, password });
            setSuccessMessage('Signup successful! Please login.');
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect to login after 2 seconds
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Error signing up');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ marginTop: '50px' }}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>
                
                {error && <Typography color="error" align="center">{error}</Typography>}
                {successMessage && <Typography color="primary" align="center">{successMessage}</Typography>}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
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
                <TextField
                    label="Confirm Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth disabled={loading}>
                    {loading ? <CircularProgress size={24} color="secondary" /> : 'Sign Up'}
                </Button>
            </Box>
        </Container>
    );
};

export default Signup;
