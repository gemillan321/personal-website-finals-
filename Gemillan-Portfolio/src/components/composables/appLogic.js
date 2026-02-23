// useAppLogic.js
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

export function useAppLogic(matrixCanvas, cursorDot, cursorRing, cardRefs) {
  // ─── Refs ───────────────────────────────────────────────
  const navScrolled = ref(false)
  const activeSection = ref('home')
  const menuOpen = ref(false)
  const skillsVisible = ref(false)
  const typedText = ref('')
  const focusedField = ref('')
  const sending = ref(false)
  const feedback = ref('')
  const name = ref('')
  const email = ref('')
  const message = ref('')
  const activePost = ref(null)
  const modalVisible = ref(false)


  const parsedContent = computed(() => {
  if (!activePost.value) return []
  return activePost.value.content
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => {
      if (line.startsWith('•') || line.startsWith('-')) {
        return { type: 'bullet', text: line }
      }
      if (line.startsWith('What I learned') || line.endsWith(':')) {
        return { type: 'subheading', text: line }
      }
      return { type: 'paragraph', text: line }
    })
})

function openPost(post) {
  activePost.value = post
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    setTimeout(() => { modalVisible.value = true }, 10)
  })
}

function closePost() {
  modalVisible.value = false
  setTimeout(() => {
    activePost.value = null
    document.body.style.overflow = ''
  }, 400)
}


  // ─── Data ────────────────────────────────────────────────
  const navLinks = [
    { id: 'home', label: 'HOME', num: '00.' },
    { id: 'about', label: 'ABOUT', num: '01.' },
    { id: 'projects', label: 'PROJECTS', num: '02.' },
    { id: 'blog', label: 'BLOG', num: '03.' },
    { id: 'contact', label: 'CONTACT', num: '04.' },
  ]

  const badges = [
  'Cisco Networking Basics',
  'AWS Cloud Foundations',
  'TryHackMe: PreSecurity',
  'TryHackMe: Cybersecurity 101',
  'LinkedIn: Cybersecurity Fundamentals'
]

  const terminalLines = [
  { text: '$ connecting to HTB VPN...', class: 'term-info' },
  { text: '$ binwalk evidence.img', class: 'term-cmd' },
  { text: '[+] Extracting nested archives...', class: 'term-info' },
  { text: '$ analyzing metadata...', class: 'term-cmd' },
  { text: '[✓] Hidden file located', class: 'term-success' },
  { text: '$ strings dump.txt', class: 'term-cmd' },
  { text: '[!] Possible flag pattern found', class: 'term-warn' },
  { text: '$ decoding...', class: 'term-info' },
  { text: '[✓] Flag captured', class: 'term-success' },
]

  const stats = [
  { num: 'CTFs', label: 'Challenges Solved' },
  { num: 'Cloud', label: 'Hands-on Labs' },
  { num: 'Projects', label: 'Built & Deployed' },
  { num: 'Tools', label: 'Learned in Practice' },
]

  const skillGroups = [
  {
    name: '[ LEARNING ]',
    skills: [
      { name: 'Linux Fundamentals', pct: 65 },
      { name: 'Networking Basics', pct: 70 },
      { name: 'Python Scripting', pct: 55 },
    ]
  },
  {
    name: '[ BUILDING ]',
    skills: [
      { name: 'Automation', pct: 50 },
      { name: 'Problem Solving', pct: 75 },
      { name: 'Technical Documentation', pct: 60 },
    ]
  }
] 

  const projects = ref([ 
      {
    id: 1,
    tag: 'Website Blog',
    title: 'CTF Writeup Vault',
    description: 'A website for CTF writeups',
    tech: ['Vercel', 'Vue', 'Supabase'],
    github: 'https://github.com/gemillan321/webprog-2025-2026-T2-react-nestjs2/tree/main',
    demo: 'https://guestbook-5icyht3bg-miles-projects-1a6aa47f.vercel.app/',
  },
        {
    id: 2,
    tag: 'Arduino Projects',
    title: 'Arduino Projects',
    description: 'A github repository with all my arduino projects',
    tech: ['C++', 'Arduino', 'Arduino Cloud'],
    github: 'https://github.com/gemillan321/Arduino_Projects',
    
  }
  ])
  const blogPosts = ref([      {
          id: 1,
          slug: 'nested-files-forensics',
          category: 'FORENSICS',
          title: 'My First Real Forensics Challenge: The Nested Files Rabbit Hole',
          date: 'Feb 2026',
          excerpt: 'Tackling a complex challenge involving nested compressed files and extracting secrets.',
          content: `
        # The Nested Files Forensics Challenge

        I recently faced my first real forensics challenge on CTF. The task was to analyze a set of **nested compressed files** and recover the hidden message.

        ## Steps I Took

        1. **Extracting Layers**  
          I used tools like \`binwalk\`, \`lzip\`, \`lzop\`, and \`xz\` to peel each compression layer.

        2. **Analyzing Contents**  
          Each file contained another compressed file, which I had to carefully extract one by one.

        3. **Decryption**  
          The final file had ASCII-encoded content. Using **CyberChef**, I decoded the hidden message.

        ## Lessons Learned

        - Understanding different compression formats is crucial.  
        - Always check the file type at each layer; some tools fail silently.  
        - Patience pays off when facing deeply nested structures.

        > This challenge taught me a lot about meticulous extraction and the importance of knowing your command-line tools.
        `
        } ])

  // ─── Typed Text Effect ────────────────────────────────────
  const roles = [
    'Cybersecurity Student.',
    'Cloud Practitioner (AWS).',
    'CTF Competitor.',
    'Networking Learner.',
    'Future Security Analyst.',
  ]
  let roleIdx = 0
  let charIdx = 0
  let deleting = false
  let typingTimer = null

  function typeRole() {
    const current = roles[roleIdx]
    if (!deleting) {
      typedText.value = current.slice(0, ++charIdx)
      if (charIdx === current.length) {
        deleting = true
        typingTimer = setTimeout(typeRole, 2000)
        return
      }
    } else {
      typedText.value = current.slice(0, --charIdx)
      if (charIdx === 0) {
        deleting = false
        roleIdx = (roleIdx + 1) % roles.length
      }
    }
    typingTimer = setTimeout(typeRole, deleting ? 50 : 90)
  }

  // ─── Matrix Rain ─────────────────────────────────────────
  let matrixAnim = null
  function initMatrix() {
    const canvas = matrixCanvas.value
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const cols = Math.floor(canvas.width / 20)
    const drops = Array(cols).fill(1)
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+{}|<>?アイウエオカキクケコ'

    function draw() {
      ctx.fillStyle = 'rgba(0,0,0,0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = '14px monospace'
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const x = i * 20
        ctx.fillStyle = i % 5 === 0 ? '#ffffff' : '#00ff41'
        ctx.globalAlpha = i % 3 === 0 ? 0.9 : 0.4
        ctx.fillText(char, x, y * 20)
        ctx.globalAlpha = 1
        if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i]++
      })
    }

    matrixAnim = setInterval(draw, 50)
  }

  // ─── Custom Cursor ────────────────────────────────────────
  function initCursor() {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (cursorDot.value) cursorDot.value.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    })

    function animRing() {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (cursorRing.value) cursorRing.value.style.transform = `translate(${ringX}px, ${ringY}px)`
      requestAnimationFrame(animRing)
    }
    animRing()

    document.querySelectorAll('a, button, .project-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorRing.value?.classList.add('hover'))
      el.addEventListener('mouseleave', () => cursorRing.value?.classList.remove('hover'))
    })
  }

  // ─── Scroll Logic ─────────────────────────────────────────
  function onScroll() {
    navScrolled.value = window.scrollY > 50
    const sections = ['home', 'about', 'projects', 'blog', 'contact']
    for (const id of [...sections].reverse()) {
      const el = document.getElementById(id)
      if (el && window.scrollY >= el.offsetTop - 200) {
        activeSection.value = id
        break
      }
    }
    document.querySelectorAll('.reveal-section').forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.8) el.classList.add('revealed')
    })
    const aboutEl = document.getElementById('about')
    if (aboutEl && aboutEl.getBoundingClientRect().top < window.innerHeight * 0.7) skillsVisible.value = true
  }

  function smoothScroll(id) {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    menuOpen.value = false
  }

  // ─── 3D Card Tilt ─────────────────────────────────────────
  function tiltCard(e, i) {
    const card = cardRefs.value[i]
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -8
    const rotY = ((x - cx) / cx) * 8
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`
  }
  function resetCard(i) {
    const card = cardRefs.value[i]
    if (card) card.style.transform = ''
  }

  // ─── Form ─────────────────────────────────────────────────
  async function submitForm() {
    sending.value = true
    await new Promise(r => setTimeout(r, 1500))
    feedback.value = `Message received, ${name.value}. I'll respond within 24h.`
    name.value = email.value = message.value = ''
    sending.value = false
  }

  // ─── Lifecycle ────────────────────────────────────────────
  onMounted(() => {
    nextTick(() => {
      initMatrix()
      initCursor()
      window.addEventListener('scroll', onScroll)
      onScroll()
      typeRole()
      window.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') closePost()
        })
      window.addEventListener('resize', () => {
        if (matrixCanvas.value) {
          matrixCanvas.value.width = window.innerWidth
          matrixCanvas.value.height = window.innerHeight
        }
      })
    })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    clearInterval(matrixAnim)
    clearTimeout(typingTimer)
  })

  return {
    navScrolled, activeSection, menuOpen, skillsVisible,
    typedText, focusedField, sending, feedback,
    name, email, message,
    navLinks, badges, terminalLines, stats, skillGroups, projects, blogPosts,
    activePost, modalVisible, parsedContent,
    smoothScroll, tiltCard, resetCard, submitForm, openPost, closePost
  }
}