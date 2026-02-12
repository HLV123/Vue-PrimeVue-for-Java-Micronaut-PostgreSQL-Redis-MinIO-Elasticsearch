import api from './api'

export const cooperativeService = {
  // Public
  getCooperatives(params) {
    return api.get('/cooperatives', { params })
  },

  getCooperativeBySlug(slug) {
    return api.get(`/cooperatives/slug/${slug}`)
  },

  getCooperativeById(id) {
    return api.get(`/cooperatives/${id}`)
  },

  getFeaturedCooperatives() {
    return api.get('/cooperatives/featured')
  },

  // Cooperative dashboard
  getMyProfile() {
    return api.get('/cooperative/profile')
  },

  updateMyProfile(data) {
    return api.put('/cooperative/profile', data)
  },

  uploadCertificate(formData) {
    return api.post('/cooperative/certificates', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  getRevenue(params) {
    return api.get('/cooperative/revenue', { params })
  },

  getStats() {
    return api.get('/cooperative/stats')
  },

  // Promotions
  getMyPromotions() {
    return api.get('/cooperative/promotions')
  },

  createPromotion(data) {
    return api.post('/cooperative/promotions', data)
  },

  updatePromotion(id, data) {
    return api.put(`/cooperative/promotions/${id}`, data)
  },

  deletePromotion(id) {
    return api.delete(`/cooperative/promotions/${id}`)
  },

  // Admin
  getPendingCooperatives(params) {
    return api.get('/admin/cooperatives/pending', { params })
  },

  approveCooperative(id) {
    return api.put(`/admin/cooperatives/${id}/approve`)
  },

  rejectCooperative(id, reason) {
    return api.put(`/admin/cooperatives/${id}/reject`, { reason })
  }
}
