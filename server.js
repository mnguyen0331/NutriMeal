require('dotenv').config();
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
const signInRouter = require('./routes/signin')
const signUpRouter = require('./routes/signup')
const menuRouter = require('./routes/menu')
const profileRouter = require('./routes/profile')

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

//ROUTES
app.use('/', homeRouter)
app.use('/signin', signInRouter)
app.use('/signup', signUpRouter)
app.use('/menu', menuRouter)
app.use('/profile', profileRouter)


//Checking connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT || 3500)
})












