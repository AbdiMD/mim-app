const express = require('express');
const router = express.Router();
const auth = require('../services/auth_jwt');

router.get('/',auth.isAuth, (req, res) => {
    // Clear the JWT token cookie
    res.clearCookie('token', { httpOnly: true });


    res.redirect('/login');
});

module.exports = router;