import http from '../utils/http'

export const createPost = (body) =>
  http.post('/posts', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
export const getNewsFeed = (params) => http.get('/posts', { params })
export const getMePosts = (params) => http.get('/posts/me/get-me-posts', { params })
export const getUserPosts = (id, params) => http.get(`/posts/user/${id}`, { params })
export const getPost = (id) => http.get(`/posts/${id}`)
export const likePost = (body) => http.post('/posts/actions/like', body)
export const unlikePost = (body) => http.post('/posts/actions/unlike', body)
export const sharePost = (body) => http.post('/posts/actions/share', body)
export const getComments = (params) => http.get(`/posts/actions/comment`, { params })
export const createComment = (body) => http.post('/posts/actions/comment', body)
export const getChildComments = (params) => http.get(`/posts/actions/child-comment`, { params })
export const deletePostForEachUser = (body) => http.post('/posts/actions/delete-post', body)
export const deleteComment = (body) => http.post('/posts/actions/delete-comment', body)
export const deleteChildComment = (body) => http.post('/posts/actions/delete-child-comment', body)
export const reportPost = (body) => http.post('/posts/actions/report', body)
