<template>
  <div class="auth-page">
    <div class="auth-page__bg"><img src="/images/hero-banner.jpg" alt="" /><div class="auth-page__overlay"></div></div>
    <div class="auth-card">
      <div class="auth-card__header">
        <router-link to="/"><img src="/images/logo.png" alt="Terroir Direct" style="height:56px" /></router-link>
        <h2>Đăng nhập</h2>
        <p>Chào mừng bạn quay trở lại!</p>
      </div>
      <div class="auth-card__body">
        <Message v-if="authStore.error" severity="error" :closable="false" style="margin-bottom:16px">{{ authStore.error }}</Message>
        <div class="auth-demo">
          <strong>Tài khoản demo:</strong>
          <div class="auth-demo__accounts">
            <button @click="fillDemo('user@terroir.vn')">👤 Khách hàng</button>
            <button @click="fillDemo('htx@terroir.vn')">🏠 HTX</button>
            <button @click="fillDemo('admin@terroir.vn')">⚙️ Admin</button>
          </div>
        </div>
        <div class="auth-field"><label>Email</label><InputText v-model="form.email" type="email" class="w-full" placeholder="email@example.com" /></div>
        <div class="auth-field"><label>Mật khẩu</label><Password v-model="form.password" :feedback="false" class="w-full" toggleMask placeholder="Nhập mật khẩu" /></div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin:12px 0 20px"><div style="display:flex;align-items:center;gap:8px"><Checkbox v-model="remember" :binary="true" inputId="rm" /><label for="rm" style="font-size:13px;cursor:pointer">Ghi nhớ</label></div><a href="#" style="font-size:13px">Quên mật khẩu?</a></div>
        <Button label="Đăng nhập" icon="pi pi-sign-in" class="td-btn-primary w-full" @click="handleLogin" :loading="authStore.isLoading" />
        <Divider align="center"><span style="font-size:13px;color:#8C7A66">hoặc</span></Divider>
        <Button label="Đăng nhập với Google" icon="pi pi-google" severity="secondary" outlined class="w-full" />
        <p style="text-align:center;margin-top:20px;font-size:14px">Chưa có tài khoản? <router-link to="/dang-ky" style="font-weight:600;color:#2D5016">Đăng ký ngay</router-link></p>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Checkbox from 'primevue/checkbox'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import Message from 'primevue/message'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const form = ref({ email: 'user@terroir.vn', password: '123456' })
const remember = ref(true)

function fillDemo(email) {
  form.value.email = email
  form.value.password = '123456'
}

async function handleLogin() {
  try {
    const data = await authStore.login(form.value)
    const user = data.user || data
    const redirect = route.query.redirect || '/'
    if (user.role === 'COOPERATIVE') router.push('/dashboard/htx')
    else if (user.role === 'ADMIN') router.push('/dashboard/admin')
    else router.push(redirect)
  } catch (e) { /* error displayed via store */ }
}
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.auth-page { min-height: 100vh; @include flex-center; position: relative; padding: 24px;
  &__bg { position: absolute; inset: 0; img { width: 100%; height: 100%; object-fit: cover; } }
  &__overlay { position: absolute; inset: 0; background: rgba(26,18,8,.7); backdrop-filter: blur(4px); }
}
.auth-card { position: relative; z-index: 1; background: #fff; border-radius: $radius-xl; width: 100%; max-width: 440px; box-shadow: $shadow-xl; overflow: hidden;
  &__header { text-align: center; padding: 28px 32px 0; h2 { font-family: $font-display; margin: 14px 0 4px; } p { color: $color-warm-gray-500; font-size: 14px; } }
  &__body { padding: 20px 32px 28px; }
}
.auth-field { margin-bottom: 14px; label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; color: $color-warm-gray-700; } }
.auth-demo {
  background: $color-warm-gray-100; border-radius: $radius-md; padding: 12px 16px; margin-bottom: 20px;
  strong { font-size: 13px; color: $color-warm-gray-600; display: block; margin-bottom: 8px; }
  &__accounts { display: flex; gap: 6px; }
  button {
    flex: 1; padding: 6px 10px; font-size: 12px; font-weight: 600;
    border: 1px solid $color-warm-gray-200; border-radius: $radius-sm; background: #fff;
    cursor: pointer; transition: all .15s;
    &:hover { border-color: $color-primary; color: $color-primary; background: rgba(45,80,22,.05); }
  }
}
</style>
