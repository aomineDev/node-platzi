const express = require('express')

const app = express()
const router = express.Router()

// Body Parser
app.use(express.json())
app.use(router)

router.get('/say-hello', (req, res) => {
  res.status(200).json({
    message: 'Hola amikuo'
  })
})

app.listen(3000, () => {
  console.log('listening in http://localhost:3000')
})