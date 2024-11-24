const express = require('express')
const router = express.Router();

// *Connect DB
require('../utils/db')
const User = require('../models/user')
const UserType = require('../models/userType')

router.get('/', async (req,res)=>{
    const users = await User.find();

    res.render('userManagement', {
        title: 'User Management',
        layout: 'userManagement',
        users
    })
});

router.get('/add', async (req,res)=>{
    const userType = await UserType.find();
    const userTypeName = await userType.map(user => user.usertype)

    res.render('addUser', {
        title: 'Add user',
        layout: 'addUser',
        userTypeName
    })

});

router.post('/', async (req, res)=>{
    const userData = {
        nama: req.body.nama,
        noHP: req.body.noHP,
        email: req.body.email,
        userType: req.body.userType,
        password: req.body.password
    }

    const user = new User(userData)
    await user.save();

    res.redirect('/user')
})

module.exports = router;
