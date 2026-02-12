<template>
  <div class="container" style="padding:40px 0 60px">
    <h1 style="font-family:'Playfair Display',serif;font-size:28px;margin-bottom:32px;text-align:center">Liên Hệ Với Chúng Tôi</h1>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px">
      <div>
        <h2 style="font-family:'Playfair Display',serif;font-size:20px;margin-bottom:20px">Gửi tin nhắn</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px"><div><label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Họ tên</label><InputText v-model="form.name" class="w-full" placeholder="Nguyễn Văn A" /></div><div><label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Email</label><InputText v-model="form.email" class="w-full" placeholder="email@example.com" /></div></div>
        <div style="margin-bottom:16px"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Chủ đề</label><InputText v-model="form.subject" class="w-full" placeholder="Chọn chủ đề" /></div>
        <div style="margin-bottom:16px"><label style="display:block;font-size:13px;font-weight:600;margin-bottom:6px">Nội dung</label><Textarea v-model="form.message" rows="5" class="w-full" placeholder="Nhập nội dung..." /></div>
        <Button label="Gửi tin nhắn" icon="pi pi-send" class="td-btn-primary" @click="submit" />
      </div>
      <div>
        <h2 style="font-family:'Playfair Display',serif;font-size:20px;margin-bottom:20px">Thông tin liên hệ</h2>
        <div style="display:flex;flex-direction:column;gap:24px">
          <div v-for="item in contactInfo" :key="item.label" style="display:flex;gap:16px">
            <div style="width:48px;height:48px;border-radius:12px;background:#F5F0E8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><i :class="item.icon" style="color:#2D5016"></i></div>
            <div><strong style="display:block;font-size:15px">{{ item.label }}</strong><p style="color:#8C7A66;font-size:14px;margin-top:2px">{{ item.value }}</p></div>
          </div>
        </div>
        <div style="margin-top:32px;background:#F5F0E8;border-radius:12px;padding:24px">
          <h3 style="font-family:'Playfair Display',serif;font-size:16px;margin-bottom:12px">Bạn là hợp tác xã?</h3>
          <p style="font-size:14px;color:#6B5B4A;line-height:1.7;margin-bottom:12px">Tham gia hệ thống Terroir Direct để tiếp cận hàng chục ngàn khách hàng.</p>
          <router-link to="/dang-ky"><Button label="Đăng ký HTX" icon="pi pi-arrow-right" severity="success" size="small" /></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useToast } from "primevue/usetoast"
import InputText from "primevue/inputtext"
import Textarea from "primevue/textarea"
import Button from "primevue/button"
const toast = useToast()
const form = ref({ name: "", email: "", subject: "", message: "" })
const contactInfo = [
  { label: "Địa chỉ", value: "123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh", icon: "pi pi-map-marker" },
  { label: "Hotline", value: "1900 6868 (8:00 - 21:00)", icon: "pi pi-phone" },
  { label: "Email", value: "support@terroirdirect.vn", icon: "pi pi-envelope" },
  { label: "Giờ làm việc", value: "Thứ 2 - Chủ nhật: 8:00 - 21:00", icon: "pi pi-clock" },
]
function submit() { toast.add({ severity: "success", summary: "Gửi thành công!", detail: "Chúng tôi sẽ phản hồi trong 24h.", life: 3000 }); form.value = { name: "", email: "", subject: "", message: "" } }
</script>