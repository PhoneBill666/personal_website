<!--自用音乐播放器-->
<!--使用SelfMusicService.js作为配置文件-->
<template>
  <div class="bg-box" style="height: 100vh; width: 100%">
    <pageHeader/>
    <div style="display: flex; flex-direction: column; align-items: center; margin-top: 130px">
      <self-music-controller/>
    </div>
  </div>
</template>

<script setup>
import MusicPlayer from '@/components/musicPlayer.vue'
import pageHeader from '@/components/pagesHeader.vue'
import SelfMusicController from "@/components/selfMusicController.vue";

</script>

<style scoped>
.bg-box {
  background-image: url('@/components/background_resource/load_17.png'); /* 注意 @ 代表 src 目录 */
  background-size: cover;         /* 自动拉伸填满容器 */
  background-repeat: no-repeat;
  background-position: center;
}
</style>
