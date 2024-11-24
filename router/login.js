const express = require('express');
const router = express.Router();
const auth = require('../services/auth')

// *Connect DB
require('../utils/db')
const User = require('../models/user')


router.use(auth.sessionConf);

router.get('/admin', auth.isAuth ,(req, res) => {
    
    res.send('Admin Dashboard');
});

router.get('/', (req,res) => {
    res.render('login', {
        title: 'Login Page',
        layout: 'login'
    })
});

// Login route
router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({nama: req.body.username});

    if (!user) {
        return res.status(401).send('User not found');
    }

    if(password !== user.password){
        return res.status(401).send('Invalid username or password');
    }

    req.session.isAuth = true
    res.redirect('/')
});





module.exports = router;