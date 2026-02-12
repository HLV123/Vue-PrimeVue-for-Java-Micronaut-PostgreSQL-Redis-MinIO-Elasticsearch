<template>
  <div class="dash">
    <aside class="dash__side">
      <div class="dash__brand"><img src="/images/logo.png" style="height:36px" /><span>HTX Panel</span></div>
      <nav class="dash__nav">
        <a v-for="item in menu" :key="item.key" :class="{ active: activeTab === item.key }" @click="activeTab = item.key"><i :class="item.icon"></i> {{ item.label }}</a>
      </nav>
      <router-link to="/" class="dash__back"><i class="pi pi-arrow-left"></i> Về trang chủ</router-link>
    </aside>
    <main class="dash__main">
      <!-- Overview -->
      <template v-if="activeTab === 'overview'">
        <h1 class="dash__title">Tổng Quan <span>HTX Mỹ Thành</span></h1>
        <div class="dash__stats">
          <div v-for="s in stats" :key="s.label" class="stat">
            <div class="stat__icon" :style="{ background: s.bg }"><i :class="s.icon"></i></div>
            <div><strong>{{ s.value }}</strong><span>{{ s.label }}</span><small :class="s.trend > 0 ? 'up' : 'down'">{{ s.trend > 0 ? '↑' : '↓' }} {{ Math.abs(s.trend) }}%</small></div>
          </div>
        </div>
        <div class="dash__row">
          <div class="card"><h3>Đơn hàng gần đây</h3>
            <table class="dtable"><thead><tr><th>Mã</th><th>Khách</th><th>Sản phẩm</th><th>Tổng</th><th>Trạng thái</th></tr></thead>
            <tbody><tr v-for="o in recentOrders" :key="o.code"><td class="bold">{{ o.code }}</td><td>{{ o.customer }}</td><td>{{ o.items }}</td><td class="bold">{{ o.total }}</td><td><span :class="'tag tag--' + o.severity">{{ o.status }}</span></td></tr></tbody></table>
          </div>
          <div class="card"><h3>Doanh thu 6 tháng</h3>
            <div class="chart-bars">
              <div v-for="m in monthlyRevenue" :key="m.month" class="chart-bar">
                <div class="chart-bar__fill" :style="{ height: (m.value / maxRevenue * 100) + '%' }"></div>
                <span class="chart-bar__label">{{ m.month }}</span>
                <span class="chart-bar__value">{{ m.display }}</span>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- Products -->
      <template v-if="activeTab === 'products'">
        <div class="dash__header"><h1 class="dash__title">Quản Lý Sản Phẩm</h1><button class="btn-primary"><i class="pi pi-plus"></i> Thêm sản phẩm</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>Ảnh</th><th>Tên sản phẩm</th><th>Giá</th><th>Tồn kho</th><th>Đã bán</th><th>Đánh giá</th><th>Thao tác</th></tr></thead>
          <tbody><tr v-for="p in coopProducts" :key="p.id">
            <td><img :src="p.thumbnail" style="width:40px;height:40px;border-radius:6px;object-fit:cover" /></td>
            <td class="bold">{{ p.name }}</td><td>{{ formatCurrency(p.salePrice || p.price) }}</td><td>{{ p.stock }}</td><td>{{ p.soldCount }}</td>
            <td><i class="pi pi-star-fill" style="color:#D4A017;font-size:11px"></i> {{ p.rating }}</td>
            <td><button class="btn-sm">Sửa</button> <button class="btn-sm btn-sm--danger">Xóa</button></td>
          </tr></tbody></table>
        </div>
      </template>

      <!-- Orders -->
      <template v-if="activeTab === 'orders'">
        <h1 class="dash__title">Quản Lý Đơn Hàng</h1>
        <div class="dash__tabs"><button v-for="t in orderTabs" :key="t.key" :class="['tab', { active: orderFilter === t.key }]" @click="orderFilter = t.key">{{ t.label }} ({{ t.count }})</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>Mã</th><th>Khách</th><th>Sản phẩm</th><th>Tổng</th><th>Ngày</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody><tr v-for="o in allOrders" :key="o.code"><td class="bold">{{ o.code }}</td><td>{{ o.customer }}</td><td>{{ o.items }}</td><td class="bold">{{ o.total }}</td><td>{{ o.date }}</td><td><span :class="'tag tag--' + o.severity">{{ o.status }}</span></td><td><button class="btn-sm">Chi tiết</button></td></tr></tbody></table>
        </div>
      </template>

      <!-- Traceability -->
      <template v-if="activeTab === 'trace'">
        <h1 class="dash__title">Truy Xuất Nguồn Gốc</h1>
        <div class="card"><p style="color:#8C7A66;margin-bottom:16px">Quản lý mã truy xuất cho từng lô sản phẩm</p>
          <table class="dtable"><thead><tr><th>Lô hàng</th><th>Sản phẩm</th><th>Ngày tạo</th><th>Bước hiện tại</th><th>QR Code</th></tr></thead>
          <tbody>
            <tr><td class="bold">ST25-2025-LOT089</td><td>Gạo ST25 5kg</td><td>10/06/2025</td><td><span class="tag tag--success">Đã vận chuyển</span></td><td><i class="pi pi-qrcode" style="color:#2D5016;font-size:1.2rem"></i></td></tr>
            <tr><td class="bold">ST25-2025-LOT090</td><td>Gạo ST25 10kg</td><td>15/07/2025</td><td><span class="tag tag--info">Thu hoạch</span></td><td><i class="pi pi-qrcode" style="color:#2D5016;font-size:1.2rem"></i></td></tr>
            <tr><td class="bold">GLUT-2025-LOT012</td><td>Gạo Lứt Đỏ 2kg</td><td>20/08/2025</td><td><span class="tag tag--warn">Chăm sóc</span></td><td><i class="pi pi-qrcode" style="color:#2D5016;font-size:1.2rem"></i></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Promotions -->
      <template v-if="activeTab === 'promo'">
        <div class="dash__header"><h1 class="dash__title">Khuyến Mãi</h1><button class="btn-primary"><i class="pi pi-plus"></i> Tạo khuyến mãi</button></div>
        <div class="card">
          <table class="dtable"><thead><tr><th>Mã</th><th>Giảm</th><th>Đơn tối thiểu</th><th>Hạn</th><th>Đã dùng</th><th>Trạng thái</th></tr></thead>
          <tbody>
            <tr><td class="bold">HTXMY10</td><td>10%</td><td>200,000₫</td><td>31/03/2026</td><td>45/100</td><td><span class="tag tag--success">Đang chạy</span></td></tr>
            <tr><td class="bold">FREESHIP</td><td>Miễn ship</td><td>300,000₫</td><td>28/02/2026</td><td>28/50</td><td><span class="tag tag--success">Đang chạy</span></td></tr>
            <tr><td class="bold">TET2026</td><td>15%</td><td>500,000₫</td><td>15/02/2026</td><td>20/20</td><td><span class="tag tag--danger">Hết hạn</span></td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Revenue -->
      <template v-if="activeTab === 'revenue'">
        <h1 class="dash__title">Doanh Thu</h1>
        <div class="dash__stats" style="margin-bottom:24px">
          <div class="stat"><div class="stat__icon" style="background:linear-gradient(135deg,#2D5016,#4A7C28)"><i class="pi pi-dollar"></i></div><div><strong>45.6M₫</strong><span>Tháng này</span></div></div>
          <div class="stat"><div class="stat__icon" style="background:linear-gradient(135deg,#D4A017,#F0C75E)"><i class="pi pi-chart-line"></i></div><div><strong>520M₫</strong><span>Năm 2025</span></div></div>
          <div class="stat"><div class="stat__icon" style="background:linear-gradient(135deg,#01579B,#0288D1)"><i class="pi pi-percentage"></i></div><div><strong>12.5%</strong><span>Tăng trưởng</span></div></div>
        </div>
        <div class="card"><h3>Chi tiết theo sản phẩm</h3>
          <table class="dtable"><thead><tr><th>Sản phẩm</th><th>Số lượng</th><th>Doanh thu</th><th>Tỷ trọng</th></tr></thead>
          <tbody>
            <tr><td>Gạo ST25 5kg</td><td>234</td><td class="bold">38,610,000₫</td><td>84.7%</td></tr>
            <tr><td>Gạo ST25 10kg</td><td>120</td><td class="bold">38,400,000₫</td><td>——</td></tr>
            <tr><td>Gạo Lứt Đỏ 2kg</td><td>89</td><td class="bold">4,895,000₫</td><td>10.7%</td></tr>
            <tr><td>Nem Chua TH</td><td>67</td><td class="bold">5,695,000₫</td><td>4.6%</td></tr>
          </tbody></table>
        </div>
      </template>

      <!-- Reviews -->
      <template v-if="activeTab === 'reviews'">
        <h1 class="dash__title">Đánh Giá Từ Khách Hàng</h1>
        <div class="dash__stats" style="margin-bottom:24px">
          <div class="stat"><div class="stat__icon" style="background:linear-gradient(135deg,#D4A017,#F0C75E)"><i class="pi pi-star-fill"></i></div><div><strong>4.9/5</strong><span>Trung bình</span></div></div>
          <div class="stat"><div class="stat__icon" style="background:linear-gradient(135deg,#2D5016,#4A7C28)"><i class="pi pi-comments"></i></div><div><strong>126</strong><span>Tổng đánh giá</span></div></div>
        </div>
        <div class="card">
          <div v-for="r in reviews" :key="r.id" style="display:flex;gap:14px;padding:14px 0;border-bottom:1px solid #F5F0E8">
            <div style="width:40px;height:40px;border-radius:50%;background:#E8DFD0;display:flex;align-items:center;justify-content:center;font-weight:700;flex-shrink:0">{{ r.userName.charAt(0) }}</div>
            <div style="flex:1"><strong>{{ r.userName }}</strong><div><i v-for="s in r.rating" :key="s" class="pi pi-star-fill" style="color:#D4A017;font-size:11px"></i></div><p style="color:#6B5B4A;font-size:14px;margin:4px 0">{{ r.text }}</p><span style="font-size:12px;color:#B8A890">{{ r.date }}</span></div>
          </div>
        </div>
      </template>

      <!-- Profile -->
      <template v-if="activeTab === 'profile'">
        <h1 class="dash__title">Hồ Sơ HTX</h1>
        <div class="card">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
            <div class="form-field"><label>Tên HTX</label><input class="input" value="HTX Nông Nghiệp Mỹ Thành" /></div>
            <div class="form-field"><label>Năm thành lập</label><input class="input" value="2010" /></div>
            <div class="form-field"><label>Địa chỉ</label><input class="input" value="Xã Mỹ Thành, Huyện Mỹ Tú, Sóc Trăng" /></div>
            <div class="form-field"><label>Vùng miền</label><input class="input" value="Đồng bằng sông Cửu Long" /></div>
            <div class="form-field"><label>Số điện thoại</label><input class="input" value="0299 3861 234" /></div>
            <div class="form-field"><label>Email</label><input class="input" value="mythanh@htx.vn" /></div>
            <div class="form-field" style="grid-column:1/-1"><label>Mô tả</label><textarea class="input" rows="4">HTX Nông Nghiệp Mỹ Thành được thành lập năm 2010 với 120 thành viên. Chuyên canh tác giống gạo ST25.</textarea></div>
          </div>
          <button class="btn-primary" style="margin-top:16px"><i class="pi pi-check"></i> Cập nhật</button>
        </div>
      </template>
    </main>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { mockProducts, mockReviews } from '@/mock/data.js'
import { formatCurrency } from '@/utils/formatters'
const activeTab = ref('overview')
const orderFilter = ref('all')
const menu = [
  { key: 'overview', label: 'Tổng quan', icon: 'pi pi-chart-bar' },
  { key: 'products', label: 'Sản phẩm', icon: 'pi pi-box' },
  { key: 'orders', label: 'Đơn hàng', icon: 'pi pi-shopping-bag' },
  { key: 'trace', label: 'Truy xuất nguồn gốc', icon: 'pi pi-qrcode' },
  { key: 'promo', label: 'Khuyến mãi', icon: 'pi pi-megaphone' },
  { key: 'revenue', label: 'Doanh thu', icon: 'pi pi-chart-line' },
  { key: 'reviews', label: 'Đánh giá', icon: 'pi pi-star' },
  { key: 'profile', label: 'Hồ sơ HTX', icon: 'pi pi-cog' },
]
const stats = [
  { label: 'Doanh thu tháng', value: '45.6M₫', icon: 'pi pi-dollar', bg: 'linear-gradient(135deg,#2D5016,#4A7C28)', trend: 12.5 },
  { label: 'Đơn hàng mới', value: '28', icon: 'pi pi-shopping-bag', bg: 'linear-gradient(135deg,#01579B,#0288D1)', trend: 8.3 },
  { label: 'Sản phẩm', value: '45', icon: 'pi pi-box', bg: 'linear-gradient(135deg,#E65100,#FF8F00)', trend: 5 },
  { label: 'Đánh giá TB', value: '4.9★', icon: 'pi pi-star', bg: 'linear-gradient(135deg,#D4A017,#F0C75E)', trend: 0.2 },
]
const monthlyRevenue = [
  { month: 'T8', value: 28, display: '28M' }, { month: 'T9', value: 32, display: '32M' },
  { month: 'T10', value: 35, display: '35M' }, { month: 'T11', value: 38, display: '38M' },
  { month: 'T12', value: 42, display: '42M' }, { month: 'T1', value: 45.6, display: '45.6M' },
]
const maxRevenue = 50
const recentOrders = [
  { code: '#TD-001', customer: 'Nguyễn Văn A', items: 'Gạo ST25 x2, Nước mắm x1', total: '519,000₫', status: 'Đang giao', severity: 'info' },
  { code: '#TD-002', customer: 'Trần Thị B', items: 'Mật ong x1, Rau organic x2', total: '420,000₫', status: 'Chờ xác nhận', severity: 'warn' },
  { code: '#TD-003', customer: 'Lê Văn C', items: 'Gạo ST25 x3', total: '495,000₫', status: 'Đã giao', severity: 'success' },
  { code: '#TD-004', customer: 'Phạm D', items: 'Sầu riêng x2, Tiêu PQ x1', total: '603,000₫', status: 'Chờ xác nhận', severity: 'warn' },
  { code: '#TD-005', customer: 'Hoàng E', items: 'Cà phê x3', total: '375,000₫', status: 'Đã giao', severity: 'success' },
]
const allOrders = [...recentOrders, { code: '#TD-006', customer: 'Vũ F', items: 'Gạo lứt x2', total: '110,000₫', date: '05/02', status: 'Đã hủy', severity: 'danger' }]
const orderTabs = [
  { key: 'all', label: 'Tất cả', count: 6 }, { key: 'pending', label: 'Chờ', count: 2 },
  { key: 'shipping', label: 'Giao', count: 1 }, { key: 'done', label: 'Xong', count: 2 }, { key: 'cancel', label: 'Hủy', count: 1 },
]
const coopProducts = mockProducts.filter(p => p.cooperativeId === 1)
const reviews = mockReviews.filter(r => r.productId === 1)
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.dash { display: flex; min-height: 100vh;
  &__side { width: 250px; background: #1A3009; color: #fff; padding: 18px; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 100; overflow-y: auto; }
  &__brand { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; span { font-weight: 700; font-size: 15px; } }
  &__nav { flex: 1; a { display: flex; align-items: center; gap: 10px; padding: 10px 13px; border-radius: 8px; color: rgba(255,255,255,.6); font-size: 13.5px; margin-bottom: 3px; cursor: pointer; transition: all .15s; &:hover, &.active { background: rgba(255,255,255,.1); color: #fff; } } }
  &__back { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,.4); font-size: 13px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,.08); &:hover { color: #fff; } }
  &__main { flex: 1; margin-left: 250px; padding: 24px 28px; background: #F5F0E8; min-height: 100vh; }
  &__title { font-family: $font-display; font-size: 22px; margin-bottom: 20px; span { color: $color-warm-gray-400; font-size: 14px; font-weight: 400; margin-left: 8px; } }
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; .dash__title { margin-bottom: 0; } }
  &__stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-bottom: 20px; }
  &__row { display: grid; grid-template-columns: 1.3fr 1fr; gap: 20px; }
  &__tabs { display: flex; gap: 6px; margin-bottom: 16px; }
}
.stat { background: #fff; border-radius: 10px; padding: 18px; display: flex; align-items: center; gap: 14px; box-shadow: 0 1px 2px rgba(0,0,0,.04);
  &__icon { width: 44px; height: 44px; border-radius: 10px; @include flex-center; flex-shrink: 0; i { color: #fff; font-size: 1.1rem; } }
  strong { display: block; font-size: 20px; font-family: $font-display; } span { font-size: 12px; color: $color-warm-gray-400; } small { font-size: 11px; margin-left: 4px; &.up { color: #2E7D32; } &.down { color: #C62828; } }
}
.card { background: #fff; border-radius: 10px; padding: 20px; box-shadow: 0 1px 2px rgba(0,0,0,.04); margin-bottom: 16px; h3 { font-family: $font-display; font-size: 15px; margin-bottom: 14px; } }
.dtable { width: 100%; font-size: 13px; border-collapse: collapse; th { text-align: left; padding: 8px 10px; font-size: 11px; color: $color-warm-gray-400; border-bottom: 1px solid $color-warm-gray-100; text-transform: uppercase; letter-spacing: .5px; } td { padding: 10px; border-bottom: 1px solid $color-warm-gray-100; } .bold { font-weight: 600; } }
.tag { padding: 3px 10px; border-radius: 16px; font-size: 11px; font-weight: 600; white-space: nowrap; &--info { background: #E3F2FD; color: #1565C0; } &--warn { background: #FFF3E0; color: #E65100; } &--success { background: #E8F5E9; color: #2E7D32; } &--danger { background: #FFEBEE; color: #C62828; } }
.tab { padding: 7px 16px; border-radius: 16px; font-size: 12px; font-weight: 600; background: #fff; border: 1px solid $color-warm-gray-200; cursor: pointer; &.active { background: $color-primary; color: #fff; border-color: $color-primary; } }
.btn-primary { padding: 10px 20px; background: linear-gradient(135deg,$color-primary,$color-primary-light); color: #fff; border-radius: 8px; font-weight: 600; font-size: 13px; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
.btn-sm { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; background: #fff; border: 1px solid $color-warm-gray-200; cursor: pointer; &--danger { border-color: #EF5350; color: #EF5350; } }
.chart-bars { display: flex; align-items: flex-end; gap: 12px; height: 180px; padding-top: 20px; }
.chart-bar { flex: 1; display: flex; flex-direction: column; align-items: center; height: 100%; justify-content: flex-end;
  &__fill { width: 100%; background: linear-gradient(180deg, $color-primary-light, $color-primary); border-radius: 6px 6px 0 0; transition: height .5s; min-height: 4px; }
  &__label { font-size: 11px; color: $color-warm-gray-400; margin-top: 6px; }
  &__value { font-size: 10px; font-weight: 600; color: $color-primary; margin-bottom: 4px; }
}
.form-field { margin-bottom: 12px; label { display: block; font-size: 12px; font-weight: 600; color: $color-warm-gray-500; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .5px; } }
.input { width: 100%; padding: 10px 12px; border: 1px solid $color-warm-gray-200; border-radius: 8px; font-size: 14px; outline: none; &:focus { border-color: $color-primary-light; } }
</style>
