import http from '../utils/http'

export const registerAccount = (body) => http.post('/auth/users/register', body)
export const loginAccount = (body) => http.post('/auth/users/login', body)
export const loginAdminAccount = (body) => http.post('/auth/users/login/admin', body)
export const logoutAccount = (body) => http.post('/auth/users/logout', body)
export const sendOtp = (body) => http.post('/auth/users/send-otp', body)
export const verifyOtp = (body) => http.post('/auth/users/verify-otp', body)
export const resetPassword = (body) => http.post('/auth/users/reset-password', body)
