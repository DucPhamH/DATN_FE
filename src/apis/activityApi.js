import http from '../utils/http'

export const getActivities = (params) => http.get('/activities', { params })
export const getActivitiesCategories = () => http.get('/activities/category')
