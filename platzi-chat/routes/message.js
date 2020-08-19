const express = require('express')

const MessageService = require('../services/message')

const router = express.Router()
const messageService = new MessageService()

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'message list'
  })
})

module.exports = router