import { ref, onMounted, onBeforeUnmount } from 'vue'

// Tracks the section in view, scroll progress and whether the page has scrolled.
// Also exposes --bg-dim on <html> so the background darkens as you read.
export function useScrollSpy(ids) {
  const active = ref('')
  const scrolled = ref(false)
  const progress = ref(0)
  const showTop = ref(false)
  let frame = 0

  const update = () => {
    frame = 0
    const y = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrolled.value = y > 24
    showTop.value = y > window.innerHeight * 0.8
    progress.value = max > 0 ? Math.min(1, y / max) : 0
    document.documentElement.style.setProperty('--bg-dim', Math.min(1, y / window.innerHeight).toFixed(3))

    // The active section is the last one whose top has crossed 45% of the viewport.
    const line = window.innerHeight * 0.45
    let current = ''
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el && el.getBoundingClientRect().top <= line) current = id
    }
    if (max > 0 && y >= max - 4) current = ids[ids.length - 1]
    active.value = current
  }

  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    cancelAnimationFrame(frame)
    document.documentElement.style.removeProperty('--bg-dim')
  })

  return { active, scrolled, progress, showTop }
}
