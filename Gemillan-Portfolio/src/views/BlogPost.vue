<template>
<div v-if="loading" class="text-muted">Loading...</div>

<div v-else-if="notFound" class="text-danger">
  Post not found.
</div>

<div v-else>
  <h2 class="text-primary">{{ post.title }}</h2>
  <div v-html="content"></div>
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
const loading = ref(true)
const notFound = ref(false)

onMounted(async () => {
  const slug = route.params.slug
  console.log("Slug from URL:", slug)

  const { data, error } = await supabase
    .from('blog_posts')
    .select()
    .eq('slug', slug)
    .single()

  console.log("Supabase response:", data, error)

  if (!data || error) {
    notFound.value = true
  } else {
    post.value = data
    content.value = DOMPurify.sanitize(marked(data.content))
  }

  loading.value = false
})
</script>