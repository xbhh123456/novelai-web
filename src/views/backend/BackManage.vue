<script setup>
import { ref, onMounted } from 'vue'
import { useBgimagesStore } from '@/stores'
import {
  Menu as Setting,
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

// 背景图片相关
const BgimagesStore = useBgimagesStore()
const bgImages = BgimagesStore.bgImages
const currentBg = ref('')

// 随机选择图片
const getRandomBg = () => {
  const randomIndex = Math.floor(Math.random() * bgImages.length)
  currentBg.value = bgImages[randomIndex]
}

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
  { index: 'dashboard', title: '数据总览', icon: DataAnalysis },
  { index: 'users', title: '用户中心', icon: User },
  { index: 'content', title: '内容管理', icon: Document },
  { index: 'monitor', title: '系统监控', icon: Monitor },
  { index: 'tools', title: '工具箱', icon: Tools },
  { index: 'settings', title: '系统设置', icon: Setting }
]

// 处理菜单选择
const handleMenuSelect = (index) => {
  activeMenu.value = index
}

// 统计数据
const stats = [
  { label: '今日注册', value: '2', color: '#ff6b9d', bgColor: 'rgba(255, 107, 157, 0.1)' },
  { label: '当前在线用户', value: '0', color: '#4fc3f7', bgColor: 'rgba(79, 195, 247, 0.1)' },
  { label: '今日上传图片', value: '0', color: '#66bb6a', bgColor: 'rgba(102, 187, 106, 0.1)' },
  { label: '待处理任务', value: '1', color: '#ffa726', bgColor: 'rgba(255, 167, 38, 0.1)' },
  { label: '生成图片', value: '1', color: '#ab47bc', bgColor: 'rgba(171, 71, 188, 0.1)' }
]

onMounted(() => {
  getRandomBg()
})
</script>

<template>
  <div class="admin-layout bg" :style="{ backgroundImage: `url(${currentBg})` }">
    <!-- 侧边栏 -->
    <aside class="sidebar transparent-card" :class="{ collapsed: isCollapse }">
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
      <header class="navbar transparent-card">
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
            <div class="user-card transparent-card">
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
              <div v-for="(stat, index) in stats" :key="index" class="stat-card transparent-card"
                :style="{ backgroundColor: stat.bgColor }">
                <div class="stat-number" :style="{ color: stat.color }">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>

            <!-- 圆形图表区域 -->
            <div class="charts-section">
              <div class="chart-card transparent-card">
                <div class="chart-placeholder">
                  <div class="chart-circle"
                    style="background: conic-gradient(#ff6b9d 0deg 180deg, #f0f0f0 180deg 360deg)">
                    <div class="chart-center">
                      <div class="chart-value">CPU使用率</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="chart-card transparent-card">
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
            <div class="bottom-tip transparent-card">
              <span>当前人数较多，请耐心等待。</span>
              <div class="status-indicator">
                <span class="status-dot online"></span>
                <span class="status-dot"></span>
              </div>
            </div>
          </div>

          <div v-else class="page-content">
            <el-card class="content-card transparent-card">
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
.bg {
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: inherit;
    filter: blur(2px);
    z-index: 0;
    background-size: cover;
    background-position: center;
  }
}

.transparent-card {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
}

.admin-layout {
  display: flex;
  height: 100vh;
  padding: 8px;
  gap: 8px;
}

.sidebar {
  width: 260px;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);

  &.collapsed {
    width: 80px;
  }

  .logo {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 0 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 10px;

    .logo-icon {
      font-size: 28px;
      background: linear-gradient(135deg, #ff6b9d, #4fc3f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
    }

    h2 {
      margin: 0;
      font-size: 22px;
      background: linear-gradient(135deg, #fff, #e3f2fd);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }

  .custom-menu {
    border-right: none;
    padding: 0 16px 16px;
    background: transparent;

    .menu-item {
      margin: 8px 0;
      border-radius: 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      color: rgba(255, 255, 255, 0.85);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
        transition: left 0.5s;
      }

      &:hover {
        background: rgba(255, 255, 255, 0.18) !important;
        color: #fff !important;
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        &::before {
          left: 100%;
        }
      }

      &.is-active {
        background: linear-gradient(135deg, rgba(255, 107, 157, 0.2), rgba(79, 195, 247, 0.2)) !important;
        color: #fff !important;
        box-shadow: 0 6px 20px rgba(255, 107, 157, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}

.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  border-radius: 20px;
  overflow: hidden;
}

.navbar {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  margin-bottom: 8px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  .navbar-left {
    display: flex;
    align-items: center;
    gap: 24px;

    .collapse-btn {
      background: rgba(255, 255, 255, 0.95);
      border: none;
      color: #666;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #fff;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }

    .page-title {
      font-size: 20px;
      font-weight: 700;
      background: linear-gradient(135deg, #333, #666);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: 0.5px;
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .nav-btn {
      background: rgba(255, 255, 255, 0.95);
      border: none;
      color: #666;
      width: 44px;
      height: 44px;
      border-radius: 12px;
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #fff;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      padding: 12px 20px;
      border-radius: 24px;
      background: rgba(255, 255, 255, 0.95);
      transition: all 0.3s;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

      &:hover {
        background: #fff;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
      }

      .user-avatar {
        background: linear-gradient(135deg, #ff6b9d, #4fc3f7);
        color: #fff;
        font-weight: 600;
      }

      .username {
        color: #333;
        font-weight: 600;
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
    padding: 32px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

    .user-info-section {
      .user-avatar-large {
        background: linear-gradient(135deg, #ff6b9d, #4fc3f7);
        color: #fff;
        font-size: 24px;
        font-weight: 600;
        box-shadow: 0 8px 24px rgba(255, 107, 157, 0.3);
      }

      .user-details {
        h3 {
          background: linear-gradient(135deg, #333, #666);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 24px;
          font-weight: 700;
        }
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 16px;
    margin-bottom: 24px;

    .stat-card {
      padding: 24px 20px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--card-color, #ff6b9d), transparent);
      }

      &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 16px 48px rgba(0, 0, 0, 0.2);
      }

      .stat-number {
        font-size: 36px;
        font-weight: 800;
        margin-bottom: 8px;
        background: linear-gradient(135deg, var(--card-color, #ff6b9d), #333);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .stat-label {
        color: #666;
        font-size: 14px;
        font-weight: 500;
      }
    }
  }

  .charts-section {
    display: flex;
    gap: 24px;
    margin-bottom: 24px;

    .chart-card {
      flex: 1;
      padding: 32px;
      text-align: center;
      background: rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(20px) saturate(180%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.1);

      .chart-circle {
        width: 140px;
        height: 140px;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

        .chart-center {
          width: 90px;
          height: 90px;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.1);

          .chart-value {
            font-size: 13px;
            color: #666;
            font-weight: 600;
            text-align: center;
          }
        }
      }
    }
  }

  .bottom-tip {
    padding: 24px;
    text-align: center;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    font-weight: 500;

    .status-indicator {
      display: flex;
      gap: 8px;

      .status-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #ddd;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

        &.online {
          background: linear-gradient(135deg, #4caf50, #66bb6a);
          animation: pulse 2s infinite;
          box-shadow: 0 0 12px rgba(76, 175, 80, 0.5);
        }
      }
    }
  }
}

.page-content {
  .content-card {
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

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .sidebar {
    background: rgba(30, 30, 30, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .transparent-card {
    background: rgba(30, 30, 30, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}

:deep(.el-progress-bar__outer) {
  background-color: rgba(0, 0, 0, 0.1);
}

:deep(.el-progress-bar__inner) {
  border-radius: 3px;
}

:deep(.el-menu) {
  background-color: transparent !important;
}

:deep(.el-menu-item) {
  background-color: transparent !important;
}

// 添加CSS变量支持
.stat-card:nth-child(1) { --card-color: #ff6b9d; }
.stat-card:nth-child(2) { --card-color: #4fc3f7; }
.stat-card:nth-child(3) { --card-color: #66bb6a; }
.stat-card:nth-child(4) { --card-color: #ffa726; }
.stat-card:nth-child(5) { --card-color: #ab47bc; }
</style>




