const express = require('express')
const router = express.Router()
const passport = require('passport')
const { checkNotAuthenticated } = require('../config/auth')

// Show initial signin page
router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('signin/index.ejs')
})

// Handle user sign in
router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}))

// Remove session when sign out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect('/signin')
  })
})

module.exports = router