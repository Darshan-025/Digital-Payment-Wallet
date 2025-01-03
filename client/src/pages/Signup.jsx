import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Container, Typography } from '@mui/material';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/auth/signup', { username, email, password });
    // Handle success (e.g., redirect to login or show a success message)
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 5,
          padding: 3,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#f5f5f5',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {/* Username Input */}
          <TextField
            fullWidth
            label="Username"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Email Input */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Sign Up
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
