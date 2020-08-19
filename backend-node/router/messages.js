const express = require('express')
const response = require('../network/response')

function messagesApi (app) {
  const router = express.Router()

  app.use('/api/message', router)

  router.get('/', (req, res) => {
    console.log(req.headers)
    res.header({
      'custom-header': 'Nuestro valor personalizado'
    })
  
    response.success(req, res, 'message list')
  })
  
  router.post('/', (req, res) => {
    const { error } = req.query
  
    if (error === 'true') {
      response.error(req, res, 'Error simulated', 400, 'is just a simulated of error')
      return
    }
    
    response.success(req, res, 'successfully creadted', 201)
  })

  router.delete('/', (req, res) => {
    console.log(req.body)
    console.log(req.query)
  
    const { id } = req.body
    const { orderBy, limit } = req.query
  
    res.send(`Mensaje con el id ${id} ha sido removido correctamente, la query nos indica que se ordenara por el ${orderBy} y estara limitada a ${limit} items`)
  })
}

module.exports = messagesApi