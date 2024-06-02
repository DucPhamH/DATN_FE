import './App.css'
import useRouteElement from './useRouteElement'
import 'react-toastify/dist/ReactToastify.css'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { Toaster } from 'react-hot-toast'
import { useContext, useEffect } from 'react'
import { LocalStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'

if (typeof window !== 'undefined') {
  injectStyle()
}

function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)

  // console.log(isAuthenticated)

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div>
      {routeElement}
      <Toaster
        position='top-center'
        toastOptions={{
          className:
            'relative flex p-3 font-gray-300 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer',
          duration: 2000,
          style: {
            background: '#333',
            color: '#fff'
          }
        }}
      />
    </div>
  )
}

export default App

// {
//   /* <ToastContainer
//         toastClassName={({ type }) =>
//           contextClass[type || 'default'] +
//           ' relative flex p-3 border font-gray-300 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
//         }
//         bodyClassName={() => 'text-sm text-black font-white font-med flex p-3'}
//         position='bottom-right'
//         autoClose={2000}
//       /> */
// }

// useEffect(() => {
//   console.log('isAuthenticated', isAuthenticated)
//   if (isAuthenticated) {
//     const socket = io('http://localhost:4000', {
//       auth: {
//         token: getAccessTokenFromLS()
//       }
//     })
//     setNewSocket(socket)
//     socket.on('toast like', (data) => {
//       console.log('toast like', data)
//       toast.success(data.content)
//     })
//     return () => {
//       socket.disconnect()
//     }
//   }
// }, [setNewSocket, isAuthenticated])
