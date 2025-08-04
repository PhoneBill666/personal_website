<!-- <template>
    <div>
      <h1>访客人数: {{ visitorCount }}</h1>
    </div>
  </template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  setup() {
    const visitorCount = ref(0);

    const fetchVisitorCount = async () => {
      try {
        const response = await axios.post(
          "https://api.cloudflare.com/client/v4/graphql",
          {
            query: `
              query {
                viewer {
                  zones(filter: {zoneTag: "你的 Cloudflare 区域 ID"}) {
                    httpRequests1dGroups(limit: 1) {
                      sum {
                        requests
                      }
                    }
                  }
                }
              }`,
          },
          {
            headers: {
              Authorization: `7YCAqqRjA0e1IkoOrFf5ZMkuS9d-Vn8LxF7r5XtG`,
              "Content-Type": "application/json",
            },
          }
        );
        visitorCount.value = response.data.data.viewer.zones[0].httpRequests1dGroups[0].sum.requests;
      } catch (error) {
        console.error("获取访客人数失败:", error);
      }
    };

    onMounted(fetchVisitorCount);

    return { visitorCount };
  },
};
</script>
<style scoped>
</style> -->

<!-- <template>
  <div class="typing-container">
    <span class="typing-text">{{ displayedText }}</span>
    <span v-if="showCursor" class="cursor">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const fullTexts = [
  "Don't put off till tomorrow what should be done today.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts."
]; // 要显示的多个文案

const displayedText = ref(""); // 逐字显示的文本
const showCursor = ref(true); // 控制光标显示
const currentIndex = ref(0); // 当前显示的文案索引

const typingSpeed = 100; // 文字出现的速度（毫秒）
const cursorBlinkSpeed = 500; // 光标闪烁速度

const typeText = async (text) => {
  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, typingSpeed));
    displayedText.value += text[i];
  }

  // 显示完整文案后等待2秒，然后继续显示下一个文案
  setTimeout(() => {
    currentIndex.value = (currentIndex.value + 1) % fullTexts.length; // 更新文案索引
    displayedText.value = ""; // 清空当前显示的文本
    typeText(fullTexts[currentIndex.value]); // 递归调用显示下一个文案
  }, 2000);
};

// 光标闪烁效果
setInterval(() => {
  showCursor.value = !showCursor.value;
}, cursorBlinkSpeed);

onMounted(() => {
  typeText(fullTexts[currentIndex.value]); // 启动文案显示
});
</script>

<style scoped>
.typing-container {
  font-size: 24px;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid transparent;
  color: white;
}

.cursor {
  display: inline-block;
  width: 10px;
  background: white;
  animation: blink 0.8s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style> -->

<!--<template>-->
<!--  <div class="music-player">-->
<!--    <div class="player-header">-->
<!--      <el-icon class="music-icon"><Headset /></el-icon>-->
<!--      <span class="player-title">Music Player</span>-->
<!--    </div>-->
<!--    -->
<!--    <div class="player-content">-->
<!--      <div class="song-info">-->
<!--        <div class="song-name">{{ songName }}</div>-->
<!--        <div class="time-info">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>-->
<!--      </div>-->

<!--      <div class="progress-bar">-->
<!--        <el-slider-->
<!--          v-model="currentTime"-->
<!--          :max="duration"-->
<!--          @input="seek"-->
<!--          :show-tooltip="false"-->
<!--        />-->
<!--      </div>-->

<!--      <div class="controls">-->
<!--        <el-button circle @click="play" class="control-btn" v-if="!isPlaying">-->
<!--          <el-icon :size="20"><VideoPlay /></el-icon>-->
<!--        </el-button>-->
<!--        <el-button circle @click="pause" class="control-btn" v-else>-->
<!--          <el-icon :size="20"><VideoPause /></el-icon>-->
<!--        </el-button>-->
<!--        &lt;!&ndash; <el-button circle @click="stop" class="control-btn">-->
<!--          <el-icon :size="20"><VideoStop /></el-icon>-->
<!--        </el-button> &ndash;&gt;-->
<!--      </div>-->

<!--      <div class="volume-bars">-->
<!--        <div v-for="n in 32" :key="n" -->
<!--             class="volume-bar"-->
<!--             :style="{ -->
<!--               animationDelay: `${n * 0.1}s`,-->
<!--               height: isPlaying ? `${Math.random() * 100}%` : '20px',-->
<!--               transition: isPlaying ? 'height 0.1s ease' : 'none'-->
<!--             }">-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="volume-control">-->
<!--        <el-icon><Microphone /></el-icon>-->
<!--        <el-slider-->
<!--          v-model="volume"-->
<!--          :max="1"-->
<!--          :step="0.01"-->
<!--          @input="changeVolume"-->
<!--          :show-tooltip="false"-->
<!--        />-->
<!--      </div>-->
<!--    </div>-->

<!--    <audio ref="audio" @timeupdate="updateTime" @loadedmetadata="updateDuration">-->
<!--      <source :src="audioSrc" type="audio/mp3" />-->
<!--    </audio>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup>-->
<!--import { ref, onMounted, onUnmounted } from 'vue'-->
<!--import { Headset, VideoPlay, VideoPause, Microphone } from '@element-plus/icons-vue'-->

<!--const audioSrc = new URL('@/components/music/EKKSTACY - i walk this earth all by myself (Explicit).mp3', import.meta.url).href-->
<!--const songName = "i walk this earth all by myself"-->
<!--const isPlaying = ref(false)-->
<!--const duration = ref(0)-->
<!--const currentTime = ref(0)-->
<!--const volume = ref(0.5)-->
<!--const audio = ref(null)-->

<!--// 添加音量柱动画更新-->
<!--const updateVolumeBars = () => {-->
<!--  if (!isPlaying.value) return-->
<!--  const bars = document.querySelectorAll('.volume-bar')-->
<!--  bars.forEach(bar => {-->
<!--    bar.style.height = `${Math.random() * 100}%`-->
<!--  })-->
<!--  requestAnimationFrame(updateVolumeBars)-->
<!--}-->

<!--const play = () => {-->
<!--  audio.value.play()-->
<!--  isPlaying.value = true-->
<!--  updateVolumeBars()-->
<!--}-->

<!--const pause = () => {-->
<!--  audio.value.pause()-->
<!--  isPlaying.value = false-->
<!--}-->

<!--// 添加音频结束事件处理-->
<!--const handleEnded = () => {-->
<!--  audio.value.currentTime = 0-->
<!--  audio.value.play()-->
<!--}-->

<!--const updateTime = () => {-->
<!--  if (audio.value && audio.value.currentTime !== undefined) {-->
<!--    currentTime.value = audio.value.currentTime-->
<!--  }-->
<!--}-->

<!--const updateDuration = () => {-->
<!--  if (audio.value && audio.value.duration !== undefined) {-->
<!--    duration.value = audio.value.duration-->
<!--  }-->
<!--}-->

<!--const seek = (value) => {-->
<!--  if (audio.value) {-->
<!--    audio.value.currentTime = value-->
<!--  }-->
<!--}-->

<!--const changeVolume = (value) => {-->
<!--  if (audio.value) {-->
<!--    audio.value.volume = value-->
<!--  }-->
<!--}-->

<!--const formatTime = (time) => {-->
<!--  const minutes = Math.floor(time / 60)-->
<!--  const seconds = Math.floor(time % 60)-->
<!--  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`-->
<!--}-->

<!--onMounted(() => {-->
<!--  audio.value.volume = volume.value-->
<!--  audio.value.addEventListener('ended', handleEnded)-->
<!--})-->

<!--// 组件卸载时移除事件监听-->
<!--onUnmounted(() => {-->
<!--  if (audio.value) {-->
<!--    audio.value.removeEventListener('ended', handleEnded)-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.music-player {-->
<!--  width: 320px;-->
<!--  background: rgba(255, 255, 255, 0.2);-->
<!--  border-radius: 15px;-->
<!--  padding: 20px;-->
<!--  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);-->
<!--  transition: transform 0.3s ease;-->
<!--}-->

<!--.music-player:hover {-->
<!--  transform: translateY(-5px);-->
<!--  background: rgba(255, 255, 255, 0.25);-->
<!--}-->

<!--.player-header {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 10px;-->
<!--  margin-bottom: 20px;-->
<!--  color: white;-->
<!--}-->

<!--.music-icon {-->
<!--  font-size: 24px;-->
<!--}-->

<!--.player-title {-->
<!--  font-size: 20px;-->
<!--  font-weight: bold;-->
<!--  font-style: italic;-->
<!--}-->

<!--.player-content {-->
<!--  display: flex;-->
<!--  flex-direction: column;-->
<!--  gap: 15px;-->
<!--}-->

<!--.song-info {-->
<!--  text-align: center;-->
<!--  color: white;-->
<!--}-->

<!--.song-name {-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.time-info {-->
<!--  font-size: 14px;-->
<!--  opacity: 0.8;-->
<!--}-->

<!--.progress-bar {-->
<!--  padding: 0 10px;-->
<!--}-->

<!--.controls {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  gap: 15px;-->
<!--}-->

<!--.control-btn {-->
<!--  background: rgba(255, 255, 255, 0.2);-->
<!--  border: none;-->
<!--  color: white;-->
<!--  transition: all 0.3s ease;-->
<!--  width: 40px;-->
<!--  height: 40px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--.control-btn:hover {-->
<!--  background: rgba(255, 255, 255, 0.3);-->
<!--  transform: scale(1.1);-->
<!--}-->

<!--.volume-bars {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: flex-end;-->
<!--  gap: 3px;-->
<!--  height: 50px;-->
<!--  margin: 10px 0;-->
<!--  padding: 0 10px;-->
<!--}-->

<!--.volume-bar {-->
<!--  width: 3.5px;-->
<!--  background-color: white;-->
<!--  border-radius: 2px;-->
<!--  min-height: 2px;-->
<!--}-->

<!--.volume-control {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 10px;-->
<!--  color: white;-->
<!--  padding: 0 10px;-->
<!--  height: 32px;-->
<!--}-->

<!--.volume-control :deep(.el-slider) {-->
<!--  margin-top: 2px;-->
<!--}-->

<!--:deep(.el-slider__runway) {-->
<!--  background-color: var(&#45;&#45;el-slider-main-bg-color);-->
<!--  opacity: 0.5;-->
<!--}-->

<!--:deep(.el-slider__bar) {-->
<!--  background-color: #68bbde;-->
<!--  opacity: 0.5;-->
<!--}-->

<!--:deep(.el-slider__button) {-->
<!--  position: relative;-->
<!--  top: -4px;-->
<!--  width: 12px;-->
<!--  height: 12px;-->
<!--  border: none;-->
<!--  background-color: white;-->
<!--  border-radius: 50%;-->
<!--  cursor: pointer;-->
<!--}-->

<!--:deep(.el-slider__button-wrapper) {-->
<!--  width: 12px;-->
<!--  height: 12px;-->
<!--  top: -5px;-->
<!--}-->
<!--</style>-->

<template>

</template>
<style scoped>

</style>