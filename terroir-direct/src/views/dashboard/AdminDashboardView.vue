<template>
  <div class="dash">
    <aside class="dash__side dash__side--dark">
      <div class="dash__brand"><img src="/images/logo.png" style="height:36px" /><span>Admin</span></div>
      <nav class="dash__nav">
        <a v-for="item in menu" :key="item.key" :class="{ active: activeTab === item.key }" @click="activeTab = item.key"><i :class="item.icon"></i> {{ item.label }}</a>
      </nav>
      <router-link to="/" class="dash__back"><i class="pi pi-arrow-left"></i> Về trang chủ</router-link>
    </aside>
    <main class="dash__main">
      <!-- Overview -->
      <template v-if="activeTab === 'overview'">
        <h1 class="dash__title">Quản Trị Hệ Thống</h1>
        <div class="dash__stats">
          <div v-for="s in stats" :key="s.label" class="stat"><div class="stat__icon" :style="{ background: s.bg }"><i :class="s.icon"></i></div><div><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div></div>
        </div>
        <div class="dash__row">
          <div class="card"><h3>HTX chờ duyệt</h3>
            <table class="dtable"><thead><tr><th>Tên HTX</th><th>Vùng</th><th>Ngày ĐK</th><th>SP</th><th>Thao tác</th></tr></thead>
            <tbody>
              <tr><td class="bold">HTX Rau An Toàn Hóc Môn</td><td>Đông Nam Bộ</td><td>10/02/2026</td><td>12</td><td><button class="btn-sm btn-sm--success">Duyệt</button> <button class="btn-sm btn-sm--danger">Từ chối</button></td></tr>
              <tr><td class="bold">HTX Chè Thái Nguyên</td><td>Đông Bắc</td><td>08/02/2026</td><td>8</td><td><button class="btn-sm btn-sm--success">Duyệt</button> <button class="btn-sm btn-sm--danger">Từ chối</button></td></tr>
            </tbody></table>
          </div>
          <div class="card"><h3>Đơn hàng hôm nay</h3>
            <div v-for="s in todayStats" :key="s.label" style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #F5F0E8"><span style="color:#8C7A66;font-size:13px">{{ s.label }}</span><strong style="font-size:15px">{{ s.value }}</strong></div>
          </div>
        </div>
      </template>

      <!-- Users -->
      <template v-if="activeTab === 'users'">
        <h1 class="dash__title">Quản Lý Người Dùng (52,340)</h1>
        <div class="card">
          <table class="dtable"><thead><tr><th>ID</th><th>Họ tên</th><th>Email</th><th>SĐT</th><th>Vai trò</th><th>Ngày ĐK</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr v-for="u in users" :key="u.id"><td>#{{ u.id }}</td><td class="bold">{{ u.name }}</td><td>{{ u.email }}</td><td>{{ u.phone }}</td><td><span :class="'tag tag--' + u.roleSev">{{ u.role }}</span></td><td>{{ u.date }}</td><td><button class="btn-sm">Xem</button> <button class="btn-sm btn-sm--danger">Khóa</button></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Cooperatives -->
      <template v-if="activeTab === 'coops'">
        <h1 class="dash__title">Quản Lý Hợp Tác Xã ({{ coops.length }})</h1>
        <div class="card">
          <table class="dtable"><thead><tr><th>Tên HTX</th><th>Vùng</th><th>SP</th><th>Đánh giá</th><th>Doanh thu</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody><tr v-for="c in coops" :key="c.id"><td class="bold">{{ c.name }}</td><td>{{ c.region }}</td><td>{{ c.productCount }}</td><td><i class="pi pi-star-fill" style="color:#D4A017;font-size:11px"></i> {{ c.rating }}</td><td class="bold">{{ c.revenue }}</td><td><span class="tag tag--success">Hoạt động</span></td><td><button class="btn-sm">Chi tiết</button></td></tr></tbody>
          </table>
        </div>
      </template>

      <!-- Products -->
      <template v-if="activeTab === 'products'">
        <h1 class="dash__title">Quản Lý Sản Phẩm ({{ allProducts.length }})</h1>
        <div class="card">
          <table class="dtable"><thead><tr><th>Ảnh</th><th>Tên</th><th>HTX</th><th>Giá</th><th>Tồn</th><th>Bán</th><th>Thao tác</th></tr></thead>
          <tbody><tr v-for="p in allProducts.slice(0,12)" :key="p.id"><td><img :src="p.thumbnail" style="width:36px;height:36px;border-radius:6px;object-fit:cover" /></td><td class="bold">{{ p.name }}</td><td>{{ p.cooperativeName }}</td><td>{{ formatCurrency(p.salePrice || p.price) }}</td><td>{{ p.stock }}</td><td>{{ p.soldCount }}</td><td><button class="btn-sm">Xem</button></td></tr></tbody>
          </table>
        </div>
      </template>

      <!-- Orders -->
      <template v-if="activeTab === 'orders'">
        <h1 class="dash__title">Quản Lý Đơn Hàng</h1>
        <div class="card">
          <table class="dtable"><thead><tr><th>Mã</th><th>Khách</th><th>HTX</th><th>Tổng</th><th>Ngày</th><th>Trạng thái</th></tr></thead>
          <tbody>
            <tr><td class="bold">#TD-001</td><td>Nguyễn Văn A</td><td>HTX Mỹ Thành</td><td class="bold">519,000₫</td><td>08/02</td><td><span class="tag tag--info">Đang giao</span></td></tr>
            <tr><td class="bold">#TD-002</td><td>Trần Thị B</td><td>HTX Thanh Xuân</td><td class="bold">420,000₫</td><td>05/02</td><td><span class="tag tag--success">Đã giao</span></td></tr>
            <tr><td class="bold">#TD-003</td><td>Lê Văn C</td><td>HTX Mỹ Thành</td><td class="bold">375,000₫</td><td>01/02</td><td><span class="tag tag--success">Đã giao</span></td></tr>
            <tr><td class="bold">#TD-004</td><td>Phạm D</td><td>HTX Cái Bè</td><td class="bold">603,000₫</td><td>10/02</td><td><span class="tag tag--warn">Chờ xác nhận</span></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Categories -->
      <template v-if="activeTab === 'categories'">
        <div class="dash__header"><h1 class="dash__title">Quản Lý Danh Mục</h1><button class="btn-primary"><i class="pi pi-plus"></i> Thêm danh mục</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>ID</th><th>Tên</th><th>Slug</th><th>Số SP</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr><td>1</td><td class="bold">Rau Củ Quả</td><td>rau-cu-qua</td><td>3</td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td>2</td><td class="bold">Trái Cây</td><td>trai-cay</td><td>5</td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td>3</td><td class="bold">Gạo & Ngũ Cốc</td><td>gao-ngu-coc</td><td>2</td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td>4</td><td class="bold">Đặc Sản Vùng Miền</td><td>dac-san-vung-mien</td><td>4</td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td>5</td><td class="bold">Nông Sản Chế Biến</td><td>nong-san-che-bien</td><td>6</td><td><button class="btn-sm">Sửa</button></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Vouchers -->
      <template v-if="activeTab === 'vouchers'">
        <div class="dash__header"><h1 class="dash__title">Quản Lý Voucher</h1><button class="btn-primary"><i class="pi pi-plus"></i> Tạo voucher</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>Mã</th><th>Giảm</th><th>Đơn tối thiểu</th><th>Hạn</th><th>Đã dùng</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
            <tr><td class="bold">CHAOBAN</td><td>10%</td><td>200,000₫</td><td>31/03/2026</td><td>45/100</td><td><span class="tag tag--success">Active</span></td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td class="bold">FREESHIP</td><td>30,000₫</td><td>300,000₫</td><td>28/02/2026</td><td>28/50</td><td><span class="tag tag--success">Active</span></td><td><button class="btn-sm">Sửa</button></td></tr>
            <tr><td class="bold">TET2026</td><td>15%</td><td>500,000₫</td><td>15/02/2026</td><td>20/20</td><td><span class="tag tag--danger">Hết hạn</span></td><td><button class="btn-sm">Sửa</button></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Banner & Blog & Config -->
      <template v-if="activeTab === 'banners'">
        <div class="dash__header"><h1 class="dash__title">Quản Lý Banner</h1><button class="btn-primary"><i class="pi pi-plus"></i> Thêm banner</button></div>
        <div class="card">
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
            <div v-for="b in banners" :key="b.title" style="position:relative;border-radius:10px;overflow:hidden"><img :src="b.img" style="width:100%;height:160px;object-fit:cover" /><div style="position:absolute;bottom:0;left:0;right:0;padding:12px;background:linear-gradient(transparent,rgba(0,0,0,.6));color:#fff"><strong>{{ b.title }}</strong><br/><span style="font-size:12px">{{ b.pos }}</span></div></div>
          </div>
        </div>
      </template>

      <template v-if="activeTab === 'blog'">
        <div class="dash__header"><h1 class="dash__title">Quản Lý Blog</h1><button class="btn-primary"><i class="pi pi-plus"></i> Viết bài</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>Tiêu đề</th><th>Danh mục</th><th>Ngày</th><th>Lượt xem</th><th>Thao tác</th></tr></thead>
          <tbody><tr v-for="b in blogPosts" :key="b.id"><td class="bold">{{ b.title }}</td><td>{{ b.category }}</td><td>{{ b.date }}</td><td>{{ b.views }}</td><td><button class="btn-sm">Sửa</button> <button class="btn-sm btn-sm--danger">Xóa</button></td></tr></tbody></table>
        </div>
      </template>

      <template v-if="activeTab === 'config'">
        <h1 class="dash__title">Cấu Hình Hệ Thống</h1>
        <div class="card">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div class="form-field"><label>Tên website</label><input class="input" value="Terroir Direct" /></div>
            <div class="form-field"><label>Hotline</label><input class="input" value="1900 6868" /></div>
            <div class="form-field"><label>Email hỗ trợ</label><input class="input" value="support@terroirdirect.vn" /></div>
            <div class="form-field"><label>Phí ship mặc định</label><input class="input" value="30000" /></div>
            <div class="form-field"><label>Miễn ship từ</label><input class="input" value="500000" /></div>
            <div class="form-field"><label>Số SP mỗi trang</label><input class="input" value="12" /></div>
          </div>
          <button class="btn-primary" style="margin-top:16px"><i class="pi pi-check"></i> Lưu cấu hình</button>
        </div>
      </template>
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { mockProducts, mockCooperatives, mockBlogPosts } from '@/mock/data.js'
import { formatCurrency } from '@/utils/formatters'
const activeTab = ref('overview')
const menu = [
  { key: 'overview', label: 'Tổng quan', icon: 'pi pi-chart-bar' },
  { key: 'users', label: 'Người dùng', icon: 'pi pi-users' },
  { key: 'coops', label: 'Hợp tác xã', icon: 'pi pi-building' },
  { key: 'products', label: 'Sản phẩm', icon: 'pi pi-box' },
  { key: 'orders', label: 'Đơn hàng', icon: 'pi pi-shopping-bag' },
  { key: 'categories', label: 'Danh mục', icon: 'pi pi-tag' },
  { key: 'vouchers', label: 'Voucher', icon: 'pi pi-ticket' },
  { key: 'banners', label: 'Banner', icon: 'pi pi-image' },
  { key: 'blog', label: 'Blog', icon: 'pi pi-file-edit' },
  { key: 'config', label: 'Cấu hình', icon: 'pi pi-cog' },
]
const stats = [
  { label: 'Tổng doanh thu', value: '1.2B₫', icon: 'pi pi-dollar', bg: 'linear-gradient(135deg,#2D5016,#4A7C28)' },
  { label: 'Người dùng', value: '52,340', icon: 'pi pi-users', bg: 'linear-gradient(135deg,#01579B,#0288D1)' },
  { label: 'Hợp tác xã', value: '124', icon: 'pi pi-building', bg: 'linear-gradient(135deg,#E65100,#FF8F00)' },
  { label: 'Đơn hàng hôm nay', value: '156', icon: 'pi pi-shopping-bag', bg: 'linear-gradient(135deg,#D4A017,#F0C75E)' },
]
const todayStats = [
  { label: 'Tổng đơn', value: '156' }, { label: 'Doanh thu', value: '89.2M₫' },
  { label: 'Đơn thành công', value: '142' }, { label: 'Đơn hủy', value: '3' },
  { label: 'Người dùng mới', value: '28' }, { label: 'HTX mới', value: '2' },
]
const users = [
  { id: 1, name: 'Nguyễn Văn Minh', email: 'user@terroir.vn', phone: '0901234567', role: 'Khách hàng', roleSev: 'info', date: '01/01/2026' },
  { id: 2, name: 'Trần Mỹ Thành', email: 'htx@terroir.vn', phone: '0912345678', role: 'HTX', roleSev: 'success', date: '15/06/2025' },
  { id: 3, name: 'Admin Terroir', email: 'admin@terroir.vn', phone: '0900000000', role: 'Admin', roleSev: 'danger', date: '01/01/2025' },
  { id: 4, name: 'Phạm Thanh Lan', email: 'lan@gmail.com', phone: '0987654321', role: 'Khách hàng', roleSev: 'info', date: '05/12/2025' },
  { id: 5, name: 'Lê Hoàng Anh', email: 'anh@gmail.com', phone: '0976543210', role: 'Khách hàng', roleSev: 'info', date: '20/01/2026' },
]
const coops = mockCooperatives.map(c => ({ ...c, revenue: ['45.6M₫','38.2M₫','52.1M₫','28.9M₫','41.3M₫','12.8M₫'][c.id-1] || '0₫' }))
const allProducts = mockProducts
const blogPosts = mockBlogPosts
const banners = [
  { title: 'Hero Banner 1', img: '/images/hero-banner.jpg', pos: 'Trang chủ - Hero' },
  { title: 'Hero Banner 2', img: '/images/hero-banner-2.jpg', pos: 'Trang chủ - Hero' },
  { title: 'Flash Sale', img: '/images/category-fruits.jpg', pos: 'Trang chủ - Flash Sale' },
  { title: 'Khuyến mãi Tết', img: '/images/delivery.jpg', pos: 'Popup' },
]
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.dash { display: flex; min-height: 100vh;
  &__side { width: 250px; background: #1A3009; color: #fff; padding: 18px; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; overflow-y: auto;
    &--dark { background: #1A1208; }
  }
  &__brand { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; span { font-weight: 700; } }
  &__nav { flex: 1; a { display: flex; align-items: center; gap: 10px; padding: 10px 13px; border-radius: 8px; color: rgba(255,255,255,.55); font-size: 13.5px; margin-bottom: 3px; cursor: pointer; transition: all .15s; &:hover, &.active { background: rgba(255,255,255,.08); color: #fff; } } }
  &__back { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.35); font-size: 13px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.06); &:hover { color: #fff; } }
  &__main { flex: 1; margin-left: 250px; padding: 24px 28px; background: #F5F0E8; min-height: 100vh; }
  &__title { font-family: $font-display; font-size: 22px; margin-bottom: 20px; }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; .dash__title { margin-bottom: 0; } }
  &__stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px; }
  &__row { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; }
}
.stat { background: #fff; border-radius: 10px; padding: 18px; display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 2px rgba(0,0,0,.04);
  &__icon { width: 44px; height: 44px; border-radius: 10px; @include flex-center; flex-shrink: 0; i { color: #fff; font-size: 1.1rem; } }
  strong { display: block; font-size: 20px; font-family: $font-display; } span { font-size: 12px; color: $color-warm-gray-400; }
}
.card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,.04); margin-bottom: 16px; h3 { font-family: $font-display; font-size: 15px; margin-bottom: 14px; } }
.dtable { width: 100%; font-size: 13px; border-collapse: collapse; th { text-align: left; padding: 8px 10px; font-size: 11px; color: $color-warm-gray-400; border-bottom: 1px solid $color-warm-gray-100; text-transform: uppercase; letter-spacing: .5px; } td { padding: 10px; border-bottom: 1px solid $color-warm-gray-100; } .bold { font-weight: 600; } }
.tag { padding: 3px 10px; border-radius: 16px; font-size: 11px; font-weight: 600; white-space: nowrap; &--info { background: #E3F2FD; color: #1565C0; } &--warn { background: #FFF3E0; color: #E65100; } &--success { background: #E8F5E9; color: #2E7D32; } &--danger { background: #FFEBEE; color: #C62828; } }
.btn-primary { padding: 10px 20px; background: linear-gradient(135deg,#2D5016,#4A7C28); color: #fff; border-radius: 8px; font-weight: 600; font-size: 13px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-sm { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #fff; border: 1px solid $color-warm-gray-200; cursor: pointer; &--danger { border-color: #EF5350; color: #EF5350; } &--success { border-color: #4CAF50; color: #4CAF50; } }
.form-field { margin-bottom: 12px; label { display: block; font-size: 12px; font-weight: 600; color: $color-warm-gray-500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; } }
.input { width: 100%; padding: 10px 12px; border: 1px solid $color-warm-gray-200; border-radius: 8px; font-size: 14px; outline: none; &:focus { border-color: $color-primary-light; } }
</style>
