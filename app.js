const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const dbConfig = require('./config').database
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const favicon = require('serve-favicon')
const cors = require('cors')

// Connect to DB
mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const app = express()

// view engine setup
app.engine('ejs', require('ejs-locals'))
app.set('views', path.join(__dirname, 'template'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public/system_images', 'favicon.ico')))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: 'codeworkrsecret',
    saveUninitialized: false,
    resave: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

//Enable all CORS requests
app.use(cors())

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
app.use(flash())

// Initialize Passport
const initPassport = require('./passport/init')
initPassport(passport)

const routes = require('./routes/index')(passport)
app.use('/', routes)

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   res.render('404'); // добавил сам(в костяке не было)
//   next(err);
// });

app.use(express.static(path.join(__dirname, 'configuration_module')))

app.get('/configuration_module/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'configuration_module', 'index.html'))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
