import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cooperativeService } from '@/services/cooperativeService'

export const useCooperativeStore = defineStore('cooperative', () => {
  const cooperatives = ref([])
  const featuredCooperatives = ref([])
  const currentCooperative = ref(null)
  const totalElements = ref(0)
  const isLoading = ref(false)

  async function fetchCooperatives(params) {
    isLoading.value = true
    try {
      const { data } = await cooperativeService.getCooperatives(params)
      cooperatives.value = data.content || data
      totalElements.value = data.totalElements || data.length
    } finally {
      isLoading.value = false
    }
  }

  async function fetchFeatured() {
    try {
      const { data } = await cooperativeService.getFeaturedCooperatives()
      featuredCooperatives.value = data
    } catch (e) { /* fallback */ }
  }

  async function fetchCooperativeBySlug(slug) {
    isLoading.value = true
    try {
      const { data } = await cooperativeService.getCooperativeBySlug(slug)
      currentCooperative.value = data
      return data
    } finally {
      isLoading.value = false
    }
  }

  return {
    cooperatives, featuredCooperatives, currentCooperative, totalElements, isLoading,
    fetchCooperatives, fetchFeatured, fetchCooperativeBySlug
  }
})
