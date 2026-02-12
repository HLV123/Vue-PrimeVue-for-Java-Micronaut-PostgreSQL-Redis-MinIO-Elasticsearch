import api from './api'

export const productService = {
  // Public endpoints
  getProducts(params) {
    return api.get('/products', { params })
  },

  getProductBySlug(slug) {
    return api.get(`/products/slug/${slug}`)
  },

  getProductById(id) {
    return api.get(`/products/${id}`)
  },

  getFeaturedProducts() {
    return api.get('/products/featured')
  },

  getFlashSaleProducts() {
    return api.get('/products/flash-sale')
  },

  getBestSellers() {
    return api.get('/products/best-sellers')
  },

  getNewArrivals() {
    return api.get('/products/new-arrivals')
  },

  getProductsByCategory(categorySlug, params) {
    return api.get(`/products/category/${categorySlug}`, { params })
  },

  getProductsByCooperative(coopId, params) {
    return api.get(`/products/cooperative/${coopId}`, { params })
  },

  getProductsByRegion(regionCode, params) {
    return api.get(`/products/region/${regionCode}`, { params })
  },

  searchProducts(query, params) {
    return api.get('/products/search', { params: { q: query, ...params } })
  },

  // Reviews
  getProductReviews(productId, params) {
    return api.get(`/products/${productId}/reviews`, { params })
  },

  addReview(productId, review) {
    return api.post(`/products/${productId}/reviews`, review)
  },

  // Traceability
  getTraceability(productId) {
    return api.get(`/products/${productId}/traceability`)
  },

  getTraceabilityByQR(qrCode) {
    return api.get(`/traceability/qr/${qrCode}`)
  },

  // Categories
  getCategories() {
    return api.get('/categories')
  },

  // Cooperative product management
  getMyProducts(params) {
    return api.get('/cooperative/products', { params })
  },

  createProduct(product) {
    return api.post('/cooperative/products', product)
  },

  updateProduct(id, product) {
    return api.put(`/cooperative/products/${id}`, product)
  },

  deleteProduct(id) {
    return api.delete(`/cooperative/products/${id}`)
  },

  uploadProductImages(id, formData) {
    return api.post(`/cooperative/products/${id}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },

  updateTraceability(productId, data) {
    return api.put(`/cooperative/products/${productId}/traceability`, data)
  }
}
