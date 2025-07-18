import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useBgimagesStore = defineStore('background',() =>{
  const bgImages = ref([
    'src/assets/backgrounds/bg1.webp',
    'src/assets/backgrounds/bg2.webp',
    'src/assets/backgrounds/bg3.webp',
    'src/assets/backgrounds/bg4.webp',
    'src/assets/backgrounds/bg5.webp',
    'src/assets/backgrounds/bg6.webp',
    'src/assets/backgrounds/bg7.webp',
    'src/assets/backgrounds/bg8.webp',
    'src/assets/backgrounds/bg9.webp',
    'src/assets/backgrounds/bg10.webp',
    'src/assets/backgrounds/bg12.webp',
    'src/assets/backgrounds/bg13.webp',
    'src/assets/backgrounds/bg14.webp',
  ])


  return {bgImages}
}

)