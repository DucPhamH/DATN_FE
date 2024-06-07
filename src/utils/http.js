import axios from 'axios'
import { toast } from 'react-hot-toast'
import HttpStatusCode from '../constants/httpStatusCode'
import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS
} from './auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from './utils'

const URL = {
  BASE_URL: 'http://localhost:4000/api',
  DEPLOY_URL: 'https://datn-be-kwjk.onrender.com/api',
  VPS_URL: 'https://cookhealthydatn.io.vn/api'
}
class Http {
  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: `${URL.BASE_URL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === '/auth/users/login') {
          // console.log(response.data)
          this.accessToken = response.data.result.access_token
          this.refreshToken = response.data.result.refresh_token
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
          // console.log(response.data.result.user)
          setProfileToLS(response.data.result.user)
        } else if (url === '/auth/users/logout') {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error) => {
        console.log(error)
        // Chỉ toast lỗi không phải 422 và 401
        if (![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status)) {
          const data = error.response?.data
          console.log(data)
          const message = data.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError(error)) {
          const config = error.response?.config || {}
          const { url } = config
          // Trường hợp Token hết hạn và request đó không phải là của request refresh token
          // thì chúng ta mới tiến hành gọi refresh token
          // console.log(url)
          if (isAxiosExpiredTokenError(error) && url !== '/auth/users/refresh-token') {
            // Hạn chế gọi 2 lần handleRefreshToken
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  // Giữ refreshTokenRequest trong 10s cho những request tiếp theo nếu có 401 thì dùng
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 5000)
                })
            return this.refreshTokenRequest.then((access_token) => {
              // Nghĩa là chúng ta tiếp tục gọi lại request cũ vừa bị lỗi
              console.log(access_token)
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: access_token }
              })
            })
          }

          // Còn những trường hợp như token không đúng
          // không truyền token,
          // token hết hạn nhưng gọi refresh token bị fail
          // thì tiến hành xóa local storage và toast message

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
          // window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  handleRefreshToken = () => {
    return this.instance
      .post('/auth/users/refresh-token', {
        refresh_token: this.refreshToken
      })
      .then((res) => {
        console.log(res.data)
        const { access_token, refresh_token } = res.data.result
        setAccessTokenToLS(access_token)
        setRefreshTokenToLS(refresh_token)
        this.accessToken = access_token
        this.refreshToken = refresh_token
        return access_token
      })
      .catch((error) => {
        clearLS()
        this.accessToken = ''
        this.refreshToken = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
