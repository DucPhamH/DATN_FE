import http from '../utils/http'

export const getListAlbumForChef = (params) => http.get('/albums/chef/get-albums', { params })
export const getAlbumForChef = (id) => http.get(`/albums/chef/get-album/${id}`)
export const createAlbum = (body) => http.post('/albums', body)
