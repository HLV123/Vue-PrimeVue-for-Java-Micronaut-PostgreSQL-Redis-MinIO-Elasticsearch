<template>
  <footer class="td-footer">
    <div class="td-footer__wave">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z" fill="currentColor"/>
      </svg>
    </div>

    <div class="td-footer__main">
      <div class="container">
        <div class="td-footer__grid">
          <!-- Brand -->
          <div class="td-footer__brand">
            <img src="/images/logo.png" alt="Terroir Direct" class="td-footer__logo" />
            <p class="td-footer__desc">
              Sàn thương mại điện tử kết nối trực tiếp người tiêu dùng với các hợp tác xã nông sản sạch, đặc sản vùng miền Việt Nam.
            </p>
            <div class="td-footer__social">
              <a href="#" title="Facebook"><i class="pi pi-facebook"></i></a>
              <a href="#" title="Youtube"><i class="pi pi-youtube"></i></a>
              <a href="#" title="Instagram"><i class="pi pi-instagram"></i></a>
              <a href="#" title="TikTok"><i class="pi pi-tiktok"></i></a>
            </div>
          </div>

          <!-- Links -->
          <div class="td-footer__col">
            <h4>Về chúng tôi</h4>
            <router-link to="/gioi-thieu">Giới thiệu</router-link>
            <router-link to="/hop-tac-xa">Hợp tác xã đối tác</router-link>
            <router-link to="/truy-xuat-nguon-goc">Truy xuất nguồn gốc</router-link>
            <router-link to="/blog">Blog nông nghiệp</router-link>
            <a href="#">Tuyển dụng</a>
          </div>

          <div class="td-footer__col">
            <h4>Hỗ trợ</h4>
            <a href="#">Hướng dẫn mua hàng</a>
            <a href="#">Chính sách giao hàng</a>
            <a href="#">Chính sách đổi trả</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Điều khoản sử dụng</a>
            <router-link to="/lien-he">Liên hệ</router-link>
          </div>

          <div class="td-footer__col">
            <h4>Danh mục sản phẩm</h4>
            <router-link to="/danh-muc/rau-cu-qua">Rau Củ Quả</router-link>
            <router-link to="/danh-muc/trai-cay">Trái Cây</router-link>
            <router-link to="/danh-muc/gao-ngu-coc">Gạo & Ngũ Cốc</router-link>
            <router-link to="/danh-muc/dac-san-vung-mien">Đặc Sản Vùng Miền</router-link>
            <router-link to="/danh-muc/nong-san-che-bien">Nông Sản Chế Biến</router-link>
          </div>

          <!-- Contact -->
          <div class="td-footer__col">
            <h4>Liên hệ</h4>
            <div class="td-footer__contact-item">
              <i class="pi pi-map-marker"></i>
              <span>123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
            </div>
            <div class="td-footer__contact-item">
              <i class="pi pi-phone"></i>
              <span>1900 6868</span>
            </div>
            <div class="td-footer__contact-item">
              <i class="pi pi-envelope"></i>
              <span>support@terroirdirect.vn</span>
            </div>
            <div class="td-footer__contact-item">
              <i class="pi pi-clock"></i>
              <span>T2 - CN: 8:00 - 21:00</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="td-footer__bottom">
      <div class="container td-footer__bottom-inner">
        <p>&copy; {{ currentYear }} Terroir Direct. Tất cả quyền được bảo lưu.</p>
        <div class="td-footer__payments">
          <span>Thanh toán:</span>
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='%23fff'%3E%3Crect width='40' height='24' rx='4' fill='%23fff' fill-opacity='.15'/%3E%3Ctext x='20' y='16' font-size='9' text-anchor='middle' fill='%23fff'%3ECOD%3C/text%3E%3C/svg%3E" alt="COD" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='%23fff'%3E%3Crect width='40' height='24' rx='4' fill='%23fff' fill-opacity='.15'/%3E%3Ctext x='20' y='16' font-size='8' text-anchor='middle' fill='%23fff'%3EVNPay%3C/text%3E%3C/svg%3E" alt="VNPay" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='%23fff'%3E%3Crect width='40' height='24' rx='4' fill='%23fff' fill-opacity='.15'/%3E%3Ctext x='20' y='16' font-size='8' text-anchor='middle' fill='%23fff'%3EMoMo%3C/text%3E%3C/svg%3E" alt="MoMo" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='24' fill='%23fff'%3E%3Crect width='40' height='24' rx='4' fill='%23fff' fill-opacity='.15'/%3E%3Ctext x='20' y='16' font-size='7' text-anchor='middle' fill='%23fff'%3EBank%3C/text%3E%3C/svg%3E" alt="Bank" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables' as *;
@use '@/assets/styles/mixins' as *;

.td-footer {
  position: relative;
  margin-top: $space-4xl;

  &__wave {
    color: $color-primary-dark;
    svg { display: block; width: 100%; height: 40px; }
  }

  &__main {
    background: $color-primary-dark;
    padding: $space-3xl 0 $space-2xl;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: $space-2xl;
    @include respond-to(md) { grid-template-columns: repeat(2, 1fr); }
    @include respond-to(lg) { grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr; gap: $space-xl; }
  }

  &__brand {}
  &__logo { height: 60px; margin-bottom: $space-md; }
  &__desc { color: rgba(255,255,255,.7); font-size: 14px; line-height: 1.7; margin-bottom: $space-lg; }
  &__social {
    display: flex; gap: 10px;
    a {
      width: 38px; height: 38px; border-radius: 50%;
      background: rgba(255,255,255,.1); color: rgba(255,255,255,.8);
      @include flex-center; transition: all .2s;
      &:hover { background: $color-accent; color: $color-dark; transform: translateY(-2px); }
    }
  }

  &__col {
    h4 {
      font-family: $font-display; font-size: 16px; color: #fff;
      margin-bottom: $space-md; position: relative; padding-bottom: $space-sm;
      &::after { content: ''; position: absolute; bottom: 0; left: 0; width: 30px; height: 2px; background: $color-accent; }
    }
    a {
      display: block; color: rgba(255,255,255,.65); font-size: 14px;
      padding: 5px 0; transition: all .2s;
      &:hover { color: $color-accent-light; padding-left: 4px; }
    }
  }

  &__contact-item {
    display: flex; align-items: flex-start; gap: 10px;
    color: rgba(255,255,255,.65); font-size: 14px; padding: 5px 0;
    i { color: $color-accent; margin-top: 2px; font-size: 13px; }
  }

  &__bottom {
    background: darken($color-primary-dark, 4%);
    padding: $space-md 0;
    &-inner {
      @include flex-between;
      flex-wrap: wrap; gap: $space-md;
      p { color: rgba(255,255,255,.5); font-size: 13px; }
    }
  }

  &__payments {
    display: flex; align-items: center; gap: 8px;
    span { color: rgba(255,255,255,.5); font-size: 13px; }
    img { height: 24px; }
  }
}
</style>
