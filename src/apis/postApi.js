import http from '../utils/http'

export const createPost = (body) =>
  http.post('/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getNewsFeed = (params) => http.get('/posts', { params })
export const likePost = (body) => http.post('/posts/actions/like', body)
export const unlikePost = (body) => http.post('/posts/actions/unlike', body)
export const sharePost = (body) => http.post('/posts/actions/share', body)
