const express = require('express')
const router = express.Router()

// Show menu page
router.get('/', (req, res) => {
    res.render('menu/index')
})

router.get('/:id', (req, res) => {
    res.render('menu/meal', {id: req.params.id})
})

module.exports = router