import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useBgimagesStore = defineStore('background',() =>{
  const bgImages = ref([
    'src/assets/backgrounds/bg1.png',
    'src/assets/backgrounds/bg2.png',
    'src/assets/backgrounds/bg3.png',
    'src/assets/backgrounds/bg4.png',
    'src/assets/backgrounds/bg5.png',
    'src/assets/backgrounds/bg6.png',
    'src/assets/backgrounds/bg7.png',
    'src/assets/backgrounds/bg8.png',
    'src/assets/backgrounds/bg9.png',
    'src/assets/backgrounds/bg10.png',
    'src/assets/backgrounds/bg12.png',
    'src/assets/backgrounds/bg13.png',
    'src/assets/backgrounds/bg14.png',
  ])


  return {bgImages}
}

)