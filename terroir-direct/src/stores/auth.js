import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/authService'
import { ROLES } from '@/utils/constants'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isLoading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!user.value)
  const isConsumer = computed(() => user.value?.role === ROLES.CONSUMER)
  const isCooperative = computed(() => user.value?.role === ROLES.COOPERATIVE)
  const isAdmin = computed(() => user.value?.role === ROLES.ADMIN)
  const fullName = computed(() => user.value ? `${user.value.lastName} ${user.value.firstName}` : '')

  async function login(credentials) {
    isLoading.value = true
    error.value = null
    try {
      const res = await authService.login(credentials)
      const data = res.data || res
      if (data.accessToken) {
        localStorage.setItem('td_access_token', data.accessToken)
        localStorage.setItem('td_refresh_token', data.refreshToken)
      }
      user.value = data.user || data
      return data
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function register(userData) {
    isLoading.value = true
    error.value = null
    try {
      const res = await authService.register(userData)
      const data = res.data || res
      if (data.accessToken) {
        localStorage.setItem('td_access_token', data.accessToken)
        localStorage.setItem('td_refresh_token', data.refreshToken)
      }
      user.value = data.user || data
      return data
    } catch (err) {
      error.value = err.response?.data?.message || 'Đăng ký thất bại'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function fetchProfile() {
    const token = localStorage.getItem('td_access_token')
    if (!token) return
    try {
      const res = await authService.getProfile()
      user.value = res.data || res
    } catch (err) {
      logout()
    }
  }

  function logout() {
    user.value = null
    localStorage.removeItem('td_access_token')
    localStorage.removeItem('td_refresh_token')
  }

  async function initialize() {
    const token = localStorage.getItem('td_access_token')
    if (token) {
      await fetchProfile()
    }
  }

  return {
    user, isLoading, error,
    isAuthenticated, isConsumer, isCooperative, isAdmin, fullName,
    login, register, fetchProfile, logout, initialize
  }
})
