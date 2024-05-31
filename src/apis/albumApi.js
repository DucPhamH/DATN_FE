import http from '../utils/http'

export const getListAlbumForChef = (params) => http.get('/albums/chef/get-albums', { params })
export const getListAlbumForUser = (params) => http.get('/albums/user/get-albums', { params })
export const getAlbumForChef = (id) => http.get(`/albums/chef/get-album/${id}`)
export const getAlbumForUser = (id) => http.get(`/albums/user/get-album/${id}`)
export const createAlbum = (body) => http.post('/albums', body)
export const deleteRecipeInAlbumForChef = (body) => http.post('/albums/chef/delete-recipe-in-album', body)
export const updateAlbumForChef = (id, body) => http.put(`/albums/chef/update-album/${id}`, body)
export const getRecipesInAlbum = (params) => http.get('/albums/user/get-recipes-in-album', { params })
export const bookmarkAlbum = (body) => http.post('/albums/actions/bookmark', body)
export const unbookmarkAlbum = (body) => http.post('/albums/actions/unbookmark', body)
export const deleteAlbumForChef = (id) => http.delete(`/albums/chef/delete-album/${id}`)

export const getMeAlbum = (params) => http.get('/albums/me/get-list-album', { params })
export const getUserAlbum = (id, params) => http.get(`/albums/user/get-list-album/${id}`, { params })
