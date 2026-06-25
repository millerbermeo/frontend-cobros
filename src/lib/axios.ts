import axios, { type AxiosInstance } from 'axios'
import { config } from '@/config'

const api: AxiosInstance = axios.create({
  baseURL: config.apiUrl,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

let _unauthorizedHandler: (() => void) | null = null

export const setupResponseInterceptor = (onUnauthorized: () => void): void => {
  if (_unauthorizedHandler) return
  _unauthorizedHandler = onUnauthorized

  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        _unauthorizedHandler?.()
      }
      return Promise.reject(error)
    }
  )
}

export default api
