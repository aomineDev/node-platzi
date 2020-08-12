const express = require('express')
const router = express.Router()

const app = express()

app.use('/api/message', router)

router.get('/', (req, res) => {
  res.send('Lista de mensajes')
})

router.post('/', (req, res) => {
  res.send('Mensaje añadido')
})

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
