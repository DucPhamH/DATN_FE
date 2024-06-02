import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getAccessTokenFromLS } from '../utils/auth'
import { AppContext } from './app.context'
import toast from 'react-hot-toast'
import ToastCustorm from '../components/GlobalComponents/ToastCustorm'

const initialSocketContext = {
  newSocket: null,
  setNewSocket: () => null
}
export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext)
  const [newSocket, setNewSocket] = useState(initialSocketContext.newSocket)

  useEffect(() => {
    console.log('isAuthenticated', isAuthenticated)
    const token = getAccessTokenFromLS()
    if (isAuthenticated && token) {
      const socket = io('http://localhost:4000', {
        transports: ['websocket'],
        auth: {
          token: token
        }
      })
      setNewSocket(socket)
      socket.on('toast like', (data) => {
        console.log('toast like', data)
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('connect_error', (err) => {
        console.log(err.message) // prints the message associated with the error
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [isAuthenticated, setNewSocket])

  return (
    <SocketContext.Provider
      value={{
        newSocket,
        setNewSocket
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
