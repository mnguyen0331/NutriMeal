const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const initialize = require('../config/passport-config')



// Show initial signin page
router.get('/', (req, res) => {
    res.render('signin/index.ejs')
})

// Handle user sign in
router.post('/', async (req, res) => {
    
})

module.exports = router