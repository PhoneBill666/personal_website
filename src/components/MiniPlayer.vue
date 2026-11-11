<template>
  <div class="mini" :class="{ playing: isPlaying, compact }" role="region" aria-label="Music player">
    <button class="mini-play" type="button" :aria-label="isPlaying ? 'Pause music' : 'Play music'" @click="toggle">
      <AppIcon :name="isPlaying ? 'pause' : 'play'" :size="15" />
    </button>
    <div class="mini-meta">
      <span class="mini-label">{{ isPlaying ? 'Now playing' : 'Lo-fi while you read' }}</span>
      <span class="mini-title" :title="title">{{ title }}</span>
    </div>
    <span class="bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
    <button class="mini-next" type="button" aria-label="Next track" @click="next">
      <AppIcon name="skip" :size="14" />
    </button>
    <span class="mini-progress" :style="{ transform: 'scaleX(' + progress + ')' }" aria-hidden="true"></span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import AppIcon from '@/components/AppIcon.vue'
import musicService from '@/MusicService'

const isPlaying = ref(musicService.getIsPlaying())
const title = ref(musicService.getCurrentSong()[1])
const currentTime = ref(musicService.getCurrentTime())
const duration = ref(musicService.getDuration())

const progress = computed(() => (duration.value ? Math.min(1, currentTime.value / duration.value) : 0))

const handlers = {
  play: () => (isPlaying.value = true),
  pause: () => (isPlaying.value = false),
  songchange: () => {
    title.value = musicService.getCurrentSong()[1]
    currentTime.value = 0
  },
  timeupdate: (time) => (currentTime.value = Number(time) || 0),
  durationupdate: (value) => (duration.value = Number(value) || 0),
}

const toggle = () => (isPlaying.value ? musicService.pause() : musicService.play())
const next = () => musicService.nextSong()

// Shrink to a small pill once the visitor starts reading (always on small screens);
// hover or focus expands it again.
const compact = ref(false)
const onScroll = () => (compact.value = window.innerWidth < 640 || window.scrollY > 160)

onMounted(() => {
  Object.entries(handlers).forEach(([event, fn]) => musicService.on(event, fn))
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  Object.entries(handlers).forEach(([event, fn]) => musicService.off(event, fn))
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.mini {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  max-width: min(320px, calc(100vw - 92px));
  padding: 0.45rem 0.55rem 0.45rem 0.45rem;
  border-radius: 999px;
  overflow: hidden;
  background: rgba(10, 15, 26, 0.74);
  border: 1px solid var(--line);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: var(--shadow);
  transition: max-width 0.4s var(--ease), padding 0.4s var(--ease);
}

.mini.compact:not(:hover):not(:focus-within) {
  max-width: 96px;
  padding-right: 0.45rem;
}

.mini.compact:not(:hover):not(:focus-within) .mini-meta,
.mini.compact:not(:hover):not(:focus-within) .mini-next {
  display: none;
}

.mini-play,
.mini-next {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  transition: transform 0.2s var(--ease), background 0.2s, color 0.2s;
}

.mini-play {
  width: 36px;
  height: 36px;
  background: var(--accent);
  color: var(--accent-ink);
}

.mini-play:hover {
  transform: scale(1.06);
}

.mini-next {
  width: 30px;
  height: 30px;
  color: var(--ink-2);
}

.mini-next:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--ink);
}

.mini-meta {
  display: grid;
  min-width: 0;
  line-height: 1.25;
}

.mini-label {
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-3);
}

.mini-title {
  font-size: 0.85rem;
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bars {
  display: inline-flex;
  align-items: flex-end;
  flex-shrink: 0;
  gap: 2px;
  height: 14px;
}

.bars i {
  width: 3px;
  height: 4px;
  border-radius: 2px;
  background: var(--sea);
}

.mini:not(.playing) .bars {
  display: none;
}

.mini.playing.compact:not(:hover):not(:focus-within) .bars {
  margin-right: 0.3rem;
}

.playing .bars i {
  animation: bounce 0.9s ease-in-out infinite;
}

.playing .bars i:nth-child(2) { animation-delay: -0.3s; }
.playing .bars i:nth-child(3) { animation-delay: -0.6s; }
.playing .bars i:nth-child(4) { animation-delay: -0.15s; }

@keyframes bounce {
  0%, 100% { height: 4px; }
  50% { height: 14px; }
}

.mini-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  transform-origin: left center;
  opacity: 0.8;
}

@media (max-width: 560px) {
  .mini {
    left: 12px;
    bottom: 12px;
  }

  .mini-label {
    display: none;
  }
}
</style>
