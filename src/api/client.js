import axios, { AxiosError } from 'axios'

class ApiClient {
  constructor(config = {}) {
    this.client = axios.create({
      baseURL: config.baseURL || 'http://localhost:8000/api',
      timeout: config.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.token = null

    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token')
          window.location.href = '/login'
        }
        // Enhance error message for network errors
        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNREFUSED' || error.message === 'Network Error') {
          error.message = 'Unable to connect to the server. Please check your internet connection and ensure the backend server is running.'
        }
        return Promise.reject(error)
      }
    )
  }

  setToken(token) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  getToken() {
    return this.token || localStorage.getItem('auth_token')
  }

  get(url, config) {
    return this.client.get(url, config)
  }

  post(url, data, config) {
    return this.client.post(url, data, config)
  }

  put(url, data, config) {
    return this.client.put(url, data, config)
  }

  delete(url, config) {
    return this.client.delete(url, config)
  }
}

export const apiClient = new ApiClient()

