const express = require('express')
const router = express.Router()
const User = require('../models/user.js')

// ===== ROUTES ===== //
router.get('sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    res.send('form submission accepted')
})
// EXPORT 
module.exports = router