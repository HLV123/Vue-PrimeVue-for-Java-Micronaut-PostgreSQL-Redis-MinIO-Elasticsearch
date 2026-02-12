// ============================================
// TERROIR DIRECT - Mock Data
// Dữ liệu mẫu đầy đủ cho trải nghiệm frontend
// ============================================

// ==================== USERS ====================
export const mockUsers = [
  {
    id: 1,
    email: 'user@terroir.vn',
    password: '123456',
    firstName: 'Minh',
    lastName: 'Nguyễn Văn',
    phone: '0901234567',
    avatar: null,
    role: 'CONSUMER',
    addresses: [
      { id: 1, name: 'Nguyễn Văn Minh', phone: '0901234567', address: '123 Nguyễn Huệ', ward: 'Phường Bến Nghé', district: 'Quận 1', city: 'TP. Hồ Chí Minh', isDefault: true },
      { id: 2, name: 'Nguyễn Văn Minh', phone: '0901234567', address: '456 Lê Văn Việt', ward: 'Phường Tăng Nhơn Phú A', district: 'TP. Thủ Đức', city: 'TP. Hồ Chí Minh', isDefault: false },
    ]
  },
  {
    id: 2,
    email: 'htx@terroir.vn',
    password: '123456',
    firstName: 'Thành',
    lastName: 'Trần Mỹ',
    phone: '0912345678',
    avatar: null,
    role: 'COOPERATIVE',
    cooperativeId: 1
  },
  {
    id: 3,
    email: 'admin@terroir.vn',
    password: '123456',
    firstName: 'Admin',
    lastName: 'Terroir',
    phone: '0900000000',
    avatar: null,
    role: 'ADMIN'
  }
]

// ==================== COOPERATIVES ====================
export const mockCooperatives = [
  {
    id: 1, name: 'HTX Nông Nghiệp Mỹ Thành', slug: 'htx-my-thanh',
    location: 'Xã Mỹ Thành, Huyện Mỹ Tú, Sóc Trăng', region: 'Đồng bằng sông Cửu Long', regionCode: 'DBSCL',
    shortDescription: 'Chuyên canh gạo ST25 đạt chuẩn VietGAP, xuất khẩu quốc tế',
    description: 'HTX Nông Nghiệp Mỹ Thành được thành lập năm 2010 với 120 thành viên. Chuyên canh tác giống gạo ST25 - gạo ngon nhất thế giới 2019. Toàn bộ diện tích 500ha đều đạt chuẩn VietGAP, áp dụng kỹ thuật SRI giảm nước, giảm phân bón hóa học. HTX hướng đến nông nghiệp bền vững, kết hợp tôm - lúa, đảm bảo an toàn thực phẩm từ đồng ruộng đến bàn ăn.',
    productCount: 45, rating: 4.9, memberCount: 120, foundedYear: 2010, area: '500ha',
    certifications: ['VietGAP', 'OCOP 5 sao'], coverImage: '/images/hero-banner.jpg',
    avatar: '/images/logo.png', phone: '0299 3861 234', email: 'mythanh@htx.vn',
    isFeatured: true, isApproved: true
  },
  {
    id: 2, name: 'HTX Rau Hữu Cơ Thanh Xuân', slug: 'htx-thanh-xuan',
    location: 'Xã Xuân Thọ, TP. Đà Lạt, Lâm Đồng', region: 'Tây Nguyên', regionCode: 'TN',
    shortDescription: 'Rau củ quả hữu cơ vùng cao Đà Lạt, tươi sạch mỗi ngày',
    description: 'HTX Rau Hữu Cơ Thanh Xuân tọa lạc tại vùng đất Đà Lạt ở độ cao 1500m, nơi có khí hậu mát mẻ quanh năm. Chuyên trồng rau hữu cơ theo tiêu chuẩn Organic USDA. Không sử dụng thuốc trừ sâu, phân bón hóa học. Sản phẩm thu hoạch mỗi sáng và giao trong ngày.',
    productCount: 68, rating: 4.8, memberCount: 85, foundedYear: 2015, area: '120ha',
    certifications: ['Organic', 'VietGAP', 'GlobalGAP'], coverImage: '/images/about-farmer.jpg',
    avatar: '/images/logo.png', phone: '0263 3567 890', email: 'thanhxuan@htx.vn',
    isFeatured: true, isApproved: true
  },
  {
    id: 3, name: 'HTX Nước Mắm Truyền Thống Phú Quốc', slug: 'htx-nuoc-mam-phu-quoc',
    location: 'TT. Dương Đông, TP. Phú Quốc, Kiên Giang', region: 'Đồng bằng sông Cửu Long', regionCode: 'DBSCL',
    shortDescription: 'Nước mắm truyền thống 200 năm, đặc sản quốc gia, chỉ dẫn địa lý',
    description: 'Kế thừa bí quyết ủ chượp nước mắm truyền thống hơn 200 năm của vùng đảo Phú Quốc. Nguyên liệu 100% cá cơm tươi đánh bắt vùng biển Phú Quốc, ủ trong thùng gỗ bời lời 12-18 tháng. Sản phẩm đạt chỉ dẫn địa lý Nước Mắm Phú Quốc.',
    productCount: 12, rating: 4.9, memberCount: 50, foundedYear: 2005, area: 'Nhà thùng 5000m²',
    certifications: ['HACCP', 'OCOP 5 sao', 'Chỉ dẫn địa lý'], coverImage: '/images/category-specialty.jpg',
    avatar: '/images/logo.png', phone: '0297 3846 123', email: 'nuocmampq@htx.vn',
    isFeatured: true, isApproved: true
  },
  {
    id: 4, name: 'HTX Cà Phê Đắk Lắk Xanh', slug: 'htx-ca-phe-dak-lak',
    location: 'Xã Ea Tu, TP. Buôn Ma Thuột, Đắk Lắk', region: 'Tây Nguyên', regionCode: 'TN',
    shortDescription: 'Cà phê Robusta & Arabica rang mộc, canh tác bền vững, thương mại công bằng',
    description: 'HTX Cà Phê Đắk Lắk Xanh quy tụ 95 hộ đồng bào dân tộc Ê Đê trồng cà phê theo phương pháp bền vững. Sản phẩm cà phê rang mộc giữ nguyên hương vị đặc trưng của vùng đất bazan Tây Nguyên.',
    productCount: 22, rating: 4.7, memberCount: 95, foundedYear: 2012, area: '300ha',
    certifications: ['VietGAP', 'UTZ', '4C'], coverImage: '/images/category-dried.jpg',
    avatar: '/images/logo.png', phone: '0262 3598 456', email: 'caphexanh@htx.vn',
    isFeatured: true, isApproved: true
  },
  {
    id: 5, name: 'HTX Trái Cây Cái Bè', slug: 'htx-trai-cay-cai-be',
    location: 'Xã Hòa Khánh, Huyện Cái Bè, Tiền Giang', region: 'Đồng bằng sông Cửu Long', regionCode: 'DBSCL',
    shortDescription: 'Trái cây đặc sản miền Tây: xoài cát Hòa Lộc, bưởi da xanh, sầu riêng Ri6',
    description: 'Vùng đất Cái Bè nổi tiếng với các loại trái cây nhiệt đới chất lượng cao. HTX chuyên cung cấp xoài cát Hòa Lộc, bưởi da xanh, sầu riêng Ri6 đạt chuẩn VietGAP.',
    productCount: 35, rating: 4.8, memberCount: 150, foundedYear: 2008, area: '400ha',
    certifications: ['VietGAP', 'OCOP 4 sao'], coverImage: '/images/category-fruits.jpg',
    avatar: '/images/logo.png', phone: '0273 3892 567', email: 'traicaycaibe@htx.vn',
    isFeatured: true, isApproved: true
  },
  {
    id: 6, name: 'HTX Ong Mật Gia Lai', slug: 'htx-ong-mat-gia-lai',
    location: 'Xã Ia Yeng, Huyện Phú Thiện, Gia Lai', region: 'Tây Nguyên', regionCode: 'TN',
    shortDescription: 'Mật ong nguyên chất từ rừng cao su, rừng hoa cà phê Tây Nguyên',
    description: 'HTX nuôi ong lấy mật với hơn 2000 đàn ong, di chuyển theo mùa hoa từ hoa cà phê, cao su đến hoa rừng tự nhiên. Mật ong nguyên chất 100%, không pha trộn.',
    productCount: 8, rating: 4.6, memberCount: 40, foundedYear: 2016, area: '2000 đàn ong',
    certifications: ['Organic'], coverImage: '/images/about-farmer.jpg',
    avatar: '/images/logo.png', phone: '0269 3712 890', email: 'ongmat@htx.vn',
    isFeatured: false, isApproved: true
  }
]

// ==================== PRODUCTS ====================
export const mockProducts = [
  {
    id: 1, name: 'Gạo ST25 Sóc Trăng - Gạo ngon nhất thế giới', slug: 'gao-st25-soc-trang',
    price: 185000, salePrice: 165000, unit: '5kg', weight: 5000, stock: 234,
    thumbnail: '/images/category-rice.jpg',
    images: ['/images/category-rice.jpg', '/images/hero-banner.jpg', '/images/about-farmer.jpg', '/images/delivery.jpg'],
    cooperativeId: 1, cooperativeName: 'HTX Mỹ Thành',
    categoryId: 3, categorySlug: 'gao-ngu-coc', categoryName: 'Gạo & Ngũ Cốc',
    region: 'Sóc Trăng', regionCode: 'DBSCL',
    rating: 4.9, reviewCount: 126, soldCount: 2340,
    isOrganic: false, isFeatured: true, isFlashSale: false,
    certifications: ['VietGAP', 'OCOP 5 sao'],
    description: '<h3>Gạo ST25 Sóc Trăng - Gạo ngon nhất thế giới</h3><p>Gạo ST25 là giống gạo do Anh hùng Lao động Hồ Quang Cua và cộng sự lai tạo, đạt giải Gạo ngon nhất thế giới tại cuộc thi The World\'s Best Rice năm 2019.</p><h4>Đặc điểm:</h4><ul><li>Hạt gạo dài, trắng trong, khi nấu dẻo mềm</li><li>Hương thơm dứa tự nhiên đặc trưng</li><li>Cơm để nguội vẫn dẻo, không cứng</li><li>Canh tác đạt chuẩn VietGAP</li></ul><h4>Bảo quản:</h4><p>Bảo quản nơi khô ráo, thoáng mát. Sau khi mở bao nên sử dụng trong vòng 3 tháng.</p>',
    variants: [{ id: 'v1', name: '5kg', price: 185000, salePrice: 165000 }, { id: 'v2', name: '10kg', price: 350000, salePrice: 320000 }, { id: 'v3', name: '25kg', price: 825000, salePrice: 780000 }],
    traceability: {
      batchNumber: 'ST25-2025-LOT089',
      qrCode: 'TD-ST25-2025-089',
      timeline: [
        { step: 'seed', title: 'Chọn giống', date: '2025-06-10', desc: 'Giống ST25 cấp xác nhận từ Viện Lúa ĐBSCL', location: 'Viện Lúa ĐBSCL, Cần Thơ', icon: 'pi pi-sun' },
        { step: 'plant', title: 'Gieo sạ', date: '2025-06-25', desc: 'Gieo sạ trên cánh đồng 50ha, mật độ 80kg/ha', location: 'Cánh đồng HTX Mỹ Thành, Mỹ Tú, Sóc Trăng', icon: 'pi pi-cloud' },
        { step: 'care', title: 'Chăm sóc', date: '2025-06-25 - 2025-10-15', desc: 'Áp dụng kỹ thuật SRI, bón phân hữu cơ, quản lý dịch hại IPM', location: 'HTX Mỹ Thành', icon: 'pi pi-heart' },
        { step: 'inspect', title: 'Kiểm định chất lượng', date: '2025-10-10', desc: 'Kiểm tra dư lượng thuốc BVTV: ĐẠT. Đạt chuẩn VietGAP', location: 'Trung tâm kiểm định Sóc Trăng', icon: 'pi pi-verified' },
        { step: 'harvest', title: 'Thu hoạch', date: '2025-10-20', desc: 'Thu hoạch bằng máy gặt đập liên hợp, năng suất 7.2 tấn/ha', location: 'HTX Mỹ Thành', icon: 'pi pi-check-circle' },
        { step: 'process', title: 'Xay xát & Đóng gói', date: '2025-10-25', desc: 'Xay xát tại nhà máy HTX, phân loại hạt, đóng gói chân không', location: 'Nhà máy xay xát HTX Mỹ Thành', icon: 'pi pi-box' },
        { step: 'ship', title: 'Vận chuyển', date: '2025-10-28', desc: 'Vận chuyển bằng xe lạnh đến kho Terroir Direct', location: 'Kho Terroir Direct, TP.HCM', icon: 'pi pi-truck' },
      ]
    }
  },
  {
    id: 2, name: 'Xoài Cát Hòa Lộc - Cây chín tự nhiên', slug: 'xoai-cat-hoa-loc',
    price: 120000, salePrice: 98000, unit: 'kg', weight: 1000, stock: 85,
    thumbnail: '/images/category-fruits.jpg',
    images: ['/images/category-fruits.jpg', '/images/hero-banner-2.jpg'],
    cooperativeId: 5, cooperativeName: 'HTX Trái Cây Cái Bè',
    categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây',
    region: 'Tiền Giang', regionCode: 'DBSCL',
    rating: 4.8, reviewCount: 89, soldCount: 1890,
    isOrganic: false, isFeatured: true, isFlashSale: true,
    certifications: ['VietGAP'],
    description: '<h3>Xoài Cát Hòa Lộc</h3><p>Xoài cát Hòa Lộc nổi tiếng với vị ngọt thanh, thịt dày, ít xơ. Trái được để chín tự nhiên trên cây, không sử dụng thuốc kích chín.</p>',
    variants: []
  },
  {
    id: 3, name: 'Combo Rau Hữu Cơ Đà Lạt - 8 loại rau theo mùa', slug: 'rau-huu-co-da-lat',
    price: 85000, salePrice: null, unit: 'combo 2kg', weight: 2000, stock: 150,
    thumbnail: '/images/category-vegetables.jpg',
    images: ['/images/category-vegetables.jpg', '/images/about-farmer.jpg'],
    cooperativeId: 2, cooperativeName: 'HTX Rau Hữu Cơ Thanh Xuân',
    categoryId: 1, categorySlug: 'rau-cu-qua', categoryName: 'Rau Củ Quả',
    region: 'Lâm Đồng', regionCode: 'TN',
    rating: 4.7, reviewCount: 203, soldCount: 3200,
    isOrganic: true, isFeatured: true, isFlashSale: false,
    certifications: ['Organic', 'GlobalGAP'],
    description: '<h3>Combo Rau Hữu Cơ Đà Lạt</h3><p>8 loại rau theo mùa được thu hoạch mỗi sáng từ nông trại hữu cơ ở độ cao 1500m. Không thuốc trừ sâu, không phân bón hóa học.</p>',
    variants: [{ id: 'v1', name: 'Combo 2kg', price: 85000 }, { id: 'v2', name: 'Combo 4kg', price: 160000 }]
  },
  {
    id: 4, name: 'Nước Mắm Phú Quốc Truyền Thống 40°N', slug: 'nuoc-mam-phu-quoc-40',
    price: 210000, salePrice: 189000, unit: 'chai 500ml', weight: 600, stock: 320,
    thumbnail: '/images/category-specialty.jpg',
    images: ['/images/category-specialty.jpg', '/images/delivery.jpg'],
    cooperativeId: 3, cooperativeName: 'HTX Nước Mắm Phú Quốc',
    categoryId: 4, categorySlug: 'dac-san-vung-mien', categoryName: 'Đặc Sản Vùng Miền',
    region: 'Kiên Giang', regionCode: 'DBSCL',
    rating: 4.9, reviewCount: 312, soldCount: 5600,
    isOrganic: false, isFeatured: true, isFlashSale: true,
    certifications: ['HACCP', 'OCOP 5 sao', 'Chỉ dẫn địa lý'],
    description: '<h3>Nước Mắm Phú Quốc Truyền Thống</h3><p>Nước mắm 40 độ đạm, ủ chượp 18 tháng trong thùng gỗ bời lời. 100% cá cơm tươi Phú Quốc.</p>',
    variants: [{ id: 'v1', name: 'Chai 250ml', price: 120000, salePrice: 108000 }, { id: 'v2', name: 'Chai 500ml', price: 210000, salePrice: 189000 }, { id: 'v3', name: 'Chai 750ml', price: 290000, salePrice: 261000 }]
  },
  {
    id: 5, name: 'Cà Phê Robusta Buôn Ma Thuột Rang Mộc', slug: 'ca-phe-robusta-buon-ma-thuot',
    price: 145000, salePrice: 125000, unit: '500g', weight: 500, stock: 180,
    thumbnail: '/images/category-dried.jpg',
    images: ['/images/category-dried.jpg', '/images/hero-banner-2.jpg'],
    cooperativeId: 4, cooperativeName: 'HTX Cà Phê Đắk Lắk Xanh',
    categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến',
    region: 'Đắk Lắk', regionCode: 'TN',
    rating: 4.8, reviewCount: 178, soldCount: 4100,
    isOrganic: false, isFeatured: true, isFlashSale: false,
    certifications: ['VietGAP', 'UTZ'],
    description: '<h3>Cà Phê Robusta Rang Mộc</h3><p>Hạt cà phê Robusta chọn lọc từ vùng đất bazan Buôn Ma Thuột, rang mộc 100% không tẩm bơ dầu. Vị đắng đậm, hậu ngọt.</p>',
    variants: [{ id: 'v1', name: 'Hạt 500g', price: 145000, salePrice: 125000 }, { id: 'v2', name: 'Bột 500g', price: 155000, salePrice: 135000 }]
  },
  {
    id: 6, name: 'Mật Ong Hoa Cà Phê Nguyên Chất', slug: 'mat-ong-hoa-ca-phe',
    price: 250000, salePrice: null, unit: 'lọ 500ml', weight: 700, stock: 60,
    thumbnail: '/images/category-dried.jpg',
    images: ['/images/category-dried.jpg'],
    cooperativeId: 6, cooperativeName: 'HTX Ong Mật Gia Lai',
    categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến',
    region: 'Gia Lai', regionCode: 'TN',
    rating: 4.7, reviewCount: 67, soldCount: 980,
    isOrganic: true, isFeatured: false, isFlashSale: false,
    certifications: ['Organic'],
    description: '<h3>Mật Ong Hoa Cà Phê</h3><p>Mật ong nguyên chất thu hoạch mùa hoa cà phê Tây Nguyên. Màu hổ phách đậm, vị ngọt sâu, thơm đặc trưng.</p>',
    variants: [{ id: 'v1', name: 'Lọ 250ml', price: 140000 }, { id: 'v2', name: 'Lọ 500ml', price: 250000 }, { id: 'v3', name: 'Lọ 1 lít', price: 460000 }]
  },
  {
    id: 7, name: 'Bưởi Da Xanh Bến Tre - Loại 1 (1.2-1.5kg)', slug: 'buoi-da-xanh-ben-tre',
    price: 75000, salePrice: 65000, unit: 'trái', weight: 1300, stock: 90,
    thumbnail: '/images/category-fruits.jpg',
    images: ['/images/category-fruits.jpg'],
    cooperativeId: 5, cooperativeName: 'HTX Trái Cây Cái Bè',
    categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây',
    region: 'Bến Tre', regionCode: 'DBSCL',
    rating: 4.6, reviewCount: 94, soldCount: 1500,
    isOrganic: false, isFeatured: false, isFlashSale: true,
    certifications: ['VietGAP'],
    description: '<p>Bưởi da xanh Bến Tre tép hồng, vị ngọt thanh không đắng.</p>',
    variants: []
  },
  {
    id: 8, name: 'Tiêu Đen Phú Quốc - Tiêu Sọ Hảo Hạng', slug: 'tieu-den-phu-quoc',
    price: 320000, salePrice: 285000, unit: '500g', weight: 500, stock: 120,
    thumbnail: '/images/category-specialty.jpg',
    images: ['/images/category-specialty.jpg'],
    cooperativeId: 3, cooperativeName: 'HTX Nước Mắm Phú Quốc',
    categoryId: 4, categorySlug: 'dac-san-vung-mien', categoryName: 'Đặc Sản Vùng Miền',
    region: 'Kiên Giang', regionCode: 'DBSCL',
    rating: 4.9, reviewCount: 156, soldCount: 2100,
    isOrganic: false, isFeatured: true, isFlashSale: false,
    certifications: ['OCOP 4 sao', 'GlobalGAP'],
    description: '<p>Tiêu đen Phú Quốc nổi tiếng cay nồng, thơm đặc biệt. Hạt tiêu to đều, đen bóng.</p>',
    variants: []
  },
  {
    id: 9, name: 'Sầu Riêng Ri6 Cái Bè - Cơm vàng hạt lép', slug: 'sau-rieng-ri6',
    price: 180000, salePrice: 159000, unit: 'kg', weight: 1000, stock: 40,
    thumbnail: '/images/category-fruits.jpg',
    images: ['/images/category-fruits.jpg'],
    cooperativeId: 5, cooperativeName: 'HTX Trái Cây Cái Bè',
    categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây',
    region: 'Tiền Giang', regionCode: 'DBSCL',
    rating: 4.8, reviewCount: 78, soldCount: 890,
    isOrganic: false, isFeatured: true, isFlashSale: true,
    certifications: ['VietGAP'],
    description: '<p>Sầu riêng Ri6 Cái Bè, cơm vàng béo, hạt lép, vị ngọt bùi đặc trưng.</p>',
    variants: []
  },
  {
    id: 10, name: 'Trà Ô Long Đà Lạt - Trà Thượng Hạng', slug: 'tra-o-long-da-lat',
    price: 195000, salePrice: null, unit: 'hộp 200g', weight: 250, stock: 70,
    thumbnail: '/images/category-dried.jpg',
    images: ['/images/category-dried.jpg'],
    cooperativeId: 2, cooperativeName: 'HTX Rau Hữu Cơ Thanh Xuân',
    categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến',
    region: 'Lâm Đồng', regionCode: 'TN',
    rating: 4.7, reviewCount: 45, soldCount: 650,
    isOrganic: true, isFeatured: false, isFlashSale: false,
    certifications: ['Organic'],
    description: '<p>Trà Ô Long thượng hạng trồng ở độ cao 1600m, thu hái thủ công 1 tôm 2 lá.</p>',
    variants: []
  },
  {
    id: 11, name: 'Hạt Điều Rang Muối Bình Phước', slug: 'hat-dieu-rang-muoi',
    price: 220000, salePrice: 195000, unit: 'hộp 500g', weight: 500, stock: 95,
    thumbnail: '/images/category-dried.jpg',
    images: ['/images/category-dried.jpg'],
    cooperativeId: 4, cooperativeName: 'HTX Cà Phê Đắk Lắk Xanh',
    categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến',
    region: 'Bình Phước', regionCode: 'DNB',
    rating: 4.6, reviewCount: 89, soldCount: 1320,
    isOrganic: false, isFeatured: false, isFlashSale: false,
    certifications: ['OCOP 3 sao'],
    description: '<p>Hạt điều rang muối size W320, bùi béo, giòn tan.</p>',
    variants: []
  },
  {
    id: 12, name: 'Nem Chua Thanh Hóa - Đặc Sản Xứ Thanh', slug: 'nem-chua-thanh-hoa',
    price: 95000, salePrice: 85000, unit: 'gói 10 cái', weight: 300, stock: 200,
    thumbnail: '/images/category-specialty.jpg',
    images: ['/images/category-specialty.jpg'],
    cooperativeId: 1, cooperativeName: 'HTX Mỹ Thành',
    categoryId: 4, categorySlug: 'dac-san-vung-mien', categoryName: 'Đặc Sản Vùng Miền',
    region: 'Thanh Hóa', regionCode: 'BTB',
    rating: 4.5, reviewCount: 67, soldCount: 780,
    isOrganic: false, isFeatured: false, isFlashSale: false,
    certifications: ['HACCP'],
    description: '<p>Nem chua Thanh Hóa truyền thống, chua cay đậm vị, gói lá chuối.</p>',
    variants: []
  },
]

// ==================== REVIEWS ====================
export const mockReviews = [
  { id: 1, productId: 1, userId: 1, userName: 'Nguyễn Thị Mai', rating: 5, text: 'Gạo thơm dẻo tuyệt vời, nấu cơm rất ngon. Scan QR thấy đầy đủ thông tin từ lúc gieo sạ, rất yên tâm cho gia đình.', date: '2026-01-20', images: [] },
  { id: 2, productId: 1, userId: 2, userName: 'Trần Văn Hùng', rating: 5, text: 'Mua lần thứ 3 rồi, chất lượng rất ổn định. Giá tốt hơn siêu thị vì mua trực tiếp từ HTX.', date: '2026-01-15', images: [] },
  { id: 3, productId: 1, userId: 3, userName: 'Phạm Thanh Lan', rating: 4, text: 'Gạo ngon, đóng gói cẩn thận. Giao hàng hơi chậm 1 ngày nhưng chấp nhận được.', date: '2026-01-10', images: [] },
  { id: 4, productId: 1, userId: 4, userName: 'Lê Hoàng Anh', rating: 5, text: 'Cơm để nguội vẫn dẻo thơm, con nhỏ ăn rất thích. 10 điểm!', date: '2026-01-08', images: [] },
  { id: 5, productId: 2, userId: 1, userName: 'Võ Minh Tâm', rating: 5, text: 'Xoài chín cây ngọt lịm, thơm nức mũi. Quả to đều, đúng loại Hòa Lộc xịn.', date: '2026-01-25', images: [] },
  { id: 6, productId: 3, userId: 2, userName: 'Đặng Thu Hà', rating: 5, text: 'Rau tươi roi rói, đa dạng loại. Giờ không cần ra chợ nữa, đặt online tiện hơn nhiều.', date: '2026-02-01', images: [] },
  { id: 7, productId: 4, userId: 3, userName: 'Huỳnh Bảo Ngọc', rating: 5, text: 'Nước mắm Phú Quốc chính hiệu, mùi thơm đặc trưng, pha chế món gì cũng ngon.', date: '2026-02-05', images: [] },
  { id: 8, productId: 5, userId: 4, userName: 'Ngô Quốc Việt', rating: 4, text: 'Cà phê rang mộc đúng vị Buôn Ma Thuột. Đắng đậm, hậu ngọt. Pha phin rất hợp.', date: '2026-01-28', images: [] },
]

// ==================== ORDERS ====================
export const mockOrders = [
  {
    id: 1, code: 'TD-20260208-001', userId: 1,
    status: 'SHIPPING', statusLabel: 'Đang giao hàng',
    createdAt: '2026-02-08T10:30:00',
    shippingAddress: { name: 'Nguyễn Văn Minh', phone: '0901234567', address: '123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM' },
    paymentMethod: 'COD', paymentMethodLabel: 'Thanh toán khi nhận hàng',
    items: [
      { productId: 1, name: 'Gạo ST25 Sóc Trăng 5kg', image: '/images/category-rice.jpg', price: 165000, quantity: 2, unit: '5kg' },
      { productId: 4, name: 'Nước Mắm Phú Quốc 500ml', image: '/images/category-specialty.jpg', price: 189000, quantity: 1, unit: 'chai' },
    ],
    subtotal: 519000, shippingFee: 0, discount: 0, total: 519000,
    estimatedDelivery: '2026-02-10',
    trackingTimeline: [
      { status: 'Đặt hàng thành công', date: '2026-02-08 10:30', desc: 'Đơn hàng đã được tạo' },
      { status: 'HTX xác nhận', date: '2026-02-08 11:15', desc: 'HTX Mỹ Thành đã xác nhận đơn hàng' },
      { status: 'Đang đóng gói', date: '2026-02-08 14:00', desc: 'Sản phẩm đang được đóng gói cẩn thận' },
      { status: 'Đã giao cho vận chuyển', date: '2026-02-09 08:00', desc: 'Đơn hàng đã giao cho Giao Hàng Nhanh' },
    ]
  },
  {
    id: 2, code: 'TD-20260205-002', userId: 1,
    status: 'DELIVERED', statusLabel: 'Đã giao',
    createdAt: '2026-02-05T09:15:00',
    shippingAddress: { name: 'Nguyễn Văn Minh', phone: '0901234567', address: '123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM' },
    paymentMethod: 'VNPAY', paymentMethodLabel: 'VNPay',
    items: [
      { productId: 6, name: 'Mật Ong Hoa Cà Phê 500ml', image: '/images/category-dried.jpg', price: 250000, quantity: 1, unit: 'lọ' },
      { productId: 3, name: 'Rau Hữu Cơ Đà Lạt 2kg', image: '/images/category-vegetables.jpg', price: 85000, quantity: 2, unit: 'combo' },
    ],
    subtotal: 420000, shippingFee: 30000, discount: 0, total: 450000,
    estimatedDelivery: '2026-02-07',
    trackingTimeline: [
      { status: 'Đặt hàng thành công', date: '2026-02-05 09:15', desc: 'Đơn hàng đã được tạo' },
      { status: 'Đã giao', date: '2026-02-07 15:40', desc: 'Giao thành công. Người nhận: Nguyễn Văn Minh' },
    ]
  },
  {
    id: 3, code: 'TD-20260201-003', userId: 1,
    status: 'DELIVERED', statusLabel: 'Đã giao',
    createdAt: '2026-02-01T16:45:00',
    shippingAddress: { name: 'Nguyễn Văn Minh', phone: '0901234567', address: '456 Lê Văn Việt, TP. Thủ Đức, TP.HCM' },
    paymentMethod: 'COD', paymentMethodLabel: 'COD',
    items: [
      { productId: 5, name: 'Cà Phê Robusta 500g', image: '/images/category-dried.jpg', price: 125000, quantity: 3, unit: 'gói' },
    ],
    subtotal: 375000, shippingFee: 30000, discount: 50000, total: 355000,
    estimatedDelivery: '2026-02-03',
    trackingTimeline: []
  },
  {
    id: 4, code: 'TD-20260210-004', userId: 1,
    status: 'PENDING', statusLabel: 'Chờ xác nhận',
    createdAt: '2026-02-10T20:00:00',
    shippingAddress: { name: 'Nguyễn Văn Minh', phone: '0901234567', address: '123 Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM' },
    paymentMethod: 'MOMO', paymentMethodLabel: 'Ví MoMo',
    items: [
      { productId: 9, name: 'Sầu Riêng Ri6 Cái Bè', image: '/images/category-fruits.jpg', price: 159000, quantity: 2, unit: 'kg' },
      { productId: 8, name: 'Tiêu Đen Phú Quốc 500g', image: '/images/category-specialty.jpg', price: 285000, quantity: 1, unit: 'gói' },
    ],
    subtotal: 603000, shippingFee: 0, discount: 0, total: 603000,
    estimatedDelivery: '2026-02-12',
    trackingTimeline: [
      { status: 'Đặt hàng thành công', date: '2026-02-10 20:00', desc: 'Đơn hàng đã được tạo, đang chờ HTX xác nhận' },
    ]
  }
]

// ==================== BLOG ====================
export const mockBlogPosts = [
  { id: 1, slug: 'bi-quyet-chon-gao-st25', title: 'Bí quyết chọn gạo ST25 chính hãng - Tránh mua phải hàng giả', excerpt: 'Hướng dẫn chi tiết cách nhận biết gạo ST25 thật và giả qua bao bì, mã QR, và đặc điểm hạt gạo.', image: '/images/category-rice.jpg', category: 'Mẹo mua sắm', date: '10/02/2026', views: 1234, author: 'Terroir Direct',
    content: '<p>Gạo ST25 đã trở thành thương hiệu gạo nổi tiếng sau khi đạt giải Gạo ngon nhất thế giới 2019. Tuy nhiên trên thị trường xuất hiện nhiều sản phẩm giả mạo.</p><h2>1. Kiểm tra bao bì</h2><p>Gạo ST25 chính hãng luôn có bao bì in ấn rõ ràng, có mã QR truy xuất nguồn gốc. Bạn có thể scan QR để xem toàn bộ thông tin từ khâu gieo trồng đến đóng gói.</p><h2>2. Đặc điểm hạt gạo</h2><p>Hạt gạo ST25 dài khoảng 7.5mm, trắng trong, không có vết vàng. Khi nấu cơm dẻo mềm và có hương thơm dứa nhẹ tự nhiên.</p><h2>3. Mua từ nguồn uy tín</h2><p>Cách tốt nhất là mua trực tiếp từ các HTX uy tín trên Terroir Direct, nơi 100% sản phẩm đều có truy xuất nguồn gốc minh bạch.</p>' },
  { id: 2, slug: 'loi-ich-nong-san-huu-co', title: 'Lợi ích tuyệt vời của nông sản hữu cơ đối với sức khỏe gia đình', excerpt: 'Tại sao nên chọn nông sản hữu cơ? Nghiên cứu khoa học chứng minh lợi ích vượt trội.', image: '/images/category-vegetables.jpg', category: 'Sức khỏe', date: '08/02/2026', views: 2156, author: 'BS. Nguyễn Thanh Hương',
    content: '<p>Nông sản hữu cơ ngày càng được ưa chuộng bởi người tiêu dùng thông minh...</p>' },
  { id: 3, slug: 'kham-pha-nuoc-mam-phu-quoc', title: 'Khám phá bí mật 200 năm của nước mắm Phú Quốc', excerpt: 'Hành trình từ con cá cơm biển Phú Quốc đến giọt nước mắm vàng óng, thơm nồng.', image: '/images/category-specialty.jpg', category: 'Khám phá', date: '05/02/2026', views: 3478, author: 'Terroir Direct',
    content: '<p>Nước mắm Phú Quốc có lịch sử hơn 200 năm, được UNESCO công nhận là di sản văn hóa phi vật thể...</p>' },
  { id: 4, slug: 'mua-nong-san-online', title: 'Xu hướng mua nông sản online - Tại sao người Việt đang thay đổi?', excerpt: 'Phân tích xu hướng tiêu dùng nông sản qua sàn TMĐT và lợi ích cho cả nông dân lẫn người mua.', image: '/images/delivery.jpg', category: 'Xu hướng', date: '01/02/2026', views: 1890, author: 'Terroir Direct',
    content: '<p>Đại dịch COVID-19 đã thay đổi thói quen mua sắm của người Việt...</p>' },
  { id: 5, slug: 'ca-phe-tay-nguyen', title: 'Cà phê Tây Nguyên - Hành trình từ đất bazan đến ly cà phê sáng', excerpt: 'Tìm hiểu quy trình trồng, thu hoạch và rang xay cà phê Robusta Tây Nguyên.', image: '/images/category-dried.jpg', category: 'Khám phá', date: '28/01/2026', views: 2567, author: 'Terroir Direct',
    content: '<p>Vùng đất bazan Tây Nguyên là thiên đường cho cà phê Robusta...</p>' },
  { id: 6, slug: 'truy-xuat-nguon-goc-la-gi', title: 'Truy xuất nguồn gốc nông sản là gì? Tại sao nó quan trọng?', excerpt: 'Hiểu rõ về hệ thống truy xuất nguồn gốc và cách nó bảo vệ sức khỏe người tiêu dùng.', image: '/images/traceability.jpg', category: 'Kiến thức', date: '25/01/2026', views: 4123, author: 'Terroir Direct',
    content: '<p>Truy xuất nguồn gốc là khả năng theo dõi sản phẩm qua mọi giai đoạn sản xuất...</p>' },
]

// ==================== VOUCHERS ====================
export const mockVouchers = [
  { id: 1, code: 'CHAOBAN', type: 'PERCENTAGE', value: 10, maxDiscount: 50000, minOrder: 200000, description: 'Giảm 10% cho đơn đầu tiên', expiresAt: '2026-03-31', usageLeft: 100 },
  { id: 2, code: 'FREESHIP', type: 'FIXED', value: 30000, maxDiscount: 30000, minOrder: 300000, description: 'Miễn phí vận chuyển', expiresAt: '2026-02-28', usageLeft: 50 },
  { id: 3, code: 'TET2026', type: 'PERCENTAGE', value: 15, maxDiscount: 100000, minOrder: 500000, description: 'Giảm 15% mừng Tết', expiresAt: '2026-02-15', usageLeft: 20 },
]

// ==================== WISHLIST ====================
export const mockWishlist = [1, 3, 5, 8]

// ==================== NOTIFICATIONS ====================
export const mockNotifications = [
  { id: 1, title: 'Đơn hàng đang giao', message: 'Đơn #TD-20260208-001 đang trên đường giao đến bạn', type: 'ORDER', read: false, createdAt: '2026-02-09T08:00:00', link: '/don-hang/1' },
  { id: 2, title: 'Flash Sale hôm nay!', message: 'Xoài Cát Hòa Lộc giảm 30%, chỉ còn 85 trái', type: 'PROMO', read: false, createdAt: '2026-02-11T07:00:00', link: '/san-pham?flashSale=true' },
  { id: 3, title: 'Đơn hàng đã giao', message: 'Đơn #TD-20260205-002 đã giao thành công', type: 'ORDER', read: true, createdAt: '2026-02-07T15:40:00', link: '/don-hang/2' },
  { id: 4, title: 'Voucher mới cho bạn', message: 'Mã CHAOBAN giảm 10% cho đơn đầu tiên', type: 'PROMO', read: true, createdAt: '2026-02-01T10:00:00', link: '/san-pham' },
]

// ==================== ADDITIONAL PRODUCTS (using demo image) ====================
const extraProducts = [
  { id: 13, name: 'Vải Thiều Lục Ngạn - Trái chín cây', slug: 'vai-thieu-luc-ngan', price: 95000, salePrice: 79000, unit: 'kg', weight: 1000, stock: 120, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 5, cooperativeName: 'HTX Trái Cây Cái Bè', categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây', region: 'Bắc Giang', regionCode: 'DBBB', rating: 4.7, reviewCount: 56, soldCount: 1890, isOrganic: false, isFeatured: true, isFlashSale: true, certifications: ['VietGAP'], description: '<p>Vải thiều Lục Ngạn quả to, cùi dày, vị ngọt thanh đặc trưng.</p>' },
  { id: 14, name: 'Nhãn Lồng Hưng Yên - Loại đặc biệt', slug: 'nhan-long-hung-yen', price: 110000, salePrice: null, unit: 'kg', weight: 1000, stock: 80, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 5, cooperativeName: 'HTX Trái Cây Cái Bè', categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây', region: 'Hưng Yên', regionCode: 'DBBB', rating: 4.8, reviewCount: 34, soldCount: 670, isOrganic: false, isFeatured: false, isFlashSale: false, certifications: ['OCOP 4 sao'], description: '<p>Nhãn lồng Hưng Yên cùi dày, hạt nhỏ, vị ngọt đậm.</p>' },
  { id: 15, name: 'Gạo Lứt Đỏ Điện Biên - Gạo dẻo thơm', slug: 'gao-lut-do-dien-bien', price: 65000, salePrice: 55000, unit: '2kg', weight: 2000, stock: 200, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 1, cooperativeName: 'HTX Mỹ Thành', categoryId: 3, categorySlug: 'gao-ngu-coc', categoryName: 'Gạo & Ngũ Cốc', region: 'Điện Biên', regionCode: 'TB', rating: 4.5, reviewCount: 28, soldCount: 450, isOrganic: true, isFeatured: false, isFlashSale: false, certifications: ['Organic'], description: '<p>Gạo lứt đỏ giàu dinh dưỡng, thích hợp cho người ăn kiêng.</p>' },
  { id: 16, name: 'Nấm Đông Trùng Hạ Thảo Đà Lạt', slug: 'nam-dong-trung-ha-thao', price: 450000, salePrice: 399000, unit: 'hộp 30g', weight: 50, stock: 30, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 2, cooperativeName: 'HTX Rau Hữu Cơ Thanh Xuân', categoryId: 1, categorySlug: 'rau-cu-qua', categoryName: 'Rau Củ Quả', region: 'Lâm Đồng', regionCode: 'TN', rating: 4.9, reviewCount: 15, soldCount: 230, isOrganic: true, isFeatured: true, isFlashSale: false, certifications: ['Organic', 'OCOP 4 sao'], description: '<p>Đông trùng hạ thảo nuôi cấy tại phòng lab Đà Lạt.</p>' },
  { id: 17, name: 'Muối Tôm Tây Ninh - Đặc sản miền Đông', slug: 'muoi-tom-tay-ninh', price: 55000, salePrice: null, unit: 'hũ 200g', weight: 250, stock: 300, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 3, cooperativeName: 'HTX Nước Mắm Phú Quốc', categoryId: 4, categorySlug: 'dac-san-vung-mien', categoryName: 'Đặc Sản Vùng Miền', region: 'Tây Ninh', regionCode: 'DNB', rating: 4.6, reviewCount: 89, soldCount: 2340, isOrganic: false, isFeatured: false, isFlashSale: false, certifications: ['HACCP'], description: '<p>Muối tôm Tây Ninh chính hiệu, cay thơm, chấm trái cây tuyệt vời.</p>' },
  { id: 18, name: 'Mắc Ca Đắk Lắk - Rang bơ tỏi', slug: 'mac-ca-rang-bo', price: 280000, salePrice: 245000, unit: 'hộp 500g', weight: 500, stock: 75, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 4, cooperativeName: 'HTX Cà Phê Đắk Lắk Xanh', categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến', region: 'Đắk Lắk', regionCode: 'TN', rating: 4.7, reviewCount: 42, soldCount: 890, isOrganic: false, isFeatured: true, isFlashSale: true, certifications: ['OCOP 3 sao'], description: '<p>Mắc ca rang bơ tỏi giòn béo, size lớn, nứt vỏ tự nhiên.</p>' },
  { id: 19, name: 'Cà Phê Arabica Cầu Đất - Single Origin', slug: 'ca-phe-arabica-cau-dat', price: 195000, salePrice: 175000, unit: '250g', weight: 250, stock: 60, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 4, cooperativeName: 'HTX Cà Phê Đắk Lắk Xanh', categoryId: 5, categorySlug: 'nong-san-che-bien', categoryName: 'Nông Sản Chế Biến', region: 'Lâm Đồng', regionCode: 'TN', rating: 4.9, reviewCount: 67, soldCount: 1120, isOrganic: true, isFeatured: true, isFlashSale: false, certifications: ['Organic', 'UTZ'], description: '<p>Arabica Cầu Đất vị chua thanh, hương hoa quả, hậu socola.</p>' },
  { id: 20, name: 'Dưa Lưới Nhật Bản - Trồng công nghệ cao', slug: 'dua-luoi-nhat', price: 89000, salePrice: 75000, unit: 'trái', weight: 1500, stock: 45, thumbnail: '/images/demo.jpg', images: ['/images/demo.jpg'], cooperativeId: 2, cooperativeName: 'HTX Rau Hữu Cơ Thanh Xuân', categoryId: 2, categorySlug: 'trai-cay', categoryName: 'Trái Cây', region: 'Lâm Đồng', regionCode: 'TN', rating: 4.6, reviewCount: 38, soldCount: 560, isOrganic: false, isFeatured: false, isFlashSale: true, certifications: ['VietGAP'], description: '<p>Dưa lưới Nhật trồng trong nhà kính, ngọt mát, thơm đặc biệt.</p>' },
]
mockProducts.push(...extraProducts)
