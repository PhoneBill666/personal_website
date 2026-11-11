<template>
    <div>
        <BackToHome :pageName="'Experience'" />
    </div>
    <div class="timeline-container">
    <el-timeline style="max-width: 600px; width: 100%;">
        <el-timeline-item timestamp="November 2025 - February 2026" placement="top">
            <el-card class="timeline-card">
                <p class="timeline-card-header">NTT DATA</p>
                <p>Software Developer Intern • Onsite</p>
                <p>Wuxi, China</p>
                <ul style="font-style: italic; padding-left: 20px; margin-top: 8px;">
                    <li>Developed an internal invoice query system based on OCR results using Vue 3 and Spring Boot</li>
                    <li>Implemented multi-condition search and pagination features based on dynamic SQL queries using JdbcTemplate and PostgreSQL</li>
                    <li>Built detail view pages aggregating data from multiple tables, including OCR results, invoice fields, and order information</li>
                    <li>Implemented authentication flow using Redis-based token storage, combined with frontend route guards and backend interceptors</li>
                    <li>Added CSV export functionality and search condition caching to improve usability for internal users</li>
                </ul>
            </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="November 2024 - February 2025" placement="top">
            <el-card class="timeline-card">
                <p class="timeline-card-header">Huaqin Technology</p>
                <p>Software Engineer Intern • Onsite</p>
                <p>Wuxi, Jiangsu, China</p>
                <ul style="font-style: italic; padding-left: 20px; margin-top: 8px;">
                    <li>Used Vue.js framework to participate in the development of Wuling Automobile machine management system and the Party building management system of National Software Park</li>
                    <li>Accumulated practical experience in front-end technology and cross-functional collaboration in the IT industry</li>
                </ul>
            </el-card>
        </el-timeline-item>
    </el-timeline>
    </div>
</template>

<script setup>

</script>

<style scoped>
.timeline-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    min-height: 400px;
    padding: 20px;
    padding-left: clamp(20px, 10vw, 200px);
}

.timeline-card {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    border-color: transparent;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-size: 18px;
}

.timeline-card:hover {
    background-color: rgba(255, 255, 255, 0.35);
    transition: all 0.3s ease;
    transform: translateX(5px);
}

.timeline-card-header {
    font-size: 20px;
    font-weight: bold;
}

:deep(.el-timeline-item__timestamp) {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    font-style: italic;
}

.time-style {
    font-size: 18px;
    font-weight: bold;
}

@media (max-width: 768px) {
    .timeline-container {
        padding-left: 15px;
        padding-right: 15px;
    }

    .timeline-card {
        font-size: 15px;
    }

    .timeline-card-header {
        font-size: 18px;
    }

    :deep(.el-timeline-item__timestamp) {
        font-size: 14px;
    }
}
</style>
