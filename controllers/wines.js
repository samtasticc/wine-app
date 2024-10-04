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

router.get('/new', async (req, res) => {
    res.render('wines/new.ejs')
})
module.exports = router