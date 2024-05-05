import http from '../utils/http'

export const getCategoryRecipes = () => http.get('/recipes/category/get-category')
export const createRecipe = (body) =>
  http.post('/recipes', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

export const getRecipesForChef = (params) => http.get('/recipes/chef/get-recipes', { params })

export const getRecipeForChef = (id) => http.get(`/recipes/chef/get-recipe/${id}`)

export const updateRecipeForChef = (id, body) =>
  http.put(`/recipes/chef/update-recipe/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
