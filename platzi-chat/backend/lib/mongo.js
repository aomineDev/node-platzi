const mongoose = require('mongoose')
const config = require('../config')

function mongoConnection () {
  const USER = encodeURIComponent(config.dbUser)
  const PASSWORD = encodeURIComponent(config.dbPassword)
  const DB_NAME = encodeURIComponent(config.dbName)

  const mongoUri = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }

  mongoose.connect(mongoUri, options)
    .then(() => {
      console.log('[mongo] Connected succesfully')
    })
    .catch(err => {
      console.error('[mongo] ' + err.message)
    })
}

module.exports = mongoConnection
