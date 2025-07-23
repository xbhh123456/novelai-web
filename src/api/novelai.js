import request from '@/utils/request';

//检查api状态
export function checkApiStatus(){
  return request({
    url:'/',
    method:'get'
  })
}

//图片生成
export function generateImage(data){
  return request({
    url:'/generate-image/',
    method:'post',
    data,
    responseType: 'blob'
  })
}

//线稿化
export function lineart(file){
  const formData = new FormData();
  formData.append('file',file)

  return request({
    url:'/lineart',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}

// 草图
export function sketch(file){
  const formData = new FormData()
  formData.append('file',file)

  return request({
    url:'/sketch',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}

// 背景去除
export function backgroundRemoval(file){
  const formData = new FormData()
  formData.append('file',file)

  return request({
    url:'/background-removal',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}
// 去杂化
export function declutter(file){
  const formData = new FormData()
  formData.append('file',file)

  return request({
    url:'/declutter',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}

// 上色
export function colorize(file,prompt,defry=0){
  const formData = new FormData()
  formData.append('file',file)
  formData.append('prompt',prompt)
  formData.append('defry',defry)

  return request({
    url:'/colorize',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}

// 改变表情
export function changeEmotion(file,emotion,prompt,emotion_level){
  const formData = new FormData()
  formData.append('file',file)
  formData.append('emotion',emotion)
  formData.append('prompt',prompt)
  formData.append('emotion_level',emotion_level)

  return request({
    url:'/change-emotion',
    method:'post',
    data:formData,
    headers:{
      'Content-Type':'multipart/form-data'
    },
    responseType: 'blob'
  })
}
