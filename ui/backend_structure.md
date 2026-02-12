# TERROIR DIRECT — Backend (Java + Micronaut)

Cấu trúc thư mục backend tương thích với frontend Vue 3 đã xây dựng.

---
## 1. Cấu trúc thư mục gốc

```
terroir-direct-api/
│
├── build.gradle
├── settings.gradle
├── gradle.properties
├── gradlew
├── gradlew.bat
├── .env
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── gradle/
│   └── wrapper/
│       ├── gradle-wrapper.jar
│       └── gradle-wrapper.properties
└── src/
    ├── main/
    │   ├── java/
    │   │   └── vn/
    │   │       └── terroirdirect/
    │   │           ├── Application.java
    │   │           ├── config/
    │   │           │   ├── SecurityConfig.java
    │   │           │   ├── CorsConfig.java
    │   │           │   ├── JwtConfig.java
    │   │           │   ├── MinioConfig.java
    │   │           │   ├── RedisConfig.java
    │   │           │   └── ElasticsearchConfig.java
    │   │           ├── entity/
    │   │           │   ├── User.java
    │   │           │   ├── Address.java
    │   │           │   ├── Cooperative.java
    │   │           │   ├── Product.java
    │   │           │   ├── ProductImage.java
    │   │           │   ├── ProductVariant.java
    │   │           │   ├── Category.java
    │   │           │   ├── Order.java
    │   │           │   ├── OrderItem.java
    │   │           │   ├── Review.java
    │   │           │   ├── Traceability.java
    │   │           │   ├── TraceStep.java
    │   │           │   ├── Voucher.java
    │   │           │   ├── BlogPost.java
    │   │           │   ├── Notification.java
    │   │           │   └── enums/
    │   │           │       ├── UserRole.java
    │   │           │       ├── OrderStatus.java
    │   │           │       ├── PaymentMethod.java
    │   │           │       ├── VoucherType.java
    │   │           │       └── NotificationType.java
    │   │           ├── repository/
    │   │           │   ├── UserRepository.java
    │   │           │   ├── AddressRepository.java
    │   │           │   ├── CooperativeRepository.java
    │   │           │   ├── ProductRepository.java
    │   │           │   ├── ProductImageRepository.java
    │   │           │   ├── ProductVariantRepository.java
    │   │           │   ├── CategoryRepository.java
    │   │           │   ├── OrderRepository.java
    │   │           │   ├── OrderItemRepository.java
    │   │           │   ├── ReviewRepository.java
    │   │           │   ├── TraceabilityRepository.java
    │   │           │   ├── TraceStepRepository.java
    │   │           │   ├── VoucherRepository.java
    │   │           │   ├── BlogPostRepository.java
    │   │           │   └── NotificationRepository.java
    │   │           ├── service/
    │   │           │   ├── AuthService.java
    │   │           │   ├── UserService.java
    │   │           │   ├── ProductService.java
    │   │           │   ├── CategoryService.java
    │   │           │   ├── CooperativeService.java
    │   │           │   ├── OrderService.java
    │   │           │   ├── ReviewService.java
    │   │           │   ├── TraceabilityService.java
    │   │           │   ├── VoucherService.java
    │   │           │   ├── BlogService.java
    │   │           │   ├── NotificationService.java
    │   │           │   ├── PaymentService.java
    │   │           │   ├── UploadService.java
    │   │           │   └── impl/
    │   │           │       ├── AuthServiceImpl.java
    │   │           │       ├── UserServiceImpl.java
    │   │           │       ├── ProductServiceImpl.java
    │   │           │       ├── CategoryServiceImpl.java
    │   │           │       ├── CooperativeServiceImpl.java
    │   │           │       ├── OrderServiceImpl.java
    │   │           │       ├── ReviewServiceImpl.java
    │   │           │       ├── TraceabilityServiceImpl.java
    │   │           │       ├── VoucherServiceImpl.java
    │   │           │       ├── BlogServiceImpl.java
    │   │           │       ├── NotificationServiceImpl.java
    │   │           │       ├── PaymentServiceImpl.java
    │   │           │       └── UploadServiceImpl.java
    │   │           ├── controller/
    │   │           │   ├── AuthController.java
    │   │           │   ├── ProductController.java
    │   │           │   ├── CategoryController.java
    │   │           │   ├── CooperativeController.java
    │   │           │   ├── OrderController.java
    │   │           │   ├── ReviewController.java
    │   │           │   ├── TraceabilityController.java
    │   │           │   ├── VoucherController.java
    │   │           │   ├── BlogController.java
    │   │           │   ├── NotificationController.java
    │   │           │   ├── PaymentController.java
    │   │           │   ├── UploadController.java
    │   │           │   ├── coop/
    │   │           │   │   ├── CoopDashboardController.java
    │   │           │   │   ├── CoopProductController.java
    │   │           │   │   ├── CoopOrderController.java
    │   │           │   │   ├── CoopTraceController.java
    │   │           │   │   └── CoopPromotionController.java
    │   │           │   └── admin/
    │   │           │       ├── AdminDashboardController.java
    │   │           │       ├── AdminUserController.java
    │   │           │       ├── AdminCoopController.java
    │   │           │       ├── AdminOrderController.java
    │   │           │       ├── AdminCategoryController.java
    │   │           │       ├── AdminVoucherController.java
    │   │           │       ├── AdminBannerController.java
    │   │           │       └── AdminBlogController.java
    │   │           ├── dto/
    │   │           │   ├── request/
    │   │           │   │   ├── LoginRequest.java
    │   │           │   │   ├── RegisterRequest.java
    │   │           │   │   ├── CoopRegisterRequest.java
    │   │           │   │   ├── ChangePasswordRequest.java
    │   │           │   │   ├── AddressRequest.java
    │   │           │   │   ├── ProductRequest.java
    │   │           │   │   ├── OrderRequest.java
    │   │           │   │   ├── ReviewRequest.java
    │   │           │   │   ├── TraceStepRequest.java
    │   │           │   │   ├── TraceBatchRequest.java
    │   │           │   │   ├── VoucherRequest.java
    │   │           │   │   ├── VoucherValidateRequest.java
    │   │           │   │   ├── BlogPostRequest.java
    │   │           │   │   └── PromotionRequest.java
    │   │           │   └── response/
    │   │           │       ├── AuthResponse.java
    │   │           │       ├── UserResponse.java
    │   │           │       ├── ProductResponse.java
    │   │           │       ├── ProductDetailResponse.java
    │   │           │       ├── ProductListResponse.java
    │   │           │       ├── CategoryResponse.java
    │   │           │       ├── CooperativeResponse.java
    │   │           │       ├── CooperativeDetailResponse.java
    │   │           │       ├── OrderResponse.java
    │   │           │       ├── OrderDetailResponse.java
    │   │           │       ├── ReviewResponse.java
    │   │           │       ├── TraceabilityResponse.java
    │   │           │       ├── VoucherResponse.java
    │   │           │       ├── BlogPostResponse.java
    │   │           │       ├── NotificationResponse.java
    │   │           │       ├── CoopStatsResponse.java
    │   │           │       ├── AdminStatsResponse.java
    │   │           │       ├── RevenueResponse.java
    │   │           │       ├── UploadResponse.java
    │   │           │       └── PageResponse.java
    │   │           ├── mapper/
    │   │           │   ├── UserMapper.java
    │   │           │   ├── ProductMapper.java
    │   │           │   ├── CooperativeMapper.java
    │   │           │   ├── OrderMapper.java
    │   │           │   ├── ReviewMapper.java
    │   │           │   ├── TraceabilityMapper.java
    │   │           │   ├── VoucherMapper.java
    │   │           │   ├── BlogMapper.java
    │   │           │   └── NotificationMapper.java
    │   │           ├── security/
    │   │           │   ├── JwtTokenProvider.java
    │   │           │   ├── JwtAuthenticationFilter.java
    │   │           │   ├── SecurityContext.java
    │   │           │   ├── PasswordEncoder.java
    │   │           │   └── annotation/
    │   │           │       ├── RequiresAuth.java
    │   │           │       ├── RequiresRole.java
    │   │           │       └── CurrentUser.java
    │   │           ├── exception/
    │   │           │   ├── GlobalExceptionHandler.java
    │   │           │   ├── BadRequestException.java
    │   │           │   ├── NotFoundException.java
    │   │           │   ├── UnauthorizedException.java
    │   │           │   ├── ForbiddenException.java
    │   │           │   └── ErrorResponse.java
    │   │           ├── payment/
    │   │           │   ├── VnPayClient.java
    │   │           │   ├── VnPayConfig.java
    │   │           │   ├── MomoClient.java
    │   │           │   └── MomoConfig.java
    │   │           └── util/
    │   │               ├── SlugUtil.java
    │   │               ├── QrCodeUtil.java
    │   │               ├── DateUtil.java
    │   │               └── OrderCodeGenerator.java
    │   └── resources/
    │       ├── application.yml
    │       ├── application-dev.yml
    │       ├── application-prod.yml
    │       ├── logback.xml
    │       └── db/
    │           └── migration/
    │               ├── V1__create_users.sql
    │               ├── V2__create_cooperatives.sql
    │               ├── V3__create_categories.sql
    │               ├── V4__create_products.sql
    │               ├── V5__create_orders.sql
    │               ├── V6__create_reviews.sql
    │               ├── V7__create_traceability.sql
    │               ├── V8__create_vouchers.sql
    │               ├── V9__create_blog.sql
    │               ├── V10__create_notifications.sql
    │               └── V99__seed_data.sql
    └── test/
        └── java/
            └── vn/
                └── terroirdirect/
                    ├── ApplicationTest.java
                    ├── controller/
                    │   ├── AuthControllerTest.java
                    │   ├── ProductControllerTest.java
                    │   ├── OrderControllerTest.java
                    │   └── CooperativeControllerTest.java
                    └── service/
                        ├── AuthServiceTest.java
                        ├── ProductServiceTest.java
                        ├── OrderServiceTest.java
                        └── CooperativeServiceTest.java
```

---

## 2. Chi tiết từng layer
### 2.1. Entity — `entity/`
Ánh xạ trực tiếp với bảng PostgreSQL.

```
User.java
├── id             : Long (PK, auto)
├── email          : String (unique)
├── passwordHash   : String
├── firstName      : String
├── lastName       : String
├── phone          : String
├── avatar         : String (URL)
├── role           : UserRole (CONSUMER, COOPERATIVE, ADMIN)
├── createdAt      : Instant
└── updatedAt      : Instant

Address.java
├── id             : Long
├── userId         : Long (FK → users)
├── name           : String
├── phone          : String
├── address        : String
├── ward           : String
├── district       : String
├── city           : String
└── isDefault      : Boolean

Cooperative.java
├── id             : Long
├── userId         : Long (FK → users)
├── name           : String
├── slug           : String (unique)
├── location       : String
├── region         : String
├── regionCode     : String
├── shortDescription : String
├── description    : String (TEXT)
├── coverImage     : String
├── avatar         : String
├── phone          : String
├── email          : String
├── memberCount    : Integer
├── foundedYear    : Integer
├── area           : String
├── rating         : Double
├── productCount   : Integer
├── certifications : String (JSON array)
├── isFeatured     : Boolean
├── isApproved     : Boolean
├── createdAt      : Instant
└── updatedAt      : Instant

Product.java
├── id             : Long
├── cooperativeId  : Long (FK → cooperatives)
├── categoryId     : Long (FK → categories)
├── name           : String
├── slug           : String (unique)
├── price          : Long (đơn vị: VND)
├── salePrice      : Long (nullable)
├── unit           : String
├── weight         : Integer (gram)
├── stock          : Integer
├── thumbnail      : String
├── description    : String (TEXT, HTML)
├── region         : String
├── regionCode     : String
├── rating         : Double
├── reviewCount    : Integer
├── soldCount      : Integer
├── isOrganic      : Boolean
├── isFeatured     : Boolean
├── isFlashSale    : Boolean
├── certifications : String (JSON array)
├── createdAt      : Instant
└── updatedAt      : Instant

ProductImage.java
├── id             : Long
├── productId      : Long (FK → products)
├── url            : String
└── sortOrder      : Integer

ProductVariant.java
├── id             : Long
├── productId      : Long (FK → products)
├── name           : String
├── price          : Long
└── salePrice      : Long (nullable)

Category.java
├── id             : Long
├── name           : String
├── slug           : String (unique)
├── icon           : String
└── image          : String

Order.java
├── id             : Long
├── userId         : Long (FK → users)
├── code           : String (unique, ex: TD-20260208-001)
├── status         : OrderStatus (PENDING, CONFIRMED, SHIPPING, DELIVERED, CANCELLED)
├── paymentMethod  : PaymentMethod (COD, VNPAY, MOMO, BANK_TRANSFER)
├── shippingName   : String
├── shippingPhone  : String
├── shippingAddress: String
├── subtotal       : Long
├── shippingFee    : Long
├── discount       : Long
├── total          : Long
├── note           : String
├── estimatedDelivery : LocalDate
├── createdAt      : Instant
└── updatedAt      : Instant

OrderItem.java
├── id             : Long
├── orderId        : Long (FK → orders)
├── productId      : Long (FK → products)
├── name           : String (snapshot)
├── image          : String (snapshot)
├── price          : Long (snapshot)
├── quantity       : Integer
└── unit           : String

Review.java
├── id             : Long
├── productId      : Long (FK → products)
├── userId         : Long (FK → users)
├── rating         : Integer (1-5)
├── text           : String (TEXT)
├── images         : String (JSON array URLs)
└── createdAt      : Instant

Traceability.java
├── id             : Long
├── productId      : Long (FK → products)
├── batchNumber    : String (unique)
└── qrCode         : String (unique)

TraceStep.java
├── id             : Long
├── traceabilityId : Long (FK → traceability)
├── step           : String (seed, plant, care, inspect, harvest, process, ship)
├── title          : String
├── date           : String
├── description    : String
├── location       : String
├── icon           : String
└── sortOrder      : Integer

Voucher.java
├── id             : Long
├── code           : String (unique)
├── type           : VoucherType (PERCENTAGE, FIXED)
├── value          : Integer
├── maxDiscount    : Long
├── minOrder       : Long
├── description    : String
├── expiresAt      : LocalDate
└── usageLeft      : Integer

BlogPost.java
├── id             : Long
├── title          : String
├── slug           : String (unique)
├── excerpt        : String
├── content        : String (TEXT, HTML)
├── image          : String
├── category       : String
├── author         : String
├── views          : Integer
└── createdAt      : Instant

Notification.java
├── id             : Long
├── userId         : Long (FK → users)
├── title          : String
├── message        : String
├── type           : NotificationType (ORDER, PROMO, SYSTEM)
├── read           : Boolean
├── link           : String
└── createdAt      : Instant
```

### 2.2. Controller — `controller/`
Mỗi controller map với 1 nhóm API mà frontend gọi.

```
AuthController.java
├── POST   /api/auth/login
├── POST   /api/auth/register
├── POST   /api/auth/register/cooperative
├── POST   /api/auth/refresh
├── POST   /api/auth/forgot-password
├── POST   /api/auth/reset-password
├── GET    /api/auth/profile
├── PUT    /api/auth/profile
├── PUT    /api/auth/change-password
├── POST   /api/auth/avatar
├── GET    /api/auth/addresses
├── POST   /api/auth/addresses
├── PUT    /api/auth/addresses/{id}
├── DELETE /api/auth/addresses/{id}
└── PUT    /api/auth/addresses/{id}/default

ProductController.java
├── GET    /api/products                        ?page=&size=&sort=&categorySlug=&q=&minPrice=&maxPrice=
├── GET    /api/products/slug/{slug}
├── GET    /api/products/{id}
├── GET    /api/products/featured
├── GET    /api/products/flash-sale
├── GET    /api/products/best-sellers
├── GET    /api/products/new-arrivals
├── GET    /api/products/category/{categorySlug} ?page=&size=
├── GET    /api/products/cooperative/{coopId}     ?page=&size=
├── GET    /api/products/region/{regionCode}      ?page=&size=
├── GET    /api/products/search                  ?q=&page=&size=
├── GET    /api/products/{id}/reviews            ?page=&size=
├── POST   /api/products/{id}/reviews
└── GET    /api/products/{id}/traceability

CategoryController.java
└── GET    /api/categories

CooperativeController.java
├── GET    /api/cooperatives                     ?page=&size=
├── GET    /api/cooperatives/slug/{slug}
├── GET    /api/cooperatives/{id}
└── GET    /api/cooperatives/featured

OrderController.java
├── POST   /api/orders
├── GET    /api/orders/my                        ?status=&page=&size=
├── GET    /api/orders/{id}
├── PUT    /api/orders/{id}/cancel
└── PUT    /api/orders/{id}/confirm-received

VoucherController.java
├── POST   /api/vouchers/validate
└── GET    /api/vouchers/available

TraceabilityController.java
├── GET    /api/traceability/product/{productId}
├── GET    /api/traceability/qr/{qrCode}
└── GET    /api/traceability/batch/{batchNumber}

BlogController.java
├── GET    /api/blog                             ?page=&size=
└── GET    /api/blog/{slug}

NotificationController.java
├── GET    /api/notifications
├── PUT    /api/notifications/{id}/read
└── PUT    /api/notifications/read-all

PaymentController.java
├── POST   /api/payment/vnpay/create
├── GET    /api/payment/vnpay/return
├── POST   /api/payment/momo/create
├── GET    /api/payment/momo/return
├── GET    /api/payment/bank-transfer/{orderId}
└── POST   /api/payment/bank-transfer/{orderId}/confirm

UploadController.java
├── POST   /api/uploads/image
├── POST   /api/uploads/images
└── DELETE /api/uploads/image                    ?url=

coop/CoopDashboardController.java
├── GET    /api/cooperative/stats
└── GET    /api/cooperative/revenue               ?from=&to=

coop/CoopProductController.java
├── GET    /api/cooperative/products               ?page=&size=
├── POST   /api/cooperative/products
├── PUT    /api/cooperative/products/{id}
└── DELETE /api/cooperative/products/{id}

coop/CoopOrderController.java
├── GET    /api/cooperative/orders                 ?status=&page=&size=
└── PUT    /api/cooperative/orders/{id}/status

coop/CoopTraceController.java
├── POST   /api/cooperative/traceability/batch
├── PUT    /api/cooperative/traceability/batch/{batchId}
├── POST   /api/cooperative/traceability/batch/{batchId}/timeline
└── POST   /api/cooperative/traceability/batch/{batchId}/qr

coop/CoopPromotionController.java
├── GET    /api/cooperative/promotions
├── POST   /api/cooperative/promotions
├── PUT    /api/cooperative/promotions/{id}
└── DELETE /api/cooperative/promotions/{id}

admin/AdminDashboardController.java
└── GET    /api/admin/stats

admin/AdminUserController.java
└── GET    /api/admin/users                       ?role=&page=&size=

admin/AdminCoopController.java
├── GET    /api/admin/cooperatives/pending         ?page=&size=
├── PUT    /api/admin/cooperatives/{id}/approve
└── PUT    /api/admin/cooperatives/{id}/reject

admin/AdminOrderController.java
└── GET    /api/admin/orders                       ?status=&page=&size=

admin/AdminCategoryController.java
├── POST   /api/admin/categories
├── PUT    /api/admin/categories/{id}
└── DELETE /api/admin/categories/{id}

admin/AdminVoucherController.java
├── POST   /api/admin/vouchers
├── PUT    /api/admin/vouchers/{id}
└── DELETE /api/admin/vouchers/{id}

admin/AdminBannerController.java
├── GET    /api/admin/banners
├── POST   /api/admin/banners
├── PUT    /api/admin/banners/{id}
└── DELETE /api/admin/banners/{id}

admin/AdminBlogController.java
├── POST   /api/admin/blog
├── PUT    /api/admin/blog/{id}
└── DELETE /api/admin/blog/{id}
```

---

## 3. Database Migration — `db/migration/`
Flyway migration files chạy theo thứ tự V1 → V99.

```
V1__create_users.sql
├── CREATE TABLE users
└── CREATE TABLE addresses

V2__create_cooperatives.sql
└── CREATE TABLE cooperatives

V3__create_categories.sql
└── CREATE TABLE categories

V4__create_products.sql
├── CREATE TABLE products
├── CREATE TABLE product_images
└── CREATE TABLE product_variants

V5__create_orders.sql
├── CREATE TABLE orders
└── CREATE TABLE order_items

V6__create_reviews.sql
└── CREATE TABLE reviews

V7__create_traceability.sql
├── CREATE TABLE traceability
└── CREATE TABLE trace_steps

V8__create_vouchers.sql
└── CREATE TABLE vouchers

V9__create_blog.sql
└── CREATE TABLE blog_posts

V10__create_notifications.sql
└── CREATE TABLE notifications

V99__seed_data.sql
├── INSERT users (3 tài khoản demo)
├── INSERT categories (5 danh mục)
├── INSERT cooperatives (6 HTX)
├── INSERT products (20 sản phẩm)
├── INSERT product_images
├── INSERT product_variants
├── INSERT reviews (8 đánh giá)
├── INSERT orders (4 đơn hàng)
├── INSERT order_items
├── INSERT traceability + trace_steps
├── INSERT vouchers (3 voucher)
├── INSERT blog_posts (6 bài viết)
└── INSERT notifications (4 thông báo)
```
---

## 4. Cấu hình — `resources/`
### application.yml

```yaml
micronaut:
  application:
    name: terroir-direct-api
  server:
    port: 8080
    cors:
      enabled: true
      configurations:
        web:
          allowed-origins:
            - http://localhost:3000
          allowed-methods:
            - GET
            - POST
            - PUT
            - DELETE
            - OPTIONS
          allowed-headers:
            - Authorization
            - Content-Type

datasources:
  default:
    url: jdbc:postgresql://localhost:5432/terroir_direct
    username: postgres
    password: postgres
    driver-class-name: org.postgresql.Driver

flyway:
  datasources:
    default:
      enabled: true
      locations: classpath:db/migration

jpa:
  default:
    properties:
      hibernate:
        hbm2ddl:
          auto: validate

jwt:
  secret: terroir-direct-jwt-secret-key-change-in-production
  access-token-expiration: 86400
  refresh-token-expiration: 604800

minio:
  endpoint: http://localhost:9000
  access-key: minioadmin
  secret-key: minioadmin
  bucket: terroir-direct

redis:
  uri: redis://localhost:6379

elasticsearch:
  host: localhost
  port: 9200
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: terroir_direct
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin
    ports:
      - "9000:9000"
      - "9001:9001"
    volumes:
      - miniodata:/data

  elasticsearch:
    image: elasticsearch:8.12.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    ports:
      - "9200:9200"
    volumes:
      - esdata:/usr/share/elasticsearch/data

volumes:
  pgdata:
  miniodata:
  esdata:
```

---

## 5. Cài đặt và chạy backend
### Bước 1 — Chạy infrastructure

```bash
docker-compose up -d
```

Kiểm tra:

```
PostgreSQL  : localhost:5432
Redis       : localhost:6379
MinIO       : localhost:9000 (console: localhost:9001)
Elasticsearch: localhost:9200
```

### Bước 2 — Chạy backend

```bash
./gradlew run
```

Backend khởi động tại `http://localhost:8080`.

Flyway tự động chạy migration, tạo bảng và seed dữ liệu mẫu.

### Bước 3 — Kết nối frontend

Mở project frontend, xóa 2 dòng mock trong `src/services/api.js`:

```js
// import { setupMockAPI } from '@/mock/mockApi.js'
// setupMockAPI(api)
```

Chạy frontend:

```bash
cd terroir-direct
npm run dev
```

Frontend (`localhost:3000`) gọi API đến backend (`localhost:8080/api`).

---

## 6. Tổng kết file count

```
config/           6 files    Cấu hình Security, CORS, JWT, MinIO, Redis, ES
entity/          15 files    Entity JPA + 5 enum
repository/      15 files    JPA Repository interface
service/         13 files    Service interface
service/impl/    13 files    Service implementation
controller/      12 files    Public API controller
controller/coop/  5 files    HTX dashboard API
controller/admin/ 8 files    Admin dashboard API
dto/request/     14 files    Request DTO
dto/response/    20 files    Response DTO
mapper/           9 files    Entity ↔ DTO mapper
security/         5 files    JWT + annotation
exception/        6 files    Exception handling
payment/          4 files    VNPay + MoMo client
util/             4 files    Slug, QR, Date, OrderCode
resources/        4 files    application.yml, logback
db/migration/    11 files    Flyway SQL
test/             8 files    Unit + Integration test
─────────────────────────────
TOTAL           172 files
```