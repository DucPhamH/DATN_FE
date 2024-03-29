import http from '../utils/http'

export const createPost = (body) =>
  http.post('/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getNewsFeed = (params) => http.get('/posts', { params })
