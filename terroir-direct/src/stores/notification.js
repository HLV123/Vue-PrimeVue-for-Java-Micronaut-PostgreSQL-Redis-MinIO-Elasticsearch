import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const unreadCount = ref(0)
  const isLoading = ref(false)

  async function fetchNotifications() {
    isLoading.value = true
    try {
      const { data } = await api.get('/notifications')
      notifications.value = data.content || data
      unreadCount.value = notifications.value.filter(n => !n.read).length
    } catch (e) { /* ignore */ }
    finally { isLoading.value = false }
  }

  async function markAsRead(id) {
    try {
      await api.put(`/notifications/${id}/read`)
      const n = notifications.value.find(n => n.id === id)
      if (n) { n.read = true; unreadCount.value-- }
    } catch (e) { /* ignore */ }
  }

  async function markAllAsRead() {
    try {
      await api.put('/notifications/read-all')
      notifications.value.forEach(n => n.read = true)
      unreadCount.value = 0
    } catch (e) { /* ignore */ }
  }

  return { notifications, unreadCount, isLoading, fetchNotifications, markAsRead, markAllAsRead }
})
