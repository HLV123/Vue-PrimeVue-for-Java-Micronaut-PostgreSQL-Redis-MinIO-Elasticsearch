<template>
  <div class="coop-card" @click="$router.push(`/hop-tac-xa/${coop.slug || coop.id}`)">
    <div class="coop-card__cover">
      <img :src="coop.coverImage || '/images/about-farmer.jpg'" :alt="coop.name" loading="lazy" />
      <div class="coop-card__avatar-wrap">
        <img :src="coop.avatar || '/images/logo.png'" :alt="coop.name" class="coop-card__avatar" />
      </div>
    </div>
    <div class="coop-card__body">
      <h3 class="coop-card__name">{{ coop.name }}</h3>
      <div class="coop-card__location"><i class="pi pi-map-marker"></i> {{ coop.location || coop.region }}</div>
      <p class="coop-card__desc">{{ coop.shortDescription || 'Hợp tác xã nông sản sạch, đặc sản vùng miền' }}</p>
      <div class="coop-card__stats">
        <div class="coop-card__stat">
          <strong>{{ coop.productCount || 0 }}</strong>
          <span>Sản phẩm</span>
        </div>
        <div class="coop-card__stat">
          <strong>{{ coop.rating?.toFixed(1) || '4.5' }}</strong>
          <span><i class="pi pi-star-fill" style="color:#D4A017;font-size:11px"></i> Đánh giá</span>
        </div>
        <div class="coop-card__stat">
          <strong>{{ coop.memberCount || 0 }}</strong>
          <span>Thành viên</span>
        </div>
      </div>
      <div class="coop-card__certs" v-if="coop.certifications?.length">
        <span v-for="cert in coop.certifications.slice(0,3)" :key="cert" class="badge-organic">{{ cert }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ coop: { type: Object, required: true } })
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.coop-card {
  background: #fff; border-radius: $radius-lg; overflow: hidden;
  box-shadow: $shadow-sm; cursor: pointer; transition: all $transition-base;
  &:hover { transform: translateY(-4px); box-shadow: $shadow-lg; }

  &__cover {
    position: relative; height: 140px; overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; }
  }
  &__avatar-wrap {
    position: absolute; bottom: -24px; left: 16px;
    width: 56px; height: 56px; border-radius: 50%;
    border: 3px solid #fff; overflow: hidden; background: #fff; box-shadow: $shadow-sm;
  }
  &__avatar { width: 100%; height: 100%; object-fit: cover; }

  &__body { padding: 32px 16px 16px; }
  &__name { font-family: $font-display; font-size: 16px; margin-bottom: 4px; }
  &__location { font-size: 12px; color: $color-warm-gray-400; margin-bottom: 8px; i { font-size: 10px; } }
  &__desc { font-size: 13px; color: $color-warm-gray-500; @include line-clamp(2); margin-bottom: 12px; }

  &__stats {
    display: flex; gap: 12px; padding: 10px 0; border-top: 1px solid $color-warm-gray-100;
  }
  &__stat {
    flex: 1; text-align: center;
    strong { display: block; font-size: 16px; font-weight: 700; color: $color-primary; }
    span { font-size: 11px; color: $color-warm-gray-400; }
  }

  &__certs { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 10px; }
}
</style>
