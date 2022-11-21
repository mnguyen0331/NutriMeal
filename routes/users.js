const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkAuthenticated, checkNotAuthenticated } = require('../config/auth')

// SignIn Page
router.get('/signin', checkNotAuthenticated, (req, res) => {
    res.render('users/signin/signin')
})

// Forgot password Page
router.get('/signin/forgotpassword', (req,res) => {
  res.render('users/signin/forgotpassword')
})

// Render profile page with user's info
router.get('/:id/profile', checkAuthenticated, (req, res) => {
    res.render('users/profile', {user: req.user})
})

// Show initial signup page
router.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('users/signup', {user: new User()})
})

// Change password request
router.post('/signin/forgotpassword', async (req, res) => {
  const {email, phoneNum, password} = req.body
  try {
      const user = await User.findOne({email: email}).exec()
      if (user.phoneNum === phoneNum) {
        try {
          const newPassword = await bcrypt.hash(password, 10)
          user.password = newPassword
          try {
            await user.save()
            req.flash('success_msg','Updating password successfully')
            res.redirect('/users/signin')
          } catch (err) {
            console.log('Error saving user')
          }
        } catch (err) {
          console.log(err)
        } 
      }
      else {
        res.render('users/signin/forgotpassword', {email : email, phoneNum : phoneNum, password : password, error_msg: `Phone number ${phoneNum} does not match with our record`})
      }
  } catch (error) {
    res.render('users/signin/forgotpassword', {email : email, phoneNum : phoneNum, password : password, error_msg: `${email} does not exist`})
  }
})

// SignIn Request
router.post('/signin', passport.authenticate('local', {
    failureRedirect: '/users/signin',
    failureFlash: true}),
    function (req, res) {
      req.flash('success_msg', 'Signing in successfully. You can update your info below')
      res.redirect(`/users/${req.user.id}/profile`)
    }
)

// Create new account
router.post('/signup', async (req, res) => {
    // check for duplicate email
    const email = req.body.email
    const duplicate = await User.findOne({ email: email }).exec()
    if (duplicate) {
        renderErrorSignUp(req, res, `Email ${email} already exists`)
    }

    else {
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const phoneNum = req.body.phoneNum
        const password = req.body.password
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({
            firstName: firstName,
            lastName: lastName,
            phoneNum: phoneNum,
            email: email,
            password: hashedPassword,
        })
        try {
            await user.save() // save user to DB
            req.flash('success_msg', 'Create account successfully. You can now sign in below')
            res.redirect('/users/signin')
        } catch (error) {
            console.log(error)
            renderErrorSignUp(req, res, 'Something went wrong. Unable to create account. Please try again')
        }
    }
})

// Let user update their information
router.put('/:id/profile', async (req, res) => {
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
        allergies: req.body.allergies,
        allergiesSelections : req.body.allergens,
      }, {new : true})
      res.render('users/profile', { user: user, success_msg: 'Updating Successfully'})
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Error updating info')
      res.redirect('/users/profile')
    } 
  })

// Remove session when sign out
router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    req.flash('success_msg', 'Logging Out Successfully')
    res.redirect('/users/signin')
  })
})

// Render Error SignUp Page
function renderErrorSignUp (req, res, msg) {
    res.render('users/signup', {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        password: req.body.password,
        user: new User(),
        error_msg: msg
    })
}
module.exports = router