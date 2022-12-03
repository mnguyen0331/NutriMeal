const express = require('express')
const router = express.Router()

// Show menu page
router.get('/', (req, res) => {
    res.render('menu/index')
})

// Show recipe page
router.get('/recipe', (req, res) => {
    res.render('menu/recipe')
})


module.exports = router