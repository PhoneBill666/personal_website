import { ref, onMounted, onBeforeUnmount } from 'vue'

// Types and erases a list of phrases. Starts with the first phrase fully shown
// and stays static when the visitor prefers reduced motion.
export function useTyping(words, { typeDelay = 55, eraseDelay = 28, hold = 1900 } = {}) {
  const text = ref(words[0] || '')
  let timer = null
  let index = 0
  let position = text.value.length
  let erasing = true

  const step = () => {
    const word = words[index]
    if (erasing) {
      position -= 1
      text.value = word.slice(0, position)
      if (position <= 0) {
        erasing = false
        index = (index + 1) % words.length
        timer = setTimeout(step, 320)
        return
      }
      timer = setTimeout(step, eraseDelay)
    } else {
      const next = words[index]
      position += 1
      text.value = next.slice(0, position)
      if (position >= next.length) {
        erasing = true
        timer = setTimeout(step, hold)
        return
      }
      timer = setTimeout(step, typeDelay)
    }
  }

  onMounted(() => {
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || words.length < 2) return
    timer = setTimeout(step, hold)
  })

  onBeforeUnmount(() => clearTimeout(timer))

  return text
}
