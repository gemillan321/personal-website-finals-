

<template>
  <div id="app" ref="appRef">
    <!-- Custom Cursor -->
    <div class="cursor-dot" ref="cursorDot"></div>
    <div class="cursor-ring" ref="cursorRing"></div>

    <!-- CRT Scanline Overlay -->
    <div class="scanlines"></div>

    <!-- Matrix Rain Canvas -->
    <canvas ref="matrixCanvas" class="matrix-bg"></canvas>

    <!-- Navbar -->
    <nav class="navbar" :class="{ scrolled: navScrolled }">
      <div class="nav-inner">
        <a class="nav-brand" href="#">
          <span class="bracket">[</span>
          <span class="brand-text">0xPORTFOLIO</span>
          <span class="bracket">]</span>
        </a>
        <ul class="nav-links">
          <li v-for="link in navLinks" :key="link.id">
            <a :href="`#${link.id}`" @click="smoothScroll(link.id)" :class="{ active: activeSection === link.id }">
              <span class="link-num">{{ link.num }}</span>{{ link.label }}
            </a>
          </li>
        </ul>
        <button class="hamburger" @click="menuOpen = !menuOpen" :class="{ open: menuOpen }">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="mobile-menu" :class="{ open: menuOpen }">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" @click="smoothScroll(link.id); menuOpen = false">
          {{ link.label }}
        </a>
      </div>
    </nav>

    <!-- HERO SECTION -->
    <section id="home" class="hero">
      <div class="hero-content">
        <div class="terminal-tag glitch-minor">root@cyberlab:~$</div>
        <h1 class="hero-name glitch" data-text="Miles Angelo Gemillan">Miles Angelo Gemillan</h1>
        <div class="hero-role">
          <span class="role-prefix">// </span>
          <span class="typed-text">{{ typedText }}</span>
          <span class="cursor-blink">█</span>
        </div>
          <p class="hero-desc">
            Cybersecurity enthusiast. CTF competitor. Cloud and web developer.<br>
            <span class="green">I explore systems, solve challenges, and build secure projects.</span>
          </p>
        <div class="hero-badges">
          <span class="badge" v-for="b in badges" :key="b">{{ b }}</span>
        </div>
        <div class="hero-cta">
          <button class="btn-primary" @click="smoothScroll('contact')">
            <span class="btn-glitch">INITIATE_CONTACT.exe</span>
          </button>
          <button class="btn-secondary" @click="smoothScroll('projects')">
            <span>VIEW_WORK</span>
          </button>
        </div>
        <div class="scroll-hint">
          <span>SCROLL</span>
          <div class="scroll-line"></div>
        </div>
      </div>
      <div class="hero-terminal">
        <div class="term-header">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green-dot"></span>
          <span class="term-title">threat_analysis.sh</span>
        </div>
        <div class="term-body">
          <div v-for="(line, i) in terminalLines" :key="i" class="term-line" :style="{animationDelay: `${i * 0.3}s`}">
            <span :class="line.class">{{ line.text }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ABOUT SECTION -->
    <section id="about" class="about reveal-section">
      <div class="section-label">// 01. ABOUT</div>
      <div class="about-grid">
        <div class="about-left">
          <h2 class="section-title">WHO<br><span class="green">AM I?</span></h2>
            <div class="about-bio">
              <p>
                2nd-year <span class="highlight">Computer Science student</span> building real-world projects in web development and embedded systems. I tinker with <span class="highlight">Arduino</span>, create security tools, and love turning ideas into code.
              </p>
              <p>
                Passionate about learning, experimenting, and sharing knowledge — whether it’s through <span class="highlight">GitHub repos</span>, CTF writeups, or automation scripts.
              </p>
              <p>
                My philosophy: <span class="green">code smart, stay curious, and always keep building.</span>
              </p>
            </div>
          <div class="stat-grid">
            <div class="stat" v-for="s in stats" :key="s.label">
              <div class="stat-num">{{ s.num }}</div>
              <div class="stat-label">{{ s.label }}</div>
            </div>
          </div>
        </div>
        <div class="about-right">
          <div class="skills-panel">
            <div class="panel-header">
              <span class="green">$</span> cat skills.txt
            </div>
            <div class="skill-group" v-for="group in skillGroups" :key="group.name">
              <div class="skill-group-name">{{ group.name }}</div>
              <div class="skill-bar-wrap" v-for="sk in group.skills" :key="sk.name">
                <div class="skill-name">{{ sk.name }}</div>
                <div class="skill-bar">
                  <div class="skill-fill" :style="{width: skillsVisible ? sk.pct + '%' : '0%'}" :data-pct="sk.pct + '%'"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJECTS SECTION -->
    <section id="projects" class="projects reveal-section">
      <div class="section-label">// 02. PROJECTS</div>
      <h2 class="section-title">RECENT <span class="green">OPS</span></h2>
      <div class="projects-grid">
        <div
          class="project-card"
          v-for="(proj, i) in projects"
          :key="proj.id"
          @mousemove="tiltCard($event, i)"
          @mouseleave="resetCard(i)"
          :ref="el => cardRefs[i] = el"
        >
          <div class="card-glow"></div>
          <div class="card-num">{{ String(proj.id).padStart(2, '0') }}</div>
          <div class="card-tag">{{ proj.tag }}</div>
          <h3 class="card-title">{{ proj.title }}</h3>
          <p class="card-desc">{{ proj.description }}</p>
          <div class="card-tech">
            <span v-for="t in proj.tech" :key="t" class="tech-tag">{{ t }}</span>
          </div>
          <div class="card-footer">
            <a :href="proj.github" class="card-link" target="_blank">
              <span>[ GitHub ]</span>
            </a>
            <a :href="proj.demo" class="card-link" target="_blank">
              <span>[ Live Demo ]</span>
            </a>
          </div>
          <div class="card-border-anim"></div>
        </div>
      </div>
    </section>

    <!-- BLOG SECTION -->
    <section id="blog" class="blog reveal-section">
      <div class="section-label">// 03. INTEL</div>
      <h2 class="section-title">FIELD <span class="green">REPORTS</span></h2>
      <div class="blog-list">
        <a
          v-for="(post, i) in blogPosts"
          :key="post.id"
          :href="`/blog/${post.slug}`"
          class="blog-item"
        >
          <div class="blog-num">{{ String(i + 1).padStart(2, '0') }}</div>
          <div class="blog-info">
            <div class="blog-category">{{ post.category }}</div>
            <div class="blog-title">{{ post.title }}</div>
            <div class="blog-date">{{ post.date }}</div>
          </div>
          <div class="blog-arrow">→</div>
        </a>
      </div>
    </section>

    <!-- CONTACT SECTION -->
    <section id="contact" class="contact reveal-section">
      <div class="section-label">// 04. CONTACT</div>
      <div class="contact-grid">
        <div class="contact-left">
          <h2 class="section-title">LET'S <span class="green">TALK</span></h2>
          <p class="contact-desc">
            Whether it's a pentest engagement, a bug report, or just
            geeking out over CVEs — my inbox is open.
          </p>
          <div class="contact-links">
            <a href="mailto:alex@cipher.sec" class="contact-link">
              <span class="link-icon">✉</span> alex@cipher.sec
            </a>
            <a href="https://github.com" class="contact-link" target="_blank">
              <span class="link-icon">⌥</span> github.com/alexcipher
            </a>
            <a href="https://linkedin.com" class="contact-link" target="_blank">
              <span class="link-icon">⊞</span> linkedin.com/in/alexcipher
            </a>
          </div>
        </div>
        <div class="contact-right">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-field" :class="{ focused: focusedField === 'name' }">
              <label>IDENTIFIER</label>
              <input
                type="text"
                v-model="name"
                placeholder="your_name"
                required
                @focus="focusedField = 'name'"
                @blur="focusedField = ''"
              >
            </div>
            <div class="form-field" :class="{ focused: focusedField === 'email' }">
              <label>SIGNAL</label>
              <input
                type="email"
                v-model="email"
                placeholder="your@email.com"
                required
                @focus="focusedField = 'email'"
                @blur="focusedField = ''"
              >
            </div>
            <div class="form-field" :class="{ focused: focusedField === 'message' }">
              <label>PAYLOAD</label>
              <textarea
                v-model="message"
                rows="5"
                placeholder="// Type your message here..."
                required
                @focus="focusedField = 'message'"
                @blur="focusedField = ''"
              ></textarea>
            </div>
            <button type="submit" class="btn-primary" :disabled="sending">
              <span v-if="!sending">TRANSMIT_MESSAGE.exe</span>
              <span v-else class="sending-anim">SENDING...</span>
            </button>
          </form>
          <div class="feedback-msg" v-if="feedback">
            <span class="green">✓ </span>{{ feedback }}
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-line"></div>
      <div class="footer-content">
        <span class="green">root@cyberlab</span>:<span style="color:#4fc3f7">~</span># <span class="footer-text">© 2026 Alex Cipher — All Rights Reserved</span>
      </div>
      <div class="footer-tag">Built with Vue 3 · Secured by Design</div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAppLogic } from './components/composables/appLogic'

const appRef = ref(null)
const cursorDot = ref(null)
const cursorRing = ref(null)
const matrixCanvas = ref(null)
const cardRefs = ref([])

const {
  navScrolled, activeSection, menuOpen, skillsVisible,
  typedText, focusedField, sending, feedback,
  name, email, message,
  navLinks, badges, terminalLines, stats, skillGroups, projects, blogPosts,
  smoothScroll, tiltCard, resetCard, submitForm
} = useAppLogic(matrixCanvas, cursorDot, cursorRing, cardRefs)
</script>

