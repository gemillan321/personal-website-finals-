<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">Projects</h2>
    <div class="row g-4">
      <div class="col-md-6" v-for="project in projects" :key="project.id">
        <div class="card bg-dark text-light border-primary h-100">
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <p class="card-text">{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import projects from '../data/projects.json'
</script>