<template>
  <div style="display: flex; justify-content: space-between; margin-bottom: 30px">
    <div class="back-to-home">
      <a @click="goBack" type="text" size="small" class="back-button">
        Back
      </a>
      <span class="page-name">&nbsp;&nbsp;/&nbsp;&nbsp;</span>
      <span class="page-name">{{ pageName }}</span>
    </div>
    <div style="margin-top: 15px;">
      <span class="page-name">{{ currentTime }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
      <!-- 显示天气图标和天气信息 -->
      <span class="page-name">
        {{ weatherInfo }}
        <el-icon v-if="weatherInfo" class="weather-icon">
          <component :is="weatherIcon" />  <!-- 动态选择图标 -->
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';  // 导入 Vue Router
import { defineProps } from 'vue';       // Composition API 的定义属性函数
import { ref, onMounted } from 'vue';    // Composition API 引入 ref 和生命周期函数
import { Sunny, Cloudy, MostlyCloudy, PartlyCloudy, Drizzling, Pouring, Moon, Lightning, Sunset, MoonNight } from '@element-plus/icons-vue'; // Use existing icons

// 定义组件属性
const props = defineProps({
  pageName: {
    type: String,
    required: true,
  },
});

// 获取 Vue Router 的实例
const router = useRouter();

// 时间和天气的响应式数据
const currentTime = ref('');
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

// 获取当前时间
const updateTime = () => {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString(); // 格式化时间为本地时间
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

// 页面挂载后开始更新时间并获取用户位置
onMounted(() => {
  updateTime();
  setInterval(updateTime, 1000); // 每秒更新时间
  getUserLocation(); // 获取用户位置并查询天气
});
</script>

<style scoped>
.back-to-home {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-top: 15px;
}

.back-button {
  font-size: 28px;
  font-style: italic;
  font-weight: bold;
  color: #6f89aa;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
}

.page-name {
  font-size: 28px;
  color: #6f89aa;
  font-style: italic;
  font-weight: bold;
}

.weather-icon {
  margin-right: 8px;
  font-size: 38px; /* Adjusted icon size */
  vertical-align: middle; /* Align icon vertically with text */
}
</style>