const express = require('express')
const router = express.Router()

// Show menu page
router.get('/', (req, res) => {
    res.render('menu/index.ejs')
})


module.exports = router