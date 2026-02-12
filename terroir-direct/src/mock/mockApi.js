// ============================================
// TERROIR DIRECT - Mock API Service
// Giả lập toàn bộ backend API cho trải nghiệm frontend
// Khi có backend thật, chỉ cần xóa file này và bỏ import trong main.js
// ============================================

import {
  mockUsers, mockProducts, mockCooperatives, mockOrders,
  mockReviews, mockBlogPosts, mockVouchers, mockWishlist, mockNotifications
} from './data.js'

const delay = (ms = 300) => new Promise(r => setTimeout(r, ms + Math.random() * 200))

let currentUser = null
let cart = JSON.parse(localStorage.getItem('td_cart') || '[]')
let wishlist = [...mockWishlist]
let orders = [...mockOrders]
let notifications = [...mockNotifications]
let orderCounter = 5

// ==================== HELPER ====================
function paginate(items, page = 0, size = 12) {
  const start = page * size
  return {
    content: items.slice(start, start + size),
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    number: page,
    size
  }
}

function generateToken() {
  return 'mock_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36)
}

// ==================== MOCK API SETUP ====================
export function setupMockAPI(axiosInstance) {
  // Override axios adapter
  axiosInstance.interceptors.request.use(async (config) => {
    const url = config.url.replace(config.baseURL || '', '')
    const method = config.method?.toUpperCase()
    const data = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : {}
    const params = config.params || {}

    await delay()

    let response = null

    try {
      // ==================== AUTH ====================
      if (url === '/auth/login' && method === 'POST') {
        const user = mockUsers.find(u => u.email === data.email && u.password === data.password)
        if (user) {
          currentUser = { ...user }
          delete currentUser.password
          localStorage.setItem('td_access_token', generateToken())
          localStorage.setItem('td_refresh_token', generateToken())
          response = { accessToken: localStorage.getItem('td_access_token'), refreshToken: localStorage.getItem('td_refresh_token'), user: currentUser }
        } else {
          throw { response: { status: 401, data: { message: 'Email hoặc mật khẩu không đúng' } } }
        }
      }

      else if (url === '/auth/register' && method === 'POST') {
        const newUser = {
          id: mockUsers.length + 1,
          ...data,
          role: 'CONSUMER',
          addresses: []
        }
        delete newUser.confirmPassword
        mockUsers.push({ ...newUser, password: data.password })
        currentUser = { ...newUser }
        delete currentUser.password
        localStorage.setItem('td_access_token', generateToken())
        localStorage.setItem('td_refresh_token', generateToken())
        response = { accessToken: localStorage.getItem('td_access_token'), refreshToken: localStorage.getItem('td_refresh_token'), user: currentUser }
      }

      else if (url === '/auth/profile' && method === 'GET') {
        const token = localStorage.getItem('td_access_token')
        if (token && currentUser) {
          response = currentUser
        } else if (token) {
          // Auto-login as consumer on page refresh
          currentUser = { ...mockUsers[0] }
          delete currentUser.password
          response = currentUser
        } else {
          throw { response: { status: 401 } }
        }
      }

      else if (url === '/auth/profile' && method === 'PUT') {
        if (currentUser) {
          Object.assign(currentUser, data)
          response = currentUser
        }
      }

      else if (url === '/auth/addresses' && method === 'GET') {
        response = currentUser?.addresses || []
      }

      else if (url.startsWith('/auth/addresses') && method === 'POST') {
        const addr = { id: Date.now(), ...data }
        if (!currentUser.addresses) currentUser.addresses = []
        currentUser.addresses.push(addr)
        response = addr
      }

      // ==================== PRODUCTS ====================
      else if (url === '/products' && method === 'GET') {
        let filtered = [...mockProducts]
        if (params.categorySlug) filtered = filtered.filter(p => p.categorySlug === params.categorySlug)
        if (params.region) filtered = filtered.filter(p => p.regionCode === params.region)
        if (params.q) {
          const q = params.q.toLowerCase()
          filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.cooperativeName.toLowerCase().includes(q) || p.region.toLowerCase().includes(q))
        }
        if (params.minPrice) filtered = filtered.filter(p => (p.salePrice || p.price) >= params.minPrice)
        if (params.maxPrice) filtered = filtered.filter(p => (p.salePrice || p.price) <= params.maxPrice)
        if (params.certifications) {
          const certs = Array.isArray(params.certifications) ? params.certifications : [params.certifications]
          filtered = filtered.filter(p => p.certifications?.some(c => certs.includes(c)))
        }
        if (params.sort === 'price-asc') filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
        else if (params.sort === 'price-desc') filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
        else if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating)
        else if (params.sort === 'bestseller') filtered.sort((a, b) => b.soldCount - a.soldCount)
        response = paginate(filtered, params.page, params.size)
      }

      else if (url.match(/^\/products\/slug\/(.+)$/) && method === 'GET') {
        const slug = url.split('/products/slug/')[1]
        response = mockProducts.find(p => p.slug === slug) || mockProducts[0]
      }

      else if (url.match(/^\/products\/(\d+)$/) && method === 'GET') {
        const id = parseInt(url.split('/products/')[1])
        response = mockProducts.find(p => p.id === id)
      }

      else if (url === '/products/featured' && method === 'GET') {
        response = mockProducts.filter(p => p.isFeatured)
      }

      else if (url === '/products/flash-sale' && method === 'GET') {
        response = mockProducts.filter(p => p.isFlashSale).map(p => ({
          ...p, salePrice: Math.round(p.price * 0.6)
        }))
      }

      else if (url === '/products/best-sellers' && method === 'GET') {
        response = [...mockProducts].sort((a, b) => b.soldCount - a.soldCount).slice(0, 8)
      }

      else if (url === '/products/new-arrivals' && method === 'GET') {
        response = mockProducts.slice(-8).reverse()
      }

      else if (url === '/products/search' && method === 'GET') {
        const q = (params.q || '').toLowerCase()
        const filtered = mockProducts.filter(p => p.name.toLowerCase().includes(q) || p.cooperativeName.toLowerCase().includes(q) || p.region.toLowerCase().includes(q) || p.categoryName.toLowerCase().includes(q))
        response = paginate(filtered, params.page, params.size)
      }

      else if (url.match(/^\/products\/(\d+)\/reviews$/) && method === 'GET') {
        const productId = parseInt(url.match(/\/products\/(\d+)/)[1])
        const reviews = mockReviews.filter(r => r.productId === productId)
        response = paginate(reviews)
      }

      else if (url.match(/^\/products\/(\d+)\/reviews$/) && method === 'POST') {
        const productId = parseInt(url.match(/\/products\/(\d+)/)[1])
        const review = { id: mockReviews.length + 1, productId, userId: currentUser?.id, userName: currentUser ? `${currentUser.lastName} ${currentUser.firstName}` : 'Khách', ...data, date: new Date().toISOString().split('T')[0], images: [] }
        mockReviews.push(review)
        response = review
      }

      else if (url.match(/\/products\/(\d+)\/traceability/) && method === 'GET') {
        const productId = parseInt(url.match(/\/products\/(\d+)/)[1])
        const product = mockProducts.find(p => p.id === productId)
        response = product?.traceability || mockProducts[0].traceability
      }

      // ==================== CATEGORIES ====================
      else if (url === '/categories' && method === 'GET') {
        response = [
          { id: 1, slug: 'rau-cu-qua', name: 'Rau Củ Quả', icon: 'pi pi-sun', image: '/images/category-vegetables.jpg', productCount: mockProducts.filter(p => p.categoryId === 1).length },
          { id: 2, slug: 'trai-cay', name: 'Trái Cây', icon: 'pi pi-heart', image: '/images/category-fruits.jpg', productCount: mockProducts.filter(p => p.categoryId === 2).length },
          { id: 3, slug: 'gao-ngu-coc', name: 'Gạo & Ngũ Cốc', icon: 'pi pi-box', image: '/images/category-rice.jpg', productCount: mockProducts.filter(p => p.categoryId === 3).length },
          { id: 4, slug: 'dac-san-vung-mien', name: 'Đặc Sản Vùng Miền', icon: 'pi pi-map', image: '/images/category-specialty.jpg', productCount: mockProducts.filter(p => p.categoryId === 4).length },
          { id: 5, slug: 'nong-san-che-bien', name: 'Nông Sản Chế Biến', icon: 'pi pi-gift', image: '/images/category-dried.jpg', productCount: mockProducts.filter(p => p.categoryId === 5).length },
        ]
      }

      else if (url.match(/^\/products\/category\/(.+)$/) && method === 'GET') {
        const catSlug = url.split('/products/category/')[1]
        const filtered = mockProducts.filter(p => p.categorySlug === catSlug)
        response = paginate(filtered, params.page, params.size)
      }

      // ==================== COOPERATIVES ====================
      else if (url === '/cooperatives' && method === 'GET') {
        response = paginate(mockCooperatives.filter(c => c.isApproved), params.page, params.size || 20)
      }

      else if (url.match(/^\/cooperatives\/slug\/(.+)$/) && method === 'GET') {
        const slug = url.split('/cooperatives/slug/')[1]
        response = mockCooperatives.find(c => c.slug === slug)
      }

      else if (url.match(/^\/cooperatives\/(\d+)$/) && method === 'GET') {
        const id = parseInt(url.split('/cooperatives/')[1])
        response = mockCooperatives.find(c => c.id === id)
      }

      else if (url === '/cooperatives/featured' && method === 'GET') {
        response = mockCooperatives.filter(c => c.isFeatured)
      }

      // ==================== ORDERS ====================
      else if (url === '/orders' && method === 'POST') {
        orderCounter++
        const now = new Date()
        const code = `TD-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(orderCounter).padStart(3, '0')}`
        const newOrder = {
          id: orderCounter, code, userId: currentUser?.id || 1,
          status: 'PENDING', statusLabel: 'Chờ xác nhận',
          createdAt: now.toISOString(),
          shippingAddress: data.shippingAddress || currentUser?.addresses?.[0] || {},
          paymentMethod: data.paymentMethod || 'COD',
          paymentMethodLabel: data.paymentMethod === 'VNPAY' ? 'VNPay' : data.paymentMethod === 'MOMO' ? 'Ví MoMo' : 'Thanh toán khi nhận hàng',
          items: data.items || [],
          subtotal: data.subtotal || 0,
          shippingFee: data.shippingFee || 0,
          discount: data.discount || 0,
          total: data.total || 0,
          estimatedDelivery: new Date(now.getTime() + 2 * 24 * 3600000).toISOString().split('T')[0],
          trackingTimeline: [{ status: 'Đặt hàng thành công', date: now.toLocaleString('vi-VN'), desc: 'Đơn hàng đã được tạo, đang chờ xác nhận' }]
        }
        orders.unshift(newOrder)
        response = newOrder
      }

      else if (url === '/orders/my' && method === 'GET') {
        const userOrders = orders.filter(o => o.userId === (currentUser?.id || 1))
        if (params.status) {
          response = paginate(userOrders.filter(o => o.status === params.status), params.page, params.size)
        } else {
          response = paginate(userOrders, params.page, params.size)
        }
      }

      else if (url.match(/^\/orders\/(\d+)$/) && method === 'GET') {
        const id = parseInt(url.match(/\/orders\/(\d+)/)[1])
        response = orders.find(o => o.id === id) || orders[0]
      }

      else if (url.match(/\/orders\/(\d+)\/cancel/) && method === 'PUT') {
        const id = parseInt(url.match(/\/orders\/(\d+)/)[1])
        const order = orders.find(o => o.id === id)
        if (order) { order.status = 'CANCELLED'; order.statusLabel = 'Đã hủy' }
        response = order
      }

      // ==================== VOUCHERS ====================
      else if (url === '/vouchers/validate' && method === 'POST') {
        const voucher = mockVouchers.find(v => v.code === data.code?.toUpperCase())
        if (voucher) {
          response = voucher
        } else {
          throw { response: { status: 400, data: { message: 'Mã giảm giá không hợp lệ' } } }
        }
      }

      else if (url === '/vouchers/available' && method === 'GET') {
        response = mockVouchers
      }

      // ==================== TRACEABILITY ====================
      else if (url.match(/\/traceability\//) && method === 'GET') {
        response = mockProducts[0].traceability
      }

      // ==================== NOTIFICATIONS ====================
      else if (url === '/notifications' && method === 'GET') {
        response = { content: notifications, totalElements: notifications.length }
      }

      else if (url.match(/\/notifications\/(\d+)\/read/) && method === 'PUT') {
        const id = parseInt(url.match(/\/notifications\/(\d+)/)[1])
        const n = notifications.find(n => n.id === id)
        if (n) n.read = true
        response = { success: true }
      }

      else if (url === '/notifications/read-all' && method === 'PUT') {
        notifications.forEach(n => n.read = true)
        response = { success: true }
      }

      // ==================== BLOG ====================
      else if (url === '/blog' || url === '/blogs') {
        response = paginate(mockBlogPosts, params.page, params.size || 10)
      }

      else if (url.match(/\/blog\/(.+)$/)) {
        const slug = url.split('/blog/')[1]
        response = mockBlogPosts.find(b => b.slug === slug) || mockBlogPosts[0]
      }

      // ==================== COOPERATIVE DASHBOARD ====================
      else if (url === '/cooperative/stats' && method === 'GET') {
        response = {
          revenue: 45600000, orders: 28, products: 45, rating: 4.9,
          revenueGrowth: 12.5, ordersGrowth: 8.3
        }
      }

      else if (url === '/cooperative/orders' && method === 'GET') {
        response = paginate(orders.slice(0, 10))
      }

      else if (url === '/cooperative/revenue' && method === 'GET') {
        response = {
          monthly: [
            { month: 'T8/2025', revenue: 28000000 }, { month: 'T9/2025', revenue: 32000000 },
            { month: 'T10/2025', revenue: 35000000 }, { month: 'T11/2025', revenue: 38000000 },
            { month: 'T12/2025', revenue: 42000000 }, { month: 'T1/2026', revenue: 45600000 },
          ]
        }
      }

      // ==================== ADMIN DASHBOARD ====================
      else if (url === '/admin/stats' && method === 'GET') {
        response = { totalRevenue: 1200000000, totalUsers: 52340, totalCoops: 124, todayOrders: 156 }
      }

      // ==================== PAYMENT ====================
      else if (url.match(/\/payment\//)) {
        response = { paymentUrl: '#', message: 'Demo mode - thanh toán sẽ tự động thành công' }
      }

      // ==================== DEFAULT ====================
      else {
        console.log(`[Mock API] Unhandled: ${method} ${url}`)
        response = { message: 'OK' }
      }

    } catch (error) {
      if (error.response) {
        return Promise.reject(error)
      }
      console.error('[Mock API Error]', error)
      response = { message: 'Mock API Error' }
    }

    // Return mock response
    return Promise.resolve({
      ...config,
      adapter: () => Promise.resolve({
        data: response,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })
  })

  // Override response interceptor to extract data properly
  axiosInstance.interceptors.response.clear()
  axiosInstance.interceptors.response.use(
    (response) => {
      // If response is actually config with adapter (mock), call adapter
      if (response.adapter) {
        return response.adapter()
      }
      return response
    },
    (error) => Promise.reject(error)
  )

  console.log('%c🌿 Terroir Direct - Mock API Active', 'color: #2D5016; font-size: 14px; font-weight: bold')
  console.log('%cTài khoản demo:', 'color: #8B4513; font-weight: bold')
  console.log('%c  👤 Khách hàng: user@terroir.vn / 123456', 'color: #4A7C28')
  console.log('%c  🏠 Hợp tác xã: htx@terroir.vn / 123456', 'color: #4A7C28')
  console.log('%c  ⚙️  Admin:      admin@terroir.vn / 123456', 'color: #4A7C28')
}
