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

const attachUser = (req, res, next) => {
    const token = req.cookies.token; // Read the token from cookies
    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret'); // Verify and decode the token
            req.user = decoded; // Attach the user data to the request object
        } catch (err) {
            console.error('Invalid or expired token', err);
            req.user = null; // If the token is invalid or expired, clear the user
        }
    } else {
        req.user = null; // No token means no user
    }
    next();
}

module.exports = {
    isAuth,
    isGuest,
    attachUser
};