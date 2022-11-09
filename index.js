const express = require('express')
const app = express()
const port = 3000

const bodyParser = require('body-parser')

app.use(express.json())
const path = require('path');

app.use(express.static('public'))

// DATABASE
let database = []


//ROUTES
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/login.html'))
})

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/menu.html'))
})
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/signup.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/home.html'))
})

//API
app.post('/signup', (req, res) => {

  try {
    console.log('PING')
    console.log(req.body);
    console.log(req.body.email);

    const user = {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      streetaddress: req.body.streetaddress,
      city: req.body.city,
      zipcode: req.body.zipcode, 
      state: req.body.zipcode,
      allergies:  {
        milk: req.body.milk,
        eggs: req.body.eggs,
        fish: req.body.fish,
        shellfish: req.body.shellfish,
        treenuts: req.body.treenuts,
        peanuts: req.body.peanuts,
        soybean: req.body.soybean,
        other: req.body.other
      }
    }
    database.push(user);
    //console.log(database);
    for (var i = 0; i < database.length; i++) { 
      console.log(database[i]); 
    }
    res.status(200).send("All good and registered")
  } catch (error) {
    console.log(error)
  }


})

app.post('/login', (req, res) => {
   for (var i = 0; i < database.length; i++) { 
    console.log(database[i]);
    if(database[i].email = req.body.email) {
      if(database[i].password = req.body.password) {
        res.json(database[i]);
      }
    }
  }
})

//SERVER
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
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









