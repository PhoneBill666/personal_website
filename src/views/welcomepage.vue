<template>
  <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
    <el-card shadow="always" class="profile-card" style="background-color: transparent; border-color: transparent">
      <div style="text-align: center">
        <h1 class="inside-card-style">Welcome to Likai Xu's website!</h1>
        <br>
        <a @click="goToHomePage" class="click-button">Click anywhere on the screen to learn more!</a>
      </div>
    </el-card>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { onMounted, onBeforeUnmount } from 'vue';

export default {
  setup() {
    const router = useRouter(); // 获取路由实例

    const goToHomePage = () => {
      router.push('/homepage');
    };

    // 添加事件监听器
    onMounted(() => {
      document.body.addEventListener('click', goToHomePage);
    });

    // 移除事件监听器
    onBeforeUnmount(() => {
      document.body.removeEventListener('click', goToHomePage);
    });

    return {
      goToHomePage
    };
  }
}
</script>

<style scoped>
.profile-card {
  border-radius: 20px;
  width: 800px;
  height: 200px;

}

.inside-card-style {
  font-size: 50px;
  color: white;
  font-weight: bold;
  z-index: 1;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}

.card-position {
  display: flex;
  justify-content: center;  /* 水平居中 */
  align-items: center;  /* 垂直居中 */
  height: 100vh;
}

.click-button {
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  color: gray;
  width: 100%;
  height: 100%;
  animation: fadeIn 2s infinite alternate;
  font-size: 20px;
}

/* 定义动画 */
@keyframes fadeIn {
  0% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>