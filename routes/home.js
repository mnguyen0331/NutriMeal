const express = require('express')
const router = express.Router()

let username



// Show initial home page
router.get('/', (req, res) => {
    if(req.isAuthenticated()) {
        console.log('HOME PAGE GET')
        username = req.user.firstnamen;
    }

    console.log(req.user);
    res.render('home', {
        username: username
    })
})

// Show home page after user has signed in
// router.get('/:id', (req, res) => {
//     res.send('Homepage After Signin')
// })

module.exports = router