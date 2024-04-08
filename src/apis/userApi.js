import http from '../utils/http'

export const currentAccount = () => http.get('users/me')
export const followUser = (body) => http.post('users/follow', body)
export const unfollowUser = (body) => http.post('users/unfollow', body)
