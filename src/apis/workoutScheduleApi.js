import http from '../utils/http'

export const createWorkoutSchedule = (data) => http.post('/workout-schedules', data)
export const updateWorkoutSchedule = (id, data) => http.put(`/workout-schedules/${id}`, data)
export const deleteWorkoutSchedule = (id) => http.delete(`/workout-schedules/${id}`)
export const getListWorkoutSchedules = (params) => http.get('/workout-schedules', { params })
export const getWorkoutSchedule = (id) => http.get(`/workout-schedules/${id}`)
export const createWorkoutItem = (data) => http.post('/workout-schedules/workout-items/create', data)
export const getDateWorkoutItem = (params) => http.get('/workout-schedules/workout-items/get', { params })
export const completeDateWorkoutItem = (data) => http.post('/workout-schedules/workout-items/complete', data)
export const deleteDateWorkoutItem = (data) => http.post('/workout-schedules/workout-items/delete', data)
export const syncWeight = (data) => http.post('/workout-schedules/sync-weight', data)
