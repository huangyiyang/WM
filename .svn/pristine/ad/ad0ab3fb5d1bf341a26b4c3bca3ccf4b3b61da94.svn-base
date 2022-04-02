<template>
  <section class="management-list">
    <p class="management-list-title">&nbsp;</p>
    <div class="management-list-box">
      <el-scrollbar>
        <el-menu router
                 :default-active="currentKey"
                 :default-openeds="currentKeyPath"
                 class="el-menu-vertical-demo"
                 v-if="!menuMode"
                 @select="handleSelect"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="/developer">
            <template slot="title">
              <svg class="home-icon"
                   aria-hidden="true">
                <use xlink:href="#icon-kaifa"></use>
              </svg>
              <span>我是开发者</span>
            </template>
            <el-menu-item index="/developer/login">
              <i class="icon icon-computer"></i>
              <span>登录管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/interface">
              <i class="icon icon-config"></i>
              <span>接口管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/charts">
              <i class="icon icon-config"></i>
              <span>图表管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/topic">
              <i class="icon icon-config"></i>
              <span>专题管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/shelves">
              <i class="icon icon-upload"></i>
              <span>上架管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/2"
                          disabled>
              <i class="icon icon-wallet"></i>
              <span>收益管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/user">
            <template slot="title">
              <svg class="home-icon"
                   aria-hidden="true">
                <use xlink:href="#icon-ren"></use>
              </svg>
              <span>我是使用者</span>
            </template>
            <el-menu-item index="/user/interface">
              <i class="icon icon-config"></i>
              <span>接口申请</span>
            </el-menu-item>
            <el-menu-item index="/user/record">
              <i class="icon icon-record"></i>
              <span>接口调用记录</span>
            </el-menu-item>
            <el-menu-item index="/user/key"
                          disabled>
              <i class="icon icon-key"></i>
              <span>key重置</span>
            </el-menu-item>
            <el-menu-item index="/user/manage"
                          disabled>
              <i class="icon icon-user"></i>
              <span>账户管理</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--3.0菜单-->
        <el-menu router
                 :default-active="currentKey"
                 :default-openeds="currentKeyPath"
                 class="el-menu-vertical-demo"
                 v-if="menuMode === '3.0'"
                 @select="handleSelect"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="/developer">
            <template slot="title">
              <svg class="home-icon"
                   aria-hidden="true">
                <use xlink:href="#icon-kaifa"></use>
              </svg>
              <span class="fz-18">开发者</span>
            </template>
            <el-menu-item index="/developer/login">
              <i class="icon icon-computer"></i>
              <span class="fz-16">自动登录管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/interface">
              <i class="icon icon-config"></i>
              <span class="fz-16">数据接口管理</span>
            </el-menu-item>
            <el-submenu index="/">
              <template slot="title">
                <i class="icon icon-auto_process"></i>
                <span class="fz-16">自动流程管理</span>
              </template>
              <el-menu-item index="/developer/process">
                <i class="icon icon-process fz-16"></i>
                <span>流程管理</span>
              </el-menu-item>
              <el-menu-item index="/developer/task">
                <i class="icon icon-task fz-16"></i>
                <span>任务管理</span>
              </el-menu-item>
            </el-submenu>
            <el-menu-item index="/developer/security">
              <i class="el-icon-suitcase"></i>
              <span class="fz-16">接口安全配置</span>
            </el-menu-item>
            <el-menu-item index="/developer/application">
              <i class="el-icon-setting"></i>
              <span class="fz-16">应用管理配置</span>
            </el-menu-item>
            <el-menu-item index="/developer/card">
              <i class="el-icon-collection-tag"></i>
              <span class="fz-16">管理平台配置</span>
            </el-menu-item>
            <el-menu-item index="/developer/executor">
              <i class="icon icon-resources"></i>
              <span class="fz-16">执行资源列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <!--BI 对接后菜单-->
        <el-menu router
                 :default-active="currentKey"
                 :default-openeds="currentKeyPath"
                 class="el-menu-vertical-demo"
                 v-if="menuMode === 'BI'"
                 @select="handleSelect"
                 @open="handleOpen"
                 @close="handleClose">
          <el-submenu index="/developer">
            <template slot="title">
              <svg class="home-icon"
                   aria-hidden="true">
                <use xlink:href="#icon-kaifa"></use>
              </svg>
              <span>系统融合接入</span>
            </template>
            <el-menu-item index="/developer/login">
              <i class="icon icon-computer"></i>
              <span>登录管理</span>
            </el-menu-item>
            <el-menu-item index="/developer/interface">
              <i class="icon icon-config"></i>
              <span>接口管理</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="/BI">
            <template slot="title">
              <svg class="home-icon"
                   aria-hidden="true">
                <use xlink:href="#icon-kaifa"></use>
              </svg>
              <span>数据可视化</span>
            </template>
            <el-menu-item v-if="0"
                          index="/BI/projects">
              <i class="icon icon-config"></i>
              <span>应用列表</span>
            </el-menu-item>
            <el-menu-item index="/BI/datasource">
              <i class="icon icon-config"></i>
              <span>数据准备</span>
            </el-menu-item>
            <el-menu-item index="/BI/analyse">
              <i class="icon icon-config"></i>
              <span>数据分析</span>
            </el-menu-item>
            <el-menu-item index="/BI/board">
              <i class="icon icon-config"></i>
              <span>专题设计</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </div>
  </section>
</template>

<script>
export default {
  name: 'managementList',
  data () {
    return {
      currentKey: '',
      currentKeyPath: ['/', '/developer', '/user']
    }
  },
  created () {

  },
  computed: {
    menuMode: function () {
      let { MENU } = this.baseConfig
      return MENU
    }
  },
  watch: {
    '$route' (to, form) {

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      this.currentKey = key;
      // this.currentKeyPath = keyPath;
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    }
  }
}
</script>
