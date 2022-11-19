require('dotenv').config();
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
const functions = require('./functions/functions.js')
const flash = require('express-flash');

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))
//app.use(express.bodyParser());
app.use(express.json())
app.use(express.urlencoded({extended: false}));

// AUTH IMPORTS
const passport = require('passport');
const initializePassport = require('./config/passport-config.js');
const session = require('express-session'); 

// USE PASSPORT AUTH
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'))


//AUTH START UP
console.log('initializePassport(passport, functions.getUserByEmail, functions.getUserById) 1')
initializePassport(passport, functions.getUserByEmail, functions.getUserById)
console.log('initializePassport(passport, functions.getUserByEmail, functions.getUserById) 2')

//Route Imports
const homeRouter = require('./routes/home')
const signInRouter = require('./routes/signin')
const signUpRouter = require('./routes/signup')
const menuRouter = require('./routes/menu')

//API Imports
//const loginAPI = require('./api/login.js');

// Settings
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)

app.use(express.static('public'))

//ROUTES
app.use('/', homeRouter)
app.use('/signin', signInRouter)
app.use('/signup', signUpRouter)
app.use('/menu', menuRouter)

//API
//app.use('/login', loginAPI);

//Checking connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT || 3500)
})





































