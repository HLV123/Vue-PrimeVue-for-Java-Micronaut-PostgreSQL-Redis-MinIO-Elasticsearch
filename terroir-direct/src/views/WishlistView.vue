<template>
  <div class="container" style="padding:36px 0 60px">
    <h1 style="font-family:Playfair Display,serif;font-size:28px;margin-bottom:24px">Danh Sách Yêu Thích</h1>
    <div v-if="products.length === 0" style="text-align:center;padding:60px 0"><i class="pi pi-heart" style="font-size:3rem;color:#D4C8B5"></i><p style="color:#8C7A66;margin-top:16px">Chưa có sản phẩm yêu thích</p></div>
    <div v-else style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:20px"><ProductCard v-for="p in products" :key="p.id" :product="p" /></div>
  </div>
</template>
<script setup>
import ProductCard from "@/components/common/ProductCard.vue"
import { mockProducts, mockWishlist } from "@/mock/data.js"
const products = mockProducts.filter(p => mockWishlist.includes(p.id))
</script>