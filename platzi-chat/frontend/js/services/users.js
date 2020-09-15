import service from './service.js'

class UsersService {
  constructor () {
    this.service = 'users'
  }

  async getUsers () {
    const response = await service.getAll({ service: this.service })
    const users = await response.json()

    return users
  }
}

export default UsersService
