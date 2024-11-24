const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

require('../utils/db')

const store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1/mim',
    collection: 'mySessions'
});

const sessionConf = session({
    secret: 'this is my secret key',
    resave: false,
    saveUninitialized: false,
    store: store
  })


const isAuth = (req, res, next) => {
    if (req.session.isAuth){
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports = {
    isAuth,
    sessionConf
}