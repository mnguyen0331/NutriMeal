const express = require('express')
const router = express.Router()

// Show initial home page
router.get('/', (req, res) => {
    res.render('home')
})

// Show home page after user has signed in
// router.get('/:id', (req, res) => {
//     res.send('Homepage After Signin')
// })

module.exports = router