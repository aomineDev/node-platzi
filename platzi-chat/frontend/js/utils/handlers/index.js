import store from '../../store.js'

import UsersService from '../../services/users.js'
import ChatsService from '../../services/chats.js'
import MessagesService from '../../services/messages.js'

import {
  usersBox,
  overlay,
  chatBox,
  messagesBox,
  message,
  fileInput
} from '../htmlElements.js'

import {
  renderUsers,
  renderUsername,
  renderChats,
  renderUserSelected,
  renderMessages
} from '../renders.js'

import {
  selectUser,
  selectChat
} from './handleSelectors.js'

const usersService = new UsersService()
const chatsService = new ChatsService()
const messagesService = new MessagesService()

export async function handleUsers () {
  const { data: users } = await usersService.getUsers()

  store.users = users

  renderUsers()
}

export async function handleChats () {
  const { data: chats } = await chatsService.getChats({ userId: store.user._id })

  store.chats = chats

  store.chat = chats[0]

  store.userSelected = store.chat.users.find(user => user._id !== store.user._id)
}

export async function handleMessages () {
  const { data: messages } = await messagesService.getMessagesFilterByChat({ chatId: store.chat._id })

  store.messages = messages
}

export async function handleCreateMessage () {
  if (message.value === '') return

  const data = {
    chat: store.chat._id,
    user: store.user._id,
    message: message.value
  }
  message.value = ''

  const error = await messagesService.createMessage({ message: data })

  if (error.kind) {
    console.error('[error] name: ' + error.name)
    console.error('[error] type: ' + error.kind)
    console.error('[error] message: ' + error.message)
  }
}

export function handleCreateMessageWithImage () {
  if (message.value === '') return

  const formData = new FormData()

  formData.append('chat', store.chat._id)
  formData.append('user', store.user._id)
  formData.append('message', message.value)
  formData.append('file', fileInput.files[0])

  message.value = ''
  fileInput.value = ''
  fileInput.classList.remove('active')

  messagesService.createdMessageWithFile({ message: formData })
}

export function handleUserModal () {
  overlay.classList.toggle('active')
  usersBox.classList.toggle('active')
}

export function handleNewUser (userButton) {
  chatBox.innerHTML = ''
  messagesBox.innerHTML = ''

  handleUserModal()

  selectUser(userButton)

  renderUsername()
}

export function handleNewChat (chatButton) {
  messagesBox.innerHTML = ''

  selectChat(chatButton)

  renderUserSelected()
}

export function handleNewMessage (data) {
  if (data.chat !== store.chat._id) return

  data.user = {
    _id: data.user
  }

  store.messages.push(data)

  messagesBox.innerHTML = ''

  renderMessages()
}

export function handleRenders () {
  renderChats()

  renderUserSelected()

  renderMessages()
}