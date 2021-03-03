const express = require('express')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, function () {
  console.log('server running at port 3000')
})

module.exports = app
