import { defineStore } from 'pinia'
import { ref } from 'vue'
import { orderService } from '@/services/orderService'

export const useOrderStore = defineStore('order', () => {
  const orders = ref([])
  const currentOrder = ref(null)
  const totalElements = ref(0)
  const isLoading = ref(false)

  async function fetchMyOrders(params) {
    isLoading.value = true
    try {
      const { data } = await orderService.getMyOrders(params)
      orders.value = data.content || data
      totalElements.value = data.totalElements || data.length
    } finally {
      isLoading.value = false
    }
  }

  async function fetchOrderById(id) {
    isLoading.value = true
    try {
      const { data } = await orderService.getOrderById(id)
      currentOrder.value = data
      return data
    } finally {
      isLoading.value = false
    }
  }

  async function createOrder(orderData) {
    isLoading.value = true
    try {
      const { data } = await orderService.createOrder(orderData)
      return data
    } finally {
      isLoading.value = false
    }
  }

  async function cancelOrder(id, reason) {
    const { data } = await orderService.cancelOrder(id, reason)
    if (currentOrder.value?.id === id) {
      currentOrder.value = data
    }
    return data
  }

  return {
    orders, currentOrder, totalElements, isLoading,
    fetchMyOrders, fetchOrderById, createOrder, cancelOrder
  }
})
