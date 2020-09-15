const express = require('express')
const cors = require('cors')

const config = require('./config')
const router = require('./router')
const mongoConnection = require('./lib/mongo')
const socket = require('./lib/socket')
const { logErrors, errorHandler } = require('./utils/middleware/errorHandler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

const app = express()
const server = require('http').createServer(app)

// Connection to Mongo Atlas
mongoConnection()

// Connect to socket
socket.connect(server)

// Body Parser
app.use(express.json())

// Cors
app.use(cors())

// Routes
router(app)

// Statics
app.use('/public', express.static('public'))

// Catch 404
app.use(notFoundHandler)

// Error handler
app.use(logErrors)
app.use(errorHandler)

server.listen(config.port, () => {
  console.log('[env] mode ' + (config.dev ? 'development' : 'production'))
  console.log(`[serv] listening in http://localhost:${config.port}`)
})
