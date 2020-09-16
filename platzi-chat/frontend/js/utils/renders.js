import store from '../store.js'

import {
  usersBox,
  username,
  chatBox,
  messagesBox,
  messageTitle
} from './htmlElements.js'

export function renderUser (user) {
  usersBox.innerHTML += `<button class="btn btn-user" data-id="${user._id}">${user.name}</button>`
}

export function renderUsername () {
  username.innerHTML = store.user.name
}

export function renderChat ({ users, _id }) {
  const user = users.find(user => user._id !== store.user._id)

  if (user._id === store.userSelected._id) {
    chatBox.innerHTML += `<button class="btn btn-chat active" data-id="${_id}">${user.name}</button>`
    return
  }

  chatBox.innerHTML += `<button class="btn btn-chat" data-id="${_id}">${user.name}</button>`
}

export function renderUserSelected () {
  messageTitle.innerHTML = store.userSelected.name
}

export function renderMessage (message) {
  if (message.user._id === store.user._id) {
    messagesBox.innerHTML += `
      <div class="messageBox itsme">
        <span class="message">${message.message}</span>
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

export function renderUsers () {
  store.users.forEach(user => {
    renderUser(user)
  })
}

export function renderChats () {
  store.chats.forEach(chat => {
    renderChat(chat)
  })
}

export function renderMessages () {
  store.messages.forEach(message => {
    renderMessage(message)
  })

  const images = document.querySelectorAll('.message-image')

  images.forEach(image => {
    image.addEventListener('load', () => {
      messagesBox.scrollTop = messagesBox.scrollHeight
    })
  })
}