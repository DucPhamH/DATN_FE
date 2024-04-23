import http from '../utils/http'

export const calculateBMI = (body) => http.post('/calculators/bmi', body)
export const calculateBMR = (body) => http.post('/calculators/bmr', body)
export const calculateTDEE = (body) => http.post('/calculators/tdee', body)
export const calculateBodyFat = (body) => http.post('/calculators/body-fat', body)
export const calculateLBM = (body) => http.post('/calculators/lbm', body)
export const calculateIBW = (body) => http.post('/calculators/ibw', body)
export const calculateCaloriesBurned = (body) => http.post('/calculators/calorie-burned', body)
export const calculateWaterIntake = (body) => http.post('/calculators/water-intake', body)

export const saveBMIData = (body) => http.post('/calculators/bmi/save', body)
export const saveBMRData = (body) => http.post('/calculators/bmr/save', body)
export const saveTDEEData = (body) => http.post('/calculators/tdee/save', body)
export const saveBodyFatData = (body) => http.post('/calculators/body-fat/save', body)
export const saveLBMData = (body) => http.post('/calculators/lbm/save', body)
export const saveIBWData = (body) => http.post('/calculators/ibw/save', body)
