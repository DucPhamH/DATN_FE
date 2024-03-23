import http from '../utils/http'

export const currentAccount = () => http.get('users/me')
