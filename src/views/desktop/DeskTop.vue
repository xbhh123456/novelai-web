<script setup>
import { useBgimagesStore, useNaicountstore } from '@/stores'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { ref, onMounted } from 'vue'
// import { Sunny } from '@element-plus/icons-vue'


const prompt = ref(""); //正向提示词
const Noprompt = ref(""); //反向提示词
const currentBg = ref(''); //存储随机到的背景图片
const Nai_Model = ref('nai-diffusion-4-5-full') //选择的nai模型
const nai_scale = ref(4)
const nai_steps = ref(24)
const nai_width = ref(768)
const nai_height = ref(1240)
const nai_fix = ref(1)

//背景图片库
const BgimagesStore = useBgimagesStore()
const bgImages = BgimagesStore.bgImages

//novelai点数
const Naicountstore = useNaicountstore()

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

//用户添加图片
const imgurl = ref('src/assets/test/2.png')
// const imgurl = ref(currentBg)
//添加图片后的预览
const imgurlList = ref([
  imgurl.value
])

//后台返回图片
const createImg = ref('src/assets/test/2.png')
//后台返回图片历史记录
const createImgList = ref([
  createImg.value
])

//novelai列表
const Nai_ModelList = [
  {
    value: 'nai-diffusion-4-5-full',
    label: 'nai4.5-full',
  },
  {
    value: 'nai-diffusion-4-5-curated',
    label: 'nai4.5-curated',
  },
  {
    value: 'nai-diffusion-4-full',
    label: 'nai4-full',
  },
  {
    value: 'nai-diffusion-4-curated-preview',
    label: 'nai4-preview',
  },
  {
    value: 'nai-diffusion-3',
    label: 'nai3-anime',
  },
  {
    value: 'nai-diffusion-furry-3',
    label: 'nai3-furry',
  },
]



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
              <div class="header-bar">
                <!-- Nai模型 -->
                <el-select v-model="Nai_Model" style="width: 160px;">
                  <el-option v-for="item in Nai_ModelList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                <!-- 其他扩展内容 -->
                <!-- <el-text type="primary" size="large" class="transparent-card span-Naicount">剩余点数：{{ Naicountstore.Naicount }}</el-text> -->
                <span class="transparent-card span-Naicount">剩余点数：{{ Naicountstore.NovelCount }}</span>
              </div>

              <div class="input-button"></div>
              <!-- //正向提示词 -->
              <div class="input-item">
                <el-input type="textarea" placeholder="正向提示词" v-model="prompt" :autosize="{ minRows: 3, maxRows: 4 }" />
              </div>
              <div class="input-button"></div>
              <!-- //反向提示词 -->
              <div class="input-item">
                <el-input type="textarea" placeholder="反向提示词" v-model="Noprompt"
                  :autosize="{ minRows: 3, maxRows: 4 }" />
              </div>
              <div class="transparent-tabs-container">

              </div>
              <el-tabs type="border-card" stretch="true" class="transparent-card nai_scale_table">
                <el-tab-pane label="基本参数面板">
                  <el-row>
                    <!-- 服从度 -->
                    <el-col :span="10">
                      <el-slider v-model="nai_scale" show-input class="nai_scale_slider" :max="10" :min="0.1" step="0.1"
                        title="服从度" show-input-controls="true" />
                    </el-col>
                    <!-- 步数 -->
                    <el-col :span="14">
                      <el-slider v-model="nai_steps" show-input class="nai_steps_slider" :max="30" :min="16" title="步数"
                        show-input-controls="true" />
                    </el-col>
                    <!-- 宽度 -->
                    <el-col style="display: flex; align-items: center; gap: 10px;">
                      <span style="color: #FADADD">宽度</span>
                      <el-slider v-model="nai_width" show-input class="nai_width_slider" show-input-controls="true"
                        title="宽度" :min="512" :max="1536" step="64" show-stops />
                    </el-col>
                    <!-- 高度 -->
                    <el-col style="display: flex; align-items: center; gap: 10px;">
                      <span style="color: #FFC0CB;">高度</span>
                      <el-slider v-model="nai_height" show-input class="nai_height_slider" show-input-controls="true"
                        title="高度" :min="512" :max="1536" step="64" show-stops />
                    </el-col>
                    <!-- 张数 -->
                    <el-col :span="12" style="display: flex; align-items: center; gap: 10px;">
                      <span style="color: #FFB6C1;">张数</span>
                      <el-slider v-model="nai_fix" show-input class="nai_fix_slider" show-input-controls="true"
                        title="张数" :min="1" :max="8" step="1" show-stops />
                    </el-col>


                  </el-row>

                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>

          <!-- 上传图片显示模块 -->
          <el-col :span="6" class="transparent-card">
            <div class="left-img-module">
              <el-image class="left-imgStyle" :src="imgurl" fit="contain" :preview-src-list="imgurlList"
                preview-teleported="false">
                <template #error>
                  <div></div>
                </template>
              </el-image>
            </div>
          </el-col>
          <!-- 结果图片模块 -->
          <el-col :span="6" class="transparent-card">
            <div class="right-img-module">
              <el-image class="right-imgStyle" fit="contain" :src="createImg" :preview-src-list="createImgList"
                preview-teleported="false">
                <template #error>
                  <div></div>
                </template>
              </el-image>
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
      <div class="bottom-section transparent-card" style="height:44%;">
        <p>{{ Nai_Model }}</p>
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
// 定义基础变量（便于全局调整）
$naicount-margin-base: 32px !default; // 默认基准值
$naicount-responsive-scale: 0.8 !default; // 响应式缩放系数

//背景
.bg {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover; // 关键属性：保持比例覆盖区域
  background-repeat: no-repeat; // 禁止重复平铺
  background-position: center; // 始终居中显示
  background-attachment: fixed; // 防止滚动时错位（可选）

  //伪元素
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

//模糊模板
.transparent-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

//左侧栏
.left-panel {
  height: 99vh;
  margin: 0.7vh 0;
}

//上主体
.center-container {
  height: 99vh;
  margin: 0.7vh 0;
}

//主体总控制
.top-section {
  min-height: 58vh;
}

//顶部左大主体
.sub-panel {
  padding: 10px;
}

//顶部控制栏
.header-bar {
  height: 8%;
  background: rgba(47, 71, 136, 0.15);
  border-radius: 8px;
  padding: 10px;
  // margin-bottom: 1px;
  // width: 100%;
  // min-height: 100%;
}

//提示词输入区
.input-item {
  margin-top: 30px;
  width: 99%;

  // ::v-deep .el-textarea__inner {
  //   height: 120px !important;
  //   /* 固定高度 */
  //   resize: vertical;
  //   /* 允许垂直调整 */
  //   padding: 12px 15px !important;
  //   /* 内容从左上角开始 */
  //   line-height: 1.5;
  //   /* 行高优化 */
  //   vertical-align: top;
  //   /* 文本顶部对齐 */
  // }
}

//切换模式区
.input-button {
  display: flex;
  gap: 10px;
}

//上传图片展示区
.left-img-module {
  height: 58vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 5px;
  box-sizing: border-box;
}

//上传图片显示
.left-imgStyle {
  // max-width: 100%;
  height: 100%;
  border-radius: 20px;
}

//返回图片展示区
.right-img-module {
  height: 58vh;
  display: flex;
  justify-content: center;
  align-items: center;
  // padding: 5px;
  box-sizing: border-box;
}

//返回图片显示
.right-imgStyle {
  height: 100%;
  border-radius: 20px;
}

//滑块-优先级
.nai_scale_slider {
  width: 95%;
}

//滑块-步骤
.nai_steps_slider {
  width: 100%;
}

//标签页
.nai_scale_table {
  margin-top: 2px;
  width: 99%;
  background-color: transparent;
  border: none;
}

//滑块-宽度
.nai_width_slider {
  width: 100%;
}

//滑块-高度
.nai_height_slider {
  width: 100%;
}

//滑块-张数
.nai_fix_slider {
  width: 100%;
}

//剩余点数模块
.span-Naicount {
  margin-left: $naicount-margin-base;
  margin-right: $naicount-margin-base;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-grow: 1;
  padding: 6px 24px;

  /* 优化显示效果 */
  display: inline-block;
  text-align: center;
  min-width: 100px;

  //适配手机
  @media (max-width: 768px) {
    margin-left: $naicount-margin-base * $naicount-responsive-scale;
    margin-right: $naicount-margin-base * $naicount-responsive-scale;
  }

  // 可选状态扩展
  &-compact {
    // 紧凑模式变体
    margin-left: $naicount-margin-base * 0.5;
    margin-right: $naicount-margin-base * 0.5;
  }

  &-highlight {
    // 强调模式增加间距
    margin-left: $naicount-margin-base * 1.5;
    margin-right: $naicount-margin-base * 1.5;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .glass-effect {
    background: rgba(30, 30, 30, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .title {
    color: #e0e0e0;
  }
}

@media (max-width: 992px) {
  .login {
    width: 70% !important;
    margin: 0 auto !important;
    left: 0 !important;
    transform: none !important;
  }
}

@media (max-width: 768px) {
  .login {
    width: 90% !important;
    padding: 20px !important;
  }

  .bg::before {
    filter: blur(1px); // 移动端减小模糊度
  }
}
</style>
