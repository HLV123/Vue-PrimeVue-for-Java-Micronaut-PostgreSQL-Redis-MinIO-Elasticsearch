<template>
  <div class="container" style="padding:60px 0;max-width:600px;margin:auto;text-align:center">
    <div class="confirm-icon"><i class="pi pi-check"></i></div>
    <h1 class="confirm-title">Đặt Hàng Thành Công!</h1>
    <p class="confirm-sub">Cảm ơn bạn đã tin tưởng Terroir Direct.<br/>Đơn hàng của bạn đang được xử lý.</p>
    <div class="confirm-box">
      <div class="confirm-row"><span>Mã đơn hàng</span><strong>#TD-20260211-005</strong></div>
      <div class="confirm-row"><span>Thời gian</span><strong>{{ new Date().toLocaleString("vi-VN") }}</strong></div>
      <div class="confirm-row"><span>Phương thức</span><strong>Thanh toán khi nhận hàng</strong></div>
      <div class="confirm-row"><span>Dự kiến giao</span><strong>13-14/02/2026</strong></div>
    </div>
    <div class="confirm-actions">
      <router-link to="/don-hang"><button class="btn-primary">Xem đơn hàng</button></router-link>
      <router-link to="/san-pham"><button class="btn-outline">Tiếp tục mua sắm</button></router-link>
    </div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
.confirm-icon { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg,$color-primary,$color-primary-light); margin: 0 auto 24px; display: flex; align-items: center; justify-content: center; i { font-size: 2rem; color: #fff; } }
.confirm-title { font-family: $font-display; font-size: 28px; margin-bottom: 12px; }
.confirm-sub { color: $color-warm-gray-500; margin-bottom: 28px; line-height: 1.7; }
.confirm-box { background: $color-warm-gray-100; border-radius: 12px; padding: 24px; text-align: left; margin-bottom: 28px; }
.confirm-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; span { color: $color-warm-gray-500; } strong { color: $color-warm-gray-800; } }
.confirm-actions { display: flex; gap: 12px; justify-content: center; }
.btn-primary { padding: 12px 28px; background: linear-gradient(135deg,$color-primary,$color-primary-light); color: #fff; border-radius: 10px; font-weight: 700; border: none; cursor: pointer; }
.btn-outline { padding: 12px 28px; border: 2px solid $color-primary; color: $color-primary; border-radius: 10px; font-weight: 700; background: #fff; cursor: pointer; }
</style>