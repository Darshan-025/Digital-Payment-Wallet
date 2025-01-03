import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css'; // Import custom CSS

const Dashboard = () => {
  const [balance, setBalance] = useState(null);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isFlipped, setIsFlipped] = useState(true); // Start with the back side
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch user data
        const userResponse = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(userResponse.data);

        // Fetch balance data
        const balanceResponse = await axios.get('http://localhost:5000/transaction/balance', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBalance(balanceResponse.data.balance);

        // Fetch recent transactions
        const transactionsResponse = await axios.get('http://localhost:5000/transaction', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure date format is valid and sort by date in descending order
        const sortedTransactions = transactionsResponse.data
          .map((transaction) => ({
            ...transaction,
            createdAt: transaction.date, // Using the date field directly
          }))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date in descending order

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error('Error fetching user details or balance', error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Toggle flip effect
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5, perspective: '1000px' }}>
      {/* Balance Card */}
      <Card className="dashboard-card" sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Welcome to your Dashboard
          </Typography>
          {user && (
            <>
              <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                User: {user.username}
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.1rem', color: 'text.secondary' }}>
                UPI ID: {user.upiId}
              </Typography>
            </>
          )}
          {balance === null ? (
            <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
              <CircularProgress />
            </Box>
          ) : (
            <Typography variant="h5" color="primary" mt={2}>
              Your Balance: ₹{balance}
            </Typography>
          )}
          <Box mt={3}>
            <Button variant="contained" color="error" onClick={handleLogout} fullWidth>
              Logout
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Recent Transactions Card with Flip Effect */}
      <Card className={`flip-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recent Transactions
          </Typography>
          {transactions.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No recent transactions found.
            </Typography>
          ) : (
            <List>
              {transactions.map((transaction, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={`₹${transaction.amount}`}
                    secondary={`${transaction.description} - ${new Date(transaction.createdAt).toLocaleString()}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
        <Box className="flip-card-back">
          <Typography variant="h6" color="text.secondary">
            Tap to Flip! 🎉
          </Typography>
        </Box>
      </Card>
    </Container>
  );
};

export default Dashboard;
