import './App.css'
import useRouteElement from './useRouteElement'

function App() {
  const routeElement = useRouteElement()
  return (
    <div>
      {routeElement}
      {/* <ToastContainer /> */}
    </div>
  )
}

export default App
