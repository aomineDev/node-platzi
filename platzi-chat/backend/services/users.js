const mongoose = require('mongoose')

const userSchema = require('../utils/schemas/users')

class UsersService {
  constructor () {
    this.Model = mongoose.model('users', userSchema)
  }

  async getUsers ({ tags }) {
    const users = await this.Model.find(tags)

    return users
  }

  async getUser ({ userId }) {
    const user = await this.Model.findById(userId)

    return user
  }

  async createUser ({ user }) {
    user = {
      ...user,
      date: new Date()
    }

    const createdUser = new this.Model(user)
    await createdUser.save()

    return createdUser
  }
}

module.exports = UsersService
