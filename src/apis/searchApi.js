import http from '../utils/http'

export const searchAll = (params) => http.get('/search', { params })
