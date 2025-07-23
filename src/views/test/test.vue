<template>
  <div class="novelai-demo">
    <h2>NovelAI API 测试</h2>

    <!-- 图片生成 -->
    <div class="section">
      <h3>图片生成</h3>
      <textarea v-model="prompt" placeholder="输入提示词"></textarea>
      <button @click="handleGenerateImage" :disabled="loading">
        {{ loading ? '生成中...' : '生成图片' }}
      </button>
    </div>

    <!-- 图片处理 -->
    <div class="section">
      <h3>图片处理</h3>
      <input type="file" @change="handleFileSelect" accept="image/*">
      <div class="buttons">
        <button @click="handleLineart" :disabled="!selectedFile">线稿化</button>
        <button @click="handleSketch" :disabled="!selectedFile">草图化</button>
        <button @click="handleBackgroundRemoval" :disabled="!selectedFile">背景移除</button>
      </div>
    </div>

    <!-- 结果显示 -->
    <div v-if="resultImage" class="result">
      <h3>结果</h3>
      <img :src="resultImage" alt="Generated Image" style="max-width: 500px;">
      <br>
      <button @click="downloadImage">下载图片</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  generateImage,
  lineart,
  sketch,
  backgroundRemoval,
  checkApiStatus
} from '@/api/novelai'

const prompt = ref('masterpiece, best quality, 1girl, solo, long hair, blue eyes, white dress, forest, sunlight')
const selectedFile = ref(null)
const resultImage = ref('')
const loading = ref(false)
const resultBlob = ref(null)

// 文件选择
const handleFileSelect = (event) => {
  selectedFile.value = event.target.files[0]
}

// 生成图片
const handleGenerateImage = async () => {
  if (!prompt.value.trim()) return

  loading.value = true
  try {
    const response = await generateImage({
      prompt: prompt.value,
      model: 'v4_5',
      res: 'normal_portrait',
      steps: 28,
      scale: 6.0,
      sampler: 'euler_anc',
      params_version: 3,
      noise_schedule: 'karras',
      uc_preset: 2
    })

    resultBlob.value = response.data
    resultImage.value = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('生成图片失败:', error)
    alert('生成图片失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

// 线稿化
const handleLineart = async () => {
  if (!selectedFile.value) return

  try {
    const response = await lineart(selectedFile.value)
    resultBlob.value = response.data
    resultImage.value = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('线稿化失败:', error)
    alert('线稿化失败: ' + error.message)
  }
}

// 草图化
const handleSketch = async () => {
  if (!selectedFile.value) return

  try {
    const response = await sketch(selectedFile.value)
    resultBlob.value = response.data
    resultImage.value = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('草图化失败:', error)
  }
}

// 背景移除
const handleBackgroundRemoval = async () => {
  if (!selectedFile.value) return

  try {
    const response = await backgroundRemoval(selectedFile.value)
    resultBlob.value = response.data
    resultImage.value = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('背景移除失败:', error)
  }
}

// 下载图片
const downloadImage = () => {
  if (!resultBlob.value) return

  const url = URL.createObjectURL(resultBlob.value)
  const a = document.createElement('a')
  a.href = url
  a.download = `novelai_result_${Date.now()}.png`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.novelai-demo {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

.buttons button {
  margin-right: 10px;
  margin-bottom: 10px;
}

.result {
  text-align: center;
}
</style>
