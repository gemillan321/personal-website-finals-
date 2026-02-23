import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded routes
const routes = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/projects', component: () => import('../views/Projects.vue') },
  { path: '/blog', component: () => import('../views/Blog.vue') },
  { path: '/blog/:slug', component: () => import('../views/BlogPost.vue') },
  { path: '/about', component: () => import('../views/About.vue') },
  { path: '/contact', component: () => import('../views/Contact.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router