const mongoose = require('mongoose')

const { socket } = require('../lib/socket')
const config = require('../config')
const messageSchema = require('../utils/schemas/messages')

class MessagesService {
  constructor () {
    this.Model = mongoose.model('messages', messageSchema)
  }

  async getMessages ({ tags }) {
    const messages = await this.Model.find(tags).populate('user')

    return messages
  }

  async createMessage ({ message, file }) {
    message = {
      ...message,
      date: new Date()
    }

    if (file) {
      const fileUrl = `http://localhost:${config.port}/public/files/${file.filename}`

      message = {
        ...message,
        fileUrl
      }
    }

    const createdMessage = new this.Model(message)
    await createdMessage.save()

    socket.io.emit('message', createdMessage)

    return createdMessage
  }

  async updateMessage ({ messageId, message }) {
    if (!message.message) {
      throw new Error('ValidationError: Path `message` is required.')
    }

    const updatedMessage = await this.Model.findByIdAndUpdate(messageId, message)
    const updatedMEssageId = updatedMessage._id

    return updatedMEssageId
  }

  async removeMessage ({ messageId }) {
    const removedMessage = await this.Model.findByIdAndRemove(messageId)
    const removedMessageId = removedMessage._id

    return removedMessageId
  }
}

module.exports = MessagesService
