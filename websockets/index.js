const express = require('express')

const app = express()
const server = require('http').Server(app)

const io = require('socket.io')(server)

app.use('/', express.static('public'))

io.on('connection', socket => {
  console.log('Nuevo cliente conectado')
  socket.emit('message', 'Bienvenido!')
})

setInterval(() => {
  io.emit('message', 'Hola, os escribo a todos')
}, 3000)

server.listen(3000, err => {
  if (err) {
    console.log('Ah ocurrido un error en el servidor')
    console.error(err)
    return
  }

  console.log('[serv] servidor listening in http://localhost:3000')
})
