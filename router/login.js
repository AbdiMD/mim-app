const express = require('express');
const router = express.Router();
const auth = require('../services/auth_jwt');
const jwt = require('jsonwebtoken');


// *Connect DB
require('../utils/db')
const User = require('../models/user')

router.get('/admin', auth.isAuth ,(req, res) => {
    
    res.send('Admin Dashboard');
});

router.get('/', (req,res) => {
    res.render('login', {
        title: 'Login',
        layout: 'login'
    })
});

// Login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({nama: username});

    if (!user) {
        return res.render('login', {
            title: 'Login Page',
            layout: 'login',
            errorMessage: 'Invalid username or password',
        });
    }

    if(password !== user.password){
        return res.render('login', {
            title: 'Login Page',
            layout: 'login',
            errorMessage: 'Invalid username or password',
        });
    }

    const token = jwt.sign({ id: user.id, username: user.nama, role: user.userType }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.redirect('/')
});





module.exports = router;