const messageRoutes = require('./message')

function routes (server) {
  server.use('/api/message', messageRoutes)
}

module.exports = routes
