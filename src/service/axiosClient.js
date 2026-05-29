import axios from 'axios'

import { clearToken, getToken } from './tokenStorage'

/**
 * Shared Axios instance. Base URL comes from VITE_API_BASE_URL; the request
 * interceptor attaches the JWT, and the response interceptor unwraps `data`
 * and clears the token on 401.
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000/api',
  headers: { 'Content-Type': 'application/json' },
})

axiosClient.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      clearToken()
    }
    return Promise.reject(error)
  },
)

export default axiosClient
