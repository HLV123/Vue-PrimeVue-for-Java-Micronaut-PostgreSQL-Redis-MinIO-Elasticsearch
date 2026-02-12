<template>
  <div class="container oh-page">
    <h1 class="page-title">Đơn Hàng Của Tôi</h1>
    <div class="oh-tabs">
      <button v-for="tab in tabs" :key="tab.key" :class="['oh-tab', { active: activeTab === tab.key }]" @click="activeTab = tab.key">{{ tab.label }} <span v-if="tab.count">({{ tab.count }})</span></button>
    </div>
    <div v-if="filteredOrders.length === 0" class="oh-empty"><i class="pi pi-inbox" style="font-size:3rem;color:#D4C8B5"></i><p>Không có đơn hàng nào</p></div>
    <div v-else class="oh-list">
      <div v-for="o in filteredOrders" :key="o.id" class="oh-card">
        <div class="oh-card__header">
          <span class="oh-card__code">{{ o.code }}</span>
          <span class="oh-card__date">{{ formatDate(o.createdAt) }}</span>
          <span :class="['oh-status', 'oh-status--' + o.status.toLowerCase()]">{{ o.statusLabel }}</span>
        </div>
        <div class="oh-card__items">
          <div v-for="item in o.items" :key="item.productId" class="oh-card__item">
            <img :src="item.image" /><div><strong>{{ item.name }}</strong><span>x{{ item.quantity }} · {{ formatCurrency(item.price) }}</span></div>
          </div>
        </div>
        <div class="oh-card__footer">
          <div class="oh-card__total">Tổng: <strong>{{ formatCurrency(o.total) }}</strong></div>
          <div class="oh-card__actions">
            <router-link :to="'/don-hang/' + o.id"><button class="btn-sm btn-outline-sm">Chi tiết</button></router-link>
            <button v-if="o.status === 'PENDING'" class="btn-sm btn-danger-sm" @click="cancelOrder(o.id)">Hủy đơn</button>
            <button v-if="o.status === 'DELIVERED'" class="btn-sm btn-primary-sm">Mua lại</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from "vue"
import { mockOrders } from "@/mock/data.js"
import { formatCurrency, formatDateTime } from "@/utils/formatters"
const activeTab = ref("all")
const allOrders = ref([...mockOrders])
const tabs = computed(() => [
  { key: "all", label: "Tất cả", count: allOrders.value.length },
  { key: "PENDING", label: "Chờ xác nhận", count: allOrders.value.filter(o => o.status === "PENDING").length },
  { key: "SHIPPING", label: "Đang giao", count: allOrders.value.filter(o => o.status === "SHIPPING").length },
  { key: "DELIVERED", label: "Đã giao", count: allOrders.value.filter(o => o.status === "DELIVERED").length },
  { key: "CANCELLED", label: "Đã hủy", count: allOrders.value.filter(o => o.status === "CANCELLED").length },
])
const filteredOrders = computed(() => activeTab.value === "all" ? allOrders.value : allOrders.value.filter(o => o.status === activeTab.value))
function formatDate(d) { return new Date(d).toLocaleDateString("vi-VN") }
function cancelOrder(id) { const o = allOrders.value.find(o => o.id === id); if (o) { o.status = "CANCELLED"; o.statusLabel = "Đã hủy" } }
</script>
<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;
.oh-page { padding: 36px 0 60px; }
.page-title { font-family: $font-display; font-size: 28px; margin-bottom: 24px; }
.oh-tabs { display: flex; gap: 6px; margin-bottom: 24px; flex-wrap: wrap; }
.oh-tab { padding: 8px 18px; border-radius: 20px; font-size: 13px; font-weight: 600; background: $color-warm-gray-100; color: $color-warm-gray-600; border: none; cursor: pointer; &.active { background: $color-primary; color: #fff; } span { opacity: .7; } }
.oh-empty { text-align: center; padding: 60px 0; p { color: $color-warm-gray-400; margin-top: 16px; } }
.oh-list { display: flex; flex-direction: column; gap: 16px; }
.oh-card { background: #fff; border-radius: 12px; box-shadow: 0 1px 3px rgba(26,18,8,.06); overflow: hidden; &__header { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid $color-warm-gray-100; } &__code { font-weight: 700; font-size: 14px; } &__date { font-size: 13px; color: $color-warm-gray-400; margin-right: auto; } &__items { padding: 12px 20px; } &__item { display: flex; align-items: center; gap: 12px; padding: 8px 0; img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; } strong { display: block; font-size: 14px; } span { font-size: 12px; color: $color-warm-gray-400; } } &__footer { display: flex; align-items: center; justify-content: space-between; padding: 12px 20px; border-top: 1px solid $color-warm-gray-100; background: $color-warm-gray-100; } &__total { font-size: 15px; strong { color: $color-danger; font-family: $font-display; font-size: 18px; } } &__actions { display: flex; gap: 8px; } }
.oh-status { padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; &--pending { background: #FFF3E0; color: #E65100; } &--shipping { background: #E3F2FD; color: #1565C0; } &--delivered { background: #E8F5E9; color: #2E7D32; } &--cancelled { background: #FFEBEE; color: #C62828; } }
.btn-sm { padding: 6px 16px; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; border: none; }
.btn-outline-sm { background: #fff; border: 1px solid $color-warm-gray-300; color: $color-warm-gray-700; &:hover { border-color: $color-primary; color: $color-primary; } }
.btn-primary-sm { background: $color-primary; color: #fff; }
.btn-danger-sm { background: #fff; border: 1px solid #EF5350; color: #EF5350; }
</style>