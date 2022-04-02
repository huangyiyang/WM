<template>
  <section class="project-header">
    <div class="project-header-left">
      <p class="project-header-title">{{ this.baseConfig.title }}</p>
      <div class="project-header-date">
        <p class="project-header-date-item">
          <span>{{ timestampToTime(date, 'hh:mm') }}</span>
          <span>16℃</span>
        </p>
        <p>{{ timestampToTime(date, true, 'CHS') }}</p>
      </div>
    </div>
    <ul class="project-header-nav">
      <router-link to="/project/home" tag="li" :class="{active: pathUrl === '/project/home'}">
        <i class="el-icon-receiving"></i>
        <span>应用首页</span>
      </router-link>
      <router-link to="/card" tag="li">
        <i class="el-icon-monitor"></i>
        <span>管理平台</span>
      </router-link>
      <router-link to="/index" tag="li">
        <i class="el-icon-setting"></i>
        <span>开放平台</span>
      </router-link>
      <li class="personal">
        <el-popover
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
          <el-avatar v-if="$store.state.user" slot="reference"
                     src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </el-popover>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'mmHeader',
  data () {
    return {
      date: new Date()
    }
  },
  watch: {
    '$route' (to, form) {
      console.log();
      this.date = new Date();
    }
  },
  computed: {
    pathUrl () {
      console.log(this.$route.path);
      return this.$route.path;
    }
  },
  methods: {
    /* @method 时间获取 */
    setTime () {
      this.timer = setInterval(() => {
        this.date = new Date();
      }, 60000);
    },
    /* @event 退出按钮点击事件 */
    loginOut () {
      this.$axios.post('/logout', '', s => {
        this.$store.commit('loginOut');
        this.$router.push('/index');
      });
    }
  },
  mounted () {
    clearInterval(this.timer);
    this.setTime();
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
}
</script>
