<template>
  <div class="container mt-5">
    <h2 class="text-primary mb-4">Contact Me</h2>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label class="form-label text-muted">Name</label>
        <input type="text" v-model="name" class="form-control" maxlength="100" required>
      </div>

      <div class="mb-3">
        <label class="form-label text-muted">Email</label>
        <input type="email" v-model="email" class="form-control" maxlength="255" required>
      </div>

      <div class="mb-3">
        <label class="form-label text-muted">Message</label>
        <textarea v-model="message" class="form-control" rows="5" maxlength="500" required></textarea>
      </div>

      <button type="submit" class="btn btn-primary">Send</button>
    </form>

    <div class="mt-3" v-if="feedback">{{ feedback }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const message = ref('')
const feedback = ref('')

function submitForm() {
  // Dummy behavior for now
  feedback.value = `Thank you, ${name.value}! Your message has been "sent".`
  name.value = email.value = message.value = ''
}
</script>