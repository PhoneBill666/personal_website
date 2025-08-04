<template>
    <div>
        <BackToHome :pageName="'Education'" />
    </div>
    <div style="display: flex; justify-content: left; align-items: center; height: 600px; margin-left: 200px;">
    <el-timeline style="max-width: 600px">
        <el-timeline-item timestamp="August 2023 - January 2024" placement="top">
            <el-card class="timeline-card">
                <p class="timeline-card-header">Up Education</p>
                <p>International College of The University of Auckland (UOAIC)</p>
            </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="February 2024 - Current" placement="top">
            <el-card class="timeline-card">
                <p class="timeline-card-header">The University of Auckland</p>
                <p>Bachelor of Science, Computer Science </p>
                <p>
                    Relevant Papers: 
                    <span style="font-style: italic;">
                        Principles of Programming, Introduction to Computer System, Intro to Practical Computing, Mathematics for Computer Science, 
                        Intro to Software Fundamentals, Computer Organisation, Algorithms and Data Structures, Object Oriented Software Devel
                    </span>
                </p>
            </el-card>
        </el-timeline-item>
    </el-timeline>
    </div>
</template>

<script setup>

</script>

<style scoped>
.timeline-card {
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    border-color: transparent;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    font-size: 18px;
}

.timeline-card:hover {
    background-color: rgba(255, 255, 255, 0.35);
    /* transition: background-color 0.3s ease; */
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

</style>