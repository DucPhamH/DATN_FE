import { io } from 'socket.io-client'
import { getAccessTokenFromLS } from './auth'
const token = getAccessTokenFromLS()
const socket = io('http://localhost:4000', {
  auth: {
    token: token
  }
})

export default socket
