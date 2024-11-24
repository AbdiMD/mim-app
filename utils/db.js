const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/mim').then(()=>
    console.log('connection successful'));