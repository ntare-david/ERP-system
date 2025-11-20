import { apiClient } from './client'

export const authApi = {
  login: (data) => apiClient.post('/auth/login', data),
  signup: (data) => apiClient.post('/auth/signup', data),
  logout: () => apiClient.post('/auth/logout'),
  forgotPassword: (email) => apiClient.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) =>
    apiClient.post('/auth/reset-password', { token, password }),
}

