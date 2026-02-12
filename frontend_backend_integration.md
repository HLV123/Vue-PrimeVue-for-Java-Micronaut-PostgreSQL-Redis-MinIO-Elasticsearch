# TERROIR DIRECT — Frontend (Vue 3)
Sàn thương mại điện tử nông sản sạch Việt Nam, kết nối người tiêu dùng với hợp tác xã.

---
## Cấu trúc khi mở bằng VSCode

```
terroir-direct/
├── .env.development
├── .env.production
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
│   └── images/
│       ├── about-farmer.jpg
│       ├── category-dried.jpg
│       ├── category-fruits.jpg
│       ├── category-rice.jpg
│       ├── category-specialty.jpg
│       ├── category-vegetables.jpg
│       ├── delivery.jpg
│       ├── demo.jpg
│       ├── hero-banner.jpg
│       ├── hero-banner-2.jpg
│       ├── logo.png
│       └── traceability.jpg
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   └── styles/
    │       ├── _variables.scss
    │       ├── _mixins.scss
    │       └── main.scss
    ├── components/
    │   ├── common/
    │   │   ├── ProductCard.vue
    │   │   └── CooperativeCard.vue
    │   └── layout/
    │       ├── AppHeader.vue
    │       └── AppFooter.vue
    ├── mock/
    │   ├── data.js
    │   └── mockApi.js
    ├── router/
    │   ├── index.js
    │   └── guards.js
    ├── services/
    │   ├── api.js
    │   ├── authService.js
    │   ├── cooperativeService.js
    │   ├── orderService.js
    │   ├── paymentService.js
    │   ├── productService.js
    │   ├── traceabilityService.js
    │   └── uploadService.js
    ├── stores/
    │   ├── auth.js
    │   ├── cart.js
    │   ├── cooperative.js
    │   ├── notification.js
    │   ├── order.js
    │   └── product.js
    ├── utils/
    │   ├── constants.js
    │   ├── formatters.js
    │   └── validators.js
    └── views/
        ├── HomeView.vue
        ├── ProductListView.vue
        ├── ProductDetailView.vue
        ├── CartView.vue
        ├── CheckoutView.vue
        ├── OrderConfirmView.vue
        ├── OrderHistoryView.vue
        ├── OrderDetailView.vue
        ├── LoginView.vue
        ├── RegisterView.vue
        ├── ProfileView.vue
        ├── WishlistView.vue
        ├── CooperativeListView.vue
        ├── CooperativeDetailView.vue
        ├── TraceabilityView.vue
        ├── BlogListView.vue
        ├── BlogDetailView.vue
        ├── AboutView.vue
        ├── ContactView.vue
        ├── NotFoundView.vue
        └── dashboard/
            ├── CoopDashboardView.vue
            └── AdminDashboardView.vue
```
Đây là toàn bộ file bạn thấy khi mở project. Chưa có thư mục `node_modules/` hay `dist/` nào.

---
## Cài đặt và chạy project
Terminal trong VSCode 

```bash
npm install
```
```
terroir-direct/
├── node_modules/          ← MỚI SINH RA (~300MB, chứa tất cả thư viện)
│   └── ... (hàng trăm thư viện phụ thuộc)
├── .env.development
├── .env.production
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── public/
│   └── images/
│       └── (12 file ảnh)
└── src/
    └── (cấu trúc giữ nguyên như trên)
```
### Chạy dev server

```bash
npm run dev
```
Terminal sẽ hiện:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://192.168.x.x:3000/
```
Tài khoản demo (mật khẩu đều là `123456`):

| Vai trò      | Email              | Chuyển hướng   |
|--------------|--------------------|----------------|
| Khách hàng   | `user@terroir.vn`  | Trang chủ      |
| Hợp tác xã   | `htx@terroir.vn`   | Dashboard HTX  |
| Quản trị viên | `admin@terroir.vn` | Dashboard Admin |

### Build production (tùy chọn)

```bash
npm run build
```
Sinh thư mục `dist/`:

```
terroir-direct/
├── dist/                  ← MỚI SINH RA (thư mục deploy)
│   ├── index.html
│   └── assets/
│       ├── index-xxxxx.js
│       └── ... (các chunk JS/CSS khác)
├── node_modules/
├── public/
│   └── images/
└── src/
```
Xem trước bản build:

```bash
npm run preview
```
---
## Về Database — Frontend không cần Database
Project frontend này **không cần cài database**. 
Khi chạy `npm run dev`, toàn bộ dữ liệu được cung cấp bởi hệ thống mock trong `src/mock/`:

- `data.js` chứa 20 sản phẩm, 6 HTX, 4 đơn hàng, 8 đánh giá, 6 bài blog, 3 voucher, 4 thông báo, 3 tài khoản demo.
- `mockApi.js` chặn mọi request Axios, trả dữ liệu mock với delay giả lập. Hỗ trợ đầy đủ: đăng nhập/đăng ký, CRUD sản phẩm, tạo đơn hàng, lọc/tìm kiếm/phân trang.

Database chỉ cần thiết khi triển khai backend.

---
## Tương thích với Backend
### Stack backend tương thích

| Thành phần     | Công nghệ                         |
|----------------|------------------------------------|
| Framework      | Java + Micronaut                   |
| Database       | PostgreSQL                         |
| Cache          | Redis                              |
| File storage   | MinIO (S3-compatible)              |
| Search         | Elasticsearch                      |
| Authentication | JWT (access token + refresh token) |

### Cách kết nối frontend với backend
**Bước 1** — Cài và chạy backend Micronaut tại port `8080`.
**Bước 2** — Xóa 2 dòng cuối trong `src/services/api.js`:

```js
// XÓA hoặc COMMENT 2 dòng này:
import { setupMockAPI } from '@/mock/mockApi.js'
setupMockAPI(api)
```
Sau khi xóa, file `api.js` chỉ còn:

```js
import axios from 'axios'
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
})
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('td_access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
}, (error) => Promise.reject(error))
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('td_access_token')
      localStorage.removeItem('td_refresh_token')
    }
    return Promise.reject(error)
  }
)
export default api
```
**Bước 3** — Biến môi trường `.env.development` đã cấu hình sẵn:

```
VITE_API_BASE_URL=http://localhost:8080/api
```
Frontend sẽ gọi thẳng đến backend Micronaut.
### API endpoints mà frontend gọi
Backend cần cung cấp các REST API sau (prefix `/api`):

```
POST   /auth/login                → { email, password } → { accessToken, refreshToken, user }
POST   /auth/register             → { firstName, lastName, email, phone, password }
GET    /auth/profile              → Bearer token → user object
PUT    /auth/profile              → Cập nhật thông tin

GET    /products                  → ?page=0&size=12&sort=newest&categorySlug=&q=&minPrice=&maxPrice=
GET    /products/slug/:slug       → Chi tiết sản phẩm theo slug
GET    /products/featured         → Sản phẩm nổi bật
GET    /products/flash-sale       → Sản phẩm flash sale
GET    /products/best-sellers     → Sản phẩm bán chạy
GET    /products/search           → ?q=keyword
GET    /products/:id/reviews      → Đánh giá sản phẩm
POST   /products/:id/reviews      → Gửi đánh giá mới
GET    /products/:id/traceability → Truy xuất nguồn gốc

GET    /categories                → Danh sách danh mục

GET    /cooperatives              → ?page=0&size=20
GET    /cooperatives/slug/:slug   → Chi tiết HTX
GET    /cooperatives/featured     → HTX nổi bật

POST   /orders                    → Tạo đơn hàng
GET    /orders/my                 → ?status=PENDING&page=0&size=10
GET    /orders/:id                → Chi tiết đơn hàng
PUT    /orders/:id/cancel         → Hủy đơn

POST   /vouchers/validate         → { code } → thông tin voucher
GET    /vouchers/available        → Voucher khả dụng

GET    /notifications             → Danh sách thông báo
PUT    /notifications/:id/read    → Đánh dấu đã đọc

GET    /blog                      → Danh sách bài viết
GET    /blog/:slug                → Chi tiết bài viết

POST   /payment/vnpay             → Tạo link thanh toán VNPay
POST   /payment/momo              → Tạo link thanh toán MoMo

GET    /cooperative/stats         → Thống kê HTX (cho dashboard HTX)
GET    /cooperative/orders        → Đơn hàng của HTX
GET    /cooperative/revenue       → Doanh thu HTX

GET    /admin/stats               → Thống kê admin (cho dashboard Admin)
```
### Response format mà frontend kỳ vọng
Danh sách có phân trang:

```json
{
  "content": [],
  "totalElements": 100,
  "totalPages": 9,
  "number": 0,
  "size": 12
}
```
Đăng nhập:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiJ9...",
  "refreshToken": "dGVycm9pci1yZWZyZXNo...",
  "user": {
    "id": 1,
    "email": "user@terroir.vn",
    "firstName": "Minh",
    "lastName": "Nguyễn Văn",
    "phone": "0901234567",
    "role": "CONSUMER",
    "addresses": []
  }
}
```
Sản phẩm:

```json
{
  "id": 1,
  "name": "Gạo ST25 Sóc Trăng",
  "slug": "gao-st25-soc-trang",
  "price": 185000,
  "salePrice": 165000,
  "unit": "5kg",
  "stock": 234,
  "thumbnail": "/images/category-rice.jpg",
  "images": ["url1", "url2"],
  "cooperativeId": 1,
  "cooperativeName": "HTX Mỹ Thành",
  "categoryId": 3,
  "categorySlug": "gao-ngu-coc",
  "categoryName": "Gạo & Ngũ Cốc",
  "region": "Sóc Trăng",
  "regionCode": "DBSCL",
  "rating": 4.9,
  "reviewCount": 126,
  "soldCount": 2340,
  "isOrganic": false,
  "isFeatured": true,
  "isFlashSale": false,
  "certifications": ["VietGAP", "OCOP 5 sao"],
  "description": "<p>HTML content</p>",
  "variants": [
    { "id": "v1", "name": "5kg", "price": 185000, "salePrice": 165000 }
  ],
  "traceability": {
    "batchNumber": "ST25-2025-LOT089",
    "timeline": [
      {
        "step": "seed",
        "title": "Chọn giống",
        "date": "2025-06-10",
        "desc": "Giống ST25 cấp xác nhận",
        "location": "Viện Lúa ĐBSCL"
      }
    ]
  }
}
```
### JWT Authentication
- Frontend lưu `td_access_token` và `td_refresh_token` trong `localStorage`.
- Mỗi request đính kèm header: `Authorization: Bearer <access_token>`.
- Khi nhận HTTP 401, frontend xóa token và redirect về `/dang-nhap`.
- Role: `CONSUMER`, `COOPERATIVE`, `ADMIN` — frontend dùng để phân quyền UI.
### Database Schema gợi ý cho backend

```
users            (id, email, password_hash, first_name, last_name, phone, role, created_at)
addresses        (id, user_id, name, phone, address, ward, district, city, is_default)
cooperatives     (id, user_id, name, slug, location, region, description, rating, ...)
products         (id, cooperative_id, category_id, name, slug, price, sale_price, stock, ...)
product_images   (id, product_id, url, sort_order)
product_variants (id, product_id, name, price, sale_price)
categories       (id, name, slug, icon, image)
orders           (id, user_id, code, status, payment_method, total, created_at)
order_items      (id, order_id, product_id, price, quantity)
reviews          (id, product_id, user_id, rating, text, created_at)
traceability     (id, product_id, batch_number, qr_code)
trace_steps      (id, traceability_id, step, title, date, description, location, sort_order)
vouchers         (id, code, type, value, max_discount, min_order, expires_at, usage_left)
blog_posts       (id, title, slug, excerpt, content, image, category, author, views, created_at)
notifications    (id, user_id, title, message, type, read, link, created_at)
```