<script setup>
import { User, Lock, Orange } from '@element-plus/icons-vue'
import { ref,onMounted } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import { userRequestServer } from '@/api/user'
// import { ElButton } from 'element-plus'

const LoginFrom = ref({
  username:'',
  password:'',
  token:''
})

const tokenShow = ref(false)

const tokenState = () =>{
  tokenShow.value = !tokenShow.value
  LoginFrom.value = {}
}

const rules = {
  username:[
    { required: true,message:'请输入用户名',trigger:'blur'}
  ],
  password:[
    { required:true,message:'请输入密码',trigger:'blur'},
    { pattern:/^\S{5,15}$/,message:'请输入5-15位数密码非空字符',trigger:'blur'}
  ],
  token:[
    {required:true,message:'请输入token',trigger:'blur',type:'string'}
  ]
}
//背景图片库
const bgImages =[
  'src/assets/backgrounds/bg1.png',
  'src/assets/backgrounds/bg2.png',
  'src/assets/backgrounds/bg3.png',
  'src/assets/backgrounds/bg4.png',
  'src/assets/backgrounds/bg5.png',
]
//存储随机到的背景图片
const currentBg = ref('');

// 随机选择图片
const getRandomBg = () => {
  const randomIndex = Math.floor(Math.random()  * bgImages.length);
  currentBg.value  = bgImages[randomIndex];
};

onMounted(() => {
  getRandomBg(); // 初始化随机图片
  window.addEventListener('beforeunload',  getRandomBg); // 刷新前更新
});

const form = ref()
const loginClick = async () =>{
  await form.value.validate()
  // await userRequestServer(LoginFrom.value)
}



</script>

<template>
  <el-row class="bg" :style="{ backgroundImage: `url(${currentBg})` }">
    <el-col :span="6" :offset="9" class="login">
      <!-- 添加磨砂玻璃效果层 -->
      <div class="glass-effect">
        <el-form
        ref="form"
        :model="LoginFrom"
        :rules="rules"
        size="large"
        autocomplete="off"
        class="form"
        >
          <el-form-item>
            <h1 class="title">NOVELAI Web平台</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="LoginFrom.username" :prefix-icon="User" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="LoginFrom.password" :prefix-icon="Lock" type="password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="token" v-if="tokenShow">
            <el-input v-model="LoginFrom.token" :prefix-icon="Orange" type="password" placeholder="安全令牌" show-password></el-input>
          </el-form-item>
          <el-form-item prop="token" v-else>
            <div>&nbsp;</div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login-btn" @click="loginClick">登录系统</el-button>
          </el-form-item>
          <el-form-item v-if="tokenShow">
            <el-button type="primary" class="login-btn" color="#FFE0F5" @click="tokenState">切换非token登录</el-button>
          </el-form-item>
          <el-form-item v-else>
            <el-button type="primary" class="login-btn" @click="tokenState">切换token登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  position: relative;
  overflow: hidden;


  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(10px);
    z-index: 0;
  }
}

.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: relative; /* 确保在模糊层上方 */
  z-index: 2;
}

/* 磨砂玻璃效果层 */
.glass-effect {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(12px) saturate(180%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 40px 30px;
}

.title {
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  margin-bottom: 30px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
  font-weight: bold;
  letter-spacing: 2px;
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
</style>