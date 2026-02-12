<template>
  <div class="container checkout-page">
    <h1 class="page-title">Thanh Toán</h1>
    <div class="checkout-grid">
      <div class="checkout-form">
        <div class="checkout-section">
          <h3><i class="pi pi-map-marker"></i> Địa chỉ giao hàng</h3>
          <div class="form-grid">
            <div class="form-field"><label>Họ tên *</label><InputText v-model="form.name" class="w-full" placeholder="Nguyễn Văn Minh" /></div>
            <div class="form-field"><label>Số điện thoại *</label><InputText v-model="form.phone" class="w-full" placeholder="0901 234 567" /></div>
            <div class="form-field full-width"><label>Địa chỉ *</label><InputText v-model="form.address" class="w-full" placeholder="Số nhà, đường" /></div>
            <div class="form-field"><label>Tỉnh/Thành phố</label><InputText v-model="form.city" class="w-full" placeholder="TP. Hồ Chí Minh" /></div>
            <div class="form-field"><label>Quận/Huyện</label><InputText v-model="form.district" class="w-full" placeholder="Quận 1" /></div>
            <div class="form-field full-width"><label>Ghi chú</label><Textarea v-model="form.note" rows="3" class="w-full" placeholder="Ghi chú cho đơn hàng..." /></div>
          </div>
        </div>
        <div class="checkout-section">
          <h3><i class="pi pi-credit-card"></i> Phương thức thanh toán</h3>
          <div class="payment-options">
            <div v-for="pm in paymentMethods" :key="pm.value" :class="['payment-option', { active: form.paymentMethod === pm.value }]" @click="form.paymentMethod = pm.value">
              <RadioButton :value="pm.value" v-model="form.paymentMethod" /><i :class="pm.icon" style="font-size:1.2rem"></i>
              <div><strong>{{ pm.label }}</strong><span>{{ pm.desc }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-summary">
        <h3>Đơn hàng ({{ cartStore.itemCount }} sản phẩm)</h3>
        <div v-for="item in cartStore.items" :key="item.productId" class="checkout-item">
          <img :src="item.image || '/images/category-vegetables.jpg'" />
          <div class="checkout-item__info"><strong>{{ item.name }}</strong><span>x{{ item.quantity }} · {{ item.unit }}</span></div>
          <span class="checkout-item__price">{{ formatCurrency((item.salePrice || item.price) * item.quantity) }}</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row"><span>Tạm tính</span><span>{{ formatCurrency(cartStore.subtotal) }}</span></div>
        <div class="summary-row"><span>Phí giao hàng</span><span>{{ cartStore.shippingFee === 0 ? 'Miễn phí' : formatCurrency(cartStore.shippingFee) }}</span></div>
        <div class="summary-row" v-if="cartStore.discount > 0"><span>Giảm giá</span><span style="color:#2D5016">-{{ formatCurrency(cartStore.discount) }}</span></div>
        <div class="summary-divider"></div>
        <div class="summary-row total"><span>Tổng cộng</span><span>{{ formatCurrency(cartStore.total) }}</span></div>
        <div class="voucher-input"><InputText v-model="voucherCode" placeholder="Nhập mã giảm giá..." class="w-full" /><Button label="Áp dụng" severity="secondary" outlined size="small" @click="applyVoucher" /></div>
        <Button label="Đặt hàng" icon="pi pi-check" class="td-btn-primary w-full" style="margin-top:16px" @click="placeOrder" />
        <p style="font-size:12px;color:#8C7A66;text-align:center;margin-top:10px"><i class="pi pi-lock" style="font-size:10px"></i> Thanh toán an toàn & bảo mật</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useCartStore } from "@/stores/cart"
import { formatCurrency } from "@/utils/formatters"
import { useToast } from "primevue/usetoast"
import InputText from "primevue/inputtext"
import Textarea from "primevue/textarea"
import RadioButton from "primevue/radiobutton"
import Button from "primevue/button"
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()
const voucherCode = ref("")
const form = ref({ name: "Nguyễn Văn Minh", phone: "0901234567", address: "123 Nguyễn Huệ", city: "TP. Hồ Chí Minh", district: "Quận 1", note: "", paymentMethod: "COD" })
const paymentMethods = [
  { value: "COD", label: "Thanh toán khi nhận hàng", desc: "Trả tiền mặt khi nhận hàng", icon: "pi pi-wallet" },
  { value: "VNPAY", label: "VNPay", desc: "Thẻ ATM/Visa/MasterCard", icon: "pi pi-credit-card" },
  { value: "MOMO", label: "Ví MoMo", desc: "Thanh toán qua ví MoMo", icon: "pi pi-mobile" },
  { value: "BANK_TRANSFER", label: "Chuyển khoản ngân hàng", desc: "Chuyển khoản trực tiếp", icon: "pi pi-building" }
]
function applyVoucher() {
  if (voucherCode.value) {
    cartStore.applyVoucher({ code: voucherCode.value, type: "PERCENTAGE", value: 10, maxDiscount: 50000 })
    toast.add({ severity: "success", summary: "Áp dụng mã thành công!", life: 2000 })
  }
}
function placeOrder() {
  toast.add({ severity: "success", summary: "Đặt hàng thành công!", life: 3000 })
  cartStore.clearCart()
  router.push("/dat-hang-thanh-cong/1")
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;
.checkout-page { padding: 36px 0 60px; }
.page-title { font-family: $font-display; font-size: 28px; margin-bottom: 28px; }
.checkout-grid { display: grid; grid-template-columns: 1fr; @include respond-to(lg) { grid-template-columns: 1fr 400px; } gap: 32px; }
.checkout-section { background: #fff; border-radius: $radius-lg; padding: 24px; box-shadow: $shadow-sm; margin-bottom: 20px; h3 { font-family: $font-display; font-size: 17px; display: flex; align-items: center; gap: 8px; margin-bottom: 20px; } }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: $color-warm-gray-700; } &.full-width { grid-column: 1 / -1; } }
.payment-options { display: flex; flex-direction: column; gap: 10px; }
.payment-option { display: flex; align-items: center; gap: 14px; padding: 14px 18px; border: 2px solid $color-warm-gray-200; border-radius: $radius-md; cursor: pointer; transition: all .2s; &.active { border-color: $color-primary; background: rgba(45,80,22,.03); } strong { display: block; font-size: 14px; } span { font-size: 12px; color: $color-warm-gray-400; } }
.checkout-summary { background: #fff; border-radius: $radius-lg; padding: 24px; box-shadow: $shadow-sm; position: sticky; top: 120px; height: fit-content; h3 { font-family: $font-display; font-size: 17px; margin-bottom: 16px; } }
.checkout-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; img { width: 56px; height: 56px; border-radius: $radius-md; object-fit: cover; } &__info { flex: 1; strong { display: block; font-size: 13px; } span { font-size: 12px; color: $color-warm-gray-400; } } &__price { font-weight: 600; font-size: 14px; white-space: nowrap; } }
.summary-divider { height: 1px; background: $color-warm-gray-200; margin: 12px 0; }
.summary-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 14px; color: $color-warm-gray-600; &.total { font-size: 20px; font-weight: 700; color: $color-danger; font-family: $font-display; } }
.voucher-input { display: flex; gap: 8px; margin-top: 12px; }
</style>