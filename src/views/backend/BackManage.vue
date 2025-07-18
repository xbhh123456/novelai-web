<script setup>
import { ref } from 'vue'
import {
  Menu as
    Setting,
  User,
  Document,
  DataAnalysis,
  Monitor,
  Tools,
  Fold,
  Expand,
  Bell,
  Search
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
  { index: 'dashboard', title: '数据总览', icon: Monitor },
  { index: 'users', title: '用户管理', icon: User },
  { index: 'content', title: '内容管理', icon: Document },
  { index: 'analytics', title: '数据分析', icon: DataAnalysis },
  { index: 'tools', title: '工具箱', icon: Tools },
  { index: 'settings', title: '系统设置', icon: Setting }
]

// 处理菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
}

// 统计数据
const stats = [
  { label: '今日新增', value: '2', color: '#ff6b9d', bgColor: '#fff0f6' },
  { label: '待审核内容', value: '0', color: '#ffa726', bgColor: '#fff8e1' },
  { label: '今日审核通过', value: '0', color: '#ffa726', bgColor: '#fff8e1' },
  { label: '违规内容', value: '1', color: '#ff7043', bgColor: '#fff3e0' },
  { label: '举报内容', value: '1', color: '#ff7043', bgColor: '#fff3e0' }
]
</script>

<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <aside class="sidebar" :class="{ collapsed: isCollapse }">
      <div class="logo">
        <div class="logo-icon">🐱</div>
        <h2 v-if="!isCollapse">后台管理</h2>
      </div>

      <el-menu :default-active="activeMenu" :collapse="isCollapse" :collapse-transition="false"
        @select="handleMenuSelect" background-color="transparent" text-color="#666" active-text-color="#ff6b9d"
        class="custom-menu">
        <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.index" class="menu-item">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </el-menu>
    </aside>

    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <header class="navbar">
        <div class="navbar-left">
          <el-button :icon="isCollapse ? Expand : Fold" @click="toggleSidebar" circle size="small"
            class="collapse-btn" />
          <span class="page-title">数据总览</span>
        </div>

        <div class="navbar-right">
          <el-button :icon="Search" circle size="small" class="nav-btn" />
          <el-button :icon="Bell" circle size="small" class="nav-btn" />
          <el-dropdown>
            <div class="user-info">
              <el-avatar size="small" class="user-avatar">小</el-avatar>
              <span class="username" v-if="!isCollapse">小明</span>
            </div>
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
          <!-- 仪表盘内容 -->
          <div v-if="activeMenu === 'dashboard'" class="dashboard">
            <!-- 用户信息卡片 -->
            <div class="user-card">
              <div class="user-info-section">
                <el-avatar size="large" class="user-avatar-large">小</el-avatar>
                <div class="user-details">
                  <h3>小明</h3>
                  <p>管理员账户</p>
                </div>
              </div>
              <div class="system-info">
                <div class="info-item">
                  <span class="label">CPU</span>
                  <div class="progress-wrapper">
                    <el-progress :percentage="45" :show-text="false" stroke-width="6" />
                    <span class="percentage">45%</span>
                  </div>
                </div>
                <div class="info-item">
                  <span class="label">内存</span>
                  <div class="progress-wrapper">
                    <el-progress :percentage="67" :show-text="false" stroke-width="6" color="#ffa726" />
                    <span class="percentage">67%</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 统计卡片 -->
            <div class="stats-grid">
              <div v-for="(stat, index) in stats" :key="index" class="stat-card"
                :style="{ backgroundColor: stat.bgColor }">
                <div class="stat-number" :style="{ color: stat.color }">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>

            <!-- 圆形图表区域 -->
            <div class="charts-section">
              <div class="chart-card">
                <div class="chart-placeholder">
                  <div class="chart-circle"
                    style="background: conic-gradient(#ff6b9d 0deg 180deg, #f0f0f0 180deg 360deg)">
                    <div class="chart-center">
                      <div class="chart-value">CPU使用率</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-card">
                <div class="chart-placeholder">
                  <div class="chart-circle"
                    style="background: conic-gradient(#ffa726 0deg 240deg, #f0f0f0 240deg 360deg)">
                    <div class="chart-center">
                      <div class="chart-value">内存占用</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 底部提示 -->
            <div class="bottom-tip">
              <span>当前人数较多，请耐心等待。</span>
              <div class="status-indicator">
                <span class="status-dot online"></span>
                <span class="status-dot"></span>
              </div>
            </div>
          </div>

          <div v-else class="page-content">
            <el-card class="content-card">
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
  background: linear-gradient(135deg, #ffeef8 0%, #f8f0ff 100%);
}

.sidebar {
  width: 240px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 107, 157, 0.1);
  transition: width 0.3s;

  &.collapsed {
    width: 64px;
  }

  .logo {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    border-bottom: 1px solid rgba(255, 107, 157, 0.1);

    .logo-icon {
      font-size: 24px;
    }

    h2 {
      margin: 0;
      font-size: 20px;
      color: #ff6b9d;
      font-weight: 600;
    }
  }

  .custom-menu {
    border-right: none;
    padding: 10px;

    .menu-item {
      margin: 5px 0;
      border-radius: 12px;
      transition: all 0.3s;

      &:hover {
        background: rgba(255, 107, 157, 0.1) !important;
      }

      &.is-active {
        background: rgba(255, 107, 157, 0.15) !important;
        color: #ff6b9d !important;
      }
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.navbar {
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 107, 157, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 20px;

    .collapse-btn {
      background: rgba(255, 107, 157, 0.1);
      border: none;
      color: #ff6b9d;
    }

    .page-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 15px;

    .nav-btn {
      background: rgba(255, 107, 157, 0.1);
      border: none;
      color: #ff6b9d;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;
      cursor: pointer;
      padding: 8px 15px;
      border-radius: 20px;
      background: rgba(255, 107, 157, 0.1);

      .user-avatar {
        background: #ff6b9d;
        color: white;
      }

      .username {
        color: #ff6b9d;
        font-weight: 500;
      }
    }
  }
}

.content {
  flex: 1;
  overflow-y: auto;

  .content-wrapper {
    padding: 30px;
  }
}

.dashboard {
  .user-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);

    .user-info-section {
      display: flex;
      align-items: center;
      gap: 20px;

      .user-avatar-large {
        background: #ff6b9d;
        color: white;
        font-size: 24px;
      }

      .user-details {
        h3 {
          margin: 0 0 5px 0;
          color: #333;
          font-size: 20px;
        }

        p {
          margin: 0;
          color: #666;
        }
      }
    }

    .system-info {
      display: flex;
      flex-direction: column;
      gap: 15px;
      min-width: 200px;

      .info-item {
        display: flex;
        align-items: center;
        gap: 15px;

        .label {
          width: 40px;
          color: #666;
          font-size: 14px;
        }

        .progress-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          gap: 10px;

          .percentage {
            color: #666;
            font-size: 14px;
            min-width: 35px;
          }
        }
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 20px;
    margin-bottom: 30px;

    .stat-card {
      padding: 25px 20px;
      border-radius: 16px;
      text-align: center;
      transition: transform 0.3s;

      &:hover {
        transform: translateY(-5px);
      }

      .stat-number {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      .stat-label {
        color: #666;
        font-size: 14px;
      }
    }
  }

  .charts-section {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;

    .chart-card {
      flex: 1;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      border-radius: 20px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);

      .chart-circle {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        .chart-center {
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          .chart-value {
            font-size: 12px;
            color: #666;
            text-align: center;
          }
        }
      }
    }
  }

  .bottom-tip {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 20px;
    text-align: center;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
    box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);

    .status-indicator {
      display: flex;
      gap: 8px;

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ddd;

        &.online {
          background: #4caf50;
          animation: pulse 2s infinite;
        }
      }
    }
  }
}

.page-content {
  .content-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(255, 107, 157, 0.1);
    border: none;

    h3 {
      margin-top: 0;
      color: #333;
    }

    p {
      color: #666;
      line-height: 1.6;
    }
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

// Element Plus 样式覆盖
:deep(.el-progress-bar__outer) {
  background-color: rgba(0, 0, 0, 0.1);
}

:deep(.el-progress-bar__inner) {
  border-radius: 3px;
}
</style>
