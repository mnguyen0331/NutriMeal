const express = require('express')
const passport = require('passport')
const router = express.Router()

// Show initial home page
router.post('/', checkAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail',
    failureFlash: true 
}))

function checkAuthenticated(req, res, next) {
    console.log('checkAuthenticated ran')
    if(req.isAuthenticated()) {
        return res.send('Already logged in')
    }
    return next() 
}
// Show home page after user has signed in
// router.get('/:id', (req, res) => {
//     res.send('Homepage After Signin')
// })

module.exports = router