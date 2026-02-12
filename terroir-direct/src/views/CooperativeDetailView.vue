<template>
  <div class="container cd-page">
    <div class="cd-cover">
      <img :src="coop.coverImage" alt="" />
      <div class="cd-cover__ov"></div>
      <div class="cd-cover__info">
        <div class="cd-ava"><img :src="coop.avatar" /></div>
        <div><h1>{{ coop.name }}</h1><p><i class="pi pi-map-marker"></i> {{ coop.location }}</p></div>
      </div>
    </div>
    <div class="cd-badges"><span v-for="c in coop.certifications" :key="c" class="badge-organic">{{ c }}</span></div>
    <div class="cd-grid">
      <div>
        <div class="cd-sec"><h2>Câu chuyện HTX</h2><p class="cd-desc">{{ coop.description }}</p></div>
        <div class="cd-sec"><h2>Sản phẩm ({{ coopProducts.length }})</h2>
          <div class="cd-prods"><ProductCard v-for="p in coopProducts" :key="p.id" :product="p" /></div>
        </div>
      </div>
      <aside>
        <div class="cd-card">
          <h3>Thông tin</h3>
          <div class="cd-row" v-for="item in infoRows" :key="item.label"><i :class="item.icon"></i><span>{{ item.label }}: {{ item.value }}</span></div>
        </div>
      </aside>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/common/ProductCard.vue'
import { mockCooperatives, mockProducts } from '@/mock/data.js'
const route = useRoute()
const coop = computed(() => mockCooperatives.find(c => c.slug === route.params.slug) || mockCooperatives[0])
const coopProducts = computed(() => mockProducts.filter(p => p.cooperativeId === coop.value.id))
const infoRows = computed(() => [
  { icon: 'pi pi-calendar', label: 'Thành lập', value: coop.value.foundedYear },
  { icon: 'pi pi-users', label: 'Thành viên', value: coop.value.memberCount },
  { icon: 'pi pi-map', label: 'Diện tích', value: coop.value.area },
  { icon: 'pi pi-box', label: 'Sản phẩm', value: coop.value.productCount },
  { icon: 'pi pi-star-fill', label: 'Đánh giá', value: coop.value.rating + '/5' },
  { icon: 'pi pi-phone', label: 'SĐT', value: coop.value.phone },
  { icon: 'pi pi-envelope', label: 'Email', value: coop.value.email },
])
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;
.cd-page { padding: 24px 0 60px; }
.cd-cover { position: relative; height: 280px; border-radius: 16px; overflow: hidden; margin-bottom: 16px; img { width: 100%; height: 100%; object-fit: cover; } &__ov { position: absolute; inset: 0; background: linear-gradient(transparent 40%, rgba(0,0,0,.7)); } &__info { position: absolute; bottom: 24px; left: 24px; display: flex; align-items: center; gap: 16px; color: #fff; h1 { font-family: $font-display; font-size: 28px; } p { opacity: .8; font-size: 14px; } } }
.cd-ava { width: 60px; height: 60px; border-radius: 50%; border: 3px solid #fff; overflow: hidden; background: #fff; img { width: 100%; height: 100%; object-fit: cover; } }
.cd-badges { display: flex; gap: 8px; margin-bottom: 24px; flex-wrap: wrap; }
.cd-grid { display: grid; grid-template-columns: 1fr; @include respond-to(lg) { grid-template-columns: 1fr 320px; } gap: 32px; }
.cd-sec { margin-bottom: 32px; h2 { font-family: $font-display; font-size: 22px; margin-bottom: 16px; } }
.cd-desc { color: $color-warm-gray-600; line-height: 1.8; font-size: 15px; }
.cd-prods { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.cd-card { background: #fff; border-radius: 12px; padding: 24px; box-shadow: $shadow-sm; position: sticky; top: 120px; h3 { font-family: $font-display; margin-bottom: 16px; } }
.cd-row { display: flex; align-items: center; gap: 10px; padding: 8px 0; font-size: 14px; color: $color-warm-gray-600; i { color: $color-primary; width: 18px; text-align: center; } }
</style>
