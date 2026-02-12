<template>
  <div class="container" style="padding:40px 0 60px">
    <h1 class="page-title">Giỏ Hàng</h1>
    <div v-if="cartStore.items.length === 0" class="empty-state">
      <i class="pi pi-shopping-cart" style="font-size:4rem;color:#D4C8B5"></i>
      <h3>Giỏ hàng trống</h3>
      <p style="color:#8C7A66">Hãy khám phá các sản phẩm nông sản sạch!</p>
      <router-link to="/san-pham"><button class="hero__btn hero__btn--primary" style="margin-top:16px">Tiếp tục mua sắm</button></router-link>
    </div>
    <div v-else class="cart-layout">
      <div class="cart-items">
        <div v-for="item in cartStore.items" :key="item.productId" class="cart-item">
          <img :src="item.image || '/images/category-vegetables.jpg'" :alt="item.name" />
          <div class="cart-item__info">
            <router-link :to="'/san-pham/'+item.slug" class="cart-item__name">{{ item.name }}</router-link>
            <div class="cart-item__coop">{{ item.cooperativeName }}</div>
          </div>
          <div class="cart-item__price">{{ formatCurrency(item.salePrice || item.price) }}</div>
          <div class="cart-item__qty">
            <button @click="cartStore.updateQuantity(item.productId, item.quantity-1)">−</button>
            <span>{{ item.quantity }}</span>
            <button @click="cartStore.updateQuantity(item.productId, item.quantity+1)">+</button>
          </div>
          <div class="cart-item__total">{{ formatCurrency((item.salePrice || item.price) * item.quantity) }}</div>
          <button class="cart-item__remove" @click="cartStore.removeItem(item.productId)"><i class="pi pi-trash"></i></button>
        </div>
      </div>
      <div class="cart-summary">
        <h3>Tóm tắt đơn hàng</h3>
        <div class="cart-summary__row"><span>Tạm tính</span><span>{{ formatCurrency(cartStore.subtotal) }}</span></div>
        <div class="cart-summary__row"><span>Phí giao hàng</span><span>{{ cartStore.shippingFee === 0 ? 'Miễn phí' : formatCurrency(cartStore.shippingFee) }}</span></div>
        <div class="cart-summary__divider"></div>
        <div class="cart-summary__row total"><span>Tổng cộng</span><span>{{ formatCurrency(cartStore.total) }}</span></div>
        <router-link to="/thanh-toan"><button class="hero__btn hero__btn--primary" style="width:100%;margin-top:16px;justify-content:center">Thanh toán</button></router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCartStore } from '@/stores/cart'
import { formatCurrency } from '@/utils/formatters'
const cartStore = useCartStore()
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.page-title { font-family: $font-display; font-size: 28px; margin-bottom: 24px; }
.empty-state { text-align: center; padding: 60px 0; h3 { font-family: $font-display; margin: 16px 0 8px; } }
.cart-layout { display: grid; grid-template-columns: 1fr; @include respond-to(lg) { grid-template-columns: 1fr 360px; } gap: 32px; }
.cart-items { display: flex; flex-direction: column; gap: 16px; }
.cart-item {
  display: flex; align-items: center; gap: 16px; background: #fff; padding: 16px; border-radius: $radius-lg; box-shadow: $shadow-sm;
  img { width: 80px; height: 80px; object-fit: cover; border-radius: $radius-md; }
  &__info { flex: 1; }
  &__name { font-weight: 600; font-size: 15px; color: $color-warm-gray-800; display: block; &:hover { color: $color-primary; } }
  &__coop { font-size: 12px; color: $color-primary; margin-top: 4px; }
  &__price { font-weight: 600; color: $color-warm-gray-700; min-width: 100px; text-align: right; }
  &__qty {
    display: flex; border: 1px solid $color-warm-gray-200; border-radius: $radius-md; overflow: hidden;
    button { width: 32px; height: 32px; @include flex-center; background: $color-warm-gray-100; }
    span { width: 40px; @include flex-center; font-weight: 600; }
  }
  &__total { font-family: $font-display; font-weight: 700; color: $color-danger; min-width: 110px; text-align: right; }
  &__remove { color: $color-warm-gray-400; &:hover { color: $color-danger; } }
}
.cart-summary {
  background: #fff; padding: 24px; border-radius: $radius-lg; box-shadow: $shadow-sm; position: sticky; top: 120px; height: fit-content;
  h3 { font-family: $font-display; font-size: 18px; margin-bottom: 16px; }
  &__row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; color: $color-warm-gray-600;
    &.total { font-size: 18px; font-weight: 700; color: $color-danger; font-family: $font-display; }
  }
  &__divider { height: 1px; background: $color-warm-gray-200; margin: 8px 0; }
}
</style>
