const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const chrome = require('./chrome')

const index = require('./routes/index')
const action = require('./routes/action')
const about = require('./routes/about')

const shortid = require('shortid')
let schedule = [
  { id: shortid.generate(), description: 'Node', url: 'http://www.nodejs.org', time: 2 },
  { id: shortid.generate(), description: 'Google', url: 'http://www.google.com', time: 5 }
]

chrome.setSchedule(schedule)

chrome.connect({ retry: true })

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.set('sites', schedule)
app.set('chrome', chrome)
app.set('shortid',shortid)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', index)
app.use('/about', about)
app.use('/action', action)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
