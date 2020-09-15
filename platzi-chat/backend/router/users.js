const express = require('express')

const UsersService = require('../services/users')

const router = express.Router()
const usersService = new UsersService()

router.get('/', async (req, res, next) => {
  const { query: tags } = req

  try {
    const users = await usersService.getUsers({ tags })

    res.status(200).json({
      data: users,
      message: 'users listed'
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:userId', async (req, res, next) => {
  const { params: { userId } } = req

  try {
    const user = await usersService.getUser({ userId })

    res.status(200).json({
      data: user,
      message: 'user listed'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const { body: user } = req

  try {
    const createdUser = await usersService.createUser({ user })

    res.status(201).json({
      data: createdUser,
      message: 'user created'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
