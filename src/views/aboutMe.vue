<template>
  <div>
    <BackToHome :pageName="'About me'" />
    <!-- 这里你可以用其他页面名称替代 'About Us' -->
  </div>
  <div style="place-items: center;">
    <div style="display: flex; width: 1000px">
      <!-- 侧边栏锚点导航 -->
      <!--      <el-anchor class="fixed-anchor">-->
      <!--        <el-anchor-link href="#About-me" title="About me"></el-anchor-link>-->
      <!--        <el-anchor-link href="#section2" title="部分 2"></el-anchor-link>-->
      <!--        <el-anchor-link href="#section3" title="部分 3"></el-anchor-link>-->
      <!--      </el-anchor>-->

      <!-- 右侧内容 -->
      <div style="margin-left: 50px; padding-top: 20px">
        <h2 id="About-me" style="font-weight: bold; font-size: 25px">Quickly know me!</h2>
        <br>
        <br>
        <el-row>
          <el-card style="max-width: 220px; margin-right: 30px" class="profile-card">
            <img src="../components/images/PhoneBillCute.jpg" class="circle-image"/>
            <p class="inside-card-title">Likai Xu</p>
            <p class="inside-card-content">Undergraduate Student</p>
            <p class="inside-card-content">@ University of Auckland</p>
          </el-card>

          <el-card style="max-width: 450px; max-height: 280px; margin-right: 30px" class="profile-card">
            <p class="inside-card-title-top-left" style="color: #062c48; font-size: 23px;">Experiences:</p>
            <p class="inside-card-title-2">Software Developer Intern</p>
            <p class="inside-card-content-left" style="font-style: italic">Huaqin Technology</p>
            <p class="inside-card-content-left">Nov 2024 - Feb 2025 (4 months)</p>
            <p class="inside-card-content-left">Jiangsu, China; On-site</p>
            <p class="inside-card-content-left">Developed the Wuling Vehicle Management System and the Party Building System for the National Software Park using the Vue framework and React.js, contributing to the front-end development and ensuring efficient user interface design and functionality.</p>
          </el-card>

          <el-card style="max-width: 200px;" class="profile-card">
            <p class="inside-card-title-top-left">Tags:</p>
            <el-tag class="tag-background" style="margin-bottom: 10px; margin-top: 10px" type="primary">Frontend Development</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="success">JavaScript</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="info">Vue</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="warning">React.js</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="danger">python</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="primary">Java</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="success">C/C++</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="info">TensorFlow</el-tag>&nbsp;&nbsp;
            <el-tag class="tag-background" style="margin-bottom: 10px" type="warning">Team Working</el-tag>&nbsp;&nbsp;

          </el-card>
        </el-row>
        <br>
        <el-row>
          <el-card style="max-width: 320px; max-height: 165px; margin-right: 30px" class="profile-card">
            <p class="inside-card-title-top-left">Detail:</p>
            <p class="inside-card-content-left">Hi! I'm Likai Xu, you can also call me Bill.</p>
            <p class="inside-card-content-left">Student of The University of Auckland</p>
            <p class="inside-card-content-left">Bachelor of Science - BS, Computer Science</p>
            <p class="inside-card-content-left">Now living in Auckland, NewZealand</p>
          </el-card>

          <el-card style="max-width: 400px; max-height: 165px; margin-right: 30px" class="profile-card">
            <p class="inside-card-title-top-left">Personal character:</p>
            <p class="inside-card-content-left">Always passionate and willing to challenge myself</p>
            <p class="inside-card-content-left">Love learning new things</p>
            <p class="inside-card-content-left">Very detail-oriented, sometimes overly focused on details.</p>
            <p class="inside-card-content-left">Very considerate of others' feelings</p>
          </el-card>

          <el-card style="max-width: 180px;" class="profile-card">
            <p class="inside-card-title-top-left">Hobbies:</p>
            <p class="inside-card-content-left">Programming</p>
            <p class="inside-card-content-left">Gaming:</p>
            <p class="inside-card-content-left" style="font-style: italic">World of Warships</p>
            <p class="inside-card-content-left" style="font-style: italic">Hearts of Iron IV</p>
            <p class="inside-card-content-left" >Sports:</p>
            <p class="inside-card-content-left" style="font-style: italic">Football</p>
          </el-card>


        </el-row>
        <!--        <h2 id="section2">部分 2</h2>-->
        <!--        <p>这是第二部分的内容</p>-->
        <!--        <p>这是第二部分的内容</p>-->

        <!--        <h2 id="section3">部分 3</h2>-->
        <!--        <p>这是第三部分的内容</p>-->
      </div>
    </div>
  </div>
</template>

<script>
// import BackToHome from '@/components/pagesHeader.vue'
// export default {
//   name: 'homepage',

//   components: {
//     BackToHome,
//   }
// }
</script>

<style scoped>
.fixed-anchor {
  position: fixed;
  top: 30px; /* 距离顶部 100px */
  left: 100px; /* 距离左侧 20px */
  width: 100px; /* 设定宽度 */
  height: 300px;
  background-color: transparent;
  box-shadow: none;

}

::v-deep .el-anchor__link:hover {
  background: none !important;
}

.profile-card {
  border-radius: 15px;
  background-color: rgba(255,255,255,0.2);
  border-color: transparent;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

.profile-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.25);
}

.inside-card-title {
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}

.inside-card-title-top-left {
  font-weight: bold;
  font-size: 20px;
  color: #95c8e8;
}

.inside-card-title-2 {
  font-weight: bold;
  font-size: 17px;
  font-style: italic;
  color: #95c8e8;
}

.inside-card-content {
  font-size: 14px;
  color: #23282e;
  text-align: center;
}

.inside-card-content-left {
  font-size: 14px;
  color: white;
}

.circle-image {
  max-width: 180px;
  max-height: 180px;
  border-radius: 50%;
  object-fit: cover;
}

.tag-background {
  background-color: rgba(255,255,255,0.3);
  border-color: transparent;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  font-size: 13px;
  cursor: pointer;
}

.tag-background:hover {
  background-color: rgba(255,255,255,0.35);
}

:deep(.el-tag) {
  font-size: 13px;
}

:deep(.el-tag--primary) {
  color: #0d47a1;
}

:deep(.el-tag--success) {
  color: #1b5e20;
}

:deep(.el-tag--info) {
  color: #01579b;
}

:deep(.el-tag--warning) {
  color: #e65100;
}

:deep(.el-tag--danger) {
  color: #b71c1c;
}
</style>

<!--@media (hover: hover) {-->
<!--.fixed-anchor ::v-deep(.el-anchor__item) .el-anchor__link:hover {-->
<!--background-color: transparent !important;-->
<!--/* 如果无效尝试：background: none !important; */-->
<!--}-->
<!--}-->