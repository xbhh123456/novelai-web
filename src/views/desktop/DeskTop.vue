<script setup>
import { useBgimagesStore } from '@/stores'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ref, onMounted } from 'vue'

// const prompt = ref(""); //正向提示词
// const Noprompt = ref(""); //反向提示词
const currentBg = ref(''); //存储随机到的背景图片


//背景图片库
const BgimagesStore = useBgimagesStore()
const bgImages = BgimagesStore.bgImages

// 随机选择图片
const getRandomBg = () => {
  const randomIndex = Math.floor(Math.random() * bgImages.length);
  currentBg.value = bgImages[randomIndex];
};
//启动前图片初始化
onMounted(() => {
  getRandomBg(); // 初始化随机图片fv
  window.addEventListener('beforeunload', getRandomBg); // 刷新前更新
});

</script>

<template>
  <el-row class="bg" :style="{ backgroundImage: `url(${currentBg})` }" :gutter="20">
    <!-- 左侧区域 -->
    <el-col :span="1" class="transparent-card left-panel">
      <div class="panel-content">
        <!-- 左侧内容区域 -->
      </div>
    </el-col>

    <!-- 主区域 -->
    <el-col :span="23" class="center-container">
      <!-- 主区域左侧模块 -->
      <div class="top-section transparent-card">
        <el-row :gutter="10">
          <!-- 提示词模块 -->
          <el-col :span="12">
            <div class="sub-panel">
              <div class="header-bar">顶栏标题</div>
              <el-input class="input-item" placeholder="输入框1" />
              <el-input class="input-item" placeholder="输入框2" />
              <div class="button-group">
                <el-button type="primary">按钮1</el-button>
                <el-button type="success">按钮2</el-button>
              </div>
            </div>
          </el-col>

          <!-- 上传图片显示模块 -->
          <el-col :span="6" class="right-module">
            <div class="transparent-card">
              <el-image style="width: 95%; height:100%" :src="url" :fit="none" />
            </div>
            <!-- 右侧内容 -->
          </el-col>
        </el-row>
      </div>
      <!-- 主区域右侧模块 -->
      <div>
        <el-row :gutter="10">
          <el-col :span="6" class="transparent-card right-panel">
            <div></div>
          </el-col>
        </el-row>
      </div>

      <!-- 底部间距 -->
      <div class="spacer" style="height:1%"></div>

      <!-- 底部模块 -->
      <div class="bottom-section transparent-card" style="height:44%">
        <!-- 底部内容 -->
      </div>
    </el-col>

    <!-- 右侧区域 -->
    <!-- <el-col :span="7" class="transparent-card right-panel"> -->
    <!-- 右侧内容 -->
    <!-- <div class="transparent-card"></div>
    </el-col> -->
  </el-row>
</template>

<style lang="scss">
.bg {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover; // 关键属性：保持比例覆盖区域
  background-repeat: no-repeat; // 禁止重复平铺
  background-position: center; // 始终居中显示
  background-attachment: fixed; // 防止滚动时错位（可选）


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 0;
    background-size: cover; // 伪元素同步设置
    background-position: center;
  }
}

.transparent-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.left-panel {
  height: 99vh;
  margin: 0.7vh 0;
}

.center-container {
  height: 99vh;
  margin: 0.7vh 0;
}

.sub-panel {
  padding: 20px;
}

.header-bar {
  height: 40px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 15px;
}

.input-item {
  margin-bottom: 15px;
}

.button-group {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.top-section {
  min-height: 54%;
}
</style>
