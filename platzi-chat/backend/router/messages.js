const express = require('express')

const MessagesService = require('../services/messages')
const upload = require('../utils/upload')

const router = express.Router()
const messagesService = new MessagesService()

router.get('/', async (req, res, next) => {
  const { query: tags } = req

  try {
    const messages = await messagesService.getMessages({ tags })

    res.status(200).json({
      data: messages,
      message: 'messages listed'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', upload.single('file'), async (req, res, next) => {
  const { body: message, file } = req

  try {
    const createdMessage = await messagesService.createMessage({ message, file })

    res.status(201).json({
      data: createdMessage,
      message: 'message created'
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:messageId', async (req, res, next) => {
  const { params: { messageId } } = req
  const { body: message } = req

  try {
    const updatedMessageId = await messagesService.updateMessage({ messageId, message })

    res.status(200).json({
      data: updatedMessageId,
      message: 'message updated'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:messageId', async (req, res, next) => {
  const { messageId } = req.params

  try {
    const removedMessageId = await messagesService.removeMessage({ messageId })

    res.status(200).json({
      data: removedMessageId,
      message: 'message removed'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
