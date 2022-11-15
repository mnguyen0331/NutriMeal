const express = require('express')
const router = express.Router()

// Show initial signin page
router.get('/', (req, res) => {
    res.render('signin/index.ejs')
})

// Handle user sign in
router.post('/signin', (req, res) => {
    res.send('SignIn success!')
})

module.exports = router