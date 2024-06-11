import http from '../utils/http'

export const getCategoryBlogs = () => http.get('/blogs/category/get-category')
export const createBlog = (body) => http.post('/blogs', body)
export const getBlogsForChef = (params) => http.get('/blogs/chef/get-blogs', { params })
export const getBlogsForUser = (params) => http.get('/blogs/user/get-blogs', { params })
export const getBlogForChef = (id) => http.get(`/blogs/chef/get-blog/${id}`)
export const getBlogForUser = (id) => http.get(`/blogs/user/get-blog/${id}`)
export const updateBlogForChef = (id, body) => http.put(`/blogs/chef/update-blog/${id}`, body)
export const deleteBlogForChef = (id) => http.delete(`/blogs/chef/delete-blog/${id}`)
export const createCommentBlog = (body) => http.post('/blogs/actions/comment', body)
export const getCommentBlog = (params) => http.get('/blogs/actions/comment', { params })
export const deleteCommentBlog = (body) => http.post('/blogs/actions/delete-comment', body)
export const getMeBlog = (params) => http.get('/blogs/me/get-list-blog', { params })
export const getUserBlog = (id, params) => http.get(`/blogs/user/get-list-blog/${id}`, { params })
export const randomBlogLanding = () => http.get('/blogs/random-blog')

// blogsRouter.get('/me/get-list-blog', accessTokenValidator, wrapRequestHandler(getListMeBlogController))

// blogsRouter.get('/user/get-list-blog/:id', accessTokenValidator, wrapRequestHandler(getListUserBlogController))
