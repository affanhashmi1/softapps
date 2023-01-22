const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const session = require('express-session')
require('./utilities/connection')
require('dotenv').config()

const apiRouter = require('./routes/api')

const app = express()

app.use(cors())
app.use(compression())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')

  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Credentials', true)

  next()
})
app.use(logger('dev'))
app.use(bodyParser.json({ limit: '2mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '2mb', extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  secret: 'client-secret',
  resave: false,
  saveUninitialized: false
}))

app.use('/api', apiRouter)

app.use((req, res, next) => {
  next(createError(404))
})

app.use((error, req, res, next) => {
  res.sendStatus(error.status).json({
    message: error.message,
    error: error
  })
})

module.exports = app
