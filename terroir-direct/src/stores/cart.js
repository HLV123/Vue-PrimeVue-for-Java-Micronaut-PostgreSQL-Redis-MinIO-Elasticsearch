import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('td_cart') || '[]'))
  const appliedVoucher = ref(null)

  const itemCount = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + (item.salePrice || item.price) * item.quantity, 0)
  )

  const discount = computed(() => {
    if (!appliedVoucher.value) return 0
    const v = appliedVoucher.value
    if (v.type === 'PERCENTAGE') {
      return Math.min(subtotal.value * v.value / 100, v.maxDiscount || Infinity)
    }
    return v.value
  })

  const shippingFee = computed(() => {
    if (subtotal.value >= 500000) return 0
    return 30000
  })

  const total = computed(() => subtotal.value - discount.value + shippingFee.value)

  // Group items by cooperative
  const groupedByCooperative = computed(() => {
    const groups = {}
    items.value.forEach(item => {
      const coopId = item.cooperativeId
      if (!groups[coopId]) {
        groups[coopId] = {
          cooperativeId: coopId,
          cooperativeName: item.cooperativeName,
          items: []
        }
      }
      groups[coopId].items.push(item)
    })
    return Object.values(groups)
  })

  function saveCart() {
    localStorage.setItem('td_cart', JSON.stringify(items.value))
  }

  function addItem(product, quantity = 1) {
    const existing = items.value.find(i => i.productId === product.id)
    if (existing) {
      existing.quantity = Math.min(existing.quantity + quantity, product.stock || 99)
    } else {
      items.value.push({
        productId: product.id,
        name: product.name,
        slug: product.slug,
        image: product.thumbnail || product.images?.[0],
        price: product.price,
        salePrice: product.salePrice,
        unit: product.unit,
        weight: product.weight,
        stock: product.stock,
        cooperativeId: product.cooperativeId,
        cooperativeName: product.cooperativeName,
        quantity
      })
    }
    saveCart()
  }

  function updateQuantity(productId, quantity) {
    const item = items.value.find(i => i.productId === productId)
    if (item) {
      item.quantity = Math.max(1, Math.min(quantity, item.stock || 99))
      saveCart()
    }
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.productId !== productId)
    saveCart()
  }

  function clearCart() {
    items.value = []
    appliedVoucher.value = null
    saveCart()
  }

  function applyVoucher(voucher) {
    appliedVoucher.value = voucher
  }

  function removeVoucher() {
    appliedVoucher.value = null
  }

  return {
    items, appliedVoucher, itemCount, subtotal, discount, shippingFee, total, groupedByCooperative,
    addItem, updateQuantity, removeItem, clearCart, applyVoucher, removeVoucher
  }
})
