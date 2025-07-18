<script setup>
import { ref, onMounted } from 'vue'
import { useBgimagesStore } from '@/stores'

//背景图片库
const BgimagesStore = useBgimagesStore()
const bgImages = BgimagesStore.bgImages


//存储随机到的背景图片
const currentBg = ref('');

// 随机选择图片
const getRandomBg = () => {
  const randomIndex = Math.floor(Math.random() * bgImages.length);
  currentBg.value = bgImages[randomIndex];
};

onMounted(() => {
  getRandomBg(); // 初始化随机图片
  window.addEventListener('beforeunload', getRandomBg); // 刷新前更新
});
</script>
<template>
  <el-row class="bg" :style="{ backgroundImage: `url(${currentBg})` }">
    <slot></slot>
  </el-row>
</template>
<style lang="scss" scoped>
.bg {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover;
  /* 确保背景图片覆盖整个区域 */
  background-position: center;
  /* 确保背景图片居中 */


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(10px);
    z-index: 1;
  }
}
</style>
