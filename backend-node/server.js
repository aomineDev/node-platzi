const express = require('express')

const app = express()

app.use('/', (req, res) => {
  res.send('Hola!')
})

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
