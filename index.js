const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')
// all data base required things are present here
require('./utils/db.config')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// setting ejs engine for front end
app.set('view engine', 'ejs')

// to check all authorisation we did this and remember for rest of the time
app.use('/', authRoutes)

// index fle of front end rendering
app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, function () {
  console.log('server running at port 3000')
})

module.exports = app
