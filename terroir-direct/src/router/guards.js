import { useAuthStore } from '@/stores/auth'

export function authGuard(to, from, next) {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
}

export function guestGuard(to, from, next) {
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}

export function cooperativeGuard(to, from, next) {
  const authStore = useAuthStore()
  if (!authStore.isCooperative && !authStore.isAdmin) {
    next({ name: 'home' })
  } else {
    next()
  }
}

export function adminGuard(to, from, next) {
  const authStore = useAuthStore()
  if (!authStore.isAdmin) {
    next({ name: 'home' })
  } else {
    next()
  }
}
