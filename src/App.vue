<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteBackground from '@/components/newBackground.vue'
import MiniPlayer from '@/components/MiniPlayer.vue'

const route = useRoute()
// The music page has its own artwork and full player.
const isMusicPage = computed(() => route.name === 'music')
</script>

<template>
  <SiteBackground v-if="!isMusicPage" />
  <router-view v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <MiniPlayer v-if="!isMusicPage" />
</template>
