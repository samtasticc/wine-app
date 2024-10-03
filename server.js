// ========= IMPORTS ========= //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
const port = process.env.PORT ? process.env.PORT: '3000'
const authController = require('./controllers/auth.js')
const session = require('express-session')
const isSignedIn = require('./middleware/is-signed-in.js')
const passUserToView = require('./middleware/pass-user-to-view.js')
// ========= MONGOOSE ========= //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
// ========= MIDDLEWARE ========= //
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
    })
)

app.use(passUserToView)
// ========= ROUTES ========= //

// === LANDING PAGE === //
app.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect(`/users/${req.session.user._id}/wines`)
    } else {
        res.render('index.ejs')    
    }       
})

app.use('/auth', authController)
app.use(isSignedIn)
const winesController = require('./controllers/wines.js')
app.use('/users/:userId/wines', winesController)

// ========= SERVER ========= //
app.listen(port, () => {
    console.log('Drinking wine from bottle 3000')
})