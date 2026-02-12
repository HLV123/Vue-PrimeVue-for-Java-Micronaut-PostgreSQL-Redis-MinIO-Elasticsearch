import api from './api'

export const traceabilityService = {
  getByProductId(productId) {
    return api.get(`/traceability/product/${productId}`)
  },

  getByQRCode(qrCode) {
    return api.get(`/traceability/qr/${qrCode}`)
  },

  getByBatchNumber(batchNumber) {
    return api.get(`/traceability/batch/${batchNumber}`)
  },

  // Cooperative management
  createBatch(data) {
    return api.post('/cooperative/traceability/batch', data)
  },

  updateBatch(batchId, data) {
    return api.put(`/cooperative/traceability/batch/${batchId}`, data)
  },

  addTimelineEntry(batchId, entry) {
    return api.post(`/cooperative/traceability/batch/${batchId}/timeline`, entry)
  },

  generateQRCode(batchId) {
    return api.post(`/cooperative/traceability/batch/${batchId}/qr`)
  }
}
