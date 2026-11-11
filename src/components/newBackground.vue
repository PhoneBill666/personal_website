<template>
  <div class="bg" aria-hidden="true">
    <img class="bg-media" src="/hero-poster.jpg" alt="" decoding="async" />
    <video
      v-if="useVideo"
      ref="videoRef"
      class="bg-media bg-video"
      :class="{ ready }"
      autoplay
      loop
      muted
      playsinline
      preload="auto"
      poster="/hero-poster.jpg"
      @canplay="ready = true"
    >
      <source src="https://cdn.likaixu.com/wallpaper2.mp4" type="video/mp4" />
    </video>
    <div class="bg-shade"></div>
    <div class="bg-dim"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoRef = ref(null)
const useVideo = ref(false)
const ready = ref(false)

// Pause the 60 MB loop while the tab is hidden.
const onVisibility = () => {
  const video = videoRef.value
  if (!video) return
  if (document.hidden) video.pause()
  else video.play().catch(() => {})
}

onMounted(() => {
  // Skip the video for reduced-motion and data-saver visitors; the poster stays.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const saveData = navigator.connection && navigator.connection.saveData
  useVideo.value = !reduceMotion && !saveData
  document.addEventListener('visibilitychange', onVisibility)
})

onBeforeUnmount(() => {
  document.removeEventListener('visibilitychange', onVisibility)
  if (videoRef.value) videoRef.value.pause()
})
</script>

<style scoped>
.bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background: var(--bg);
}

.bg-media {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  object-position: 65% center;
}

.bg-video {
  opacity: 0;
  transition: opacity 1.2s ease;
}

.bg-video.ready {
  opacity: 1;
}

.bg-shade {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(8, 12, 22, 0.86) 0%, rgba(8, 12, 22, 0.6) 40%, rgba(8, 12, 22, 0.22) 72%, rgba(8, 12, 22, 0.4) 100%),
    linear-gradient(180deg, rgba(8, 12, 22, 0.45) 0%, rgba(8, 12, 22, 0) 28%, rgba(8, 12, 22, 0.6) 100%);
}

/* Darkens further as the visitor scrolls into the content. */
.bg-dim {
  position: absolute;
  inset: 0;
  background: rgba(8, 12, 22, 0.62);
  opacity: var(--bg-dim, 0);
}

@media (max-width: 760px) {
  .bg-shade {
    background: linear-gradient(180deg, rgba(8, 12, 22, 0.55) 0%, rgba(8, 12, 22, 0.72) 60%, rgba(8, 12, 22, 0.86) 100%);
  }
}
</style>
