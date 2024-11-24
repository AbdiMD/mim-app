const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },

    noHP: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model('user', UserSchema);