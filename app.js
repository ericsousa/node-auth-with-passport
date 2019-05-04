var express                 = require('express')
var mongoose                = require('mongoose')
var passport                = require('passport')
var bodyParser              = require('body-parser')
var localStrategy           = require('passport-local')
var passportLocalMongoose   = require('passport-local-mongoose')
var expressSession          = require('express-session')

var User = require('./models/user')

var app = express()
app.set('view engine', 'ejs')
mongoose.connect("mongodb://localhost/auth_demo_app", {useNewUrlParser: true})

// setup session
app.use(expressSession({
  secret: "This is a random secret passphrase to encrypt the data",
  resave:  false,
  saveUninitialized: false
}))

// setup passport
app.use(passport.initialize())
app.use(passport.session())

// read the session encode and decode the data
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ===============================
// ROUTES
// ===============================

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/secret', function (req, res) {
  res.render('secret')
})

// Auth Routs

// sign up for
app.get('/register', function (req, res) {
  res.render('register')
})

// sign up function
app.post('/register', function (req, res) {
  res.send('signing up')
})


// ===============================

app.listen('3000', function () {
  console.log('Server started.')
})