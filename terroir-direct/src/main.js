import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import DialogService from 'primevue/dialogservice'
import Tooltip from 'primevue/tooltip'
import Ripple from 'primevue/ripple'
import BadgeDirective from 'primevue/badgedirective'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'

import 'primeicons/primeicons.css'
import './assets/styles/main.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: '.td-dark',
      cssLayer: false
    }
  },
  locale: {
    accept: 'Đồng ý',
    reject: 'Hủy',
    choose: 'Chọn',
    upload: 'Tải lên',
    cancel: 'Hủy',
    dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
    today: 'Hôm nay',
    clear: 'Xóa',
    emptyMessage: 'Không có kết quả',
    emptyFilterMessage: 'Không tìm thấy kết quả phù hợp'
  }
})
app.use(ConfirmationService)
app.use(ToastService)
app.use(DialogService)

app.directive('tooltip', Tooltip)
app.directive('ripple', Ripple)
app.directive('badge', BadgeDirective)

// Initialize auth before mounting
const authStore = useAuthStore()
authStore.initialize().finally(() => {
  app.mount('#app')
})
