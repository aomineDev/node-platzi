const mongoose = require('mongoose')

const chatsSchema = require('../utils/schemas/chats')

class ChatsService {
  constructor () {
    this.Model = mongoose.model('chats', chatsSchema)
  }

  async getChat ({ userId }) {
    const chats = await this.Model.find({ users: userId }).populate('users')

    return chats
  }

  async createChat ({ chat }) {
    chat = {
      ...chat,
      date: new Date()
    }

    const createdChat = new this.Model(chat)
    await createdChat.save()

    return createdChat
  }
}

module.exports = ChatsService
