const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// *Connect DB
require('../utils/db')  
const ScholarSeason = require('../models/scholarSeason')
const Class = require("../models/class");

router.get('/', async (req,res)=>{
    const scholarSeason = await ScholarSeason.find();

    res.render('scholarSeason', {
        title: 'Scholar Season',
        layout: 'scholarSeason',
        scholarSeason
    })
})

router.post("/", async (req, res) => {
    try {
      const { seasonName, startDate, endDate } = req.body;
  
      // Validate required fields
      if (!seasonName || !startDate || !endDate) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      const seasonId = new mongoose.Types.ObjectId();
  
      // Prepare class creation promises
      const classPromises = Array.from({ length: 6 }, (_, index) => {
          const grade = index + 1;
          const classId = new mongoose.Types.ObjectId();
  
          // Create a Class document
          return Class.create({
            classId: classId,
            seasonId: seasonId,
            grade: grade,
            syllabus: [],
            evaluations: [],
          }).then(() => ({ grade, classId }))
        })
  
      // Resolve all class creation promises and collect the class references
      const classes = await Promise.all(classPromises);
  
      // Create the ScholarSeason document
      await ScholarSeason.create({
        _id: seasonId,
        seasonName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        classes,
      });
  
      // Redirect or send success response
      res.redirect("/scholarSeason");
    } catch (err) {
      console.error("Error creating scholar season:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });

router.put('/', async (req,res)=>{
    const scholarSeasonUpdate = await ScholarSeason.updateOne({_id:req.body._id}, {
        $set: {
            seasonName: req.body.seasonName,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            classes: req.body.classes
        }
    });
    res.redirect('/scholarSeason')
});

router.delete('/', async (req,res)=>{
    try {
        const isScholarSeasonUsed = await Class.findOne({seasonId: req.body._id, syllabus: { $ne: [] }})
        if(isScholarSeasonUsed){
            const message = `Scholar Season is used in a class. Please delete the class first.`
            return res.status(400).json({ error: message });
        }

        await ScholarSeason.deleteOne({_id:req.body._id})
        await Class.deleteMany({seasonId: req.body._id})
        res.redirect('/scholarSeason')        
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }

});

module.exports = router;