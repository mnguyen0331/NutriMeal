const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const { checkNotAuthenticated } = require('../config/auth')

// Show initial signup page
router.get('/', checkNotAuthenticated, (req, res) => {
    res.render('signup/index')
})

// Create new account
router.post('/', async (req, res) => {
    // check for duplicate email
    const inputEmail = req.body.email
    const duplicate = await User.findOne({ email: inputEmail }).exec()
    if (duplicate) {
        res.render('signup/index.ejs', {
            errorMessage: `Email ${inputEmail} already exits!.`
        })
    }
    else {
        const inputPassword = req.body.password
        const hashedPassword = await bcrypt.hash(inputPassword, 10)
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNum: req.body.phoneNum,
            streetAddress: req.body.streetAddress,
            city: req.body.city,
            zipcode: req.body.zipcode,
            state: req.body.state,
            email: inputEmail,
            password: hashedPassword,
            allergies: req.body.allergies,
            allergiesSelections: JSON.parse(req.body.allergensInput)
        })
        try {
            await user.save() // save user to DB
            res.redirect('/signin')
        } catch (error) {
            console.log(error)
            res.render('signup/index.ejs', {
                errorMessage: 'Error creating account'
            })
        }
    }
})

module.exports = router