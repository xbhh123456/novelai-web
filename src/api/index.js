import request from '../utils/request1';

// 获取API状态
export function getApiStatus() {
  return request({
    url: '/status',
    method: 'get'
  });
}

// 图片生成
export function generateImage(data) {
  return request({
    url: '/generate',
    method: 'post',
    data
  });
}

// 线稿化
export function lineart(file) {
  const formData = new FormData();
  formData.append('image', file);
  return request({
    url: '/lineart',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 草图化
export function sketch(file) {
  const formData = new FormData();
  formData.append('image', file);
  return request({
    url: '/sketch',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 背景移除
export function backgroundRemoval(file) {
  const formData = new FormData();
  formData.append('image', file);
  return request({
    url: '/background-removal',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 去杂乱
export function declutter(file) {
  const formData = new FormData();
  formData.append('image', file);
  return request({
    url: '/declutter',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 着色
export function colorize(data) {
  const formData = new FormData();
  formData.append('file', data.file);
  if (data.prompt) {
    formData.append('prompt', data.prompt);
  }
  if (data.defry !== undefined) {
    formData.append('defry', data.defry);
  }
  return request({
    url: '/colorize',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

// 改变情绪
export function changeEmotion(data) {
  const formData = new FormData();
  formData.append('file', data.file);
  formData.append('emotion', data.emotion);
  if (data.prompt) {
    formData.append('prompt', data.prompt);
  }
  if (data.emotion_level) {
    formData.append('emotion_level', data.emotion_level);
  }
  return request({
    url: '/change-emotion',
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
