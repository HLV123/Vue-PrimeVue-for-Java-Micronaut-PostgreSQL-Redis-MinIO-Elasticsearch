<template>
  <div>
    <div style="position:relative;height:200px;overflow:hidden"><img src="/images/hero-banner-2.jpg" style="width:100%;height:100%;object-fit:cover" /><div style="position:absolute;inset:0;background:rgba(26,18,8,.65);display:flex;align-items:center;justify-content:center;flex-direction:column"><h1 style="font-family:Playfair Display,serif;font-size:32px;color:#fff">Blog Nông Nghiệp</h1><p style="color:rgba(255,255,255,.75)">Kiến thức, mẹo hay từ đồng ruộng</p></div></div>
    <div class="container" style="padding:36px 0 60px">
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(340px,1fr));gap:24px">
        <div v-for="post in posts" :key="post.id" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06);cursor:pointer;transition:all .3s" @click="$router.push('/blog/' + post.slug)">
          <img :src="post.image" style="width:100%;height:200px;object-fit:cover" />
          <div style="padding:20px"><span style="font-size:12px;color:#4A7C28;font-weight:600">{{ post.category }}</span><h3 style="font-family:Playfair Display,serif;font-size:18px;margin:8px 0">{{ post.title }}</h3><p style="font-size:14px;color:#8C7A66;line-height:1.6">{{ post.excerpt }}</p><div style="display:flex;align-items:center;gap:6px;margin-top:14px;font-size:12px;color:#B8A890"><i class="pi pi-calendar"></i> {{ post.date }} <span>·</span> <i class="pi pi-eye"></i> {{ post.views }} lượt xem</div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { mockBlogPosts } from "@/mock/data.js"
const posts = mockBlogPosts
</script>