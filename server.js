// ========= IMPORTS ========= //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
const port = process.env.PORT ? process.env.PORT: '3000'
const authController = require('./controllers/auth.js')
// ========= MONGOOSE ========= //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
// ========= MIDDLEWARE ========= //
// app.use(express.urlencoded({extend: false})) // add back in when it is time for your POST route
app.use(methodOverride('_method'))
app.use(morgan('dev'))
// ========= ROUTES ========= //

// === LANDING PAGE === //
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.use('/auth', authController)

// ========= SERVER ========= //
app.listen(port, () => {
    console.log('Drinking wine from cork 3000')
})