<template>
  <div class="container py-5 text-center">
    <h1 class="text-neon-cyan mb-4">Welcome to My Cybersecurity Portfolio</h1>

    <p class="text-muted">Explore my projects, blog, and get in touch!</p>

    <!-- Example cards for demonstration -->
    <div class="d-flex justify-content-center mt-4 gap-3 flex-wrap">
      <div class="card p-3 bg-dark text-light border-primary" style="width: 200px;">
        <h5>Projects</h5>
        <p>See my latest work</p>
      </div>
      <div class="card p-3 bg-dark text-light border-primary" style="width: 200px;">
        <h5>Blog</h5>
        <p>Read my thoughts</p>
      </div>
      <div class="card p-3 bg-dark text-light border-primary" style="width: 200px;">
        <h5>Contact</h5>
        <p>Get in touch with me</p>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.text-neon-cyan {
  color: #00f5ff;
  text-shadow: 0 0 8px #00f5ff;
}
.card {
  border-radius: 8px;
}
</style>