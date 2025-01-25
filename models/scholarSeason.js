const mongoose = require('mongoose');

const scholarSeasonSchema = new mongoose.Schema({    
    seasonName: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}); 

module.exports = mongoose.model('scholarSeason', scholarSeasonSchema);