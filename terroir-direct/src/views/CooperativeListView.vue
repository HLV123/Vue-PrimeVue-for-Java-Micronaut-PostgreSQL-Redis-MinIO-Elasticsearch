<template>
  <div>
    <div class="coop-banner"><img src="/images/about-farmer.jpg" alt="" /><div class="coop-banner__overlay"></div>
      <div class="coop-banner__content"><h1>Hợp Tác Xã Đối Tác</h1><p>120+ hợp tác xã uy tín trên khắp Việt Nam</p></div>
    </div>
    <div class="container" style="padding:36px 0 60px">
      <div class="coop-stats"><div v-for="s in stats" :key="s.label" class="coop-stat"><strong>{{ s.value }}</strong><span>{{ s.label }}</span></div></div>
      <div class="coop-grid"><CooperativeCard v-for="c in coops" :key="c.id" :coop="c" /></div>
    </div>
  </div>
</template>
<script setup>
import CooperativeCard from "@/components/common/CooperativeCard.vue"
import { mockCooperatives } from "@/mock/data.js"
const coops = mockCooperatives
const stats = [
  { value: "120+", label: "Hợp tác xã" }, { value: "63", label: "Tỉnh thành" },
  { value: "2,500+", label: "Sản phẩm" }, { value: "4.8★", label: "Đánh giá TB" }
]
</script>
<style lang="scss" scoped>
@use "@/assets/styles/variables" as *;
@use "@/assets/styles/mixins" as *;
.coop-banner { position: relative; height: 240px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } &__overlay { position: absolute; inset: 0; background: rgba(26,18,8,.65); } &__content { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; h1 { font-family: $font-display; font-size: 32px; color: #fff; } p { color: rgba(255,255,255,.75); margin-top: 8px; } } }
.coop-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 32px; }
.coop-stat { text-align: center; background: #fff; padding: 20px; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,.06); strong { display: block; font-size: 28px; font-family: $font-display; color: $color-primary; } span { font-size: 13px; color: $color-warm-gray-400; } }
.coop-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 24px; }
</style>