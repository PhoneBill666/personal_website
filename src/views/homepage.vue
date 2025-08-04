<template>
  <div class="homepage-container">
    <!-- 顶部导航栏 -->
    <el-menu
      mode="horizontal"
      :router="true"
      class="nav-menu"
      background-color="transparent"
      text-color="#000000"
      active-text-color="#000000"
    >
      <el-menu-item index="/aboutme">About me</el-menu-item>
      <el-menu-item index="/experience">Experience</el-menu-item>
      <el-menu-item index="/education">Education</el-menu-item>
      <el-menu-item index="/skills">Skills</el-menu-item>
      <el-menu-item index="/contact">Contact</el-menu-item>
      <el-menu-item index="/other">Other</el-menu-item>
    </el-menu>

    <!-- 主要内容区域 -->
    <div class="main-content">
      <!-- 个人信息区域 -->
      <!-- 左侧 -->
      <div style="width: 600px; margin-top: 200px;">
        <div style="display: flex;">
            <img src="../components/images/PhoneBillCute.jpg" alt="PhoneBill" class="PhoneBill" />&nbsp;&nbsp;&nbsp;&nbsp;
            <div class="site-title">LikaiXu'Website</div>
        </div>
        <br>
        <div>
          <div style="width: 320px; height: 100px;" class="quote-container">
              <div style="margin-bottom: 10px; font-size: 20px; font-style: italic;" class="gradient-text1">" Per aspera ad astra "</div>
              <div style="text-align: right; font-size: 18px; font-style: italic;" class="gradient-text2">循此苦旅，以达繁星</div>
          </div>
        </div>
        <br>
        <div style="cursor: pointer;">
          <img src="../components/icons/svgicons/github.svg" style="width: 25px; height: 25px;" @click="goToGithub">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <img src="../components/icons/svgicons/linkedin.svg" style="width: 25px; height: 25px; color: black;" @click="goToLinkedin">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-icon style="font-size: 25px;" @click="handleMessage"><Message /></el-icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <el-icon style="font-size: 25px;" @click="shareWebsite"><Share /></el-icon>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
      <!-- 右侧 -->
      <div style="width: 600px; margin-top: 80px;">

        <div style="display: flex;">
          <div class="profile-section">
            <div class="quote-container" style="width: 320px; height: 200px;">
              <div>
                <TypingText :texts="myTexts" :typingSpeed="150" :cursorBlinkSpeed="600" :delayBetweenTexts="2500" :maxWidth="310"/>
              </div>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <!-- 时间天气区域 -->
          <div class="info-section">
            <div class="datetime-weather" style="width: 320px; height: 200px;">
              <div>
                <!-- 月，日，年 -->
                <p>{{ formattedDate }}</p>
                <p class="page-name">{{ currentTime }}</p>
                <br>
                <!-- 显示天气图标和天气信息 -->
                <p class="page-name">
                  {{ weatherInfo }}
                  <el-icon v-if="weatherInfo" class="weather-icon">
                    <component :is="weatherIcon" />  <!-- 动态选择图标 -->
                  </el-icon>
                </p>
              </div>
            </div>
          </div>
        </div>
        <br>
        <br>
        <br>
        <!-- 导航卡片区域 -->
        <div class="nav-cards">
          <div class="nav-section">
            <h3 style="font-size: 30px; font-weight: bold; font-style: italic;">Tools</h3>
            <div class="card-grid" style="display: flex;">
              <div style="display: block;">
                <div class="quote-container" style="width: 320px; height: 185px; margin-bottom: 40px; display: flex; align-items: center; justify-content: center;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="../components/icons/svgicons/develop.svg" style="width: 25px; height: 25px;"  >
                    <span>开发中</span>
                  </div>
                </div>
                <div class="quote-container" style="width: 320px; height: 185px; display: flex; align-items: center; justify-content: center;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <img src="../components/icons/svgicons/develop.svg" style="width: 25px; height: 25px;"  >
                    <span>开发中</span>
                  </div>
                </div>
              </div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <div>
                <MusicController1/>
              </div>
              <!-- <el-card v-for="item in navItems" :key="item.title" class="nav-card" @click="handleNavigation(item.link)">
                <div class="card-content">
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </div>
              </el-card> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { Message, Share } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router';  // 导入 Vue Router
import { defineProps } from 'vue';       // Composition API 的定义属性函数
import { Sunny, Cloudy, MostlyCloudy, PartlyCloudy, Drizzling, Pouring, Moon, Lightning, Sunset, MoonNight } from '@element-plus/icons-vue';
import TypingText from '@/components/typingText.vue';
import { ElMessage, ElMessageBox } from 'element-plus'

const myTexts = [
  "Don't put off till tomorrow what should be done today.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts."
];
const router = useRouter()
const activeIndex = ref('/about-me')
const currentTime = ref('')
// const currentDate = ref('')
const currentDate = ref(new Date());

const formattedDate = computed(() => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    weekday: "long",
    year: "numeric",
  }).format(currentDate.value);
});



// const updateDateTime = () => {
//   const now = new Date()
//   currentTime.value = now.toLocaleTimeString('zh-CN', {
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     hour12: false
//   })
//   currentDate.value = now.toLocaleDateString('zh-CN', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     weekday: 'long'
//   })
// }

// 获取当前时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString(); // 格式化时间为本地时间
};

onMounted(() => {
  updateTime()
  const timer = setInterval(updateTime, 1000)
  
  onUnmounted(() => {
    clearInterval(timer)
  })
})

const handleNavigation = (link) => {
  router.push(link)
}

// 时间和天气的响应式数据
// const currentTime = ref('');
const weatherInfo = ref('');
const weatherIcon = ref(Sunny); // 默认使用 Sunny 图标

// 获取当前小时
const getCurrentHour = () => {
  const date = new Date();
  return date.getHours();
};

// 根据时间获取合适的图标
const getTimeBasedIcon = () => {
  const hour = getCurrentHour();

  // 日间: 6 AM - 6 PM
  if (hour >= 6 && hour < 18) {
    return Sunny; // 白天使用 Sunny 图标
  }

  // 傍晚: 6 PM - 7 PM
  if (hour >= 18 && hour < 19) {
    return Sunset; // 傍晚使用 Sunset 图标
  }

  // 夜间: 7 PM - 6 AM
  if (hour >= 19 || hour < 6) {
    return MoonNight; // 夜间使用 MoonNight 图标
  }

  return Sunny; // 默认使用 Sunny 图标
};

// 城市经纬度
const cityCoordinates = ref({ latitude: null, longitude: null });

// 方法：跳转回首页
const goBack = () => {
  router.push('/homepage'); // 这里假设你的首页路由是 '/'
};



// 获取天气图标
const getWeatherIcon = (weatherCode) => {
  // 根据 Open-Meteo API 的 weathercode 映射选择图标
  const iconMap = {
    0: Sunny,            // 晴天
    1: Cloudy,           // 多云
    2: MostlyCloudy,     // 少云
    3: PartlyCloudy,     // 部分多云
    45: Cloudy,          // 大雾（用 Cloudy 替代 Foggy）
    51: Drizzling,       // 小雨
    53: Drizzling,       // 中雨
    55: Pouring,         // 大雨
    61: Drizzling,       // 小雨
    63: Drizzling,       // 中雨
    65: Pouring,         // 大雨
    71: Drizzling,       // 小雪
    73: Drizzling,       // 中雪
    75: Pouring,         // 大雪
    77: Drizzling,       // 雪粒
    80: Pouring,         // 小雨阵
    81: Pouring,         // 中雨阵
    82: Pouring,         // 大雨阵
    95: Lightning,       // 雷暴
    96: Lightning,       // 雷暴伴有冰雹
    99: Lightning,       // 强雷暴伴有冰雹
    100: MoonNight,      // 夜晚（用 MoonNight 替代 Moon）
    101: Sunset,         // 日落
  };

  if (weatherCode === 0 || weatherCode === 1) {
    return getTimeBasedIcon();
  }
  return iconMap[weatherCode] || getTimeBasedIcon(); // 默认图标
};

// 获取天气信息
const getWeather = async () => {
  if (!cityCoordinates.value.latitude || !cityCoordinates.value.longitude) {
    weatherInfo.value = '无法获取天气数据';
    return;
  }

  const { latitude, longitude } = cityCoordinates.value;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.current_weather.temperature; // 当前温度
    const weatherCode = data.current_weather.weathercode; // 天气代码

    // 更新天气信息和图标
    weatherInfo.value = `Weather: ${temp}°C`;
    weatherIcon.value = getWeatherIcon(weatherCode); // 根据天气代码获取图标
  } catch (error) {
    weatherInfo.value = '天气获取失败';
  }
};

// 获取用户的地理位置
const getUserLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          cityCoordinates.value = { latitude, longitude }; // 保存经纬度
          getWeather(); // 获取天气信息
        },
        (error) => {
          console.error('获取地理位置失败', error);
          weatherInfo.value = '无法获取用户位置';
        }
    );
  } else {
    weatherInfo.value = '浏览器不支持地理位置服务';
  }
};

// 跳转至Github
const goToGithub = () => {
  window.open('https://github.com/PhoneBill666', '_blank');
};

// 跳转至Linkedin
const goToLinkedin = () => {
  window.open('https://www.linkedin.com/in/likai-xu/', '_blank')
};

//邮箱
const handleMessage = () => {
  window.open('mailto:likaixu.official@gmail.com', '_blank')
};

// 分享网站
const shareWebsite = () => {
  const textToCopy = 'https://likaixu.com/';
  navigator.clipboard.writeText(textToCopy).then(() => {
    ElMessage.success("Link has been copied to the clipboard.");
  }).catch(() => {
    ElMessage.error("Copy failed, please copy manually.");
  });
};

// 页面挂载后开始更新时间并获取用户位置
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000); // 每秒更新时间
  getUserLocation(); // 获取用户位置并查询天气
});
</script>

<style scoped>
.homepage-container {
  min-height: 100vh;
  background-color: transparent;
}

.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent !important;
  border-bottom: none !important;
  margin-top: 17px;
  height: 45px;
  display: flex;
  justify-content: center;
}

:deep(.el-menu) {
  background-color: transparent !important;
  border-bottom: none !important;
  height: 45px;
}

:deep(.el-menu-item) {
  font-size: 28px;
  font-weight: bold;
  font-style: italic;
  background-color: transparent !important;
  color: #6f89aa !important;
  height: 45px;
  line-height: 45px;
  padding: 0 20px;
}

:deep(.el-menu-item.is-active) {
  color: #000000 !important;
  border-bottom-color: #000000 !important;
}

:deep(.el-menu-item:hover) {
  background-color: transparent !important;
}

.main-content {
  padding-top: 80px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}


.PhoneBill {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.site-title {
  font-size: 50px;
  font-weight: bold;
  font-style: italic;
  color: #ffffff;
}

.quote-container {
  background: rgba(255, 255, 255, 0.2);
  /* backdrop-filter: blur(10px); */
  padding: 20px;
  border-radius: 15px;
  /* text-align: center; */
  /* max-width: 600px; */
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
  transition: transform 0.3s ease;
}

.quote-container:hover {
  background: rgba(255, 255, 255, 0.3);
  /* transition: all 0.3s ease; */
  transform: translateY(-5px);
}

.quote-text {
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 10px;
}

.quote-author {
  text-align: right;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
}

.info-section {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.datetime-weather {
  background: rgba(255, 255, 255, 0.2);
  /* backdrop-filter: blur(10px); */
  padding: 20px;
  border-radius: 15px;
  font-size: 20px;
  color: white;
  font-style: italic;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.datetime-weather:hover {
  background: rgba(255, 255, 255, 0.3);
  /* transition: all 0.3s ease; */
  transform: translateY(-5px);
}

.time {
  font-size: 48px;
  font-weight: bold;
  color: #ffffff;
}

.date, .weather {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
}


.nav-section h3 {
  color: #ffffff;
  margin-bottom: 10px;
  font-size: 20px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* gap: 20px; */
  
}

.nav-card {
  background: rgba(255, 255, 255, 0.2) !important;
  /* backdrop-filter: blur(10px); */
  border: none !important;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px;
  color: #ffffff;
}

.card-content i {
  font-size: 24px;
}

:deep(.el-card) {
  border: none;
  background-color: transparent;
  color: #ffffff;
}

@media (max-width: 768px) {
  .main-content {
    padding: 60px 20px;
  }

  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .time {
    font-size: 36px;
  }
}

.gradient-text1 {
  font-weight: bold;
  background: linear-gradient(135deg, #4879a4 0%, #716dbb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.gradient-text2 {
  background: linear-gradient(135deg, #716dbb 0%, #9961d1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* #716dbb */
</style>