<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
    <a class="navbar-brand neon-btn" href="/">CyberPortfolio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navMenu">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><router-link class="nav-link" to="/">Home</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/projects">Projects</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/blog">Blog</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/about">About</router-link></li>
        <li class="nav-item"><router-link class="nav-link" to="/contact">Contact</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.navbar-brand {
  font-family: monospace;
}
.nav-link {
  font-family: monospace;
}
</style>