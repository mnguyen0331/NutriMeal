require('dotenv').config();
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')

// Connect to MongoDB
connectDB();

app.use(bodyParser.urlencoded({limit: '10mb', extended:false}))

const homeRouter = require('./routes/home')
const signInRouter = require('./routes/signin')
const signUpRouter = require('./routes/signup')
const menuRouter = require('./routes/menu')

// Settings
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))

//ROUTES
app.use('/', homeRouter)
app.use('/signin', signInRouter)
app.use('/signup', signUpRouter)
app.use('/menu', menuRouter)


//Checking connection
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
  app.listen(process.env.PORT || 3500)
})



//FUNCTIONS





// AUTH IMPORTS
 /*
const passport = require('passport');
const initializePassport = require('./passport-config');
const session = require('express-session'); 
*/
/*
const Login_user_passport_post = passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/fail',
    failureFlash: true 
})
function checkAuthenticated(req, res, next) {
    console.log('checkAuthenticated ran')
    if(req.isAuthenticated()) {
        return res.send('Already logged in')
    }
    return next() 
}
*/

//AUTH 
/*
initializePassport(passport, 
  // email => users.find(user => user.email === email),
  async email  => { 
      const queryEmail = await User_Model.findOne({Email: email})
      
      if(queryEmail == null) {
          const queryUsername = await User_Model.findOne({UserName: email})
          return queryUsername;
      }
      return queryEmail;
  },
  // id => users.find(user => user.id === id)
  async id => { 
      const query = await User_Model.find({_id: id})
      return query[0].UserName;
  }
);

// USE PASSPORT AUTH
/*
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOveride('_method'))
*/









