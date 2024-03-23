import http from '../utils/http'

export const registerAccount = (body) => http.post('/auth/users/register', body)
export const loginAccount = (body) => http.post('/auth/users/login', body)
export const logoutAccount = (body) => http.post('/auth/users/logout', body)
