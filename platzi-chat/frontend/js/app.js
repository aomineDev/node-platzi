import config from './config/index.js'
import store from './store.js'

import UsersService from './services/users.js'
import ChatsService from './services/chats.js'
import MessagesService from './services/messages.js'

const usersBox = document.getElementById('users')
const overlay = document.getElementById('overlay')
const username = document.getElementById('username')
const anotheruser = document.getElementById('anotheruser')
const chatBox = document.getElementById('chats')
const messagesBox = document.getElementById('messagesBox')
const messageTitle = document.getElementById('message-title')
const form = document.getElementById('form')
const message = document.getElementById('message')

const socket = io.connect(config.baseUrl)

const usersService = new UsersService()
const chatsService = new ChatsService()
const messagesService = new MessagesService()

socket.on('welcome', data => {
  console.log(data)
})

window.addEventListener('load', async () => {
  const { data: users } = await usersService.getUsers()

  store.users = users

  users.forEach(user => {
    renderUser(user)
  })

  const userButtons = document.querySelectorAll('.btn-user')

  userButtons.forEach(userButton => {
    userButton.addEventListener('click', async function () {
      chatBox.innerHTML = ''
      messagesBox.innerHTML = ''

      selectUser(userButton)

      overlay.classList.remove('active')
      usersBox.classList.remove('active')

      username.innerHTML = store.user.name

      const { data: chats } = await chatsService.getChats({ userId: store.user._id })

      store.chats = chats


      store.chat = chats[0]

      store.userSelected = store.chat.users.find(user => user._id !== store.user._id)

      const { data: messages } = await messagesService.getMessagesFilterByChat({ chatId: store.chat._id })

      store.messages = messages

      chats.forEach(chat => {
        renderChat(chat)
      })

      renderUserSelected()

      messages.forEach(message => {
        renderMessage(message)
      })

      const chatButtons = document.querySelectorAll('.btn-chat')

      chatButtons.forEach(chatButton => {
        chatButton.addEventListener('click', async function () {

          messagesBox.innerHTML = ''

          selectChat(chatButton)

          const { data: messages } = await messagesService.getMessagesFilterByChat({ chatId: store.chat._id })

          store.messages = messages

          renderUserSelected()

          messages.forEach(message => {
            renderMessage(message)
          })

        })
      }) 
    })
  })
})

function renderUser (user) {
  usersBox.innerHTML += `<button class="btn btn-user" data-id="${user._id}">${user.name}</button>`
}

function renderChat ({ users, _id }) {
  const user = users.find(user => user._id !== store.user._id)

  if (user._id === store.userSelected._id) {
    chatBox.innerHTML += `<button class="btn btn-chat active" data-id="${_id}">${user.name}</button>`
    return
  }

  chatBox.innerHTML += `<button class="btn btn-chat" data-id="${_id}">${user.name}</button>`
}

function renderUserSelected () {
  messageTitle.innerHTML = store.userSelected.name
}

function renderMessage (message) {
  if (message.user._id === store.user._id) {
    messagesBox.innerHTML += `
      <div class="messageBox">
        <span class="message itsme">${message.message}</span>
        ${renderImage(message)}
      </div>
    `

    messagesBox.scrollTop = messagesBox.scrollHeight

    return
  }

  messagesBox.innerHTML += `
  <div class="messageBox">
    <span class="message">${message.message}</span>
    ${renderImage(message)}
  </div>
  `

  messagesBox.scrollTop = messagesBox.scrollHeight
}

function renderImage ({ fileUrl }) {
  if (fileUrl) {
    return `<img src="${fileUrl}" class="message-image">`
  }

  return ''
}

function selectUser (userButton) {
  const id = userButton.dataset.id

  store.user = store.users.find(user => user._id === id)
}

function selectChat (chatButton) {
  const chatButtonActive = document.querySelector('.btn-chat.active')
  chatButtonActive.classList.remove('active')
  chatButton.classList.add('active')

  const id = chatButton.dataset.id

  store.chat = store.chats.find(chat => chat._id === id)

  store.userSelected = store.chat.users.find(user => user._id !== store.user._id)
}

anotheruser.addEventListener('click', () => {
  overlay.classList.add('active')
  users.classList.add('active')
})

form.addEventListener('submit', async e => {
  e.preventDefault()

  const data = {
    chat: store.chat._id,
    user: store.user._id,
    message: message.value
  }
  message.value = ''

  messagesService.createMessage({ message: data })
})

socket.on('message', data => {
  console.log('[socket] message recived')

  data.user = {
    _id: data.user
  }

  store.messages.push(data)

  messagesBox.innerHTML = ''

  store.messages.forEach(message => {
    renderMessage(message)
  })
})