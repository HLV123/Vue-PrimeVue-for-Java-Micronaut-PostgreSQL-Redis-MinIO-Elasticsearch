<template>
  <div class="container od-page">
    <nav class="od-breadcrumb"><router-link to="/">Trang chủ</router-link><i class="pi pi-angle-right"></i><router-link to="/don-hang">Đơn hàng</router-link><i class="pi pi-angle-right"></i><span>{{ order.code }}</span></nav>
    <div class="od-header"><h1>{{ order.code }}</h1><span :class="['oh-status', 'oh-status--' + order.status.toLowerCase()]">{{ order.statusLabel }}</span></div>
    <div class="od-grid">
      <div class="od-main">
        <div class="od-section"><h3>Tiến trình đơn hàng</h3>
          <div class="od-timeline">
            <div v-for="(step, idx) in order.trackingTimeline" :key="idx" class="od-step">
              <div class="od-step__dot" :class="{ active: idx === order.trackingTimeline.length - 1 }"><i class="pi pi-check"></i></div>
              <div class="od-step__content"><strong>{{ step.status }}</strong><span>{{ step.date }}</span><p>{{ step.desc }}</p></div>
            </div>
          </div>
        </div>
        <div class="od-section"><h3>Sản phẩm</h3>
          <div v-for="item in order.items" :key="item.productId" class="od-item">
            <img :src="item.image" /><div class="od-item__info"><strong>{{ item.name }}</strong><span>x{{ item.quantity }} · {{ item.unit }}</span></div>
            <strong>{{ formatCurrency(item.price * item.quantity) }}</strong>
          </div>
        </div>
      </div>
      <div class="od-sidebar">
        <div class="od-section"><h3>Địa chỉ giao hàng</h3><p><strong>{{ order.shippingAddress?.name }}</strong></p><p>{{ order.shippingAddress?.phone }}</p><p>{{ order.shippingAddress?.address }}</p></div>
        <div class="od-section"><h3>Thanh toán</h3><p>{{ order.paymentMethodLabel }}</p></div>
        <div class="od-section"><h3>Tóm tắt</h3>
          <div class="summary-row"><span>Tạm tính</span><span>{{ formatCurrency(order.subtotal) }}</span></div>
          <div class="summary-row"><span>Phí giao hàng</span><span>{{ order.shippingFee === 0 ? "Miễn phí" : formatCurrency(order.shippingFee) }}</span></div>
          <div v-if="order.discount > 0" class="summary-row"><span>Giảm giá</span><span>-{{ formatCurrency(order.discount) }}</span></div>
          <div class="summary-divider"></div>
          <div class="summary-row total"><span>Tổng cộng</span><span>{{ formatCurrency(order.total) }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { mockOrders } from "@/mock/data.js"
import { formatCurrency } from "@/utils/formatters"
const route = useRoute()
const order = computed(() => { const id = parseInt(route.params.id); return mockOrders.find(o => o.id === id) || mockOrders[0] })
</script>
<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;
.od-page { padding: 24px 0 60px; }
.od-breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 20px; a { color: $color-warm-gray-400; &:hover { color: $color-primary; } } i { font-size: 10px; color: $color-warm-gray-300; } span { color: $color-warm-gray-700; } }
.od-header { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; h1 { font-family: $font-display; font-size: 24px; } }
.od-grid { display: grid; grid-template-columns: 1fr; @include respond-to(lg) { grid-template-columns: 1fr 360px; } gap: 24px; }
.od-section { background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,.06); margin-bottom: 20px; h3 { font-family: $font-display; font-size: 16px; margin-bottom: 16px; } }
.od-timeline { padding-left: 16px; }
.od-step { display: flex; gap: 14px; position: relative; padding-bottom: 24px; &:not(:last-child)::before { content: ""; position: absolute; left: 14px; top: 34px; bottom: 0; width: 2px; background: $color-warm-gray-200; } &__dot { width: 30px; height: 30px; border-radius: 50%; background: $color-warm-gray-200; color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: .7rem; &.active { background: $color-primary; } } &__content { strong { display: block; font-size: 14px; } span { font-size: 12px; color: $color-warm-gray-400; } p { font-size: 13px; color: $color-warm-gray-500; margin-top: 4px; } } }
.od-item { display: flex; align-items: center; gap: 14px; padding: 12px 0; border-bottom: 1px solid $color-warm-gray-100; img { width: 56px; height: 56px; border-radius: 8px; object-fit: cover; } &__info { flex: 1; strong { display: block; font-size: 14px; } span { font-size: 12px; color: $color-warm-gray-400; } } strong:last-child { font-family: $font-display; font-size: 15px; } }
.oh-status { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; &--pending { background: #FFF3E0; color: #E65100; } &--shipping { background: #E3F2FD; color: #1565C0; } &--delivered { background: #E8F5E9; color: #2E7D32; } &--cancelled { background: #FFEBEE; color: #C62828; } }
.summary-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 14px; color: $color-warm-gray-600; &.total { font-size: 18px; font-weight: 700; color: $color-danger; font-family: $font-display; } }
.summary-divider { height: 1px; background: $color-warm-gray-200; margin: 8px 0; }
</style>