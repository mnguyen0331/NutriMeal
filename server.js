if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

// Passport Config
require('./config/passport-config')(passport);

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))

const homeRouter = require('./routes/home')
const menuRouter = require('./routes/menu')
const userRouter = require('./routes/users')

// Settings
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))

// Passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  res.locals.error = req.flash('error')
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next();
});

//ROUTES
app.use('/', homeRouter)
app.use('/users', userRouter)
app.use('/menu', menuRouter)

//Checking connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT || 3500)
})












