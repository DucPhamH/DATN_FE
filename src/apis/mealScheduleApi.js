import http from '../utils/http'

export const createMealSchedule = (data) => http.post('/meal-schedules', data)
export const getListMealSchedules = (params) => http.get('/meal-schedules', { params })
export const deleteMealSchedule = (id) => http.delete(`/meal-schedules/${id}`)
export const updateMealSchedule = (id, data) => http.put(`/meal-schedules/${id}`, data)
export const getMealSchedules = (id) => http.get(`/meal-schedules/${id}`)
export const createMealItem = (data) => http.post('/meal-schedules/meal-items/create', data)
export const getDateMealItem = (params) => http.get('/meal-schedules/meal-items/get', { params })
export const getMealItem = (params) => http.get('/meal-schedules/meal-items/get-item', { params })
export const completeDateMealItem = (data) => http.post('/meal-schedules/meal-items/complete', data)
export const deleteDateMealItem = (data) => http.post('/meal-schedules/meal-items/delete', data)
