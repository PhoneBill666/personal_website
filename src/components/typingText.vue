<template>
    <div class="typing-container" :style="{ maxWidth: maxWidth ? maxWidth + 'px' : 'none' }">
      <span class="typing-text">{{ displayedText }}</span>
      <span v-if="showCursor" class="cursor">|</span>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps } from 'vue';
  
  // 定义组件的 props，允许外部传入需要显示的文案数组
  const props = defineProps({
    texts: {
      type: Array,
      required: true
    },
    typingSpeed: {
      type: Number,
      default: 100
    },
    cursorBlinkSpeed: {
      type: Number,
      default: 500
    },
    delayBetweenTexts: {
      type: Number,
      default: 2000
    },
    maxWidth: {
    type: Number,
    default: 0 // 默认不限制宽度，即不换行
    }
  });
  
  const displayedText = ref(""); // 逐字显示的文本
  const showCursor = ref(true); // 控制光标显示
  const currentIndex = ref(0); // 当前显示的文案索引
  
  const typeText = async (text) => {
    for (let i = 0; i < text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, props.typingSpeed));
      displayedText.value += text[i];
    }
  
    // 显示完整文案后等待2秒，然后继续显示下一个文案
    setTimeout(() => {
      currentIndex.value = (currentIndex.value + 1) % props.texts.length; // 更新文案索引
      displayedText.value = ""; // 清空当前显示的文本
      typeText(props.texts[currentIndex.value]); // 递归调用显示下一个文案
    }, props.delayBetweenTexts);
  };
  
  // 光标闪烁效果
  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, props.cursorBlinkSpeed);
  
  onMounted(() => {
    typeText(props.texts[currentIndex.value]); // 启动文案显示
  });
  </script>
  
  <style scoped>
  .typing-container {
    font-size: 24px;
    font-weight: bold;
    font-style: italic;
    white-space: normal;
    overflow: hidden;
    border-right: 2px solid transparent;
    color: white;
  }
  
  .cursor {
    display: inline-block;
    width: 5px;
    background: white;
    animation: blink 0.8s infinite;
  }
  
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  </style>
  