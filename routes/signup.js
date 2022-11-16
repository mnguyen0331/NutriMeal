const express = require('express')
const router = express.Router()

// Show initial signup page
router.get('/', (req, res) => {
    res.render('signup/index.ejs')
})

// Create new account
router.post('/', (req, res) => {
    
})

module.exports = router