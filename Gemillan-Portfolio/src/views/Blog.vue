<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">Blog</h2>

    <div v-if="posts.length === 0" class="text-muted">No posts yet.</div>

    <div class="list-group">
      <router-link
        v-for="post in posts"
        :key="post.id"
        :to="`/blog/${post.slug}`"
        class="list-group-item list-group-item-action bg-dark text-light border-primary mb-2"
      >
        {{ post.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(() => {
  // Dummy blog posts for testing
  posts.value = [
    { id: 1, title: 'My First Post', slug: 'my-first-post' },
    { id: 2, title: 'Cybersecurity Tips', slug: 'cybersecurity-tips' },
    { id: 3, title: 'Vue 3 + Bootstrap', slug: 'vue3-bootstrap' },
  ]
})
</script>