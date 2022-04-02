<template>
  <section class="register">
    <div class="register-box clear-both">
      <div class="register-info">
        <p class="register-info-title">免费注册</p>
        <p class="register-info-sup">WISEMOTION应用平台</p>
        <el-form class="register-info-form" ref="form"
                 :model="register" :rules="rules">
          <el-form-item prop="username">
            <el-input v-model="register.username" autocomplete="off" name="username" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="register.password" type="password"
                      autocomplete="new-password" name="password" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input v-model="register.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input v-model="register.mobile" placeholder="手机"></el-input>
          </el-form-item>
          <el-form-item prop="projectName">
            <el-input v-model="register.projectName" placeholder="项目名称"></el-input>
          </el-form-item>
          <el-form-item class="register-facecode" prop="facecode">
            <el-input v-model="register.facecode" placeholder="验证码"></el-input>
            <el-image class="facecode-img" @click="resetImg" @load="codeLoad"
                      :src="baseUrl + '/validatecode' + randomCode">
              <div slot="error" class="image-error">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="medium" round @click="onRegister">创建账号</el-button>
          </el-form-item>
          <el-form-item class="register-footer">
            已有账号？<router-link tag="span" to="/login" class="blue">前往登录</router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    const checkTeamName = (rule, value, callback) => {
      if (!value) {
        //callback 是提示的信息
        return callback(new Error('请输入用户名'));
      } else {
        //调用封装了的异步效验方法，
        this.userNameValidate().then(response => {
          // console.log(response)
          if (response.data.statusCode === 0) {
            callback();
          } else {
            callback(new Error('用户名已注册'));
          }
        });
      }
    };
    return {
      baseUrl: this.$axios.downUrl(),
      randomCode: '?time=' + Math.random(),
      codeLoaded: true,
      register: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        facecode: '',
        projectName: ''
      },
      rules: {
        username: [
          { required: true, validator: checkTeamName, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, message: '长度至少 4 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
            message: '邮箱格式不对',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: '手机号格式不对',
            trigger: 'blur'
          }
        ],
        projectName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        facecode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /*  @event 验证码加载完成  */
    codeLoad () {
      this.codeLoaded = true;
    },
    /*  @event 用户名异步验证 add20210125  */
    async userNameValidate () {
      /*/checkUserNameUnique?username=admin*/
      let data = new URLSearchParams();
      data.append('username', this.register.username);
      let url = this.baseUrl + '/checkUserNameUnique';
      return axios({
        method: 'GET',
        url: url,
        params: data,
        withCredentials: true
      })
    },
    /*  @event 重置验证码 */
    resetImg () {
      if (this.codeLoaded) {
        this.randomCode = '?time=' + Math.random();
        this.codeLoaded = false;
      }
    },
    onRegister () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let data = new URLSearchParams();
          Object.keys(this.register).forEach((item) => {
            data.append(item, this.register[item]);
          });
          this.$axios.post('/register', data, s => {
            const success = Number(s.statusCode) === 0;

            if (success) {
              this.$message.success({
                message: s.message,
                duration: 1500,
                onClose: () => {
                  this.$router.push('/login');
                }
              })
            } else {
              this.$message.error({
                message: s.message,
                duration: 1500,
                onClose: () => {
                  this.$refs['form'].reset();
                }
              })
            }
            /*update before*/
            /*this.$router.push('/login');*/
          });
        } else {
          return false;
        }
      });
    }
  }
}
</script>
