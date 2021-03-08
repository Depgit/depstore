const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'f60e4013df4fd720a290f16ddd4f0cd1e2bf4769',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log(`you have visited  ${req.session.views}`)
  return res.render('index')
})

app.listen(3000, function () {
  console.log('server running at port 3000')
})

module.exports = app
