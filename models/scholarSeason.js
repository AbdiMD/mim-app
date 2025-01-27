const mongoose = require('mongoose');

const scholarSeasonSchema = new mongoose.Schema({    
    seasonName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    classes: [{
        grade: {type: Number, required: true}, 
        classId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Class', 
            required: true}}]
}); 

module.exports = mongoose.model('scholarSeason', scholarSeasonSchema);