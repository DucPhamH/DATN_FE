import { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getAccessTokenFromLS } from '../utils/auth'
import { AppContext } from './app.context'
import toast from 'react-hot-toast'
import ToastCustorm from '../components/GlobalComponents/ToastCustorm'
import useSound from 'use-sound'
import notifi from '../assets/sounds/notifi.mp3'

const initialSocketContext = {
  newSocket: null,
  setNewSocket: () => null,
  notification: false,
  setNotification: () => null
}
export const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext)
  const [play] = useSound(notifi)
  const [newSocket, setNewSocket] = useState(initialSocketContext.newSocket)
  const [notification, setNotification] = useState(initialSocketContext.notification)

  useEffect(() => {
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
        setNotification(true)
        play()
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('toast share', (data) => {
        console.log('toast share', data)
        setNotification(true)
        play()
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('toast comment', (data) => {
        console.log('toast comment', data)
        setNotification(true)
        play()
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('toast comment child', (data) => {
        console.log('toast comment child', data)
        setNotification(true)
        play()
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('toast follow', (data) => {
        console.log('toast follow', data)
        setNotification(true)
        play()
        toast.custom((t) => <ToastCustorm t={t} name={data.name} content={data.content} avatar={data.avatar} />)
      })

      socket.on('connect_error', (err) => {
        console.log(err.message) // prints the message associated with the error
      })
      return () => {
        socket.disconnect()
      }
    }
  }, [isAuthenticated, setNewSocket, play])

  return (
    <SocketContext.Provider
      value={{
        newSocket,
        setNewSocket,
        notification,
        setNotification
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}
