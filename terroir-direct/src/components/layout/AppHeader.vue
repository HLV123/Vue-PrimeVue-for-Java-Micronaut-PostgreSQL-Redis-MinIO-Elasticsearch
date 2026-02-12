<template>
  <header :class="['td-header', { 'td-header--scrolled': isScrolled }]">
    <div class="td-topbar">
      <div class="container td-topbar__inner">
        <div class="td-topbar__left">
          <i class="pi pi-phone"></i><span>Hotline: <strong>1900 6868</strong></span>
          <span class="td-topbar__sep">|</span>
          <i class="pi pi-envelope"></i><span>support@terroirdirect.vn</span>
        </div>
        <div class="td-topbar__right">
          <router-link to="/gioi-thieu">Giới thiệu</router-link>
          <router-link to="/blog">Blog</router-link>
          <router-link to="/lien-he">Liên hệ</router-link>
          <router-link to="/truy-xuat-nguon-goc"><i class="pi pi-qrcode"></i> Truy xuất</router-link>
        </div>
      </div>
    </div>

    <div class="td-header__main">
      <div class="container td-header__inner">
        <router-link to="/" class="td-logo"><img src="/images/logo.png" alt="Terroir Direct" /></router-link>

        <!-- Search - only for consumers/guests -->
        <div class="td-search" v-if="!authStore.isCooperative && !authStore.isAdmin">
          <div class="td-search__box">
            <i class="pi pi-search td-search__icon"></i>
            <input v-model="searchQuery" type="text" placeholder="Tìm nông sản sạch, đặc sản vùng miền..." @keyup.enter="handleSearch" />
            <button class="td-search__btn" @click="handleSearch">Tìm kiếm</button>
          </div>
        </div>
        <!-- Role label for coop/admin -->
        <div v-else class="td-header__role-label">
          <Tag :value="authStore.isCooperative ? 'Hợp tác xã' : 'Quản trị viên'" :severity="authStore.isCooperative ? 'success' : 'danger'" />
        </div>

        <div class="td-header__actions">
          <!-- Consumer-only: Wishlist & Cart -->
          <template v-if="!authStore.isCooperative && !authStore.isAdmin">
            <router-link to="/yeu-thich" class="td-header__action-btn" title="Yêu thích">
              <i class="pi pi-heart"></i><span class="td-header__action-label">Yêu thích</span>
            </router-link>
            <router-link to="/gio-hang" class="td-header__action-btn" title="Giỏ hàng">
              <i class="pi pi-shopping-cart"></i>
              <span v-if="cartCount > 0" class="td-header__badge">{{ cartCount }}</span>
              <span class="td-header__action-label">Giỏ hàng</span>
            </router-link>
          </template>
          <!-- Coop: Quick link to dashboard -->
          <router-link v-if="authStore.isCooperative" to="/dashboard/htx" class="td-header__action-btn">
            <i class="pi pi-chart-bar"></i><span class="td-header__action-label">Dashboard</span>
          </router-link>
          <!-- Admin: Quick link to dashboard -->
          <router-link v-if="authStore.isAdmin" to="/dashboard/admin" class="td-header__action-btn">
            <i class="pi pi-cog"></i><span class="td-header__action-label">Quản trị</span>
          </router-link>

          <!-- Notification bell for logged in -->
          <div v-if="authStore.isAuthenticated" class="td-header__action-btn" title="Thông báo" @click="toggleNotif">
            <i class="pi pi-bell"></i>
            <span v-if="unreadNotifCount > 0" class="td-header__badge">{{ unreadNotifCount }}</span>
            <span class="td-header__action-label">Thông báo</span>
          </div>

          <!-- User menu -->
          <template v-if="authStore.isAuthenticated">
            <div class="td-header__user-btn" @click="toggleUserMenu">
              <div class="td-header__avatar">{{ userInitial }}</div>
              <span class="td-header__action-label">{{ authStore.user?.firstName }}</span>
              <i class="pi pi-chevron-down" style="font-size:0.6rem"></i>
            </div>
            <Menu ref="userMenuRef" :model="userMenuItems" :popup="true" />
          </template>
          <template v-else>
            <router-link to="/dang-nhap" class="td-header__action-btn td-header__action-btn--login">
              <i class="pi pi-user"></i><span class="td-header__action-label">Đăng nhập</span>
            </router-link>
          </template>
        </div>

        <button class="td-header__hamburger" @click="mobileOpen = true"><i class="pi pi-bars"></i></button>
      </div>
    </div>

    <!-- Nav bar - different per role -->
    <nav class="td-nav" v-if="!authStore.isCooperative && !authStore.isAdmin">
      <div class="container td-nav__inner">
        <div class="td-nav__cat-wrap" @mouseenter="catOpen = true" @mouseleave="catOpen = false">
          <button class="td-nav__cat-btn"><i class="pi pi-th-large"></i> Danh mục <i class="pi pi-chevron-down"></i></button>
          <transition name="drop">
            <div v-show="catOpen" class="td-nav__dropdown">
              <router-link v-for="cat in categories" :key="cat.id" :to="`/danh-muc/${cat.slug}`" class="td-nav__drop-item" @click="catOpen = false">
                <i :class="cat.icon"></i><span>{{ cat.name }}</span><i class="pi pi-angle-right"></i>
              </router-link>
            </div>
          </transition>
        </div>
        <div class="td-nav__links">
          <router-link to="/" class="td-nav__link">Trang chủ</router-link>
          <router-link to="/san-pham" class="td-nav__link">Sản phẩm</router-link>
          <router-link to="/hop-tac-xa" class="td-nav__link">Hợp tác xã</router-link>
          <router-link to="/truy-xuat-nguon-goc" class="td-nav__link">Truy xuất nguồn gốc</router-link>
          <router-link to="/san-pham?flashSale=true" class="td-nav__link td-nav__link--flash"><i class="pi pi-bolt"></i> Flash Sale</router-link>
        </div>
      </div>
    </nav>
    <!-- Coop Nav -->
    <nav class="td-nav" v-else-if="authStore.isCooperative">
      <div class="container td-nav__inner">
        <div class="td-nav__links">
          <router-link to="/dashboard/htx" class="td-nav__link">Dashboard</router-link>
          <router-link to="/" class="td-nav__link">Xem cửa hàng</router-link>
          <router-link to="/san-pham" class="td-nav__link">Sản phẩm</router-link>
        </div>
      </div>
    </nav>
    <!-- Admin Nav -->
    <nav class="td-nav td-nav--admin" v-else-if="authStore.isAdmin">
      <div class="container td-nav__inner">
        <div class="td-nav__links">
          <router-link to="/dashboard/admin" class="td-nav__link">Quản trị</router-link>
          <router-link to="/" class="td-nav__link">Xem trang chủ</router-link>
          <router-link to="/san-pham" class="td-nav__link">Sản phẩm</router-link>
          <router-link to="/hop-tac-xa" class="td-nav__link">HTX</router-link>
        </div>
      </div>
    </nav>

    <!-- Mobile Drawer -->
    <Drawer v-model:visible="mobileOpen" position="left" :style="{ width: '300px' }">
      <template #header><img src="/images/logo.png" alt="Terroir Direct" style="height:40px" /></template>
      <div class="td-mobile">
        <input v-if="!authStore.isCooperative && !authStore.isAdmin" v-model="searchQuery" placeholder="Tìm kiếm..." class="td-mobile__search" @keyup.enter="handleSearch; mobileOpen = false" />
        <div v-if="authStore.isAuthenticated" class="td-mobile__user">
          <div class="td-header__avatar" style="width:40px;height:40px;font-size:16px">{{ userInitial }}</div>
          <div><strong>{{ authStore.fullName }}</strong><span style="display:block;font-size:12px;color:#8C7A66">{{ authStore.user?.email }}</span></div>
        </div>
        <nav class="td-mobile__nav">
          <router-link to="/" @click="mobileOpen=false">Trang chủ</router-link>
          <template v-if="!authStore.isCooperative && !authStore.isAdmin">
            <router-link to="/san-pham" @click="mobileOpen=false">Sản phẩm</router-link>
            <router-link to="/hop-tac-xa" @click="mobileOpen=false">Hợp tác xã</router-link>
            <router-link to="/truy-xuat-nguon-goc" @click="mobileOpen=false">Truy xuất nguồn gốc</router-link>
            <router-link to="/gio-hang" @click="mobileOpen=false">Giỏ hàng ({{ cartCount }})</router-link>
            <router-link to="/yeu-thich" @click="mobileOpen=false">Yêu thích</router-link>
          </template>
          <template v-if="authStore.isAuthenticated">
            <router-link v-if="authStore.isConsumer" to="/don-hang" @click="mobileOpen=false">Đơn hàng của tôi</router-link>
            <router-link v-if="authStore.isConsumer" to="/tai-khoan" @click="mobileOpen=false">Tài khoản</router-link>
            <router-link v-if="authStore.isCooperative" to="/dashboard/htx" @click="mobileOpen=false">Dashboard HTX</router-link>
            <router-link v-if="authStore.isAdmin" to="/dashboard/admin" @click="mobileOpen=false">Quản trị</router-link>
          </template>
          <router-link to="/blog" @click="mobileOpen=false">Blog</router-link>
          <router-link to="/gioi-thieu" @click="mobileOpen=false">Giới thiệu</router-link>
          <router-link to="/lien-he" @click="mobileOpen=false">Liên hệ</router-link>
        </nav>
        <div v-if="!authStore.isAuthenticated" class="td-mobile__auth">
          <router-link to="/dang-nhap" @click="mobileOpen=false"><button class="td-mobile__auth-btn td-mobile__auth-btn--primary">Đăng nhập</button></router-link>
          <router-link to="/dang-ky" @click="mobileOpen=false"><button class="td-mobile__auth-btn">Đăng ký</button></router-link>
        </div>
        <button v-else class="td-mobile__logout" @click="handleLogout"><i class="pi pi-sign-out"></i> Đăng xuất</button>
      </div>
    </Drawer>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useNotificationStore } from '@/stores/notification'
import { PRODUCT_CATEGORIES } from '@/utils/constants'
import Menu from 'primevue/menu'
import Drawer from 'primevue/drawer'
import Tag from 'primevue/tag'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const notifStore = useNotificationStore()

const searchQuery = ref('')
const isScrolled = ref(false)
const catOpen = ref(false)
const mobileOpen = ref(false)
const userMenuRef = ref()

const categories = PRODUCT_CATEGORIES
const cartCount = computed(() => cartStore.itemCount)
const unreadNotifCount = computed(() => notifStore.unreadCount)
const userInitial = computed(() => authStore.user?.firstName?.charAt(0)?.toUpperCase() || 'U')

const userMenuItems = computed(() => {
  const items = []
  if (authStore.isConsumer) {
    items.push(
      { label: 'Tài khoản', icon: 'pi pi-user', command: () => router.push('/tai-khoan') },
      { label: 'Đơn hàng', icon: 'pi pi-shopping-bag', command: () => router.push('/don-hang') },
      { label: 'Yêu thích', icon: 'pi pi-heart', command: () => router.push('/yeu-thich') },
      { separator: true }
    )
  }
  if (authStore.isCooperative) {
    items.push(
      { label: 'Dashboard HTX', icon: 'pi pi-chart-bar', command: () => router.push('/dashboard/htx') },
      { separator: true }
    )
  }
  if (authStore.isAdmin) {
    items.push(
      { label: 'Quản trị hệ thống', icon: 'pi pi-cog', command: () => router.push('/dashboard/admin') },
      { separator: true }
    )
  }
  items.push({ label: 'Đăng xuất', icon: 'pi pi-sign-out', command: handleLogout })
  return items
})

function toggleUserMenu(e) { userMenuRef.value.toggle(e) }
function toggleNotif() { router.push('/tai-khoan') }
function handleSearch() { if (searchQuery.value.trim()) { router.push({ path: '/san-pham', query: { q: searchQuery.value.trim() } }); mobileOpen.value = false } }
function handleLogout() { authStore.logout(); mobileOpen.value = false; router.push('/') }
function onScroll() { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.td-topbar {
  background: $color-primary-dark; color: rgba(255,255,255,.82); font-size: 12px; padding: 5px 0;
  display: none; @include respond-to(lg) { display: block; }
  &__inner { @include flex-between; }
  &__left { display: flex; align-items: center; gap: 8px; i { font-size: 10px; } }
  &__right { display: flex; gap: 20px; a { color: rgba(255,255,255,.82); &:hover { color: $color-accent-light; } } }
  &__sep { opacity: .3; }
}

.td-header {
  position: sticky; top: 0; z-index: $z-header; background: $color-warm-white; transition: box-shadow .3s;
  &--scrolled { box-shadow: $shadow-md; .td-topbar { display: none !important; } }
  &__main { padding: 12px 0; border-bottom: 1px solid $color-warm-gray-200; }
  &__inner { display: flex; align-items: center; gap: 20px; }
  &__role-label { flex: 1; display: none; @include respond-to(md) { display: flex; } justify-content: center; }
  &__actions { display: none; @include respond-to(md) { display: flex; } align-items: center; gap: 4px; }
  &__action-btn {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    padding: 6px 10px; border-radius: $radius-md; color: $color-warm-gray-600;
    font-size: 11px; transition: all .2s; position: relative; cursor: pointer;
    i { font-size: 1.15rem; }
    &:hover { color: $color-primary; background: $color-warm-gray-100; }
    &--login { color: $color-primary; font-weight: 600; }
  }
  &__action-label { font-size: 11px; white-space: nowrap; }
  &__badge {
    position: absolute; top: 0; right: 2px;
    background: $color-danger; color: #fff; font-size: 10px; font-weight: 700;
    width: 18px; height: 18px; border-radius: 50%; @include flex-center;
  }
  &__user-btn { display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 10px; border-radius: $radius-md; transition: background .2s; &:hover { background: $color-warm-gray-100; } }
  &__avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, $color-primary, $color-primary-light); color: #fff; font-weight: 700; font-size: 14px; @include flex-center; }
  &__hamburger { display: flex; @include respond-to(md) { display: none; } font-size: 1.4rem; color: $color-warm-gray-700; padding: 8px; margin-left: auto; }
}

.td-logo { flex-shrink: 0; img { height: 52px; @include respond-to(lg) { height: 60px; } } }
.td-search {
  flex: 1; display: none; @include respond-to(md) { display: block; }
  &__box { display: flex; align-items: center; position: relative; background: $color-warm-gray-100; border-radius: $radius-lg; border: 2px solid transparent; transition: all .2s; &:focus-within { border-color: $color-primary-light; background: #fff; } }
  &__icon { position: absolute; left: 14px; color: $color-warm-gray-400; font-size: .9rem; }
  input { flex: 1; border: none; background: transparent; outline: none; padding: 11px 14px 11px 40px; font-size: 14px; color: $color-warm-gray-800; &::placeholder { color: $color-warm-gray-400; } }
  &__btn { padding: 10px 24px; background: linear-gradient(135deg, $color-primary, $color-primary-light); color: #fff; font-weight: 600; font-size: 14px; border-radius: 0 $radius-lg $radius-lg 0; border: none; cursor: pointer; white-space: nowrap; &:hover { background: linear-gradient(135deg, $color-primary-dark, $color-primary); } }
}

.td-nav {
  background: $color-primary; display: none; @include respond-to(lg) { display: block; }
  &--admin { background: #1A1208; }
  &__inner { display: flex; align-items: stretch; }
  &__cat-wrap { position: relative; }
  &__cat-btn { display: flex; align-items: center; gap: 8px; padding: 12px 20px; background: rgba(0,0,0,.15); color: #fff; font-weight: 600; font-size: 14px; border: none; cursor: pointer; white-space: nowrap; &:hover { background: rgba(0,0,0,.25); } }
  &__dropdown { position: absolute; top: 100%; left: 0; width: 280px; background: #fff; border-radius: 0 0 $radius-lg $radius-lg; box-shadow: $shadow-lg; z-index: $z-dropdown; overflow: hidden; }
  &__drop-item {
    display: flex; align-items: center; gap: 12px; padding: 12px 18px; color: $color-warm-gray-700; font-size: 14px; transition: all .15s;
    i:first-child { width: 20px; text-align: center; color: $color-primary; } i:last-child { margin-left: auto; font-size: 11px; opacity: .4; } span { flex: 1; }
    &:hover { background: $color-warm-gray-100; color: $color-primary; padding-left: 22px; }
  }
  &__links { display: flex; align-items: stretch; margin-left: 8px; }
  &__link {
    display: flex; align-items: center; gap: 6px; padding: 12px 18px; color: rgba(255,255,255,.88); font-size: 14px; font-weight: 500; transition: all .2s;
    &:hover, &.router-link-active { color: #fff; background: rgba(255,255,255,.1); }
    &--flash { color: $color-accent-light !important; font-weight: 700; animation: pulse-glow 2s infinite; }
  }
}
.drop-enter-active, .drop-leave-active { transition: all .2s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }

.td-mobile {
  &__search { width: 100%; padding: 10px 14px; border: 1px solid $color-warm-gray-200; border-radius: $radius-md; font-size: 14px; margin-bottom: 16px; outline: none; &:focus { border-color: $color-primary-light; } }
  &__user { display: flex; align-items: center; gap: 12px; padding: 12px 0 16px; border-bottom: 1px solid $color-warm-gray-100; margin-bottom: 12px; }
  &__nav { display: flex; flex-direction: column;
    a { display: flex; align-items: center; gap: 10px; padding: 12px 0; color: $color-warm-gray-700; font-size: 15px; border-bottom: 1px solid $color-warm-gray-100; &:hover { color: $color-primary; } }
  }
  &__auth { display: flex; gap: 10px; margin-top: 20px; &-btn { flex: 1; padding: 12px; border-radius: $radius-md; font-weight: 600; font-size: 14px; text-align: center; border: 2px solid $color-primary; color: $color-primary; background: #fff; cursor: pointer; &--primary { background: $color-primary; color: #fff; } } }
  &__logout { display: flex; align-items: center; gap: 8px; padding: 12px 0; margin-top: 16px; color: $color-danger; font-size: 14px; font-weight: 600; border-top: 1px solid $color-warm-gray-100; width: 100%; background: none; cursor: pointer; }
}
</style>
