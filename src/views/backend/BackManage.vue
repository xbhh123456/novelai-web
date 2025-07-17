<script setup>
import { ref } from 'vue'
import {
  Menu as IconMenu,
  Setting,
  User,
  Document,
  DataAnalysis,
  Monitor,
  Tools,
  Fold,
  Expand
} from '@element-plus/icons-vue'

// 控制侧边栏折叠状态
const isCollapse = ref(false)

// 当前激活的菜单项
const activeMenu = ref('dashboard')

// 切换侧边栏折叠状态
const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

// 菜单项配置
const menuItems = [
  { index: 'dashboard', title: '仪表盘', icon: Monitor },
  { index: 'users', title: '用户管理', icon: User },
  { index: 'content', title: '内容管理', icon: Document },
  { index: 'analytics', title: '数据分析', icon: DataAnalysis },
  { index: 'tools', title: '工具箱', icon: Tools },
  { index: 'settings', title: '系统设置', icon: Setting }
]

// 处理菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
  console.log('选中菜单:', index)
}
</script>

<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: isCollapse }">
      <div class="logo">
        <h2 v-if="!isCollapse">管理后台</h2>
        <h2 v-else>后台</h2>
      </div>

      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="handleMenuSelect"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.index"
          :index="item.index"
        >
          <el-icon><component :is="item.icon" /></el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <header class="navbar">
        <div class="navbar-left">
          <el-button
            :icon="isCollapse ? Expand : Fold"
            @click="toggleSidebar"
            circle
            size="small"
          />
          <span class="page-title">{{ activeMenu === 'dashboard' ? '仪表盘' : '管理页面' }}</span>
        </div>

        <div class="navbar-right">
          <el-dropdown>
            <span class="user-info">
              <el-avatar size="small" :icon="User" />
              <span class="username">管理员</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main class="content">
        <div class="content-wrapper">
          <!-- 根据当前菜单显示不同内容 -->
          <div v-if="activeMenu === 'dashboard'" class="dashboard">
            <el-row :gutter="20">
              <el-col :span="6">
                <el-card class="stat-card">
                  <div class="stat-item">
                    <div class="stat-value">1,234</div>
                    <div class="stat-label">总用户数</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="stat-card">
                  <div class="stat-item">
                    <div class="stat-value">567</div>
                    <div class="stat-label">今日访问</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="stat-card">
                  <div class="stat-item">
                    <div class="stat-value">89</div>
                    <div class="stat-label">新增内容</div>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="6">
                <el-card class="stat-card">
                  <div class="stat-item">
                    <div class="stat-value">12</div>
                    <div class="stat-label">待处理</div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>

          <div v-else class="page-content">
            <el-card>
              <h3>{{ activeMenu }} 页面</h3>
              <p>这里是 {{ activeMenu }} 的具体内容区域</p>
            </el-card>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
}

.sidebar {
  width: 210px;
  background-color: #304156;
  transition: width 0.3s;

  &.collapsed {
    width: 64px;
  }

  .logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #2b3a4b;
    color: white;

    h2 {
      margin: 0;
      font-size: 18px;
    }
  }

  .el-menu {
    border-right: none;
    height: calc(100vh - 60px);
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.navbar {
  height: 60px;
  background: white;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 15px;

    .page-title {
      font-size: 16px;
      font-weight: 500;
      color: #303133;
    }
  }

  .navbar-right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

      .username {
        color: #606266;
      }
    }
  }
}

.content {
  flex: 1;
  overflow-y: auto;

  .content-wrapper {
    padding: 20px;
  }
}

.dashboard {
  .stat-card {
    text-align: center;

    .stat-item {
      .stat-value {
        font-size: 32px;
        font-weight: bold;
        color: #409EFF;
        margin-bottom: 8px;
      }

      .stat-label {
        color: #909399;
        font-size: 14px;
      }
    }
  }
}

.page-content {
  h3 {
    margin-top: 0;
    color: #303133;
  }

  p {
    color: #606266;
    line-height: 1.6;
  }
}
</style>

