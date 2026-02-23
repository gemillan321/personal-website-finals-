<template>
  <div class="terminal p-3">
    <div v-for="(line, index) in output" :key="index">
      {{ line }}
    </div>
    <div>
      <span>> </span>
      <input
        v-model="command"
        @keyup.enter="execute"
        class="terminal-input"
        autofocus
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import projects from '../data/projects.json'
import skills from '../data/skills.json'
import { supabase } from '../services/supabase'

const output = ref(["Booting system..."])
const command = ref("")
const history = ref([])
let historyIndex = -1

setTimeout(() => {
  output.value.push("System ready. Type 'help'")
}, 1000)

async function execute() {
  const cmd = command.value
  history.value.push(cmd)
  output.value.push("> " + cmd)

  if (cmd === "help")
    output.value.push("whoami | projects | skills | blog | contact | clear")

  else if (cmd === "whoami")
    output.value.push("Cybersecurity Engineer Portfolio")

  else if (cmd === "projects")
    projects.forEach(p => output.value.push(p.title))

  else if (cmd === "skills")
    skills.forEach(s => output.value.push(s.name))

  else if (cmd === "blog") {
    const { data } = await supabase
      .from("blog_posts")
      .select("title")
      .eq("published", true)
    data.forEach(p => output.value.push(p.title))
  }

  else if (cmd === "clear")
    output.value = []

  else output.value.push("Unknown command")

  command.value = ""
}
</script>

<style scoped>
.terminal {
  background: #000;
  color: #00F5FF;
  min-height: 300px;
}
.terminal-input {
  background: transparent;
  border: none;
  color: #00F5FF;
  outline: none;
}
</style>