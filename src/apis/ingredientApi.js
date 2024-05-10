import http from '../utils/http'

export const getCategoryIngredients = () => http.get('/ingredients/category')
export const getIngredients = (params) => http.get('/ingredients', { params })
