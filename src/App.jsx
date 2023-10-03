import './App.css'
import useRouteElement from './useRouteElement'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { injectStyle } from 'react-toastify/dist/inject-style'
import { contextClass } from './services/objectUi'

if (typeof window !== 'undefined') {
  injectStyle()
}

function App() {
  const routeElement = useRouteElement()
  // toast.warning('Hey 👋, see how easy!')
  return (
    <div>
      {routeElement}
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || 'default'] +
          ' relative flex p-3 border font-gray-300 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer'
        }
        bodyClassName={() => 'text-sm text-black font-white font-med flex p-3'}
        position='bottom-right'
        autoClose={2000}
      />
    </div>
  )
}

export default App
