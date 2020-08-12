const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
const app = express()

// Body Parser
app.use(bodyParser.json())

// Router
app.use('/api/message', router)

router.get('/', (req, res) => {
  res.send('Lista de mensajes')
})

router.delete('/', (req, res) => {
  console.log(req.body)
  console.log(req.query)

  const { id } = req.body

  res.send(`Mensaje con el id ${id} ha sido removido correctamente`)
})

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
