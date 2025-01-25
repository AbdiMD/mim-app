const express = require('express');
const router = express.Router();

// *Connect DB
require('../utils/db')  
const ScholarSeason = require('../models/scholarSeason')

router.get('/', async (req,res)=>{
    const scholarSeason = await ScholarSeason.find();

    res.render('scholarSeason', {
        title: 'Scholar Season',
        layout: 'scholarSeason',
        scholarSeason
    })
})

router.post('/', async (req,res)=>{

    const scholarSeason = new ScholarSeason(req.body);

    await scholarSeason.save();
    res.redirect('/scholarSeason');
});

router.put('/', async (req,res)=>{
    const scholarSeasonUpdate = await ScholarSeason.updateOne({_id:req.body._id}, {
        $set: {
            seasonName: req.body.seasonName,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        }
    });
    res.redirect('/scholarSeason')
});

router.delete('/', async (req,res)=>{
    const scholarSeason = await ScholarSeason.deleteOne({_id:req.body._id})
    res.redirect('/scholarSeason')
});

module.exports = router;