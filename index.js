/* eslint-disable no-unused-vars */
require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('morgan')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const MongoStore = require('connect-mongo').default
const mongoDbConnection = require('./utils/db.config')
const config = require('./utils/config')
const passport = require('passport')
// to let passport know we have a strategy(means login in with facebook google or local i.e user or passsword)
require('./utils/authStrategies/localStrategy')
const authMiddleware = require('./middlewares/authMiddleware')

const authRoutes = require('./routes/authRoutes')

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
app.use(logger('dev'))

app.use(express.static('public'))
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'f60e4013df4fd720a290f16ddd4f0cd1e2bf4769',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: MongoStore.create({
    mongoUrl: config.mongoUrl
  })
}))

// initialize passport for front end
app.use(passport.initialize())
app.use(passport.session())

app.locals.message = {}
app.locals.errors = {}
app.locals.formData = {}
// { message: {}, errors: {}, formData: {} }

app.use('/', authRoutes)

app.get('/', authMiddleware, (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`${req.user}`)
  return res.render('index')
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(config.port, function () {
  console.log('server running at port ', config.port)
})

module.exports = app
