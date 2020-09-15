const express = require('express')

const ChatsService = require('../services/chats')

const router = express.Router()
const chatsService = new ChatsService()

router.get('/:userId', async (req, res, next) => {
  try {
    const { params: { userId } } = req

    const chats = await chatsService.getChat({ userId })

    res.status(200).json({
      data: chats,
      message: 'chats listed'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { body: chat } = req

    const createdChat = await chatsService.createChat({ chat })

    res.status(201).json({
      data: createdChat,
      message: 'chat created'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
