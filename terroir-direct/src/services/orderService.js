import api from './api'

export const orderService = {
  // Consumer endpoints
  createOrder(orderData) {
    return api.post('/orders', orderData)
  },

  getMyOrders(params) {
    return api.get('/orders/my', { params })
  },

  getOrderById(id) {
    return api.get(`/orders/${id}`)
  },

  cancelOrder(id, reason) {
    return api.put(`/orders/${id}/cancel`, { reason })
  },

  confirmReceived(id) {
    return api.put(`/orders/${id}/confirm-received`)
  },

  requestReturn(id, data) {
    return api.post(`/orders/${id}/return`, data)
  },

  // Cooperative endpoints
  getCoopOrders(params) {
    return api.get('/cooperative/orders', { params })
  },

  updateOrderStatus(id, status) {
    return api.put(`/cooperative/orders/${id}/status`, { status })
  },

  // Voucher
  validateVoucher(code) {
    return api.post('/vouchers/validate', { code })
  },

  getAvailableVouchers() {
    return api.get('/vouchers/available')
  },

  // Admin order management
  getAllOrders(params) {
    return api.get('/admin/orders', { params })
  }
}
