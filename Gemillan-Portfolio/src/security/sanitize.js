let lastSubmit = 0

export function sanitizeInput(str) {
  return str.trim().replace(/[<>]/g, "")
}

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function limitMessage(msg) {
  return msg.length <= 500
}

export function preventRapidSubmit() {
  const now = Date.now()
  if (now - lastSubmit < 3000) return false
  lastSubmit = now
  return true
}