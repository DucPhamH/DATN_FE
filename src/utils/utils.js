import axios from 'axios'
import HttpStatusCode from '../constants/httpStatusCode'

export function isAxiosError(error) {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError(error) {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError(error) {
  return isAxiosUnauthorizedError(error) && error.response?.data?.message === 'Jwt expired'
}

export function isErrorData(error) {
  return isAxiosUnprocessableEntityError(error) && error.response?.data?.message === 'Lỗi dữ liệu'
}
