<template>
  <div class="auth-page">
    <div class="auth-page__bg"><img src="/images/hero-banner-2.jpg" alt="" /><div class="auth-page__overlay"></div></div>
    <div class="auth-card" style="max-width:500px">
      <div class="auth-card__header">
        <router-link to="/"><img src="/images/logo.png" alt="Terroir Direct" style="height:56px" /></router-link>
        <h2>Đăng ký tài khoản</h2>
        <p>Tham gia cộng đồng nông sản sạch</p>
      </div>
      <div class="auth-card__body">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
          <div class="auth-field"><label>Họ</label><InputText v-model="form.lastName" class="w-full" /></div>
          <div class="auth-field"><label>Tên</label><InputText v-model="form.firstName" class="w-full" /></div>
        </div>
        <div class="auth-field"><label>Email</label><InputText v-model="form.email" type="email" class="w-full" /></div>
        <div class="auth-field"><label>Số điện thoại</label><InputText v-model="form.phone" class="w-full" /></div>
        <div class="auth-field"><label>Mật khẩu</label><Password v-model="form.password" class="w-full" toggleMask /></div>
        <div class="auth-field"><label>Xác nhận mật khẩu</label><Password v-model="form.confirmPassword" :feedback="false" class="w-full" toggleMask /></div>
        <div style="display:flex;align-items:center;gap:8px;margin:16px 0"><Checkbox v-model="terms" :binary="true" inputId="terms" /><label for="terms" style="font-size:13px;cursor:pointer">Tôi đồng ý với <a href="#" style="color:#2D5016">Điều khoản sử dụng</a></label></div>
        <Button label="Đăng ký" icon="pi pi-user-plus" class="td-btn-primary w-full" />
        <Divider align="center"><span style="font-size:13px;color:#8C7A66">hoặc</span></Divider>
        <Button label="Đăng ký với Google" icon="pi pi-google" severity="secondary" outlined class="w-full" />
        <p style="text-align:center;margin-top:20px;font-size:14px">Đã có tài khoản? <router-link to="/dang-nhap" style="font-weight:600;color:#2D5016">Đăng nhập</router-link></p>
        <Divider /><p style="text-align:center;font-size:13px;color:#8C7A66">Bạn là hợp tác xã? <a href="#" style="font-weight:600;color:#2D5016">Đăng ký HTX tại đây</a></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
const form = ref({ firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '' })
const terms = ref(false)
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
.auth-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; position: relative; padding: 24px;
  &__bg { position: absolute; inset: 0; img { width: 100%; height: 100%; object-fit: cover; } }
  &__overlay { position: absolute; inset: 0; background: rgba(26,18,8,.7); backdrop-filter: blur(4px); }
}
.auth-card { position: relative; z-index: 1; background: #fff; border-radius: 16px; width: 100%; box-shadow: 0 16px 50px rgba(26,18,8,.16); overflow: hidden;
  &__header { text-align: center; padding: 28px 32px 0; h2 { font-family: 'Playfair Display', serif; margin: 12px 0 4px; } p { color: #8C7A66; font-size: 14px; } }
  &__body { padding: 20px 32px 28px; }
}
.auth-field { margin-bottom: 14px; label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; } }
</style>
