// ========= IMPORTS ========= //
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const methodOverride = require('method-override')
const morgan = require('morgan')
// ========= MONGOOSE ========= //
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}`)
})
// ========= MIDDLEWARE ========= //
app.use(express.urlencoded({extend: false}))
app.use(methodOverride('_method'))
app.use(morgan('dev'))
// ========= ROUTES ========= //

// ========= SERVER ========= //
app.listen(3000, () => {
    console.log('Drinking wine from cork 3000')
})