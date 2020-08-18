const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()
const app = express()

// Body Parser
app.use(bodyParser.json())

// Router
app.use('/api/message', router)

// Routes
router.get('/', (req, res) => {
  console.log(req.headers)
  res.header({
    'custom-header': 'Nuestro valor personalizado'
  })
  res.send('Lista de mensajes')
})

router.delete('/', (req, res) => {
  console.log(req.body)
  console.log(req.query)

  const { id } = req.body
  const { orderBy, limit } = req.query

  res.send(`Mensaje con el id ${id} ha sido removido correctamente, la query nos indica que se ordenara por el ${orderBy} y estara limitada a ${limit} items`)
})

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
