const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = require('./config').JWT_SECRET_KEY;

// Middleware to authorize the user
function authorise(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.username = decoded.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = authorise;