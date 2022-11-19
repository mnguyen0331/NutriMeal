const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkNotAuthenticated } = require('../config/auth')

// Show initial signin page
router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('signin/index')
})

// Forgot password
router.get('/forgotpassword', (req,res) => {
  res.render('signin/forgotpassword')
})

router.post('/forgotpassword', async (req, res) => {
  const {email, phoneNum, password} = req.body
  try {
      const user = await User.findOne({email: email}).exec()
      if (user.phoneNum === phoneNum) {
        try {
          const newPassword = await bcrypt.hash(password, 10)
          user.password = newPassword
          try {
            await user.save()
            res.redirect('/signin')
          } catch (err) {
            console.log('Error saving user')
          }
        } catch (err) {
          console.log(err)
        } 
      }
      else {
        res.render('signin/forgotpassword', {email : email, phoneNum : phoneNum, password : password, errorMessage: `Phone number ${phoneNum} does not match with our record`})
      }
  } catch (error) {
    res.render('signin/forgotpassword', {email : email, phoneNum : phoneNum, password : password, errorMessage: `${email} does not exist`})
  }
})

// Handle user sign in
router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    failureFlash: true
}))

module.exports = router