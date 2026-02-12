<template>
  <div class="pdp">
    <div class="container pdp__main">
      <!-- Breadcrumb -->
      <nav class="pdp__breadcrumb">
        <router-link to="/">Trang chủ</router-link>
        <i class="pi pi-angle-right"></i>
        <router-link to="/san-pham">Sản phẩm</router-link>
        <i class="pi pi-angle-right"></i>
        <span>{{ product.name }}</span>
      </nav>

      <div class="pdp__grid">
        <!-- Gallery -->
        <div class="pdp__gallery">
          <div class="pdp__gallery-main">
            <img :src="mainImage" :alt="product.name" />
            <span v-if="discountPercent > 0" class="pdp__discount">-{{ discountPercent }}%</span>
          </div>
          <div class="pdp__gallery-thumbs">
            <div v-for="(img, idx) in productImages" :key="idx"
              :class="['pdp__thumb', { 'pdp__thumb--active': mainImage === img }]"
              @click="mainImage = img">
              <img :src="img" :alt="product.name" />
            </div>
          </div>
        </div>

        <!-- Info -->
        <div class="pdp__info">
          <div class="pdp__coop-badge">
            <i class="pi pi-verified"></i> {{ product.cooperativeName }}
          </div>
          <h1 class="pdp__name">{{ product.name }}</h1>
          <div class="pdp__meta">
            <div class="pdp__rating">
              <i v-for="s in 5" :key="s" :class="s <= Math.round(product.rating) ? 'pi pi-star-fill' : 'pi pi-star'" style="color:#D4A017"></i>
              <span>{{ product.rating }} ({{ product.reviewCount || 126 }} đánh giá)</span>
            </div>
            <span class="pdp__sold">Đã bán {{ product.soldCount || 2340 }}</span>
          </div>

          <div class="pdp__price-box">
            <span class="pdp__price">{{ formatCurrency(product.salePrice || product.price) }}</span>
            <span v-if="product.salePrice" class="pdp__price-old">{{ formatCurrency(product.price) }}</span>
            <span v-if="discountPercent > 0" class="pdp__price-save">Tiết kiệm {{ formatCurrency(product.price - product.salePrice) }}</span>
          </div>

          <div class="pdp__badges">
            <span v-for="cert in product.certifications" :key="cert" class="badge-organic">{{ cert }}</span>
            <span v-if="product.isOrganic" class="badge-organic"><i class="pi pi-leaf"></i> Organic</span>
            <span v-if="product.region" class="badge-region"><i class="pi pi-map-marker"></i> {{ product.region }}</span>
          </div>

          <Divider />

          <div class="pdp__variants" v-if="product.variants?.length">
            <label>Quy cách:</label>
            <div class="pdp__variant-options">
              <button v-for="v in product.variants" :key="v.id"
                :class="['pdp__variant-btn', { active: selectedVariant === v.id }]"
                @click="selectedVariant = v.id">{{ v.name }}</button>
            </div>
          </div>

          <div class="pdp__quantity">
            <label>Số lượng:</label>
            <div class="pdp__qty-control">
              <button @click="qty = Math.max(1, qty-1)">-</button>
              <input v-model.number="qty" type="number" min="1" :max="product.stock" />
              <button @click="qty = Math.min(product.stock, qty+1)">+</button>
            </div>
            <span class="pdp__stock">Còn {{ product.stock }} sản phẩm</span>
          </div>

          <div class="pdp__actions">
            <button class="pdp__add-cart" @click="addToCart"><i class="pi pi-shopping-cart"></i> Thêm vào giỏ hàng</button>
            <button class="pdp__buy-now" @click="buyNow"><i class="pi pi-bolt"></i> Mua ngay</button>
          </div>

          <div class="pdp__promises">
            <div><i class="pi pi-verified"></i> Cam kết chính hãng</div>
            <div><i class="pi pi-truck"></i> Giao hàng 24-48h</div>
            <div><i class="pi pi-refresh"></i> Đổi trả 7 ngày</div>
            <div><i class="pi pi-qrcode"></i> Truy xuất nguồn gốc</div>
          </div>
        </div>
      </div>

      <!-- Tabs: Description, Traceability, Reviews -->
      <div class="pdp__tabs">
        <TabView>
          <TabPanel header="Mô tả sản phẩm">
            <div class="pdp__desc" v-html="product.description || defaultDesc"></div>
          </TabPanel>
          <TabPanel header="Truy xuất nguồn gốc">
            <div class="pdp__trace">
              <div class="pdp__trace-timeline">
                <div v-for="(step, idx) in traceSteps" :key="idx" class="pdp__trace-step">
                  <div class="pdp__trace-dot"><i :class="step.icon"></i></div>
                  <div class="pdp__trace-content">
                    <strong>{{ step.title }}</strong>
                    <span>{{ step.date }}</span>
                    <p>{{ step.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel header="Đánh giá (126)">
            <div class="pdp__reviews">
              <div class="pdp__review-summary">
                <div class="pdp__review-big">
                  <strong>4.9</strong>
                  <div><i v-for="s in 5" :key="s" class="pi pi-star-fill" style="color:#D4A017"></i></div>
                  <span>126 đánh giá</span>
                </div>
              </div>
              <div v-for="r in reviews" :key="r.id" class="pdp__review-item">
                <div class="pdp__review-avatar">{{ r.name.charAt(0) }}</div>
                <div class="pdp__review-body">
                  <strong>{{ r.name }}</strong>
                  <div class="pdp__review-stars"><i v-for="s in r.rating" :key="s" class="pi pi-star-fill" style="color:#D4A017;font-size:12px"></i></div>
                  <p>{{ r.text }}</p>
                  <span>{{ r.date }}</span>
                </div>
              </div>
            </div>
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { formatCurrency, formatDiscount } from '@/utils/formatters'
import { useToast } from 'primevue/usetoast'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Divider from 'primevue/divider'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()
const toast = useToast()

const qty = ref(1)
const selectedVariant = ref(null)

const product = ref({
  id: 1, name: 'Gạo ST25 Sóc Trăng - Gạo ngon nhất thế giới', slug: 'gao-st25-soc-trang',
  price: 185000, salePrice: 165000, unit: '5kg', stock: 100,
  thumbnail: '/images/category-rice.jpg',
  images: ['/images/category-rice.jpg', '/images/hero-banner.jpg', '/images/about-farmer.jpg'],
  cooperativeName: 'HTX Mỹ Thành', cooperativeId: 1,
  region: 'Sóc Trăng', rating: 4.9, soldCount: 2340, reviewCount: 126,
  isOrganic: true, certifications: ['VietGAP', 'OCOP'],
  variants: [{ id: 1, name: '5kg' }, { id: 2, name: '10kg' }, { id: 3, name: '25kg' }]
})

const productImages = computed(() => product.value.images || [product.value.thumbnail])
const mainImage = ref(product.value.thumbnail)
const discountPercent = computed(() => formatDiscount(product.value.price, product.value.salePrice))

const defaultDesc = `<h3>Gạo ST25 Sóc Trăng</h3><p>Gạo ST25 được mệnh danh là "Gạo ngon nhất thế giới" tại cuộc thi World's Best Rice 2019. Được trồng tại vùng đất phù sa Sóc Trăng, gạo có hương thơm dứa tự nhiên, cơm dẻo mềm.</p><h4>Đặc điểm nổi bật:</h4><ul><li>Hương thơm dứa tự nhiên</li><li>Cơm dẻo mềm, không dính</li><li>Đạt chuẩn VietGAP</li><li>Truy xuất nguồn gốc rõ ràng</li></ul>`

const traceSteps = [
  { icon: 'pi pi-sun', title: 'Gieo trồng', date: '15/08/2025', desc: 'Gieo sạ tại cánh đồng 50ha, HTX Mỹ Thành, Sóc Trăng' },
  { icon: 'pi pi-cloud', title: 'Chăm sóc', date: '15/08 - 20/11/2025', desc: 'Tưới tiêu khoa học, không thuốc trừ sâu hóa học' },
  { icon: 'pi pi-check-circle', title: 'Kiểm định', date: '18/11/2025', desc: 'Đạt chuẩn VietGAP, test dư lượng thuốc BVTV = 0' },
  { icon: 'pi pi-box', title: 'Thu hoạch & Đóng gói', date: '25/11/2025', desc: 'Thu hoạch cơ giới, xay xát tại nhà máy HTX' },
  { icon: 'pi pi-truck', title: 'Vận chuyển', date: '27/11/2025', desc: 'Giao đến kho Terroir Direct, bảo quản lạnh' },
]

const reviews = [
  { id: 1, name: 'Nguyễn Thị Mai', rating: 5, text: 'Gạo thơm dẻo, nấu cơm rất ngon. Sẽ mua lại!', date: '20/01/2026' },
  { id: 2, name: 'Trần Hùng', rating: 5, text: 'Chất lượng xứng đáng gạo ngon nhất thế giới. Đóng gói cẩn thận.', date: '15/01/2026' },
  { id: 3, name: 'Phạm Lan', rating: 4, text: 'Gạo ngon, giao hàng nhanh. Giá hợp lý.', date: '10/01/2026' },
]

function addToCart() {
  cartStore.addItem(product.value, qty.value)
  toast.add({ severity: 'success', summary: 'Đã thêm vào giỏ hàng', life: 2000 })
}

function buyNow() {
  cartStore.addItem(product.value, qty.value)
  router.push('/gio-hang')
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.pdp {
  padding: 24px 0 60px;

  &__breadcrumb {
    display: flex; align-items: center; gap: 8px; font-size: 13px; margin-bottom: 24px;
    a { color: $color-warm-gray-400; &:hover { color: $color-primary; } }
    i { font-size: 10px; color: $color-warm-gray-300; }
    span { color: $color-warm-gray-700; }
  }

  &__grid {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(lg) { grid-template-columns: 1fr 1fr; }
    gap: 40px; margin-bottom: 48px;
  }

  &__gallery-main {
    position: relative; border-radius: $radius-xl; overflow: hidden;
    aspect-ratio: 1; background: $color-warm-gray-100;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  &__discount {
    position: absolute; top: 16px; left: 16px;
    background: $color-danger; color: #fff;
    padding: 6px 14px; border-radius: $radius-full;
    font-size: 14px; font-weight: 700;
  }
  &__gallery-thumbs {
    display: flex; gap: 10px; margin-top: 12px;
  }
  &__thumb {
    width: 72px; height: 72px; border-radius: $radius-md; overflow: hidden;
    cursor: pointer; border: 2px solid transparent; transition: border-color .2s;
    &--active, &:hover { border-color: $color-primary; }
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  &__coop-badge {
    display: inline-flex; align-items: center; gap: 6px;
    color: $color-primary; font-size: 14px; font-weight: 600; margin-bottom: 8px;
  }
  &__name {
    font-family: $font-display; font-size: 26px; line-height: 1.3; margin-bottom: 12px;
  }
  &__meta {
    display: flex; align-items: center; gap: 20px; margin-bottom: 16px;
  }
  &__rating {
    display: flex; align-items: center; gap: 6px; font-size: 13px; color: $color-warm-gray-500;
    i { font-size: 14px; }
  }
  &__sold { font-size: 13px; color: $color-warm-gray-400; }

  &__price-box {
    background: $color-warm-gray-100; padding: 16px 20px; border-radius: $radius-lg; margin-bottom: 16px;
    display: flex; align-items: baseline; gap: 12px; flex-wrap: wrap;
  }
  &__price { font-family: $font-display; font-size: 30px; font-weight: 700; color: $color-danger; }
  &__price-old { font-size: 16px; color: $color-warm-gray-400; text-decoration: line-through; }
  &__price-save { font-size: 13px; color: $color-primary; font-weight: 600; background: rgba(45,80,22,.1); padding: 4px 10px; border-radius: $radius-full; }

  &__badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }

  &__variants {
    margin-bottom: 20px;
    label { font-size: 14px; font-weight: 600; margin-bottom: 8px; display: block; }
  }
  &__variant-options { display: flex; gap: 8px; }
  &__variant-btn {
    padding: 8px 20px; border: 2px solid $color-warm-gray-200; border-radius: $radius-md;
    font-size: 14px; font-weight: 600; background: #fff; cursor: pointer; transition: all .2s;
    &:hover, &.active { border-color: $color-primary; color: $color-primary; background: rgba(45,80,22,.05); }
  }

  &__quantity {
    display: flex; align-items: center; gap: 16px; margin-bottom: 24px;
    label { font-size: 14px; font-weight: 600; }
  }
  &__qty-control {
    display: flex; border: 1px solid $color-warm-gray-200; border-radius: $radius-md; overflow: hidden;
    button {
      width: 40px; height: 40px; @include flex-center;
      background: $color-warm-gray-100; font-size: 16px; font-weight: 700;
      &:hover { background: $color-warm-gray-200; }
    }
    input {
      width: 60px; text-align: center; border: none; border-left: 1px solid $color-warm-gray-200;
      border-right: 1px solid $color-warm-gray-200; font-size: 15px; font-weight: 600;
      outline: none;
      &::-webkit-outer-spin-button, &::-webkit-inner-spin-button { -webkit-appearance: none; }
    }
  }
  &__stock { font-size: 13px; color: $color-warm-gray-400; }

  &__actions {
    display: flex; gap: 12px; margin-bottom: 24px;
  }
  &__add-cart, &__buy-now {
    flex: 1; padding: 14px 24px; border-radius: $radius-lg;
    font-size: 15px; font-weight: 700; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: all .3s;
  }
  &__add-cart {
    background: #fff; border: 2px solid $color-primary; color: $color-primary;
    &:hover { background: rgba(45,80,22,.05); }
  }
  &__buy-now {
    background: linear-gradient(135deg, $color-primary, $color-primary-light); color: #fff;
    &:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(45,80,22,.3); }
  }

  &__promises {
    display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
    div {
      display: flex; align-items: center; gap: 8px; font-size: 13px; color: $color-warm-gray-600;
      i { color: $color-primary; font-size: 14px; }
    }
  }

  &__tabs { margin-top: 20px; }

  &__trace-timeline { padding: 20px 0; }
  &__trace-step {
    display: flex; gap: 16px; position: relative; padding-bottom: 28px;
    &:not(:last-child)::before {
      content: ''; position: absolute; left: 18px; top: 40px; bottom: 0;
      width: 2px; background: $color-warm-gray-200;
    }
  }
  &__trace-dot {
    width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg, $color-primary, $color-primary-light);
    color: #fff; @include flex-center; font-size: .85rem;
  }
  &__trace-content {
    strong { display: block; font-size: 15px; }
    span { font-size: 12px; color: $color-warm-gray-400; }
    p { font-size: 14px; color: $color-warm-gray-600; margin-top: 4px; }
  }

  &__review-summary { margin-bottom: 24px; }
  &__review-big {
    text-align: center;
    strong { font-size: 48px; font-family: $font-display; color: $color-accent; display: block; }
    span { font-size: 13px; color: $color-warm-gray-400; }
  }
  &__review-item {
    display: flex; gap: 14px; padding: 16px 0; border-top: 1px solid $color-warm-gray-100;
  }
  &__review-avatar {
    width: 40px; height: 40px; border-radius: 50%; flex-shrink: 0;
    background: $color-warm-gray-200; @include flex-center; font-weight: 700; font-size: 14px;
  }
  &__review-body {
    strong { font-size: 14px; }
    p { font-size: 14px; color: $color-warm-gray-600; margin: 6px 0; }
    span { font-size: 12px; color: $color-warm-gray-400; }
  }
  &__review-stars { margin: 4px 0; }
}
</style>
