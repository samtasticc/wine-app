const express = require('express')
const router = express.Router()

const User = require('../models/wine.js')

// ====== ROUTES ====== //
router.get('/', (req, res) => {
    try {
        res.render('wines/index.ejs')
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

module.exports = router