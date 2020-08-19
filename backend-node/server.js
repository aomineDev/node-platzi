const express = require('express')
const bodyParser = require('body-parser')

const messagesApi = require('./router/messages')

const app = express()

// Body Parser
app.use(bodyParser.json())

// Router
messagesApi(app)

// Statics
app.use('/app', express.static('public'))

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
