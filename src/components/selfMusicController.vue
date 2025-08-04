<template>
  <div class="music-player" :style="{ width: width, height: height }">
    <div class="player-header">
      <el-icon class="music-icon"><Headset /></el-icon>
      <span class="player-title">Music Player</span>
    </div>

    <div class="player-content">
      <div class="song-info">
        <div class="song-name">{{ currentSong[1] }}</div>
        <div class="time-info">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>

      <div class="progress-bar">
        <el-slider
            v-model="currentTime"
            :max="duration"
            @input="seek"
            :show-tooltip="false"
        />
      </div>

      <div class="controls">
        <el-button circle @click="previousSong" class="control-btn">
          <img :src="LastSong" alt="Last Song" style="width: 20px; height: 20px;" />
        </el-button>
        <el-button circle @click="togglePlay" class="control-btn">
          <el-icon :size="20"><VideoPlay v-if="!isPlaying" /><VideoPause v-else /></el-icon>
        </el-button>
        <el-button circle @click="nextSong" class="control-btn">
          <img :src="NextSong" alt="Next Song" style="width: 20px; height: 20px;" />
        </el-button>
      </div>

      <div class="volume-bars">
        <div v-for="n in 32" :key="n"
             class="volume-bar"
             :style="{
               animationDelay: `${n * 0.1}s`,
               height: isPlaying ? `${Math.random() * 100}%` : '20px',
               transition: isPlaying ? 'height 0.1s ease' : 'none'
             }">
        </div>
      </div>

      <div class="volume-control">
        <el-icon><Microphone /></el-icon>
        <el-slider
            v-model="volume"
            :max="1"
            :step="0.01"
            @input="changeVolume"
            :show-tooltip="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Headset, VideoPlay, VideoPause, Microphone } from '@element-plus/icons-vue'
import LastSong from '@/components/icons/svgicons/lastsong.svg'
import NextSong from '@/components/icons/svgicons/nextsong.svg'
import selfMusicService from '@/SelfMusicService.js'

// Props定义
const props = defineProps({
  width: {
    type: String,
    default: '320px'
  },
  height: {
    type: String,
    default: '410px'
  }
})

// 状态
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(0.5)
const isPlaying = ref(false)
const currentSong = ref(selfMusicService.getCurrentSong())

// 定义事件处理函数
const handleTimeUpdate = (time) => {
  currentTime.value = Number(time)
}

const handleDurationUpdate = (durationValue) => {
  duration.value = Number(durationValue)
}

const handlePlay = () => {
  isPlaying.value = true
}

const handlePause = () => {
  isPlaying.value = false
}

const handleVolumeChange = (volumeValue) => {
  volume.value = Number(volumeValue)
}

const handleSongChange = () => {
  currentSong.value = selfMusicService.getCurrentSong()
}

// 音量柱动画
const updateVolumeBars = () => {
  if (!isPlaying.value) return
  const bars = document.querySelectorAll('.volume-bar')
  bars.forEach(bar => {
    bar.style.height = `${Math.random() * 100}%`
  })
  requestAnimationFrame(updateVolumeBars)
}

// 控制方法
const togglePlay = () => {
  if (isPlaying.value) {
    selfMusicService.pause()
  } else {
    selfMusicService.play()
    updateVolumeBars()
  }
}

const previousSong = () => {
  selfMusicService.previousSong()
}

const nextSong = () => {
  selfMusicService.nextSong()
}

const seek = (value) => {
  selfMusicService.seek(value)
}

const changeVolume = (value) => {
  selfMusicService.setVolume(value)
}

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

// 生命周期钩子
onMounted(() => {
  // 同步当前状态
  currentTime.value = Number(selfMusicService.getCurrentTime())
  duration.value = Number(selfMusicService.getDuration())
  isPlaying.value = selfMusicService.getIsPlaying()
  volume.value = Number(selfMusicService.getVolume())

  // 监听事件
  selfMusicService.on('timeupdate', handleTimeUpdate)
  selfMusicService.on('durationupdate', handleDurationUpdate)
  selfMusicService.on('play', handlePlay)
  selfMusicService.on('pause', handlePause)
  selfMusicService.on('volumechange', handleVolumeChange)
  selfMusicService.on('songchange', handleSongChange)

  // 如果正在播放，启动音量柱动画
  if (isPlaying.value) {
    updateVolumeBars()
  }
})
</script>

<style scoped>
.music-player {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
  height: v-bind('height');
}

.music-player:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.25);
}

.player-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: white;
}

.music-icon {
  font-size: 24px;
}

.player-title {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
}

.player-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.song-info {
  text-align: center;
  color: white;
}

.song-name {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.time-info {
  font-size: 14px;
  opacity: 0.8;
}

.progress-bar {
  padding: 0 10px;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  transition: all 0.3s ease;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

.volume-bars {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 3px;
  height: 50px;
  margin: 10px 0;
  padding: 0 10px;
}

.volume-bar {
  width: 3.5px;
  background-color: white;
  border-radius: 2px;
  min-height: 2px;
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  padding: 0 10px;
  height: 32px;
}

.volume-control :deep(.el-slider) {
  margin-top: 2px;
}

:deep(.el-slider__runway) {
  background-color: var(--el-slider-main-bg-color);
  opacity: 0.5;
}

:deep(.el-slider__bar) {
  background-color: #68bbde;
  opacity: 0.5;
}

:deep(.el-slider__button) {
  position: relative;
  top: -4px;
  width: 12px;
  height: 12px;
  border: none;
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
}

:deep(.el-slider__button-wrapper) {
  width: 12px;
  height: 12px;
  top: -5px;
}
</style>
