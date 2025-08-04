<!--<template>-->
<!--  <div class="background">-->
<!--    <canvas ref="bubbleCanvas" class="bubble-canvas"></canvas>-->
<!--    <div class="text">泡泡动态背景</div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "BubbleBackground",-->
<!--  mounted() {-->
<!--    this.initCanvas();-->
<!--  },-->
<!--  methods: {-->
<!--    initCanvas() {-->
<!--      const canvas = this.$refs.bubbleCanvas;-->
<!--      const ctx = canvas.getContext("2d");-->

<!--      canvas.width = window.innerWidth;-->
<!--      canvas.height = window.innerHeight;-->

<!--      let bubbles = [];-->
<!--      for (let i = 0; i < 50; i++) {-->
<!--        bubbles.push({-->
<!--          x: Math.random() * canvas.width,-->
<!--          y: Math.random() * canvas.height,-->
<!--          radius: Math.random() * 20 + 5,  // 泡泡大小-->
<!--          speed: Math.random() * 2 + 1,   // 上升速度-->
<!--          opacity: Math.random() * 0.5 + 0.3,  // 透明度-->
<!--          dx: Math.random() * 2 - 1,  // 左右漂移-->
<!--          dy: Math.random() * -2 - 1  // 上升速度-->
<!--        });-->
<!--      }-->

<!--      const drawBubbles = () => {-->
<!--        ctx.clearRect(0, 0, canvas.width, canvas.height);-->

<!--        bubbles.forEach(b => {-->
<!--          ctx.beginPath();-->
<!--          ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);-->
<!--          ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;-->
<!--          ctx.fill();-->

<!--          // 更新泡泡位置-->
<!--          b.x += b.dx;-->
<!--          b.y += b.dy;-->
<!--          if (b.y < -b.radius) {-->
<!--            b.y = canvas.height + b.radius;-->
<!--            b.x = Math.random() * canvas.width;-->
<!--          }-->
<!--        });-->

<!--        requestAnimationFrame(drawBubbles);-->
<!--      };-->

<!--      drawBubbles();-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.background {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  overflow: hidden;-->
<!--  background: linear-gradient(45deg, #1A237E, #8E24AA, #1976D2);-->
<!--  background-size: 400% 400%;-->
<!--  animation: gradientBG 5s ease infinite; /* 加快颜色变化 */-->
<!--}-->

<!--@keyframes gradientBG {-->
<!--  0% { background-position: 0% 50%; }-->
<!--  50% { background-position: 100% 50%; }-->
<!--  100% { background-position: 0% 50%; }-->
<!--}-->

<!--.bubble-canvas {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--}-->

<!--.text {-->
<!--  position: absolute;-->
<!--  width: 100%;-->
<!--  text-align: center;-->
<!--  top: 50%;-->
<!--  font-size: 50px;-->
<!--  color: white;-->
<!--  font-weight: bold;-->
<!--  z-index: 1;-->
<!--  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);-->
<!--}-->
<!--</style>-->
<template>
  <div class="background">
    <canvas ref="particleCanvas" class="particle-canvas"></canvas>
    <div class="text"></div>
  </div>
</template>

<script>
export default {
  name: "ParticleBackground",
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.particleCanvas;
      const ctx = canvas.getContext("2d");

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      let particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 5 + 2,  // 粒子大小
          speed: Math.random() * 2 + 0.5,  // 速度
          opacity: Math.random() * 0.8 + 0.3,  // 透明度
          directionX: Math.random() * 2 - 1,  // 水平方向速度
          directionY: Math.random() * 2 - 1,  // 垂直方向速度
          color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`  // 随机颜色
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // 更新粒子位置
          p.x += p.directionX * p.speed;
          p.y += p.directionY * p.speed;

          // 边界检测，粒子会从另一边出现
          if (p.x < 0 || p.x > canvas.width) {
            p.directionX = -p.directionX;
          }
          if (p.y < 0 || p.y > canvas.height) {
            p.directionY = -p.directionY;
          }
        });

        requestAnimationFrame(drawParticles);
      };

      drawParticles();
    }
  }
};
</script>

<style scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: linear-gradient(45deg, #1A237E, #8E24AA, #1976D2, #1a7e63, #f2f2f2);
  background-size: 400% 400%;
  animation: gradientBG 5s ease infinite;
  z-index: -1; /* 确保背景位于最底层 */
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.particle-canvas {
  position: absolute;
  width: 100%;
  height: 100%;
}

.text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  font-size: 50px;
  color: white;
  font-weight: bold;
  z-index: 1;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
}
</style>
