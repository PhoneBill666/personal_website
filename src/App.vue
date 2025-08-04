<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import BubbleBackground from "@/components/BubbleBackground.vue";
import NewBackground from "@/components/newBackground.vue";
import { onMounted } from 'vue'

onMounted(() => {
  document.title = "LikaiXu Website"
})
</script>

<template>
<div id="app" style="background-color: transparent; height: 100vh; width: 100%;">
<!--  <div>-->
<!--    &lt;!&ndash; <BubbleBackground /> &ndash;&gt;-->
<!--    <NewBackground />-->
<!--  </div>-->
  <div v-if="$route.path === '/music'">

  </div>
  <div v-else>
    <NewBackground />
  </div>
<!--  <nav>-->
<!--    <ul>-->
<!--      <li><router-link to="/">Welcome</router-link></li>-->
<!--      <li><router-link to="/homepage">Homepage</router-link></li>-->
<!--    </ul>-->
<!--  </nav>-->
  <router-view />  <!-- 路由的显示位置 -->
</div>
</template>

<style scoped>

header {
  line-height: 1.5;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

}

</style>
