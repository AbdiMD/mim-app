const express = require('express');
const router = express.Router();

// *Connect DB
require('../utils/db')
const Subject = require('../models/subject')

router.get('/', async (req,res)=>{
    const subject = await Subject.find();

    res.render('subject', {
        title: 'Subject',
        layout: 'subject',
        subject
    })
})

router.post('/', async (req,res)=>{
    
    const subject = new Subject(req.body);

    await subject.save();
    res.redirect('/subject')
})

module.exports = router;