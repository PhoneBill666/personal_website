<template>
  <div class="skills-container">
    <BackToHome :pageName="'Skills'" />
    
    <!-- 主要内容区域 -->
    <div class="main-content">
      <h1 class="page-title">My Technical Skills</h1>
      
      <div class="skills-grid">
        <!-- 编程语言 -->
        <div class="skill-section">
          <h2 class="section-title">Programming Languages</h2>
          <div class="skills-cards">
            <div v-for="skill in programmingSkills" :key="skill.name" class="skill-card" style="width: 92px;">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon"/>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- Web开发 -->
        <div class="skill-section">
          <h2 class="section-title">Web Development</h2>
          <div class="skills-cards">
            <div v-for="skill in webSkills" :key="skill.name" class="skill-card">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon"/>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- 数据库 -->
        <!-- <div class="skill-section">
          <h2 class="section-title">Database</h2>
          <div class="skills-cards">
            <div v-for="skill in databaseSkills" :key="skill.name" class="skill-card">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon"/>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div> -->

        <!-- 云服务和DevOps -->
        <div class="skill-section">
          <h2 class="section-title">Cloud & DevOps</h2>
          <div class="skills-cards">
            <div v-for="skill in cloudSkills" :key="skill.name" class="skill-card">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon"/>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <!-- 凑数 -->
        <div class="skill-section">
          <h2 class="section-title">Creative & Productivity Tools</h2>
          <div class="skills-cards">
            <div v-for="skill in creativeSkills" :key="skill.name" class="skill-card" style="width: 110px;">
              <img :src="skill.icon" :alt="skill.name" class="skill-icon"/>
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import BackToHome from '@/components/pagesHeader.vue'

// 编程语言技能
const programmingSkills = ref([
  { name: 'Python', icon: new URL('@/components/icons/svgicons/Python.svg', import.meta.url).href },
  { name: 'Java', icon: new URL('@/components/icons/svgicons/Java.svg', import.meta.url).href },
  { name: 'JavaScript', icon: new URL('@/components/icons/svgicons/JavaScript.svg', import.meta.url).href },
  // { name: 'TypeScript', icon: '/icons/typescript.svg' },
  // { name: 'C', icon: '/icons/c.svg' },
  { name: 'C++', icon: new URL('@/components/icons/svgicons/C++.svg', import.meta.url).href },
])

// Web开发技能
const webSkills = ref([
  { name: 'React', icon: new URL('@/components/icons/svgicons/React.svg', import.meta.url).href },
  { name: 'Next.js', icon: new URL('@/components/icons/svgicons/nextjs.svg', import.meta.url).href },
  { name: 'Vue.js', icon: new URL('@/components/icons/svgicons/Vue.svg', import.meta.url).href },
  { name: 'Tailwind CSS', icon: new URL('@/components/icons/svgicons/tailwindcss.svg', import.meta.url).href },
])

// // 数据库技能
// const databaseSkills = ref([
//   { name: 'PostgreSQL', icon: '/icons/postgresql.svg' },
//   { name: 'MySQL', icon: '/icons/mysql.svg' },
//   { name: 'SQLite', icon: '/icons/sqlite.svg' },
//   { name: 'Supabase', icon: '/icons/supabase.svg' },
//   { name: 'Firebase', icon: '/icons/firebase.svg' },
//   { name: 'Cloudflare D1/KV', icon: '/icons/cloudflare.svg' }
// ])

// 云服务和DevOps技能
const cloudSkills = ref([
  { name: 'Google Cloud', icon: new URL('@/components/icons/svgicons/google_cloud.svg', import.meta.url).href },
  { name: 'Alibaba Cloud', icon: new URL('@/components/icons/svgicons/Alibaba_Cloud.svg', import.meta.url).href },
  { name: 'Cloudflare', icon: new URL('@/components/icons/svgicons/Cloudflare.svg', import.meta.url).href }
])

// 凑数技能
const creativeSkills = ref([
  { name: 'Premiere Pro', icon: new URL('@/components/icons/svgicons/premierepro.svg', import.meta.url).href },
  { name: 'Photoshop', icon: new URL('@/components/icons/svgicons/photoshop.svg', import.meta.url).href },
  { name: 'Figma', icon: new URL('@/components/icons/svgicons/Figma.svg', import.meta.url).href },
  { name: 'Microsoft Office', icon: new URL('@/components/icons/svgicons/microsoftoffice.svg', import.meta.url).href }
])
</script>

<style scoped>
.skills-container {
  min-height: 100vh;
  background-color: transparent;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
}

.page-title {
  text-align: center;
  font-size: 40px;
  font-style: italic;
  font-weight: bold;
  color: #2C3E50;
  margin-bottom: 40px;
  /* background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); */
  /* background-clip: text; */
  /* -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; */
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.skill-section {
  background: rgba(255, 255, 255, 0.1);
  /* backdrop-filter: blur(10px); */
  border-radius: 20px;
  padding: 30px;
  transition: transform 0.3s ease;
}

.skill-section:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.15);
}

.section-title {
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
}

.skills-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 20px;
  justify-items: center;
}

.skill-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.1);
}

.skill-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.skill-name {
  font-size: 14px;
  color: #ffffff;
  text-align: center;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 36px;
  }

  .section-title {
    font-size: 20px;
  }

  .skills-cards {
    grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
    gap: 15px;
  }

  .skill-icon {
    width: 30px;
    height: 30px;
  }

  .skill-name {
    font-size: 12px;
  }
}
</style>