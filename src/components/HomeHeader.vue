<template>
  <section class="home-header">
    <div class="home-header-inner">
      <div class="home-header_left">
        <div class="home-header-logo">
          <img class="logo" src="../../static/image/logo.png" alt="">
          <p>
            WISEMOTION<br>
            开放平台
          </p>
        </div>
        <ul class="home-header-nav">
          <router-link tag="li" to="/index">首页</router-link>
          <router-link tag="li" to="/home/list">接口集市</router-link>
          <router-link v-if="$store.state.user" tag="li" to="/console">应用中心</router-link>
          <!--<router-link tag="li" to="/index">定制合作</router-link>
          <router-link tag="li" to="/index">帮助中心</router-link>-->
        </ul>
      </div>
      <div class="home-header_right">
        <el-input
          placeholder="请输入内容"
          prefix-icon="el-icon-search"
          v-model="searchText">
        </el-input>
        <el-popover
          v-if="$store.state.user"
          class="personal"
          placement="bottom"
          popper-class="personal-account"
          trigger="click">
          <p class="personal-account-item">
            <i class="el-icon-user"></i>
            <span>个人中心</span>
          </p>
          <p class="personal-account-item" @click="loginOut">
            <i class="el-icon-switch-button"></i>
            <span><strong>退</strong>出</span>
          </p>
          <el-avatar slot="reference"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </el-popover>
        <el-button v-else type="primary" @click="loginClick">
          登录/注册
        </el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeHeader',
  data () {
    return {
      searchText: ''
    }
  },
  created () {
    console.log(this.$store.state.user);
  },
  methods: {
    /* @event 登录点击跳转事件 */
    loginClick () {
      this.$router.push('/login');
    },
    /* @event 退出按钮点击事件 */
    loginOut () {
      this.$axios.post('/logout', '', s => {
        this.$store.commit('loginOut');
        this.$router.push('/login');
      });
    }
  }
}
</script>
