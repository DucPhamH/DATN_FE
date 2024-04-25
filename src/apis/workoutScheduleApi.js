import http from '../utils/http'

export const createWorkoutSchedule = (data) => http.post('/workout-schedules', data)
export const getListWorkoutSchedules = (params) => http.get('/workout-schedules', { params })
export const getWorkoutSchedule = (id) => http.get(`/workout-schedules/${id}`)
