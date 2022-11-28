const express = require('express')
const router = express.Router()

// Show initial home page
router.get('/', (req, res) => {
    res.render('home')
})

module.exports = router