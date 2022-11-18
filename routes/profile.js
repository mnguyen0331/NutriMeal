const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../config/auth')

// Render profile page with user's info
router.get('/', checkAuthenticated, (req, res) => {
    res.render('profile/index.ejs', {user: req.user})
})

// Let user update their information
router.put('/:id', async (req, res) => {
  res.send('Update successfully')
})

module.exports = router