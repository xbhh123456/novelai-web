import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useNaicountstore = defineStore('User',() =>{
  const NovelCount = ref(1) //novel点数

  return {NovelCount}
})

