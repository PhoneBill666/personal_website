<!--自用音乐播放器-->
<!--使用SelfMusicService.js作为配置文件-->
<template>
  <div class="bg-box" style="min-height: 100vh; width: 100%">
    <pageHeader page-name="Music"/>
    <div style="display: flex; flex-direction: column; align-items: center; padding: 80px 15px 30px;">
      <self-music-controller/>
    </div>
  </div>
</template>

<script setup>
// Element Plus is only used on this page, so its styles load with this route.
import 'element-plus/theme-chalk/base.css'
import 'element-plus/theme-chalk/el-button.css'
import 'element-plus/theme-chalk/el-icon.css'
import 'element-plus/theme-chalk/el-slider.css'
import 'element-plus/theme-chalk/el-tooltip.css'
import 'element-plus/theme-chalk/el-popper.css'
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
