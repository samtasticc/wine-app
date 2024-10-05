const express = require('express')
const router = express.Router()

const User = require('../models/wine.js')

// ====== ROUTES ====== //
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        res.render('wines/index.ejs', {
            wines: currentUser.wines
        })
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('wines/new.ejs')
})

router.get('/:winesId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const wines = currentUser.wines.id(req.params.winesId)
        res.render('wines/show.ejs', {
            wines: wines
        })
    } catch(error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:winesId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const wines = currentUser.wines.id(req.params.winesId)
        res.render('wines/edit.ejs', {
            wines: wines 
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
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

router.put('/:winesId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const wine = currentUser.wines.id(req.params.winesId)
        wine.set(req.body) 
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/wines/${req.params.winesId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:winesId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.wines.id(req.params.winesId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/wines`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})
module.exports = router