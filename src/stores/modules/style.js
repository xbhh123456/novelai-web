// stores/blurStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBlurStore = defineStore('blur', () => {
  const blurValue = ref(10) // 初始模糊值

  return { blurValue }
})