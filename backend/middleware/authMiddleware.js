const jwtToken = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET || 'superSecretKey';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'superRefreshKey';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token missing' });
    }

    try {
        const decoded = jwtToken.verify(token, jwtSecret);
        req.user = decoded; // Attach the decoded user information to the request object
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;    