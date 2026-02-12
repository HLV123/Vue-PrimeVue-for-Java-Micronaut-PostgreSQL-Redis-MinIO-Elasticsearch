import { createRouter, createWebHistory } from 'vue-router'
import { authGuard, guestGuard, cooperativeGuard, adminGuard } from './guards'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Trang chủ' }
  },
  {
    path: '/san-pham',
    name: 'products',
    component: () => import('@/views/ProductListView.vue'),
    meta: { title: 'Sản phẩm' }
  },
  {
    path: '/san-pham/:slug',
    name: 'product-detail',
    component: () => import('@/views/ProductDetailView.vue'),
    meta: { title: 'Chi tiết sản phẩm' }
  },
  {
    path: '/danh-muc/:slug',
    name: 'category',
    component: () => import('@/views/ProductListView.vue'),
    meta: { title: 'Danh mục' }
  },
  {
    path: '/hop-tac-xa',
    name: 'cooperatives',
    component: () => import('@/views/CooperativeListView.vue'),
    meta: { title: 'Hợp tác xã' }
  },
  {
    path: '/hop-tac-xa/:slug',
    name: 'cooperative-detail',
    component: () => import('@/views/CooperativeDetailView.vue'),
    meta: { title: 'Hợp tác xã' }
  },
  {
    path: '/truy-xuat-nguon-goc',
    name: 'traceability',
    component: () => import('@/views/TraceabilityView.vue'),
    meta: { title: 'Truy xuất nguồn gốc' }
  },
  {
    path: '/gio-hang',
    name: 'cart',
    component: () => import('@/views/CartView.vue'),
    meta: { title: 'Giỏ hàng' }
  },
  {
    path: '/thanh-toan',
    name: 'checkout',
    component: () => import('@/views/CheckoutView.vue'),
    meta: { title: 'Thanh toán' },
    beforeEnter: authGuard
  },
  {
    path: '/dat-hang-thanh-cong/:id',
    name: 'order-confirm',
    component: () => import('@/views/OrderConfirmView.vue'),
    meta: { title: 'Đặt hàng thành công' },
    beforeEnter: authGuard
  },
  {
    path: '/don-hang',
    name: 'orders',
    component: () => import('@/views/OrderHistoryView.vue'),
    meta: { title: 'Đơn hàng của tôi' },
    beforeEnter: authGuard
  },
  {
    path: '/don-hang/:id',
    name: 'order-detail',
    component: () => import('@/views/OrderDetailView.vue'),
    meta: { title: 'Chi tiết đơn hàng' },
    beforeEnter: authGuard
  },
  {
    path: '/yeu-thich',
    name: 'wishlist',
    component: () => import('@/views/WishlistView.vue'),
    meta: { title: 'Danh sách yêu thích' },
    beforeEnter: authGuard
  },
  {
    path: '/tai-khoan',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    meta: { title: 'Tài khoản' },
    beforeEnter: authGuard
  },
  {
    path: '/blog',
    name: 'blog',
    component: () => import('@/views/BlogListView.vue'),
    meta: { title: 'Blog nông nghiệp' }
  },
  {
    path: '/blog/:slug',
    name: 'blog-detail',
    component: () => import('@/views/BlogDetailView.vue'),
    meta: { title: 'Bài viết' }
  },
  {
    path: '/gioi-thieu',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'Giới thiệu' }
  },
  {
    path: '/lien-he',
    name: 'contact',
    component: () => import('@/views/ContactView.vue'),
    meta: { title: 'Liên hệ' }
  },
  {
    path: '/dang-nhap',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { title: 'Đăng nhập', layout: 'blank' },
    beforeEnter: guestGuard
  },
  {
    path: '/dang-ky',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { title: 'Đăng ký', layout: 'blank' },
    beforeEnter: guestGuard
  },
  // Cooperative Dashboard
  {
    path: '/dashboard/htx',
    name: 'coop-dashboard',
    component: () => import('@/views/dashboard/CoopDashboardView.vue'),
    meta: { title: 'Dashboard HTX', layout: 'dashboard' },
    beforeEnter: cooperativeGuard
  },
  // Admin Dashboard
  {
    path: '/dashboard/admin',
    name: 'admin-dashboard',
    component: () => import('@/views/dashboard/AdminDashboardView.vue'),
    meta: { title: 'Quản trị hệ thống', layout: 'dashboard' },
    beforeEnter: adminGuard
  },
  // 404
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '404 - Không tìm thấy' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Terroir Direct'} | Terroir Direct`
  next()
})

export default router
