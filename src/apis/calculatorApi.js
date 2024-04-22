import http from '../utils/http'

export const calculateBMI = (body) => http.post('/calculators/bmi', body)
export const calculateBMR = (body) => http.post('/calculators/bmr', body)
export const calculateTDEE = (body) => http.post('/calculators/tdee', body)
export const calculateBodyFat = (body) => http.post('/calculators/body-fat', body)
export const calculateLBM = (body) => http.post('/calculators/lbm', body)
export const calculateIBW = (body) => http.post('/calculators/ibw', body)
export const calculateCaloriesBurned = (body) => http.post('/calculators/calorie-burned', body)
export const calculateWaterIntake = (body) => http.post('/calculators/water-intake', body)
