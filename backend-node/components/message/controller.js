const store = require('./store')

function getMessages () {
  return new Promise ((resolve, reject) => {
    resolve(store.getMessages())
  })
}

function addMessage ({ user, message }) {
  return new Promise((resolve, reject) => {
    if (!user || !message) {
      reject(new Error('Los datos son incorrectos'))
      return
    }

    const fullMessage = {
      user: user,
      message: message,
      data: new Date()
    }

    store.addMessage(fullMessage)

    resolve(fullMessage)
  })
}

module.exports = {
  addMessage,
  getMessages
}