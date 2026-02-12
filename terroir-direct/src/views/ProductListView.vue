<template>
  <div class="plp">
    <div class="plp__banner">
      <img src="/images/hero-banner.jpg" alt="" />
      <div class="plp__banner-overlay"></div>
      <div class="container plp__banner-content">
        <h1>{{ pageTitle }}</h1>
        <p>Nông sản sạch, đặc sản vùng miền từ các hợp tác xã uy tín</p>
      </div>
    </div>

    <div class="container plp__main">
      <!-- Mobile filter toggle -->
      <button class="plp__filter-toggle" @click="showFilter = !showFilter">
        <i class="pi pi-filter"></i> Bộ lọc <span v-if="activeFilterCount">({{ activeFilterCount }})</span>
      </button>

      <aside :class="['plp__sidebar', { 'plp__sidebar--open': showFilter }]">
        <div class="filter-box">
          <div class="filter-box__header">
            <h3><i class="pi pi-filter"></i> Bộ lọc</h3>
            <button class="filter-box__close" @click="showFilter = false"><i class="pi pi-times"></i></button>
          </div>

          <div class="filter-box__section">
            <h4>Danh mục</h4>
            <div v-for="cat in categories" :key="cat.id" class="filter-box__check">
              <Checkbox :inputId="'cat-'+cat.id" :value="cat.slug" v-model="filters.categories" @change="applyFilters" />
              <label :for="'cat-'+cat.id">{{ cat.name }}</label>
            </div>
          </div>

          <div class="filter-box__section">
            <h4>Khoảng giá</h4>
            <div class="filter-box__price">
              <InputNumber v-model="filters.minPrice" placeholder="Từ" :min="0" :step="10000" suffix=" ₫" />
              <span>—</span>
              <InputNumber v-model="filters.maxPrice" placeholder="Đến" :min="0" :step="10000" suffix=" ₫" />
            </div>
            <Button label="Áp dụng" size="small" severity="secondary" outlined class="w-full" style="margin-top:8px" @click="applyFilters" />
          </div>

          <div class="filter-box__section">
            <h4>Vùng miền</h4>
            <div v-for="r in regions" :key="r.code" class="filter-box__check">
              <Checkbox :inputId="'r-'+r.code" :value="r.code" v-model="filters.regions" @change="applyFilters" />
              <label :for="'r-'+r.code">{{ r.name }}</label>
            </div>
          </div>

          <div class="filter-box__section">
            <h4>Chứng nhận</h4>
            <div v-for="c in certifications" :key="c.id" class="filter-box__check">
              <Checkbox :inputId="'cert-'+c.id" :value="c.id" v-model="filters.certifications" @change="applyFilters" />
              <label :for="'cert-'+c.id">{{ c.name }}</label>
            </div>
          </div>

          <div class="filter-box__section">
            <h4>Đánh giá</h4>
            <div v-for="star in [4,3,2,1]" :key="star" class="filter-box__check">
              <RadioButton :inputId="'star-'+star" :value="star" v-model="filters.minRating" @change="applyFilters" />
              <label :for="'star-'+star">
                <i v-for="s in star" :key="s" class="pi pi-star-fill" style="color:#D4A017;font-size:11px"></i>
                trở lên
              </label>
            </div>
          </div>

          <Button label="Xóa bộ lọc" icon="pi pi-times" severity="secondary" outlined class="w-full" @click="clearFilters" />
        </div>
      </aside>

      <div class="plp__content">
        <div class="plp__toolbar">
          <span class="plp__count">Hiển thị <strong>{{ filteredProducts.length }}</strong> sản phẩm</span>
          <div class="plp__sort">
            <label>Sắp xếp:</label>
            <Select v-model="sortBy" :options="sortOptions" optionLabel="label" optionValue="value" class="plp__sort-select" @change="applyFilters" />
          </div>
          <div class="plp__view-toggle">
            <button :class="{ active: viewMode === 'grid' }" @click="viewMode = 'grid'"><i class="pi pi-th-large"></i></button>
            <button :class="{ active: viewMode === 'list' }" @click="viewMode = 'list'"><i class="pi pi-list"></i></button>
          </div>
        </div>

        <div v-if="filteredProducts.length === 0" class="plp__empty">
          <i class="pi pi-search" style="font-size:3rem;color:#D4C8B5"></i>
          <h3>Không tìm thấy sản phẩm</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <Button label="Xóa bộ lọc" icon="pi pi-refresh" severity="secondary" @click="clearFilters" />
        </div>

        <div v-else :class="['plp__grid', viewMode === 'list' ? 'plp__grid--list' : '']">
          <ProductCard v-for="p in paginatedProducts" :key="p.id" :product="p" />
        </div>

        <div v-if="filteredProducts.length > pageSize" class="plp__pagination">
          <Paginator :rows="pageSize" :totalRecords="filteredProducts.length" v-model:first="first" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'
import { PRODUCT_CATEGORIES, REGIONS, CERTIFICATIONS } from '@/utils/constants'
import { mockProducts } from '@/mock/data.js'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import InputNumber from 'primevue/inputnumber'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Paginator from 'primevue/paginator'

const route = useRoute()
const router = useRouter()
const categories = PRODUCT_CATEGORIES
const regions = REGIONS
const certifications = CERTIFICATIONS

const allProducts = ref([...mockProducts])
const filters = ref({ categories: [], minPrice: null, maxPrice: null, regions: [], certifications: [], minRating: null })
const sortBy = ref('newest')
const viewMode = ref('grid')
const first = ref(0)
const pageSize = 12
const showFilter = ref(false)

const sortOptions = [
  { label: 'Mới nhất', value: 'newest' },
  { label: 'Bán chạy', value: 'bestseller' },
  { label: 'Giá thấp → cao', value: 'price-asc' },
  { label: 'Giá cao → thấp', value: 'price-desc' },
  { label: 'Đánh giá cao', value: 'rating' }
]

const pageTitle = computed(() => {
  if (route.params.slug) {
    const cat = categories.find(c => c.slug === route.params.slug)
    return cat?.name || 'Sản phẩm'
  }
  if (route.query.q) return `Kết quả tìm kiếm: "${route.query.q}"`
  if (route.query.flashSale) return 'Flash Sale 🔥'
  return 'Tất Cả Sản Phẩm'
})

const filteredProducts = computed(() => {
  let result = [...allProducts.value]

  // Category from URL
  if (route.params.slug) {
    result = result.filter(p => p.categorySlug === route.params.slug)
  }

  // Search query
  if (route.query.q) {
    const q = route.query.q.toLowerCase()
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.cooperativeName.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q)
    )
  }

  // Flash sale
  if (route.query.flashSale) {
    result = result.filter(p => p.isFlashSale)
  }

  // Category filter
  if (filters.value.categories.length) {
    result = result.filter(p => filters.value.categories.includes(p.categorySlug))
  }

  // Price filter
  if (filters.value.minPrice) {
    result = result.filter(p => (p.salePrice || p.price) >= filters.value.minPrice)
  }
  if (filters.value.maxPrice) {
    result = result.filter(p => (p.salePrice || p.price) <= filters.value.maxPrice)
  }

  // Region filter
  if (filters.value.regions.length) {
    result = result.filter(p => filters.value.regions.includes(p.regionCode))
  }

  // Certification filter
  if (filters.value.certifications.length) {
    result = result.filter(p => p.certifications?.some(c => filters.value.certifications.includes(c)))
  }

  // Rating filter
  if (filters.value.minRating) {
    result = result.filter(p => p.rating >= filters.value.minRating)
  }

  // Sort
  if (sortBy.value === 'price-asc') result.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
  else if (sortBy.value === 'price-desc') result.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
  else if (sortBy.value === 'rating') result.sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'bestseller') result.sort((a, b) => b.soldCount - a.soldCount)

  return result
})

const paginatedProducts = computed(() => {
  return filteredProducts.value.slice(first.value, first.value + pageSize)
})

const activeFilterCount = computed(() => {
  let count = 0
  if (filters.value.categories.length) count++
  if (filters.value.minPrice || filters.value.maxPrice) count++
  if (filters.value.regions.length) count++
  if (filters.value.certifications.length) count++
  if (filters.value.minRating) count++
  return count
})

function applyFilters() { first.value = 0 }
function clearFilters() {
  filters.value = { categories: [], minPrice: null, maxPrice: null, regions: [], certifications: [], minRating: null }
  first.value = 0
}

// Watch route changes
watch(() => route.query, () => { first.value = 0 }, { deep: true })
watch(() => route.params.slug, () => { clearFilters() })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.plp {
  &__banner {
    position: relative; height: 180px; overflow: hidden;
    @include respond-to(md) { height: 220px; }
    img { width: 100%; height: 100%; object-fit: cover; }
    &-overlay { position: absolute; inset: 0; background: rgba(26,18,8,.65); }
    &-content { position: absolute; inset: 0; @include flex-center; flex-direction: column; h1 { font-family: $font-display; font-size: 28px; color: #fff; @include respond-to(md) { font-size: 32px; } } p { color: rgba(255,255,255,.7); font-size: 14px; margin-top: 6px; } }
  }

  &__main {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(lg) { grid-template-columns: 260px 1fr; }
    gap: 24px; padding-top: 30px; padding-bottom: 48px;
  }

  &__filter-toggle {
    display: flex; @include respond-to(lg) { display: none; }
    align-items: center; gap: 8px; padding: 10px 16px; background: #fff; border: 1px solid $color-warm-gray-200;
    border-radius: $radius-md; font-weight: 600; font-size: 14px; cursor: pointer;
    span { background: $color-primary; color: #fff; padding: 1px 8px; border-radius: 10px; font-size: 12px; }
  }

  &__sidebar {
    display: none;
    @include respond-to(lg) { display: block; }
    &--open { display: block; position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 999; background: rgba(0,0,0,.4); padding: 0;
      .filter-box { position: absolute; top: 0; left: 0; bottom: 0; width: 300px; border-radius: 0; max-height: 100vh; overflow-y: auto; }
    }
  }

  &__toolbar {
    display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
    margin-bottom: 20px; padding-bottom: 14px; border-bottom: 1px solid $color-warm-gray-200;
  }
  &__count { font-size: 14px; color: $color-warm-gray-500; margin-right: auto; }
  &__sort {
    display: flex; align-items: center; gap: 8px;
    label { font-size: 13px; color: $color-warm-gray-500; white-space: nowrap; }
    &-select { min-width: 150px; }
  }
  &__view-toggle {
    display: flex; gap: 4px;
    button { width: 34px; height: 34px; border-radius: $radius-md; @include flex-center; border: 1px solid $color-warm-gray-200; color: $color-warm-gray-400; transition: all .2s;
      &.active, &:hover { background: $color-primary; color: #fff; border-color: $color-primary; } }
  }

  &__empty { text-align: center; padding: 60px 20px; h3 { font-family: $font-display; margin: 16px 0 8px; } p { color: $color-warm-gray-400; margin-bottom: 16px; } }

  &__grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }
    gap: 16px;
    &--list { grid-template-columns: 1fr; }
  }

  &__pagination { margin-top: 32px; display: flex; justify-content: center; }
}

.filter-box {
  background: #fff; border-radius: $radius-lg; padding: 20px; box-shadow: $shadow-sm; position: sticky; top: 110px;
  &__header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;
    h3 { font-family: $font-display; font-size: 16px; display: flex; align-items: center; gap: 8px; color: $color-primary-dark; }
  }
  &__close { display: flex; @include respond-to(lg) { display: none; } font-size: 1.2rem; color: $color-warm-gray-400; padding: 4px; cursor: pointer; }
  &__section {
    margin-bottom: 20px; padding-bottom: 16px; border-bottom: 1px solid $color-warm-gray-100;
    &:last-of-type { border-bottom: none; }
    h4 { font-family: $font-display; font-size: 13px; margin-bottom: 10px; color: $color-warm-gray-700; text-transform: uppercase; letter-spacing: .5px; }
  }
  &__check {
    display: flex; align-items: center; gap: 8px; padding: 3px 0;
    label { font-size: 13px; color: $color-warm-gray-600; cursor: pointer; display: flex; align-items: center; gap: 4px; }
  }
  &__price {
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 6px;
    span { color: $color-warm-gray-400; font-size: 12px; }
    :deep(.p-inputnumber) { width: 100%; }
    :deep(.p-inputnumber-input) { width: 100%; padding: 8px 10px; font-size: 13px; }
  }
}
</style>
