import http from '../utils/http'

export const currentAccount = () => http.get('/users/me')
export const followUser = (body) => http.post('/users/follow', body)
export const unfollowUser = (body) => http.post('/users/unfollow', body)
export const getProfile = (id) => http.get(`/users/get-user/${id}`)

export const updateAvatar = (body) =>
  http.put('/users/update-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const updateCoverAvatar = (body) =>
  http.put('/users/update-cover-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const updateProfile = (body) => http.put('/users/update-profile', body)

export const changePassword = (body) => http.put('/users/update-password', body)

export const recommendUser = () => http.get('/users/recommed')

export const bookmarkUser = () => http.get('/users/bookmarks')

export const updateRequest = (body) => http.put('/users/update-to-chef', body)
