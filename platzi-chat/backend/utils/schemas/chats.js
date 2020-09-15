const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatsSchema = Schema({
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  date: Date
})

module.exports = chatsSchema
