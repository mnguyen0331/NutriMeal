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
  const { firstName, lastName, phoneNum, email, password } = req.body
  errors = checkErrorInputs(firstName, lastName, phoneNum, email, password)
  if (errors.length === 0) {
    const user = await User.findOne({email: email})
    if (user) {
      errors.push('Email already exists')
      renderErrorSignUp(req, res, errors)
    }
    else {
      try {
        const newUser = new User({
          firstName: firstName,
          lastName: lastName,
          phoneNum: phoneNum,
          email: email,
          password: await bcrypt.hash(password, 10)
        })
        console.log(newUser)   
        await newUser.save() // save user to DB
        req.flash('success_msg', 'Create account successfully. You can now sign in below')
        res.redirect('/users/signin')
      } catch (error) {
        console.log(error)
        res.redirect('/users/signup')
      }    
    }
  }
  else renderErrorSignUp(req, res, errors)
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
        allergiesSelections : JSON.parse(req.body.allergensInput)
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
function renderErrorSignUp (req, res, errors) {
    res.render('users/signup', {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNum: req.body.phoneNum,
        email: req.body.email,
        password: req.body.password,
        user: new User(),
        errors: errors
    })
}

function checkErrorInputs(firstName, lastName, phoneNum, email, password) {
  let errors = []
  const validName = /^[a-zA-Z]{2,10}$/
  if (!validName.test(firstName)) errors.push('First name is not valid')
  if (!validName.test(lastName)) errors.push('Last name is not valid')
  const validPhoneNum = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$/
  if (!validPhoneNum.test(phoneNum)) errors.push('Phone number is not valid')
  const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!validEmail.test(email)) errors.push('Email is not valid')
  const validPassword= new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%&_])(?=.{9,})")
  if (!validPassword.test(password)) errors.push('Password is not valid')
  if (email == password) errors.push('Password cannot be the same as email')
  return errors
}

module.exports = router