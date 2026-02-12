// ============================================
// TERROIR DIRECT - Constants
// ============================================

export const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

export const ROLES = {
  CONSUMER: 'CONSUMER',
  COOPERATIVE: 'COOPERATIVE',
  ADMIN: 'ADMIN'
}

export const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  PROCESSING: 'PROCESSING',
  SHIPPING: 'SHIPPING',
  DELIVERED: 'DELIVERED',
  CANCELLED: 'CANCELLED',
  RETURNED: 'RETURNED'
}

export const ORDER_STATUS_LABELS = {
  PENDING: 'Chờ xác nhận',
  CONFIRMED: 'Đã xác nhận',
  PROCESSING: 'Đang xử lý',
  SHIPPING: 'Đang giao hàng',
  DELIVERED: 'Đã giao',
  CANCELLED: 'Đã hủy',
  RETURNED: 'Đã hoàn trả'
}

export const ORDER_STATUS_COLORS = {
  PENDING: 'warn',
  CONFIRMED: 'info',
  PROCESSING: 'info',
  SHIPPING: 'info',
  DELIVERED: 'success',
  CANCELLED: 'danger',
  RETURNED: 'danger'
}

export const PAYMENT_METHODS = {
  COD: 'COD',
  BANK_TRANSFER: 'BANK_TRANSFER',
  VNPAY: 'VNPAY',
  MOMO: 'MOMO'
}

export const PAYMENT_METHOD_LABELS = {
  COD: 'Thanh toán khi nhận hàng',
  BANK_TRANSFER: 'Chuyển khoản ngân hàng',
  VNPAY: 'VNPay',
  MOMO: 'Ví MoMo'
}

export const PRODUCT_CATEGORIES = [
  { id: 1, slug: 'rau-cu-qua', name: 'Rau Củ Quả', icon: 'pi pi-sun', image: '/images/category-vegetables.jpg' },
  { id: 2, slug: 'trai-cay', name: 'Trái Cây', icon: 'pi pi-heart', image: '/images/category-fruits.jpg' },
  { id: 3, slug: 'gao-ngu-coc', name: 'Gạo & Ngũ Cốc', icon: 'pi pi-box', image: '/images/category-rice.jpg' },
  { id: 4, slug: 'dac-san-vung-mien', name: 'Đặc Sản Vùng Miền', icon: 'pi pi-map', image: '/images/category-specialty.jpg' },
  { id: 5, slug: 'nong-san-che-bien', name: 'Nông Sản Chế Biến', icon: 'pi pi-gift', image: '/images/category-dried.jpg' }
]

export const REGIONS = [
  { id: 1, name: 'Đồng bằng sông Cửu Long', code: 'DBSCL' },
  { id: 2, name: 'Đông Nam Bộ', code: 'DNB' },
  { id: 3, name: 'Tây Nguyên', code: 'TN' },
  { id: 4, name: 'Nam Trung Bộ', code: 'NTB' },
  { id: 5, name: 'Bắc Trung Bộ', code: 'BTB' },
  { id: 6, name: 'Đồng bằng sông Hồng', code: 'DBSH' },
  { id: 7, name: 'Trung du & miền núi phía Bắc', code: 'TDMN' },
  { id: 8, name: 'Đông Bắc Bộ', code: 'DBB' }
]

export const CERTIFICATIONS = [
  { id: 'vietgap', name: 'VietGAP', color: '#2E7D32' },
  { id: 'organic', name: 'Organic', color: '#1B5E20' },
  { id: 'globalgap', name: 'GlobalGAP', color: '#01579B' },
  { id: 'haccp', name: 'HACCP', color: '#E65100' },
  { id: 'ocop', name: 'OCOP', color: '#B71C1C' }
]

export const PAGINATION_DEFAULT = {
  page: 0,
  size: 12,
  sort: 'createdAt,desc'
}
