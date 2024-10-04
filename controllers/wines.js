const express = require('express')
const router = express.Router()

const User = require('../models/wine.js')

// ====== ROUTES ====== //
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('wines/index.ejs', {
            wines: currentUser.wines
            // console.log(currentUser.wines)
        })
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})


router.get('/new', async (req, res) => {
    res.render('wines/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.wines.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/wines`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router