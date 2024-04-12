import http from '../utils/http'

export const getCategoryBlogs = () => http.get('/blogs/category/get-category')
export const createBlog = (body) => http.post('/blogs', body)
export const getBlogsForChef = (params) => http.get('/blogs/chef/get-blogs', { params })
export const getBlogForChef = (id) => http.get(`/blogs/chef/get-blog/${id}`)
export const updateBlogForChef = (id, body) => http.put(`/blogs/chef/update-blog/${id}`, body)
