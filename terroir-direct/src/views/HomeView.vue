<template>
  <div class="home">
    <!-- ==================== HERO BANNER ==================== -->
    <section class="hero">
      <div class="hero__slider">
        <div
          v-for="(slide, idx) in heroSlides" :key="idx"
          :class="['hero__slide', { 'hero__slide--active': currentSlide === idx }]"
        >
          <img :src="slide.image" :alt="slide.title" class="hero__bg" />
          <div class="hero__overlay"></div>
          <div class="container hero__content">
            <span class="hero__badge">{{ slide.badge }}</span>
            <h1 class="hero__title" v-html="slide.title"></h1>
            <p class="hero__subtitle">{{ slide.subtitle }}</p>
            <div class="hero__actions">
              <router-link :to="slide.primaryLink">
                <button class="hero__btn hero__btn--primary">{{ slide.primaryText }}</button>
              </router-link>
              <router-link :to="slide.secondaryLink">
                <button class="hero__btn hero__btn--secondary">{{ slide.secondaryText }}</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="hero__dots">
        <button
          v-for="(_, idx) in heroSlides" :key="idx"
          :class="['hero__dot', { 'hero__dot--active': currentSlide === idx }]"
          @click="currentSlide = idx"
        ></button>
      </div>
      <!-- Stats bar -->
      <div class="hero__stats">
        <div class="container hero__stats-inner">
          <div class="hero__stat" v-for="stat in stats" :key="stat.label">
            <i :class="stat.icon"></i>
            <div>
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== CATEGORIES ==================== -->
    <section class="section categories">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Khám phá</span>
          <h2 class="section-title">Danh Mục Sản Phẩm</h2>
          <p class="section-desc">Nông sản sạch, đặc sản vùng miền từ các hợp tác xã uy tín trên khắp Việt Nam</p>
        </div>
        <div class="categories__grid">
          <router-link
            v-for="cat in categories" :key="cat.id"
            :to="`/danh-muc/${cat.slug}`"
            class="categories__item animate-fade-in-up animate-stagger"
          >
            <div class="categories__image-wrap">
              <img :src="cat.image" :alt="cat.name" loading="lazy" />
              <div class="categories__item-overlay">
                <i :class="cat.icon"></i>
              </div>
            </div>
            <h3 class="categories__name">{{ cat.name }}</h3>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==================== FEATURED PRODUCTS ==================== -->
    <section class="section featured">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Chọn lọc</span>
          <h2 class="section-title">Sản Phẩm Nổi Bật</h2>
          <p class="section-desc">Những sản phẩm được yêu thích nhất, được chứng nhận an toàn từ nông trại đến bàn ăn</p>
        </div>
        <div class="featured__tabs">
          <button
            v-for="tab in productTabs" :key="tab.key"
            :class="['featured__tab', { 'featured__tab--active': activeTab === tab.key }]"
            @click="activeTab = tab.key"
          >{{ tab.label }}</button>
        </div>
        <div class="featured__grid">
          <ProductCard
            v-for="product in displayedProducts" :key="product.id"
            :product="product"
            class="animate-fade-in-up animate-stagger"
          />
        </div>
        <div class="featured__more">
          <router-link to="/san-pham">
            <button class="hero__btn hero__btn--secondary">Xem tất cả sản phẩm <i class="pi pi-arrow-right"></i></button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==================== WHY CHOOSE US ==================== -->
    <section class="section why-us">
      <div class="why-us__bg">
        <img src="/images/about-farmer.jpg" alt="" />
      </div>
      <div class="container why-us__content">
        <div class="section-header" style="text-align:left">
          <span class="section-subtitle" style="display:block;text-align:left">&mdash; Tại sao chọn chúng tôi</span>
          <h2 class="section-title" style="color:#fff">Cam Kết Chất Lượng<br/>Từ Nông Trại Đến Bàn Ăn</h2>
        </div>
        <div class="why-us__grid">
          <div v-for="item in whyUsItems" :key="item.title" class="why-us__item">
            <div class="why-us__icon"><i :class="item.icon"></i></div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== FLASH SALE ==================== -->
    <section class="section flash-sale">
      <div class="container">
        <div class="flash-sale__header">
          <div>
            <h2 class="flash-sale__title"><i class="pi pi-bolt"></i> Flash Sale</h2>
            <p class="flash-sale__sub">Giảm giá sốc - Số lượng có hạn!</p>
          </div>
          <div class="flash-sale__countdown">
            <span class="flash-sale__time-label">Kết thúc sau:</span>
            <div class="flash-sale__timer">
              <div class="flash-sale__time-box">{{ countdownHours }}<small>giờ</small></div>
              <span>:</span>
              <div class="flash-sale__time-box">{{ countdownMinutes }}<small>phút</small></div>
              <span>:</span>
              <div class="flash-sale__time-box">{{ countdownSeconds }}<small>giây</small></div>
            </div>
          </div>
        </div>
        <div class="featured__grid">
          <ProductCard
            v-for="product in flashSaleProducts" :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>

    <!-- ==================== COOPERATIVES ==================== -->
    <section class="section cooperatives-section">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Đối tác tin cậy</span>
          <h2 class="section-title">Hợp Tác Xã Tiêu Biểu</h2>
          <p class="section-desc">Kết nối trực tiếp với những hợp tác xã nông sản uy tín hàng đầu Việt Nam</p>
        </div>
        <div class="cooperatives-section__grid">
          <CooperativeCard v-for="coop in featuredCoops" :key="coop.id" :coop="coop" />
        </div>
        <div class="featured__more">
          <router-link to="/hop-tac-xa">
            <button class="hero__btn hero__btn--secondary">Xem tất cả HTX <i class="pi pi-arrow-right"></i></button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==================== TRACEABILITY ==================== -->
    <section class="section traceability-section">
      <div class="container traceability-section__inner">
        <div class="traceability-section__text">
          <span class="section-subtitle" style="text-align:left;display:block">&mdash; Minh bạch</span>
          <h2 class="section-title">Truy Xuất Nguồn Gốc</h2>
          <p>Mỗi sản phẩm trên Terroir Direct đều có mã QR truy xuất nguồn gốc, giúp bạn biết rõ:</p>
          <ul class="traceability-section__list">
            <li><i class="pi pi-check-circle"></i> Sản phẩm được trồng ở đâu, bởi ai</li>
            <li><i class="pi pi-check-circle"></i> Ngày gieo trồng, thu hoạch, đóng gói</li>
            <li><i class="pi pi-check-circle"></i> Chứng nhận an toàn (VietGAP, Organic...)</li>
            <li><i class="pi pi-check-circle"></i> Quy trình vận chuyển và bảo quản</li>
          </ul>
          <router-link to="/truy-xuat-nguon-goc">
            <button class="hero__btn hero__btn--primary" style="margin-top:20px">
              <i class="pi pi-qrcode"></i> Truy xuất ngay
            </button>
          </router-link>
        </div>
        <div class="traceability-section__image">
          <img src="/images/traceability.jpg" alt="Truy xuất nguồn gốc" />
        </div>
      </div>
    </section>

    <!-- ==================== TESTIMONIALS ==================== -->
    <section class="section testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Khách hàng nói gì</span>
          <h2 class="section-title">Đánh Giá Từ Khách Hàng</h2>
        </div>
        <div class="testimonials__grid">
          <div v-for="t in testimonials" :key="t.name" class="testimonials__item">
            <div class="testimonials__stars">
              <i v-for="s in 5" :key="s" class="pi pi-star-fill"></i>
            </div>
            <p class="testimonials__text">"{{ t.text }}"</p>
            <div class="testimonials__author">
              <div class="testimonials__avatar">{{ t.name.charAt(0) }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ==================== DELIVERY / CTA ==================== -->
    <section class="section cta-section">
      <div class="container cta-section__inner">
        <div class="cta-section__image">
          <img src="/images/delivery.jpg" alt="Giao hàng nhanh" />
        </div>
        <div class="cta-section__text">
          <h2 class="section-title">Giao Hàng Tận Nơi<br/>Nông Sản Tươi Ngon</h2>
          <p>Đặt hàng online, nhận nông sản tươi sạch ngay tại nhà. Miễn phí giao hàng cho đơn từ 500.000₫.</p>
          <div class="cta-section__features">
            <div class="cta-section__feat"><i class="pi pi-truck"></i><span>Giao hàng 24-48h</span></div>
            <div class="cta-section__feat"><i class="pi pi-shield"></i><span>Đảm bảo tươi sạch</span></div>
            <div class="cta-section__feat"><i class="pi pi-refresh"></i><span>Đổi trả dễ dàng</span></div>
            <div class="cta-section__feat"><i class="pi pi-credit-card"></i><span>Thanh toán linh hoạt</span></div>
          </div>
          <router-link to="/san-pham">
            <button class="hero__btn hero__btn--primary" style="margin-top:24px">Mua sắm ngay <i class="pi pi-arrow-right"></i></button>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ==================== NEWSLETTER ==================== -->
    <section class="newsletter">
      <div class="container newsletter__inner">
        <div>
          <h3 class="newsletter__title">Đăng ký nhận tin</h3>
          <p class="newsletter__desc">Nhận ưu đãi độc quyền & thông tin nông sản mới nhất</p>
        </div>
        <div class="newsletter__form">
          <input v-model="email" type="email" placeholder="Email của bạn..." />
          <button @click="subscribe">Đăng ký</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import ProductCard from '@/components/common/ProductCard.vue'
import CooperativeCard from '@/components/common/CooperativeCard.vue'
import { PRODUCT_CATEGORIES } from '@/utils/constants'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const categories = PRODUCT_CATEGORIES
const currentSlide = ref(0)
const activeTab = ref('featured')
const email = ref('')

// Auto-slide
let slideInterval
onMounted(() => { slideInterval = setInterval(() => { currentSlide.value = (currentSlide.value + 1) % heroSlides.length }, 6000) })
onUnmounted(() => clearInterval(slideInterval))

// Countdown
const countdownHours = ref('08')
const countdownMinutes = ref('45')
const countdownSeconds = ref('30')
let countdownInterval
onMounted(() => {
  let total = 8 * 3600 + 45 * 60 + 30
  countdownInterval = setInterval(() => {
    total--; if (total <= 0) total = 24 * 3600
    const h = Math.floor(total / 3600); const m = Math.floor((total % 3600) / 60); const s = total % 60
    countdownHours.value = String(h).padStart(2, '0')
    countdownMinutes.value = String(m).padStart(2, '0')
    countdownSeconds.value = String(s).padStart(2, '0')
  }, 1000)
})
onUnmounted(() => clearInterval(countdownInterval))

const heroSlides = [
  {
    image: '/images/hero-banner.jpg',
    badge: '🌿 Nông sản sạch từ vùng đất lành',
    title: 'Từ Nông Trại<br/><em>Đến Bàn Ăn</em>',
    subtitle: 'Kết nối trực tiếp với các hợp tác xã nông sản sạch, đặc sản vùng miền. Truy xuất nguồn gốc minh bạch.',
    primaryText: 'Khám phá ngay', primaryLink: '/san-pham',
    secondaryText: 'Tìm hiểu thêm', secondaryLink: '/gioi-thieu'
  },
  {
    image: '/images/hero-banner-2.jpg',
    badge: '🏔️ Đặc sản vùng miền Việt Nam',
    title: 'Hương Vị<br/><em>Quê Hương</em>',
    subtitle: 'Mỗi sản phẩm là một câu chuyện, mỗi hương vị là ký ức của vùng đất và con người.',
    primaryText: 'Xem đặc sản', primaryLink: '/danh-muc/dac-san-vung-mien',
    secondaryText: 'Các HTX đối tác', secondaryLink: '/hop-tac-xa'
  }
]

const stats = [
  { icon: 'pi pi-users', value: '120+', label: 'Hợp tác xã' },
  { icon: 'pi pi-box', value: '2,500+', label: 'Sản phẩm' },
  { icon: 'pi pi-map-marker', value: '63', label: 'Tỉnh thành' },
  { icon: 'pi pi-heart', value: '50,000+', label: 'Khách hàng tin dùng' }
]

const productTabs = [
  { key: 'featured', label: 'Nổi bật' },
  { key: 'bestseller', label: 'Bán chạy' },
  { key: 'new', label: 'Mới nhất' },
  { key: 'organic', label: 'Organic' }
]

// Demo products
const demoProducts = [
  { id: 1, name: 'Gạo ST25 Sóc Trăng - Gạo ngon nhất thế giới', slug: 'gao-st25-soc-trang', price: 185000, salePrice: 165000, unit: '5kg', thumbnail: '/images/category-rice.jpg', cooperativeName: 'HTX Mỹ Thành', region: 'Sóc Trăng', rating: 4.9, soldCount: 2340, isOrganic: true, certifications: ['VietGAP'], cooperativeId: 1, stock: 100, tab: 'featured' },
  { id: 2, name: 'Xoài Cát Hòa Lộc - Cây chín tự nhiên', slug: 'xoai-cat-hoa-loc', price: 120000, salePrice: 98000, unit: 'kg', thumbnail: '/images/category-fruits.jpg', cooperativeName: 'HTX Cái Bè', region: 'Tiền Giang', rating: 4.8, soldCount: 1890, certifications: ['VietGAP'], cooperativeId: 2, stock: 50, tab: 'featured' },
  { id: 3, name: 'Rau hữu cơ tổng hợp - 8 loại rau theo mùa', slug: 'rau-huu-co-tong-hop', price: 85000, salePrice: null, unit: 'combo 2kg', thumbnail: '/images/category-vegetables.jpg', cooperativeName: 'HTX Thanh Xuân', region: 'Lâm Đồng', rating: 4.7, soldCount: 3200, isOrganic: true, certifications: ['Organic'], cooperativeId: 3, stock: 80, tab: 'featured' },
  { id: 4, name: 'Nước mắm Phú Quốc truyền thống 40°N', slug: 'nuoc-mam-phu-quoc', price: 210000, salePrice: 189000, unit: 'chai 500ml', thumbnail: '/images/category-specialty.jpg', cooperativeName: 'HTX Nước Mắm Phú Quốc', region: 'Kiên Giang', rating: 4.9, soldCount: 5600, certifications: ['HACCP', 'OCOP'], cooperativeId: 4, stock: 200, tab: 'featured' },
  { id: 5, name: 'Cà phê Robusta Buôn Ma Thuột rang mộc', slug: 'ca-phe-robusta', price: 145000, salePrice: 125000, unit: '500g', thumbnail: '/images/category-dried.jpg', cooperativeName: 'HTX Cà Phê Tây Nguyên', region: 'Đắk Lắk', rating: 4.8, soldCount: 4100, certifications: ['VietGAP'], cooperativeId: 5, stock: 150, tab: 'bestseller' },
  { id: 6, name: 'Mật ong hoa cà phê nguyên chất', slug: 'mat-ong-hoa-ca-phe', price: 250000, salePrice: null, unit: 'lọ 500ml', thumbnail: '/images/category-dried.jpg', cooperativeName: 'HTX Ong Mật Gia Lai', region: 'Gia Lai', rating: 4.7, soldCount: 980, isOrganic: true, certifications: ['Organic'], cooperativeId: 6, stock: 60, tab: 'bestseller' },
  { id: 7, name: 'Bưởi da xanh Bến Tre - Loại 1', slug: 'buoi-da-xanh-ben-tre', price: 75000, salePrice: 65000, unit: 'trái', thumbnail: '/images/category-fruits.jpg', cooperativeName: 'HTX Bưởi Da Xanh', region: 'Bến Tre', rating: 4.6, soldCount: 1500, certifications: ['VietGAP'], cooperativeId: 7, stock: 90, tab: 'new' },
  { id: 8, name: 'Tiêu đen Phú Quốc - Tiêu sọ hảo hạng', slug: 'tieu-den-phu-quoc', price: 320000, salePrice: 285000, unit: '500g', thumbnail: '/images/category-specialty.jpg', cooperativeName: 'HTX Tiêu Phú Quốc', region: 'Kiên Giang', rating: 4.9, soldCount: 2100, certifications: ['OCOP', 'GlobalGAP'], cooperativeId: 8, stock: 120, tab: 'new' },
]

const flashSaleProducts = demoProducts.slice(0, 4).map(p => ({
  ...p, salePrice: Math.round(p.price * 0.6), id: p.id + 100
}))

const displayedProducts = computed(() => {
  if (activeTab.value === 'featured') return demoProducts.filter(p => p.tab === 'featured' || !p.tab).slice(0, 8)
  return demoProducts.filter(p => p.tab === activeTab.value).concat(demoProducts).slice(0, 8)
})

const featuredCoops = [
  { id: 1, name: 'HTX Mỹ Thành', slug: 'htx-my-thanh', location: 'Sóc Trăng', region: 'ĐBSCL', shortDescription: 'Chuyên canh gạo ST25 đạt chuẩn VietGAP, xuất khẩu quốc tế', productCount: 45, rating: 4.9, memberCount: 120, certifications: ['VietGAP', 'OCOP'], coverImage: '/images/hero-banner.jpg' },
  { id: 2, name: 'HTX Nông Sản Đà Lạt', slug: 'htx-da-lat', location: 'Lâm Đồng', region: 'Tây Nguyên', shortDescription: 'Rau củ quả hữu cơ vùng cao, tươi sạch mỗi ngày', productCount: 68, rating: 4.8, memberCount: 85, certifications: ['Organic', 'VietGAP'], coverImage: '/images/about-farmer.jpg' },
  { id: 3, name: 'HTX Nước Mắm Phú Quốc', slug: 'htx-nuoc-mam-phu-quoc', location: 'Kiên Giang', region: 'ĐBSCL', shortDescription: 'Nước mắm truyền thống 200 năm, đặc sản quốc gia', productCount: 12, rating: 4.9, memberCount: 50, certifications: ['HACCP', 'OCOP'], coverImage: '/images/category-specialty.jpg' },
]

const whyUsItems = [
  { icon: 'pi pi-verified', title: 'Chứng nhận an toàn', desc: 'VietGAP, Organic, GlobalGAP - Tất cả sản phẩm đều có chứng nhận rõ ràng' },
  { icon: 'pi pi-qrcode', title: 'Truy xuất nguồn gốc', desc: 'Scan QR biết ngay xuất xứ, quy trình từ gieo trồng đến thu hoạch' },
  { icon: 'pi pi-users', title: 'Kết nối trực tiếp', desc: 'Mua trực tiếp từ HTX, không qua trung gian, giá tốt nhất' },
  { icon: 'pi pi-truck', title: 'Giao hàng tận nơi', desc: 'Đóng gói cẩn thận, giao nhanh 24-48h, miễn phí từ 500K' },
]

const testimonials = [
  { name: 'Nguyễn Thị Mai', location: 'TP. Hồ Chí Minh', text: 'Rau từ Terroir Direct tươi ngon hơn hẳn mua ngoài chợ. Scan QR biết ngay nguồn gốc, yên tâm cho gia đình dùng.' },
  { name: 'Trần Văn Hùng', location: 'Hà Nội', text: 'Gạo ST25 mua ở đây thơm dẻo tuyệt vời. Giá hợp lý vì mua trực tiếp từ HTX, không qua trung gian.' },
  { name: 'Lê Hoàng Anh', location: 'Đà Nẵng', text: 'Đặc sản vùng miền rất phong phú. Nước mắm Phú Quốc và tiêu Phú Quốc ở đây chất lượng hàng đầu!' },
]

function subscribe() {
  if (email.value) {
    toast.add({ severity: 'success', summary: 'Đăng ký thành công!', detail: 'Cảm ơn bạn đã đăng ký nhận tin.', life: 3000 })
    email.value = ''
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

// ==================== HERO ====================
.hero {
  position: relative;
  height: 520px;
  @include respond-to(md) { height: 600px; }
  overflow: hidden;

  &__slider { position: relative; height: 100%; }
  &__slide {
    position: absolute; inset: 0;
    opacity: 0; transition: opacity 1s ease;
    &--active { opacity: 1; z-index: 1; }
  }
  &__bg { width: 100%; height: 100%; object-fit: cover; }
  &__overlay {
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(26,18,8,.75) 0%, rgba(26,18,8,.3) 60%, transparent 100%);
  }
  &__content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; justify-content: center;
    padding-top: 40px; z-index: 2;
  }
  &__badge {
    display: inline-block; width: fit-content;
    background: rgba(255,255,255,.15); backdrop-filter: blur(8px);
    padding: 8px 18px; border-radius: $radius-full;
    color: $color-accent-light; font-size: 14px; font-weight: 600;
    margin-bottom: 16px; letter-spacing: 0.5px;
  }
  &__title {
    font-family: $font-display; font-size: 36px;
    @include respond-to(md) { font-size: 52px; }
    @include respond-to(lg) { font-size: 64px; }
    color: #fff; line-height: 1.15; margin-bottom: 16px; max-width: 700px;
    em { font-style: italic; color: $color-accent-light; }
  }
  &__subtitle {
    color: rgba(255,255,255,.8); font-size: 16px;
    @include respond-to(md) { font-size: 18px; }
    max-width: 540px; line-height: 1.7; margin-bottom: 28px;
  }
  &__actions { display: flex; gap: 12px; flex-wrap: wrap; }
  &__btn {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 14px 32px; font-size: 15px; font-weight: 700;
    border-radius: $radius-lg; border: 2px solid transparent;
    transition: all .3s; cursor: pointer;
    &--primary {
      background: linear-gradient(135deg, $color-primary, $color-primary-light);
      color: #fff; border-color: $color-primary;
      &:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(45,80,22,.4); }
    }
    &--secondary {
      background: transparent; color: #fff;
      border-color: rgba(255,255,255,.5);
      &:hover { background: rgba(255,255,255,.1); border-color: #fff; }
    }
  }

  &__dots {
    position: absolute; bottom: 100px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 8px; z-index: 3;
  }
  &__dot {
    width: 12px; height: 12px; border-radius: 50%;
    background: rgba(255,255,255,.4); border: none; cursor: pointer;
    transition: all .3s;
    &--active { background: $color-accent; width: 32px; border-radius: 6px; }
  }

  &__stats {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(45,80,22,.92); backdrop-filter: blur(8px);
    z-index: 3;
  }
  &__stats-inner {
    display: grid; grid-template-columns: repeat(2, 1fr);
    @include respond-to(md) { grid-template-columns: repeat(4, 1fr); }
  }
  &__stat {
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; color: #fff;
    border-right: 1px solid rgba(255,255,255,.1);
    &:last-child { border-right: none; }
    i { font-size: 24px; color: $color-accent-light; }
    strong { display: block; font-size: 22px; font-family: $font-display; }
    span { font-size: 12px; opacity: .7; }
  }
}

// ==================== CATEGORIES ====================
.categories {
  background: $color-warm-white;
  &__grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }
    @include respond-to(lg) { grid-template-columns: repeat(5, 1fr); }
    gap: 20px;
  }
  &__item {
    text-align: center; text-decoration: none;
    &:hover {
      .categories__image-wrap img { transform: scale(1.1); }
      .categories__item-overlay { opacity: 1; }
    }
  }
  &__image-wrap {
    position: relative; border-radius: $radius-xl; overflow: hidden;
    aspect-ratio: 1; margin-bottom: 12px;
    img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s ease; }
  }
  &__item-overlay {
    position: absolute; inset: 0;
    background: rgba(45,80,22,.3); opacity: 0;
    @include flex-center; transition: opacity .3s;
    i { font-size: 2rem; color: #fff; }
  }
  &__name {
    font-family: $font-display; font-size: 15px; color: $color-warm-gray-700;
  }
}

// ==================== FEATURED ====================
.featured {
  background: $color-warm-gray-100;
  &__tabs {
    display: flex; justify-content: center; gap: 8px; margin-bottom: 32px; flex-wrap: wrap;
  }
  &__tab {
    padding: 10px 24px; border-radius: $radius-full; font-size: 14px; font-weight: 600;
    background: #fff; color: $color-warm-gray-600; border: 1px solid $color-warm-gray-200;
    cursor: pointer; transition: all .2s;
    &:hover { border-color: $color-primary; color: $color-primary; }
    &--active {
      background: $color-primary; color: #fff; border-color: $color-primary;
    }
  }
  &__grid {
    display: grid; grid-template-columns: repeat(2, 1fr);
    @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }
    @include respond-to(lg) { grid-template-columns: repeat(4, 1fr); }
    gap: 20px;
  }
  &__more { text-align: center; margin-top: 36px; }
}

// ==================== WHY US ====================
.why-us {
  position: relative; overflow: hidden;
  padding: 80px 0 !important;
  &__bg {
    position: absolute; inset: 0;
    img { width: 100%; height: 100%; object-fit: cover; }
    &::after { content: ''; position: absolute; inset: 0; background: rgba(26,18,8,.82); }
  }
  &__content { position: relative; z-index: 1; }
  &__grid {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(md) { grid-template-columns: repeat(2, 1fr); }
    @include respond-to(lg) { grid-template-columns: repeat(4, 1fr); }
    gap: 24px; margin-top: 20px;
  }
  &__item {
    background: rgba(255,255,255,.08); backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,.1);
    border-radius: $radius-lg; padding: 28px; transition: all .3s;
    &:hover { background: rgba(255,255,255,.12); transform: translateY(-4px); }
    h4 { color: #fff; font-family: $font-display; font-size: 16px; margin-bottom: 8px; }
    p { color: rgba(255,255,255,.7); font-size: 14px; line-height: 1.7; }
  }
  &__icon {
    width: 52px; height: 52px; border-radius: $radius-lg;
    background: linear-gradient(135deg, $color-accent, $color-accent-light);
    @include flex-center; margin-bottom: 16px;
    i { font-size: 1.3rem; color: $color-dark; }
  }
}

// ==================== FLASH SALE ====================
.flash-sale {
  background: linear-gradient(135deg, #fff5f5, #fff9f0);
  &__header {
    @include flex-between; flex-wrap: wrap; gap: 20px; margin-bottom: 32px;
  }
  &__title {
    font-family: $font-display; font-size: 28px; color: $color-danger;
    i { color: $color-accent; animation: float 2s infinite; }
  }
  &__sub { color: $color-warm-gray-500; font-size: 14px; }
  &__countdown { display: flex; align-items: center; gap: 12px; }
  &__time-label { font-size: 13px; color: $color-warm-gray-500; }
  &__timer { display: flex; align-items: center; gap: 6px; span { font-size: 20px; font-weight: 700; color: $color-danger; } }
  &__time-box {
    background: $color-danger; color: #fff; padding: 8px 14px; border-radius: $radius-md;
    font-size: 22px; font-weight: 700; font-family: $font-display; text-align: center; min-width: 56px;
    small { display: block; font-size: 10px; font-weight: 400; opacity: .8; }
  }
}

// ==================== COOPERATIVES ====================
.cooperatives-section {
  &__grid {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(md) { grid-template-columns: repeat(2, 1fr); }
    @include respond-to(lg) { grid-template-columns: repeat(3, 1fr); }
    gap: 24px;
  }
}

// ==================== TRACEABILITY ====================
.traceability-section {
  background: $color-warm-gray-100;
  &__inner {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(lg) { grid-template-columns: 1fr 1fr; }
    gap: 48px; align-items: center;
  }
  &__text {
    p { color: $color-warm-gray-500; font-size: 16px; line-height: 1.8; margin-bottom: 16px; }
  }
  &__list {
    list-style: none; padding: 0;
    li {
      display: flex; align-items: center; gap: 10px;
      padding: 8px 0; font-size: 15px; color: $color-warm-gray-700;
      i { color: $color-primary; font-size: 16px; }
    }
  }
  &__image {
    border-radius: $radius-xl; overflow: hidden; box-shadow: $shadow-lg;
    img { width: 100%; display: block; }
  }
}

// ==================== TESTIMONIALS ====================
.testimonials {
  &__grid {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(md) { grid-template-columns: repeat(3, 1fr); }
    gap: 24px;
  }
  &__item {
    background: #fff; border-radius: $radius-lg; padding: 28px;
    box-shadow: $shadow-sm; transition: all .3s;
    &:hover { transform: translateY(-4px); box-shadow: $shadow-md; }
  }
  &__stars { margin-bottom: 14px; i { color: $color-accent; font-size: 14px; } }
  &__text { font-size: 14px; color: $color-warm-gray-600; line-height: 1.7; margin-bottom: 20px; font-style: italic; }
  &__author {
    display: flex; align-items: center; gap: 12px;
    strong { display: block; font-size: 14px; }
    span { font-size: 12px; color: $color-warm-gray-400; }
  }
  &__avatar {
    width: 42px; height: 42px; border-radius: 50%;
    background: linear-gradient(135deg, $color-primary, $color-primary-light);
    color: #fff; font-weight: 700; @include flex-center;
  }
}

// ==================== CTA ====================
.cta-section {
  &__inner {
    display: grid; grid-template-columns: 1fr;
    @include respond-to(lg) { grid-template-columns: 1fr 1fr; }
    gap: 48px; align-items: center;
  }
  &__image {
    border-radius: $radius-xl; overflow: hidden; box-shadow: $shadow-lg;
    img { width: 100%; display: block; }
  }
  &__text {
    p { color: $color-warm-gray-500; font-size: 16px; line-height: 1.8; margin: 16px 0 24px; }
  }
  &__features {
    display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
  }
  &__feat {
    display: flex; align-items: center; gap: 10px;
    i {
      width: 40px; height: 40px; border-radius: $radius-md;
      background: $color-warm-gray-100; @include flex-center;
      color: $color-primary; font-size: 1rem;
    }
    span { font-size: 14px; font-weight: 600; color: $color-warm-gray-700; }
  }
}

// ==================== NEWSLETTER ====================
.newsletter {
  background: linear-gradient(135deg, $color-primary, $color-primary-light);
  padding: 48px 0;
  &__inner {
    display: flex; justify-content: space-between; align-items: center;
    flex-wrap: wrap; gap: 24px;
  }
  &__title { font-family: $font-display; font-size: 24px; color: #fff; }
  &__desc { color: rgba(255,255,255,.8); font-size: 14px; margin-top: 4px; }
  &__form {
    display: flex; gap: 0;
    input {
      padding: 14px 20px; border: 2px solid rgba(255,255,255,.3);
      background: rgba(255,255,255,.1); color: #fff;
      border-radius: $radius-lg 0 0 $radius-lg; font-size: 14px; width: 300px;
      outline: none; backdrop-filter: blur(4px);
      &::placeholder { color: rgba(255,255,255,.5); }
      &:focus { border-color: $color-accent; background: rgba(255,255,255,.15); }
    }
    button {
      padding: 14px 28px; background: $color-accent; color: $color-dark;
      font-weight: 700; font-size: 14px; border-radius: 0 $radius-lg $radius-lg 0;
      border: none; cursor: pointer; transition: background .2s;
      &:hover { background: $color-accent-light; }
    }
  }
}
</style>
