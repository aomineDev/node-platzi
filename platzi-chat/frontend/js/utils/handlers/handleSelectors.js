import store from '../../store.js'

export function selectUser (userButton) {
  const id = userButton.dataset.id

  store.user = store.users.find(user => user._id === id)
}

export function selectChat (chatButton) {
  const chatButtonActive = document.querySelector('.btn-chat.active')
  chatButtonActive.classList.remove('active')
  chatButton.classList.add('active')

  const id = chatButton.dataset.id

  store.chat = store.chats.find(chat => chat._id === id)

  store.userSelected = store.chat.users.find(user => user._id !== store.user._id)
}