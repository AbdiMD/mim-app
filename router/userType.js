const express = require('express');
const router = express.Router();

// *Connect DB
require('../utils/db')
const UserType = require('../models/userType')


router.get('/', async (req, res)=>{
    const userType = await UserType.find();

    res.render('userType', {
        title: 'User Type',
        layout: 'userType',
        userType
    })
});

router.get('/add', async (req, res)=>{
    const usertype = await UserType.find();

    res.render('addUserType', {
        title: 'Add User Type',
        layout: 'addUserType',
        usertype
    })
});

router.post('/', async (req, res)=>{

    try{
        const userTypeData = {
            usertype: req.body.usertype,
            description: req.body.description,
            permission: {
                user_management: req.body.permissions && req.body.permissions.user_management === 'true',
                usertype_management: req.body.permissions && req.body.permissions.usertype_management === 'true',
                siswa_management: req.body.permissions && req.body.permissions.siswa_management === 'true'
            }
        };

        const userType = new UserType(userTypeData);
        await userType.save();

        res.redirect('/usertype')
    } catch(error){
        console.error(error);
        res.status(500).send('test')
    }
    
});

router.delete('/', async (req, res)=>{
    await UserType.deleteOne({_id: req.body._id});
});

router.get('/:_id', async (req, res)=>{
    const userType = await UserType.findOne({_id:req.params._id})

    res.render('editUserType', {
        title: 'Edit User Type',
        layout: 'editUserType',
        userType
    })
});

router.put('/', async (req,res)=>{

    const permission = {
        user_management: req.body.permission && req.body.permission.user_management === 'true',
        usertype_management: req.body.permission && req.body.permission.usertype_management === 'true',
        siswa_management: req.body.permission && req.body.permission.siswa_management === 'true'
    }

    const userTypeUpdate = await UserType.updateOne({_id:req.body._id}, {
        $set: {
            usertype: req.body.usertype,
            description: req.body.description,
            permission: permission
        }
    });

});


module.exports = router;
