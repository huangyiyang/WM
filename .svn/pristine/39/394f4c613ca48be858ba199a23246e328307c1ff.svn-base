<template>
  <section class="login">
    <div class="login-box clear-both"
         style="width:80%;height:50%">
      <div class="login-info"
           style="width: 90%;height: 90%;">
        <el-form class="login-info-form"
                 ref="form"
                 style="width: 100%;height: 100%;"
                 :model="form"
                 :rules="rules">
          <el-form-item prop="yzm"
                        style="width: 100%;height: 50%;">
            <el-input v-model="form.yzm"
                      style="width: 100%;height: 80px;"
                      name="yzm"
                      placeholder="验证码"
                      @keyup.enter.native="onLogin"></el-input>
          </el-form-item>
          <el-form-item style="width: 100%;height: 50%;">
            <el-button type="primary"
                       style="width: 100%;height: 80px;"
                       round
                       @click="onLogin">同步</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'yzm',
  data () {
    return {
      form: {
        yzm: '',
        isRemember: false
      },
      rules: {
        yzm: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      requestId: ''
    }
  },
  computed: {
  },
  methods: {
    onLogin () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let data = new URLSearchParams();
          data.append('code', this.form.yzm);
          data.append('requestId', this.requestId);
          this.$axios.post('/wiseMotion/codeReceive', data, s => {
            this.$message.success(s.message);
          });
        } else {
          return false;
        }
      });
    }
  },
  created: function () {
    let query = this.$route.query;
    this.requestId = query.requestId
    console.log(this.requestId)
  },
  mounted: function () {
    //let query = this.$route.query;
    //console.log(query)
  }
}
</script>
<style>
.el-input__inner {
  height: 50px !important;
}
</style>
