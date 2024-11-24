const mongoose = require('mongoose');

const userTypeSchema = new mongoose.Schema({
    usertype: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: false
    },
    permission:{
        user_management: {
            type: Boolean,
            default: false
        },
        siswa_management: {
            type: Boolean,
            default: false
        }, 
        usertype_management: {
            type: Boolean,
            default: false
        }
    }
})

module.exports = mongoose.model('userType', userTypeSchema);