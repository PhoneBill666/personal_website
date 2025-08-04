<template>
    <pageHeader/>
    <!-- <MusicPlayer width="320px" height="380px" :songList="playlist"/> -->
    <self-music-controller/>
</template>

<script setup>
import MusicPlayer from '@/components/musicPlayer.vue'
import pageHeader from '@/components/pagesHeader.vue'
import SelfMusicController from "@/components/selfMusicController.vue";

// const playlist = [
//     ['../components/music/EKKSTACY - i walk this earth all by myself (Explicit).mp3', 'i walk this earth all by myself (Explicit)'],
//     ['../components/music/Corn Wave - dinosaurs.mp3', 'dinosaurs'],
//     ['../components/music/Corn Wave - манго нектар.mp3', 'манго нектар'],
//     ['../components/music/Где Фантом_ - Я тебя люблю.mp3', 'Я тебя люблю'],
//     ['../components/music/Corn Wave - greek sculptures (Explicit).mp3', 'greek sculptures (Explicit)'],
// ]
</script>

<style scoped>

</style>
