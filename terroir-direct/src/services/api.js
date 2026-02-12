import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('td_access_token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('td_access_token')
      localStorage.removeItem('td_refresh_token')
    }
    return Promise.reject(error)
  }
)

// ==========================================
// MOCK MODE - Remove these 2 lines when backend is ready
// ==========================================
import { setupMockAPI } from '@/mock/mockApi.js'
setupMockAPI(api)

export default api
