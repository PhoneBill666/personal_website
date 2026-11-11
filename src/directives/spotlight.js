// v-spotlight: a soft light that follows the pointer across a card.
export default {
  mounted(el) {
    el.classList.add('spotlight')
    const move = (event) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--mx', event.clientX - rect.left + 'px')
      el.style.setProperty('--my', event.clientY - rect.top + 'px')
    }
    el._spotlightMove = move
    el.addEventListener('pointermove', move, { passive: true })
  },
  unmounted(el) {
    el.removeEventListener('pointermove', el._spotlightMove)
  },
}
