const messagesRoutes = require('./messages')
const usersRoutes = require('./users')
const chatsRoutes = require('./chats')

function router (server) {
  server.use('/api/messages', messagesRoutes)
  server.use('/api/users', usersRoutes)
  server.use('/api/chats', chatsRoutes)
}

module.exports = router
