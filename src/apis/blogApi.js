import http from '../utils/http'

export const getCategoryBlogs = () => http.get('/blogs/category/get-category')
export const createBlog = (body) => http.post('/blogs', body)
