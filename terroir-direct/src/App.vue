<template>
  <div class="td-app">
    <AppHeader v-if="!isDashboard && !isBlankLayout" />
    <main :class="['td-main', { 'td-main--dashboard': isDashboard }]">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter v-if="!isDashboard && !isBlankLayout" />
    <Toast position="top-right" />
    <ConfirmDialog />
    <ScrollTop />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ScrollTop from 'primevue/scrolltop'

const route = useRoute()
const isDashboard = computed(() => route.meta.layout === 'dashboard')
const isBlankLayout = computed(() => route.meta.layout === 'blank')
</script>

<style lang="scss">
@use '@/assets/styles/variables' as *;

.td-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.td-main {
  flex: 1;
  min-height: calc(100vh - 80px);
}
</style>
