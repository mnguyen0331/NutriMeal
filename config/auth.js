function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/profile')
    }
    next()
}


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/signin')
}

module.exports = {checkNotAuthenticated, checkAuthenticated}