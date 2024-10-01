const express = require('express')
const router = express.Router()

// ===== ROUTES ===== //
router.get('sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})

router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up.ejs')
})
// EXPORT 
module.exports = router