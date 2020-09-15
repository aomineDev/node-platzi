const socketIO = require('socket.io')
const socket = {}

function connect (server) {
  socket.io = socketIO(server)

  socket.io.on('connection', socket => {
    socket.emit('welcome', '[socket] Bienvenido prro!')
    console.log('[socket] user connected')

    socket.on('disconnect', () => {
      console.log('[socket] user disconnected')
    })
  })
}

module.exports = {
  connect,
  socket
}
