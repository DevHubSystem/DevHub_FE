import axiosClient from './axiosClient'
import { API_ENDPOINTS } from './API_ENDPOINTS'

/**
 * Auth API calls. Each method resolves to the response body (the response
 * interceptor already unwraps `data`).
 */
export const authService = {
  /**
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ token: string, user: object }>}
   */
  login: (credentials) => axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials),

  /**
   * @param {{ email: string, username: string, password: string }} payload
   * @returns {Promise<{ token: string, user: object }>}
   */
  register: (payload) => axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, payload),
}
