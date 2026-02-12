<template>
  <div class="container profile-page">
    <h1 class="page-title">Tài Khoản Của Tôi</h1>
    <div class="profile-grid">
      <aside class="profile-sidebar">
        <div class="profile-avatar">
          <div class="avatar-circle">{{ initial }}</div>
          <strong>{{ fullName }}</strong>
          <span>{{ authStore.user?.email }}</span>
        </div>
        <nav class="profile-nav">
          <a v-for="tab in tabs" :key="tab.key" :class="{ active: activeTab === tab.key }" @click="activeTab = tab.key">
            <i :class="tab.icon"></i> {{ tab.label }}
          </a>
        </nav>
      </aside>
      <div class="profile-content">
        <!-- Info Tab -->
        <div v-if="activeTab === 'info'" class="profile-section">
          <h2>Thông tin cá nhân</h2>
          <div class="form-grid">
            <div class="form-field"><label>Họ</label><InputText :value="authStore.user?.lastName" class="w-full" /></div>
            <div class="form-field"><label>Tên</label><InputText :value="authStore.user?.firstName" class="w-full" /></div>
            <div class="form-field"><label>Email</label><InputText :value="authStore.user?.email" class="w-full" /></div>
            <div class="form-field"><label>Số điện thoại</label><InputText :value="authStore.user?.phone" class="w-full" /></div>
          </div>
          <Button label="Cập nhật" icon="pi pi-check" class="td-btn-primary" style="margin-top:20px" />
        </div>
        <!-- Addresses Tab -->
        <div v-if="activeTab === 'addresses'" class="profile-section">
          <h2>Địa chỉ giao hàng</h2>
          <div v-for="addr in addresses" :key="addr.id" class="address-card">
            <div><strong>{{ addr.name }}</strong> <span v-if="addr.isDefault" class="default-badge">Mặc định</span></div>
            <p>{{ addr.phone }}</p>
            <p>{{ addr.address }}, {{ addr.ward }}, {{ addr.district }}, {{ addr.city }}</p>
          </div>
          <Button label="Thêm địa chỉ mới" icon="pi pi-plus" severity="secondary" outlined style="margin-top:12px" />
        </div>
        <!-- Password Tab -->
        <div v-if="activeTab === 'password'" class="profile-section">
          <h2>Đổi mật khẩu</h2>
          <div style="max-width:400px">
            <div class="form-field"><label>Mật khẩu hiện tại</label><Password class="w-full" :feedback="false" toggleMask /></div>
            <div class="form-field"><label>Mật khẩu mới</label><Password class="w-full" toggleMask /></div>
            <div class="form-field"><label>Xác nhận mật khẩu</label><Password class="w-full" :feedback="false" toggleMask /></div>
          </div>
          <Button label="Đổi mật khẩu" icon="pi pi-lock" class="td-btn-primary" style="margin-top:20px" />
        </div>
        <!-- Notifications Tab -->
        <div v-if="activeTab === 'notifications'" class="profile-section">
          <h2>Thông báo</h2>
          <div v-for="n in notifications" :key="n.id" :class="['notif-item', { unread: !n.read }]">
            <i :class="n.type === 'ORDER' ? 'pi pi-shopping-bag' : 'pi pi-megaphone'" :style="{ color: n.type === 'ORDER' ? '#1565C0' : '#E65100' }"></i>
            <div>
              <strong>{{ n.title }}</strong>
              <p>{{ n.message }}</p>
              <span>{{ new Date(n.createdAt).toLocaleString('vi-VN') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { mockNotifications } from '@/mock/data.js'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
const authStore = useAuthStore()
const activeTab = ref('info')
const initial = computed(() => authStore.user?.firstName?.charAt(0)?.toUpperCase() || 'U')
const fullName = computed(() => authStore.user ? `${authStore.user.lastName} ${authStore.user.firstName}` : '')
const addresses = computed(() => authStore.user?.addresses || [{ id: 1, name: 'Nguyễn Văn Minh', phone: '0901234567', address: '123 Nguyễn Huệ', ward: 'P. Bến Nghé', district: 'Quận 1', city: 'TP.HCM', isDefault: true }])
const notifications = mockNotifications
const tabs = [
  { key: 'info', label: 'Thông tin cá nhân', icon: 'pi pi-user' },
  { key: 'addresses', label: 'Địa chỉ giao hàng', icon: 'pi pi-map-marker' },
  { key: 'password', label: 'Đổi mật khẩu', icon: 'pi pi-lock' },
  { key: 'notifications', label: 'Thông báo', icon: 'pi pi-bell' },
]
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.profile-page { padding: 36px 0 60px; }
.page-title { font-family: $font-display; font-size: 28px; margin-bottom: 28px; }
.profile-grid { display: grid; grid-template-columns: 1fr; @include respond-to(lg) { grid-template-columns: 260px 1fr; } gap: 32px; }
.profile-avatar { text-align: center; margin-bottom: 20px; strong { display: block; margin-top: 12px; font-size: 16px; } span { font-size: 13px; color: $color-warm-gray-400; } }
.avatar-circle { width: 72px; height: 72px; border-radius: 50%; background: linear-gradient(135deg, $color-primary, $color-primary-light); color: #fff; font-size: 28px; font-weight: 700; @include flex-center; margin: 0 auto; }
.profile-nav { display: flex; flex-direction: column; gap: 4px; a { display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 10px; font-size: 14px; color: $color-warm-gray-600; cursor: pointer; transition: all .15s; &:hover { background: $color-warm-gray-100; } &.active { background: rgba(45,80,22,.08); color: $color-primary; font-weight: 600; } } }
.profile-section { background: #fff; border-radius: 12px; padding: 28px; box-shadow: $shadow-sm; h2 { font-family: $font-display; font-size: 20px; margin-bottom: 20px; } }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { margin-bottom: 16px; label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; } }
.address-card { background: $color-warm-gray-100; border-radius: 10px; padding: 16px; margin-bottom: 10px; p { font-size: 14px; color: $color-warm-gray-600; margin-top: 2px; } }
.default-badge { display: inline-block; background: $color-primary; color: #fff; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; margin-left: 8px; }
.notif-item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid $color-warm-gray-100; &.unread { background: rgba(45,80,22,.03); margin: 0 -28px; padding: 14px 28px; } i { font-size: 1.2rem; margin-top: 2px; } strong { display: block; font-size: 14px; } p { font-size: 13px; color: $color-warm-gray-500; margin: 2px 0; } span { font-size: 11px; color: $color-warm-gray-400; } }
</style>
