const express = require('express')
const response = require('../../network/response')

const controller = require('./controller')

const router = express.Router()

router.get('/', (req, res) => {
  console.log(req.headers)

  res.header({
    'custom-header': 'Nuestro valor personalizado'
  })

  controller.getMessages()
    .then(data => {
      response.success({
        req,
        res,
        message: 'message list',
        data
      })
    })
    .catch(error => {
      response.error({
        req,
        res,
        message: 'Unexpected Error',
        details: error
      })
    })
})

router.post('/', (req, res) => {
  const { error } = req.query

  if (error === 'true') {
    response.error({
      req,
      res,
      message: 'Error simulated',
      status: 400,
      details: 'is just a simulated of error'
    })
    return
  }

  const { user, message } = req.body

  controller.addMessage({ user, message })
    .then(data => {
      response.success({
        req,
        res,
        message: 'successfully creadted',
        data,
        status: 201
      })
    })
    .catch(({ message }) => {
      response.error({
        req, 
        res,
        message,
        status: 400,
        details: 'No hay usuario o mensaje'
      })
    })
})

router.delete('/', (req, res) => {
  console.log(req.body)
  console.log(req.query)

  const { id } = req.body
  const { orderBy, limit } = req.query

  res.send(`Mensaje con el id ${id} ha sido removido correctamente, la query nos indica que se ordenara porel ${orderBy} y estara limitada a ${limit} items`)
})

module.exports = router