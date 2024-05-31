import http from '../utils/http'

export const getCategoryRecipes = () => http.get('/recipes/category/get-category')
export const createRecipe = (body) =>
  http.post('/recipes', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getRecipesForChef = (params) => http.get('/recipes/chef/get-recipes', { params })
export const getListRecipesForUser = (params) => http.get('/recipes/user/get-recipes', { params })

export const getRecipeForChef = (id) => http.get(`/recipes/chef/get-recipe/${id}`)

export const getRecipeForUser = (id) => http.get(`/recipes/user/get-recipe/${id}`)

export const updateRecipeForChef = (id, body) =>
  http.put(`/recipes/chef/update-recipe/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const likeRecipe = (body) => http.post('/recipes/actions/like', body)
export const unlikeRecipe = (body) => http.post('/recipes/actions/unlike', body)

export const commentRecipe = (body) => http.post('/recipes/actions/comment', body)
export const deleteComment = (body) => http.post('/recipes/actions/delete-comment', body)
export const getComments = (params) => http.get('/recipes/actions/comment', { params })

export const bookmarkRecipe = (body) => http.post('/recipes/actions/bookmark', body)
export const unbookmarkRecipe = (body) => http.post('/recipes/actions/unbookmark', body)

export const deleteRecipeForChef = (id) => http.delete(`/recipes/chef/delete-recipe/${id}`)

export const getTopRecipes = () => http.get('/recipes/user/get-top-recipes')

export const getMeRecipe = (params) => http.get('/recipes/me/get-list-recipe', { params })
export const getUserRecipe = (id, params) => http.get(`/recipes/user/get-list-recipe/${id}`, { params })
