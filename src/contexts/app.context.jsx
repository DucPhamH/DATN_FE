import { createContext, useState } from 'react'

const initialAppContext = {
  theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  setTheme: () => null
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialAppContext.theme)
  return <AppContext.Provider value={{ theme, setTheme }}>{children}</AppContext.Provider>
}
