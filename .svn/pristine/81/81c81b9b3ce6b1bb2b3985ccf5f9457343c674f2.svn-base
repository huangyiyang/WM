<template>
  <div class="project">
    <project-header></project-header>
    <div class="project-container">
      <management-list :loginData="loginData" :interfaceData="interfaceData"></management-list>
      <router-view v-on:update-list="updateList"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'project',
  data () {
    return {
      loginData: [],
      interfaceData: []
    }
  },
  created () {
    this.loginList();
    this.interfaceList();
  },
  watch: {
    '$route' (to, form) {
      // this.updateList();
    }
  },
  methods: {
    /* @method 登录管理列表 */
    loginList () {
      this.$axios.post('/autoLogin/list', '', s => {
        this.loginData = s.data;
      })
    },
    /* @method 接口管理列表 */
    interfaceList () {
      this.$axios.post('/interface/list', '', s => {
        this.interfaceData = s.data;
      });
    },
    updateList (bool) {
      this.loginList();
      this.interfaceList();
    }
  }
}
</script>
