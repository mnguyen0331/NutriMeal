const express = require('express')
const router = express.Router()
const { checkAuthenticated } = require('../config/auth')

// Render profile page with user's info
router.get('/', checkAuthenticated, (req, res) => {
    res.render('profile/index', {user: req.user})
})

// Let user update their information
router.put('/:id', async (req, res) => {
  res.send('Update successfully')
})

// Remove session when sign out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/signin')
  })
})

module.exports = router