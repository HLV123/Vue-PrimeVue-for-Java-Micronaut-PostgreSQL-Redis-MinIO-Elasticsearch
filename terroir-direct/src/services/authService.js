import api from './api'

export const authService = {
  login(credentials) {
    return api.post('/auth/login', credentials)
  },

  register(userData) {
    return api.post('/auth/register', userData)
  },

  registerCooperative(coopData) {
    return api.post('/auth/register/cooperative', coopData)
  },

  refreshToken(refreshToken) {
    return api.post('/auth/refresh', { refreshToken })
  },

  forgotPassword(email) {
    return api.post('/auth/forgot-password', { email })
  },

  resetPassword(token, newPassword) {
    return api.post('/auth/reset-password', { token, newPassword })
  },

  getProfile() {
    return api.get('/auth/profile')
  },

  updateProfile(data) {
    return api.put('/auth/profile', data)
  },

  changePassword(data) {
    return api.put('/auth/change-password', data)
  },

  uploadAvatar(formData) {
    return api.post('/auth/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  // Address management
  getAddresses() {
    return api.get('/auth/addresses')
  },

  addAddress(address) {
    return api.post('/auth/addresses', address)
  },

  updateAddress(id, address) {
    return api.put(`/auth/addresses/${id}`, address)
  },

  deleteAddress(id) {
    return api.delete(`/auth/addresses/${id}`)
  },

  setDefaultAddress(id) {
    return api.put(`/auth/addresses/${id}/default`)
  }
}
