const express = require('express')
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')
require('./utils/db.config')

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, function () {
  console.log('server running at port 3000')
})

module.exports = app
