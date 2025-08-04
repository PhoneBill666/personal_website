<template>
  <div class="background-container">
    <video
      ref="videoRef"
      class="background-video"
      autoplay
      loop
      muted
      playsinline
    >
      <!-- <source src="/src/components/background_resource/wallpaper1.mp4" type="video/mp4"> -->
      <!-- <source src="/src/components/background_resource/wallpaper2.mp4" type="video/mp4"> -->
      <source src="https://cdn.likaixu.com/wallpaper2.mp4" type="video/mp4">
    </video>
    <div class="overlay"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const videoRef = ref(null)

onMounted(() => {
  if (videoRef.value) {
    // 确保视频自动播放
    videoRef.value.play().catch(error => {
      console.error('视频自动播放失败:', error)
    })
  }
})

onBeforeUnmount(() => {
  if (videoRef.value) {
    videoRef.value.pause()
    videoRef.value.src = ''
  }
})
</script>

<style scoped>
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  object-fit: contain;
  max-width: none;
  max-height: none;
}

@media (min-aspect-ratio: 16/9) {
  .background-video {
    width: 100vw;
    height: 56.25vw; /* 保持16:9的比例 */
  }
}

@media (max-aspect-ratio: 16/9) {
  .background-video {
    width: 177.78vh; /* 保持16:9的比例 */
    height: 100vh;
  }
}

/* 添加一个半透明遮罩，使内容更容易阅读 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  pointer-events: none;
}

/* 针对 Safari 的优化 */
@supports (-webkit-touch-callout: none) {
  .background-video {
    position: fixed;
  }
}
</style>

