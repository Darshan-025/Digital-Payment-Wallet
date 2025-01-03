import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout'; // Ensure this path is correct
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SendPayment from './pages/SendPayment';
import Transaction from './pages/Transaction';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Nested routes under the Layout */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="send-payment" element={<SendPayment />} />
                    <Route path="transaction" element={<Transaction />} />
                </Route>
                {/* Separate routes for Login and Signup */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
