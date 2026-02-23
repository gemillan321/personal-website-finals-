<template>
  <div class="container mt-5">
    <div v-if="!post" class="text-muted">Loading...</div>
    <div v-else>
      <h2 class="text-primary">{{ post.title }}</h2>
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '../services/supabase'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

const route = useRoute()
const post = ref(null)
const content = ref('')

onMounted(async () => {
  const slug = route.params.slug
  const { data } = await supabase.from('blog_posts').select().eq('slug', slug).single()
  post.value = data
  if (data) content.value = DOMPurify.sanitize(marked(data.content))
})
</script>