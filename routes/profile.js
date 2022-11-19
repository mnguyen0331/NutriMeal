const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkAuthenticated } = require('../config/auth')

// Render profile page with user's info
router.get('/', checkAuthenticated, (req, res) => {
    res.render('profile/index', {user: req.user})
})

// Let user update their information
router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate({_id : req.params.id}, {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      phoneNum : req.body.phoneNum,
      streetAddress : req.body.streetAddress,
      city : req.body.city,
      zipcode : req.body.zipcode,
      state : req.body.state,
      email : req.body.email,
      password : await bcrypt.hash(req.body.password, 10),
      allergiesSelections : req.body.allergens,
      allergies: req.body.allergens == '' ? "no" : "yes"
    }, {new : true})
    console.log(user)
    res.render('profile/index', { user: user, success_msg: 'Updating Successfully'})
  } catch (err) {
    console.log(err)
    req.flash('error_msg', 'Error updating info')
    res.redirect('/profile')
  } 
})

// Remove session when sign out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    req.flash('success_msg', 'Logging Out...')
    res.redirect('/signin')
  })
})

module.exports = router