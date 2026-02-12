<template>
  <div>
    <div style="position:relative;height:300px;overflow:hidden"><img src="/images/hero-banner.jpg" style="width:100%;height:100%;object-fit:cover" /><div style="position:absolute;inset:0;background:rgba(26,18,8,.7);display:flex;align-items:center;justify-content:center;flex-direction:column"><h1 style="font-family:'Playfair Display',serif;font-size:40px;color:#fff">Về Terroir Direct</h1><p style="color:rgba(255,255,255,.8);font-size:18px;margin-top:8px">Kết nối nông sản sạch - Từ đồng ruộng đến bàn ăn</p></div></div>
    <div class="container" style="padding:60px 0">
      <div style="max-width:800px;margin:0 auto 48px;text-align:center"><h2 style="font-family:'Playfair Display',serif;font-size:28px;margin-bottom:16px">Sứ mệnh của chúng tôi</h2><p style="color:#6B5B4A;font-size:17px;line-height:1.9">Terroir Direct ra đời với sứ mệnh kết nối trực tiếp người tiêu dùng với các hợp tác xã nông sản sạch trên khắp Việt Nam. Chúng tôi tin rằng mỗi sản phẩm nông sản đều mang trong mình câu chuyện của vùng đất, con người và bản sắc văn hóa.</p></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center;margin-bottom:60px">
        <div v-for="s in stats" :key="s.label" style="padding:32px"><div style="width:64px;height:64px;border-radius:16px;background:linear-gradient(135deg,#D4A017,#F0C75E);margin:0 auto 16px;display:flex;align-items:center;justify-content:center"><i :class="s.icon" style="font-size:1.5rem;color:#1A1208"></i></div><h4 style="font-family:'Playfair Display',serif;margin-bottom:8px">{{ s.value }}</h4><p style="font-size:14px;color:#8C7A66">{{ s.label }}</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;margin-bottom:60px">
        <img src="/images/about-farmer.jpg" style="width:100%;border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.12)" />
        <div><h2 style="font-family:'Playfair Display',serif;font-size:24px;margin-bottom:16px">Câu chuyện Terroir</h2><p style="color:#6B5B4A;line-height:1.9;margin-bottom:16px">Terroir - thuật ngữ của người Pháp, nói về hương vị đặc trưng mà vùng đất ban tặng cho sản phẩm. Mỗi vùng miền Việt Nam đều có terroir riêng: vị ngọt thanh của gạo ST25 Sóc Trăng, hương nồng nàn của tiêu Phú Quốc, vị đắng sâu của cà phê Buôn Ma Thuột.</p><p style="color:#6B5B4A;line-height:1.9">Chúng tôi kết nối trực tiếp người tiêu dùng với hơn 120 hợp tác xã, loại bỏ trung gian, đảm bảo giá tốt cho cả hai bên. Mỗi sản phẩm đều có mã QR truy xuất nguồn gốc minh bạch.</p></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center">
        <div><h2 style="font-family:'Playfair Display',serif;font-size:24px;margin-bottom:16px">Truy xuất nguồn gốc</h2><p style="color:#6B5B4A;line-height:1.9;margin-bottom:16px">Hệ thống truy xuất nguồn gốc QR code cho phép bạn theo dõi toàn bộ hành trình sản phẩm: từ gieo trồng, chăm sóc, kiểm định, thu hoạch, đóng gói đến vận chuyển.</p><router-link to="/truy-xuat-nguon-goc"><button style="padding:12px 28px;background:linear-gradient(135deg,#2D5016,#4A7C28);color:#fff;border-radius:10px;font-weight:700;border:none;cursor:pointer"><i class="pi pi-qrcode"></i> Truy xuất ngay</button></router-link></div>
        <img src="/images/traceability.jpg" style="width:100%;border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.12)" />
      </div>
    </div>
  </div>
</template>
<script setup>
const stats = [
  { value: "120+", label: "Hợp tác xã đối tác", icon: "pi pi-users" },
  { value: "2,500+", label: "Sản phẩm nông sản", icon: "pi pi-box" },
  { value: "63", label: "Tỉnh thành phủ sóng", icon: "pi pi-map-marker" },
  { value: "50,000+", label: "Khách hàng tin dùng", icon: "pi pi-heart" },
]
</script>