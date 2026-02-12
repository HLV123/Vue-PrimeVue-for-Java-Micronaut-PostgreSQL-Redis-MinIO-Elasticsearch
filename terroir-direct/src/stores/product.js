import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productService } from '@/services/productService'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const featuredProducts = ref([])
  const flashSaleProducts = ref([])
  const currentProduct = ref(null)
  const categories = ref([])
  const totalElements = ref(0)
  const isLoading = ref(false)

  async function fetchProducts(params) {
    isLoading.value = true
    try {
      const { data } = await productService.getProducts(params)
      products.value = data.content || data
      totalElements.value = data.totalElements || data.length
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFeatured() {
    try {
      const { data } = await productService.getFeaturedProducts()
      featuredProducts.value = data
    } catch (e) { /* fallback */ }
  }

  async function fetchFlashSale() {
    try {
      const { data } = await productService.getFlashSaleProducts()
      flashSaleProducts.value = data
    } catch (e) { /* fallback */ }
  }

  async function fetchProductBySlug(slug) {
    isLoading.value = true
    try {
      const { data } = await productService.getProductBySlug(slug)
      currentProduct.value = data
      return data
    } finally {
      isLoading.value = false
    }
  }

  async function searchProducts(query, params) {
    isLoading.value = true
    try {
      const { data } = await productService.searchProducts(query, params)
      products.value = data.content || data
      totalElements.value = data.totalElements || data.length
    } finally {
      isLoading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await productService.getCategories()
      categories.value = data
    } catch (e) { /* use default */ }
  }

  return {
    products, featuredProducts, flashSaleProducts, currentProduct,
    categories, totalElements, isLoading,
    fetchProducts, fetchFeatured, fetchFlashSale,
    fetchProductBySlug, searchProducts, fetchCategories
  }
})
