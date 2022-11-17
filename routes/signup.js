const express = require('express')
const router = express.Router()
const User = require('../models/User')

// Show initial signup page
router.get('/', (req, res) => {
    res.render('signup/index.ejs')
})

// Create new account
router.post('/', async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNum: req.body.phoneNum,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        zipcode: req.body.zipcode,
        state: req.body.state,
        email: req.body.email,
        password: req.body.password,
        allergies: req.body.allergies,
        allergiesSelections: JSON.parse(req.body.allergensInput)
    })
    try {
        const newUser = await user.save() // save user to DB
        res.redirect('/signin')
    } catch (error) {
        console.log(error)
        res.send('Error creating account')
    }
})

module.exports = router