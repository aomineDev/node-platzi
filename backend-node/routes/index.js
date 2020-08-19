const messageRoutes = require('./messages')

function routes (server) {
  server.use('/api/message', messageRoutes)
}

module.exports = routes
