import { createContext, useState } from 'react'
import { getAccessTokenFromLS, getProfileFromLS } from '../utils/auth'

const initialAppContext = {
  theme: localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light',
  setTheme: () => null,
  isAuthenticated: Boolean(getAccessTokenFromLS()),
  setIsAuthenticated: () => null,
  profile: getProfileFromLS(),
  setProfile: () => null,
  reset: () => null,
  searchQuery: {},
  setSearchQuery: () => null
}

export const AppContext = createContext(initialAppContext)

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState(initialAppContext.theme)
  const [isAuthenticated, setIsAuthenticated] = useState(initialAppContext.isAuthenticated)
  const [profile, setProfile] = useState(initialAppContext.profile)
  const [searchQuery, setSearchQuery] = useState(initialAppContext.searchQuery)

  const reset = () => {
    setIsAuthenticated(false)
    setProfile(null)
  }
  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        reset,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
