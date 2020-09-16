import config from './config/index.js'

import { form, anotheruser, fileInput } from './utils/htmlElements.js'

import { handleUserButtons } from './utils/handlers/handleEvents.js'
import {
  handleUsers,
  handleUserModal,
  handleCreateMessage,
  handleCreateMessageWithImage,
  handleNewMessage
} from './utils/handlers/index.js'

const socket = io.connect(config.baseUrl)

// EVENTS
// On window load
window.addEventListener('load', async () => {
  
  await handleUsers()

  handleUserButtons()
})

// on click in another user button
anotheruser.addEventListener('click', () => {
  handleUserModal()
})

// On submit in form
form.addEventListener('submit', e => {
  e.preventDefault()

  if (fileInput.files.length) {
    handleCreateMessageWithImage()
    return
  }
  
  handleCreateMessage()
})

// On file 
fileInput.addEventListener('change', () => {
  fileInput.classList.add('active')
})

// SOCKETS
socket.on('welcome', data => {
  console.log(data)
})

socket.on('message', data => {
  console.log('[socket] message recived')

  handleNewMessage(data)
})
