import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

export function useGuestbook() {
  const entries = ref([])
  const gbName = ref('')
  const gbMessage = ref('')
  const gbSending = ref(false)
  const gbFeedback = ref('')
  const gbFeedbackError = ref(false)
  const gbFocused = ref('')
  const gbLoading = ref(true)

  async function fetchEntries() {
    gbLoading.value = true
    const { data, error } = await supabase
      .from('guestbook')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20)

    if (!error) entries.value = data
    gbLoading.value = false
  }

  async function submitEntry() {
    if (!gbName.value.trim() || !gbMessage.value.trim()) return
    gbSending.value = true
    gbFeedback.value = ''

    const { error } = await supabase
      .from('guestbook')
      .insert([{ name: gbName.value.trim(), message: gbMessage.value.trim() }])

    if (error) {
      gbFeedback.value = 'Transmission failed. Try again.'
      gbFeedbackError.value = true
    } else {
      gbFeedback.value = `Entry logged, ${gbName.value}. Signal received.`
      gbFeedbackError.value = false
      gbName.value = ''
      gbMessage.value = ''
      await fetchEntries() // refresh list instantly
    }
    gbSending.value = false
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    })
  }

  onMounted(fetchEntries)

  return {
    entries, gbName, gbMessage, gbSending,
    gbFeedback, gbFeedbackError, gbFocused,
    gbLoading, submitEntry, formatDate
  }
}