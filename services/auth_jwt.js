const jwt = require('jsonwebtoken');

// Middleware to protect routes (check for valid JWT token)
const isAuth = (req, res, next) => {
    const token = req.cookies.token; // JWT stored in cookies

    if (!token) {
        return res.redirect('/login'); // Redirect to login if no token is found
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'secret' || 'secret'); // Use environment variable for secret
        req.user = decoded; // Attach user data (e.g., id, username, role) to `req` for access in other routes
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error('Invalid or expired token:', err);
        res.clearCookie('token'); // Clear the invalid/expired token
        return res.redirect('/login'); // Redirect to login
    }
};

// Middleware to check if the user is already logged in (optional)
const isGuest = (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, 'secret' || 'default_jwt_secret');
            return res.redirect('/'); // Redirect to the home page or dashboard if the user is already logged in
        } catch (err) {
            console.error('Invalid token:', err);
            res.clearCookie('token'); // Clear the invalid/expired token
        }
    }

    next(); // Proceed to the next middleware or route handler
};

module.exports = {
    isAuth,
    isGuest,
};