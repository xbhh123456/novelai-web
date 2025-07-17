<script setup>
import { User, Lock, Orange } from '@element-plus/icons-vue'
import { ref } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import BaG from '@/components/Background.vue'
// import { userRequestServer } from '@/api/user'
// import { ElButton } = 'element-plus'



const LoginFrom = ref({
  username: '',
  password: '',
  token: ''
})

const tokenShow = ref(false)

const tokenState = () => {
  tokenShow.value = !tokenShow.value
  LoginFrom.value = {}
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{5,15}$/, message: '请输入5-15位数密码非空字符', trigger: 'blur' }
  ],
  token: [
    { required: true, message: '请输入token', trigger: 'blur', type: 'string' }
  ]
}


const form = ref()
const loginClick = async () => {
  await form.value.validate()
  // await userRequestServer(LoginFrom.value)
}



</script>

<template>
  <BaG>
    <el-col :span="6" :offset="9" class="login">
      <!-- 添加磨砂玻璃效果层 -->
      <div class="glass-effect">
        <el-form ref="form" :model="LoginFrom" :rules="rules" size="large" autocomplete="off" class="form">
          <el-form-item>
            <h1 class="title">NOVELAI Web平台</h1>
          </el-form-item>
          <el-form-item prop="username">
            <el-input v-model="LoginFrom.username" :prefix-icon="User" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="LoginFrom.password" :prefix-icon="Lock" type="password" placeholder="密码"
              show-password></el-input>
          </el-form-item>
          <el-form-item prop="token" v-if="tokenShow">
            <el-input v-model="LoginFrom.token" :prefix-icon="Orange" type="password" placeholder="安全令牌"
              show-password></el-input>
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
  </BaG>
</template>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  position: relative;
  /* 确保在模糊层上方 */
  z-index: 2;
}

/* 磨砂玻璃效果层 */


.title {
  text-align: center;
  color: #fff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
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
