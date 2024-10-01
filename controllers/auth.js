const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/wine.js')

// ===== ROUTES ===== //
router.get('sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in.ejs')
})

router.post('/sign-up', async (req, res) => {
    const userTaken = await User.findOne({username: req.body.username})
    if (userTaken) {
        return res.send('Username already in use.')
    }
    if (req.body.password !== req.body.confirmPassword) {
        return res.send('Both passwords do not match.')
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 15)
    req.body.password = hashedPassword
    const user = await User.create(req.body)
    res.send(`Welcome, ${user.username}!`)
})
// EXPORT 
module.exports = router