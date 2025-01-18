const mongoose = require('mongoose');

const Siswa = mongoose.model('siswa', {
    nama: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    kelas: {
        type: String,
        enum: ['Kelas 1', 'Kelas 2', 'Kelas 3', 'Kelas 4', 'Kelas 5', 'Kelas 6'],
        default: 'Kelas 1',
        required: true
    }, 
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        required: true
    }, 
    note: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    }
})

module.exports = Siswa