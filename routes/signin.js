const express = require('express')
const router = express.Router()
const passport = require('passport')

function checkAuthenticated(req, res, next) {
    console.log('checkAuthenticated ran')
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()) {
        console.log("Already logged in????")
        return res.send('Already logged in')
    }
    console.log("Already logged out???")
    return next() 
}

const pastport_post =  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/fail', 
    failureFlash: true 
})

// Show initial signin page
router.get('/', checkAuthenticated, (req, res) => {
    res.render('signin/index.ejs')
})
// Handle user sign in
router.post('/', checkAuthenticated, pastport_post)


module.exports = router