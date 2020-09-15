const message = require('../components/message/network')

function routes (server) {
  server.use('/api/message', message)
}

module.exports = routes
