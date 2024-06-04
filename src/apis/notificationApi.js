import http from '../utils/http'

export const getListNotifications = (params) => http.get('/notifications', { params })

export const readNotification = (id) => http.put(`/notifications/read/${id}`)

export const deleteNotification = (id) => http.delete(`/notifications/delete/${id}`)

export const checkReadNotification = () => http.get('/notifications/check-read')
