const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie('token', token, { httpOnly: true });

        // Clear JWT from localStorage
    localStorage.removeItem('token');

    // Or from sessionStorage
    sessionStorage.removeItem('token');


    res.redirect('/login');
});

module.exports = router;