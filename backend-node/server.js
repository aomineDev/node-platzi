const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes')

const app = express()

// Body Parser
app.use(bodyParser.json())

// Router
router(app)

// Statics
app.use('/app', express.static('public'))

app.listen(3000, () => {
  console.log('La aplicación esta escuchando en http://localhst:3000')
})
