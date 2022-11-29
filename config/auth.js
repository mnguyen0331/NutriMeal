function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      req.flash('error_msg', 'Already signed in!')
      res.redirect('/')
    }
    next()
}


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('error_msg', 'Sign in to view profile')
    res.redirect('/users/signin')
}

module.exports = {checkNotAuthenticated, checkAuthenticated}