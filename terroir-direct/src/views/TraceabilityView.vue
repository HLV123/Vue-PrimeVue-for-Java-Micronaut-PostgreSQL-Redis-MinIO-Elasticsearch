<template>
  <div>
    <div class="trace-banner"><img src="/images/traceability.jpg" alt="" /><div class="trace-ov"></div>
      <div class="trace-ct"><h1>Truy Xuất Nguồn Gốc</h1><p>Minh bạch từ nông trại đến bàn ăn</p></div>
    </div>
    <div class="container trace-main">
      <div class="trace-box">
        <h2>Nhập mã truy xuất hoặc quét QR</h2>
        <p>Nhập mã trên bao bì sản phẩm để xem toàn bộ quy trình</p>
        <div class="trace-input">
          <InputText v-model="code" placeholder="VD: TD-ST25-2025-089" style="flex:1;font-size:16px;padding:14px" />
          <Button label="Tra cứu" icon="pi pi-search" class="td-btn-primary" @click="lookup" />
        </div>
      </div>
      <div v-if="result" class="trace-result">
        <h2>Kết quả: {{ result.batchNumber }}</h2>
        <div class="trace-timeline">
          <div v-for="(step, idx) in result.timeline" :key="idx" class="trace-step">
            <div class="trace-dot"><i :class="step.icon"></i></div>
            <div class="trace-content">
              <strong>{{ step.title }}</strong>
              <span class="trace-date">{{ step.date }}</span>
              <p>{{ step.desc }}</p>
              <span class="trace-loc"><i class="pi pi-map-marker"></i> {{ step.location }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { mockProducts } from '@/mock/data.js'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
const code = ref('TD-ST25-2025-089')
const result = ref(null)
function lookup() { result.value = mockProducts[0].traceability }
</script>
<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
.trace-banner { position: relative; height: 240px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } }
.trace-ov { position: absolute; inset: 0; background: rgba(26,18,8,.65); }
.trace-ct { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; h1 { font-family: $font-display; font-size: 32px; color: #fff; } p { color: rgba(255,255,255,.75); } }
.trace-main { padding: 48px 0 60px; max-width: 750px; margin: 0 auto; }
.trace-box { text-align: center; margin-bottom: 40px; h2 { font-family: $font-display; margin-bottom: 8px; } p { color: $color-warm-gray-500; margin-bottom: 20px; } }
.trace-input { display: flex; gap: 12px; max-width: 500px; margin: 0 auto; }
.trace-result { h2 { font-family: $font-display; font-size: 20px; margin-bottom: 24px; text-align: center; } }
.trace-timeline { padding: 0 20px; }
.trace-step { display: flex; gap: 16px; position: relative; padding-bottom: 32px; &:not(:last-child)::before { content: ''; position: absolute; left: 19px; top: 44px; bottom: 0; width: 2px; background: $color-warm-gray-200; } }
.trace-dot { width: 40px; height: 40px; border-radius: 50%; background: linear-gradient(135deg, $color-primary, $color-primary-light); color: #fff; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.trace-content { strong { display: block; font-size: 16px; } p { font-size: 14px; color: $color-warm-gray-600; margin: 4px 0; } }
.trace-date { font-size: 12px; color: $color-warm-gray-400; margin-left: 8px; }
.trace-loc { font-size: 12px; color: $color-primary; i { font-size: 10px; } }
</style>
