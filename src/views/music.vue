<!--自用音乐播放器-->
<!--使用SelfMusicService.js作为配置文件-->
<template>
  <pageHeader/>
  <div style="display: flex; flex-direction: column; align-items: center; margin-top: 130px">
    <self-music-controller/>
  </div>
</template>

<script setup>
import MusicPlayer from '@/components/musicPlayer.vue'
import pageHeader from '@/components/pagesHeader.vue'
import SelfMusicController from "@/components/selfMusicController.vue";

</script>

<style scoped>

</style>
