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

router.post('/sign-in', async (req, res) => {
    const userFound = await User.findOne({username: req.body.username})
    if (!userFound) {
        return res.send('Login failed. Please try again.')
    }
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userFound.password
    )
    if (!validPassword) {
        return res.send('Login failed. Please try again.')
    }
    req.session.user = {
        username: userFound.username,
        _id: userFound._id,
    }
    res.redirect('/')
    // res.send("You've signed in!")
})
// EXPORT 
module.exports = router