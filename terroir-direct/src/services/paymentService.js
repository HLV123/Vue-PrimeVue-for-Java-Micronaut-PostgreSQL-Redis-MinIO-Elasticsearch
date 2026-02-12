import api from './api'

export const paymentService = {
  createVNPayUrl(orderId) {
    return api.post('/payment/vnpay/create', { orderId })
  },

  verifyVNPayReturn(params) {
    return api.get('/payment/vnpay/return', { params })
  },

  createMoMoUrl(orderId) {
    return api.post('/payment/momo/create', { orderId })
  },

  verifyMoMoReturn(params) {
    return api.get('/payment/momo/return', { params })
  },

  getBankTransferInfo(orderId) {
    return api.get(`/payment/bank-transfer/${orderId}`)
  },

  confirmBankTransfer(orderId, data) {
    return api.post(`/payment/bank-transfer/${orderId}/confirm`, data)
  }
}
