<template>
  <div class="container" style="padding:36px 0 60px;max-width:800px;margin:auto">
    <nav style="display:flex;align-items:center;gap:8px;font-size:13px;margin-bottom:24px"><router-link to="/" style="color:#B8A890">Trang chủ</router-link><i class="pi pi-angle-right" style="font-size:10px;color:#D4C8B5"></i><router-link to="/blog" style="color:#B8A890">Blog</router-link><i class="pi pi-angle-right" style="font-size:10px;color:#D4C8B5"></i><span>{{ post.title }}</span></nav>
    <span style="font-size:12px;color:#4A7C28;font-weight:600">{{ post.category }}</span>
    <h1 style="font-family:Playfair Display,serif;font-size:32px;margin:8px 0 12px;line-height:1.3">{{ post.title }}</h1>
    <div style="display:flex;align-items:center;gap:16px;font-size:13px;color:#8C7A66;margin-bottom:24px"><span><i class="pi pi-calendar"></i> {{ post.date }}</span><span><i class="pi pi-user"></i> {{ post.author }}</span><span><i class="pi pi-eye"></i> {{ post.views }} lượt xem</span></div>
    <img :src="post.image" style="width:100%;border-radius:16px;margin-bottom:28px" />
    <div style="font-size:16px;line-height:1.9;color:#4A3D30" v-html="post.content"></div>
  </div>
</template>
<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { mockBlogPosts } from "@/mock/data.js"
const route = useRoute()
const post = computed(() => mockBlogPosts.find(b => b.slug === route.params.slug) || mockBlogPosts[0])
</script>