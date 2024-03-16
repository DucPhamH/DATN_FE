import axios from 'axios'
const URL = {
  BASE_URL: 'http://localhost:4000/api',
  DEPLOY_URL: ''
}
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: `${URL.BASE_URL}`,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const http = new Http().instance

export default http
