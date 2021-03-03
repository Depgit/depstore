const express = require('express')

const app = express()

app.get('/', (req, res) => {
  return res.send('Hello world ')
})

app.listen(3000, function () {
  console.log('server running at port 3000')
})
