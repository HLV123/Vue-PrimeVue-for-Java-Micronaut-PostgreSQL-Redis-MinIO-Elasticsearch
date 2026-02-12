<template>
  <div class="product-card" @click="goToProduct">
    <div class="product-card__image-wrap">
      <img :src="product.thumbnail || product.images?.[0] || '/images/category-vegetables.jpg'" :alt="product.name" class="product-card__image" loading="lazy" />
      <div v-if="discountPercent > 0" class="product-card__discount">-{{ discountPercent }}%</div>
      <div class="product-card__badges">
        <span v-if="product.isOrganic" class="badge-organic"><i class="pi pi-check-circle"></i> Organic</span>
        <span v-for="cert in (product.certifications || []).slice(0,2)" :key="cert" class="product-card__cert">{{ cert }}</span>
      </div>
      <div class="product-card__overlay">
        <button class="product-card__quick-btn" @click.stop="addToCart" title="Thêm vào giỏ">
          <i class="pi pi-shopping-cart"></i>
        </button>
        <button class="product-card__quick-btn" @click.stop="toggleWishlist" title="Yêu thích">
          <i :class="isWishlisted ? 'pi pi-heart-fill' : 'pi pi-heart'"></i>
        </button>
        <button class="product-card__quick-btn" @click.stop="goToProduct" title="Xem chi tiết">
          <i class="pi pi-eye"></i>
        </button>
      </div>
    </div>

    <div class="product-card__body">
      <div class="product-card__coop">
        <i class="pi pi-verified"></i>
        {{ product.cooperativeName || 'HTX Nông Sản' }}
      </div>
      <h3 class="product-card__name">{{ product.name }}</h3>
      <div class="product-card__meta">
        <span v-if="product.region" class="product-card__region">
          <i class="pi pi-map-marker"></i> {{ product.region }}
        </span>
        <span v-if="product.unit" class="product-card__unit">/ {{ product.unit }}</span>
      </div>
      <div class="product-card__footer">
        <div class="product-card__price">
          <span class="product-card__price-current">{{ formatCurrency(product.salePrice || product.price) }}</span>
          <span v-if="product.salePrice && product.salePrice < product.price" class="product-card__price-old">
            {{ formatCurrency(product.price) }}
          </span>
        </div>
        <div class="product-card__rating" v-if="product.rating">
          <i class="pi pi-star-fill"></i>
          <span>{{ product.rating.toFixed(1) }}</span>
          <span class="product-card__sold" v-if="product.soldCount">({{ product.soldCount }} đã bán)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatCurrency, formatDiscount } from '@/utils/formatters'
import { useToast } from 'primevue/usetoast'

const props = defineProps({ product: { type: Object, required: true } })
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const isWishlisted = computed(() => false) // TODO: wishlist store
const discountPercent = computed(() => formatDiscount(props.product.price, props.product.salePrice))

function goToProduct() {
  router.push(`/san-pham/${props.product.slug || props.product.id}`)
}

function addToCart() {
  cartStore.addItem(props.product)
  toast.add({ severity: 'success', summary: 'Đã thêm vào giỏ hàng', detail: props.product.name, life: 2000 })
}

function toggleWishlist() {
  toast.add({ severity: 'info', summary: 'Đã thêm vào yêu thích', life: 2000 })
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.product-card {
  background: #fff;
  border-radius: $radius-lg;
  overflow: hidden;
  box-shadow: $shadow-sm;
  cursor: pointer;
  transition: all $transition-base;

  &:hover {
    transform: translateY(-6px);
    box-shadow: $shadow-lg;
    .product-card__overlay { opacity: 1; }
    .product-card__image { transform: scale(1.05); }
  }

  &__image-wrap {
    position: relative;
    overflow: hidden;
    aspect-ratio: 1;
    background: $color-warm-gray-100;
  }

  &__image {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .5s ease;
  }

  &__discount {
    position: absolute; top: 10px; left: 10px;
    background: $color-danger; color: #fff;
    padding: 4px 10px; border-radius: $radius-full;
    font-size: 12px; font-weight: 700;
  }

  &__badges {
    position: absolute; top: 10px; right: 10px;
    display: flex; flex-direction: column; gap: 4px; align-items: flex-end;
  }

  &__cert {
    background: rgba(255,255,255,.9); backdrop-filter: blur(4px);
    padding: 2px 8px; border-radius: $radius-full;
    font-size: 10px; font-weight: 600; color: $color-primary;
  }

  &__overlay {
    position: absolute; bottom: 0; left: 0; right: 0;
    display: flex; justify-content: center; gap: 8px;
    padding: 12px; background: linear-gradient(transparent, rgba(0,0,0,.4));
    opacity: 0; transition: opacity .3s;
  }

  &__quick-btn {
    width: 38px; height: 38px; border-radius: 50%;
    background: #fff; color: $color-warm-gray-700;
    @include flex-center;
    transition: all .2s; font-size: .9rem;
    &:hover { background: $color-primary; color: #fff; transform: scale(1.1); }
  }

  &__body { padding: 14px; }

  &__coop {
    display: flex; align-items: center; gap: 4px;
    font-size: 11px; color: $color-primary; font-weight: 600;
    margin-bottom: 6px;
    i { font-size: 10px; }
  }

  &__name {
    font-family: $font-body; font-size: 14px; font-weight: 600;
    color: $color-warm-gray-800; line-height: 1.4;
    @include line-clamp(2);
    margin-bottom: 6px; min-height: 39px;
  }

  &__meta {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; color: $color-warm-gray-400; margin-bottom: 10px;
    i { font-size: 10px; }
  }

  &__footer { display: flex; flex-direction: column; gap: 6px; }

  &__price {
    display: flex; align-items: baseline; gap: 8px;
    &-current { font-family: $font-display; font-size: 18px; font-weight: 700; color: $color-danger; }
    &-old { font-size: 13px; color: $color-warm-gray-400; text-decoration: line-through; }
  }

  &__rating {
    display: flex; align-items: center; gap: 4px; font-size: 12px; color: $color-warm-gray-500;
    i { color: $color-accent; font-size: 11px; }
    span:first-of-type { font-weight: 600; color: $color-warm-gray-700; }
  }
  &__sold { color: $color-warm-gray-400; }
}
</style>
