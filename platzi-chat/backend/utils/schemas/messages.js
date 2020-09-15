const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messageSchema = Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chats',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  fileUrl: String,
  date: Date
})

module.exports = messageSchema
