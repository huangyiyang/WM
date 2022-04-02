<template>
  <div class="management-list-except">
    <section class="project-module">
      <p class="project-module-name">
        接口安全配置
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="SecuritySave">保存</el-button>
      </div>
    </section>
    <section class="project-info">
      <div>
        <div class="project-title"
             style="float: left;width:200px; margin:0;">密钥配置</div>
      </div>
      <div class="project-list"
           style="margin:0 0;margin-top:30px">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <!-- <label for="">Key：</label> -->
            <el-input style="width:350px"
                      v-model="key"></el-input>
            <i class="el-icon-refresh"
               @click="RefreshKey"></i>
          </div>
        </div>
      </div>
      <div>
        <div class="project-title"
             style="float: left;width:400px; margin:0;">IP白名单配置(多IP以英文逗号分隔)</div>
      </div>
      <div class="project-list"
           style="margin:0 0;margin-top:30px">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <!-- <label for="">IP：</label> -->
            <el-input type="textarea"
                      :autosize="{ minRows: 6, maxRows: 10}"
                      v-model="ips"></el-input>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'security',
  data () {
    return {
      loading: false,
      executorData: [],
      ips: '',
      key: ''
    }
  },
  created () {
    this.UserInfo();
    this.ipInfo();
  },
  methods: {
    /* @event 保存配置 */
    SecuritySave () {
      this.Save();
    },
    /* @method 保存 */
    Save () {
      let data = new URLSearchParams();
      data.append('ips', this.ips);
      this.$axios.get('/user/alow/addIp', data, s => {
        this.executorData = s.data;
        if (s.message === '保存成功') {
          this.$message.success('保存成功');
        } else {
          this.$message.warning('保存失败')
        }
      })
    },
    /* @method 读取用户信息 */
    UserInfo () {
      this.$axios.get('/user/info', '', s => {
        console.log(s.data)
        this.key = s.data.appkey
      })
    },
    /* @method 读取ip白名单 */
    ipInfo () {
      this.$axios.get('/user/alow/ipList', '', s => {
        console.log(s.data)
        let iplist = ''
        s.data.map((item) => {
          console.log(item.ip)
          iplist += item.ip + ','
        })
        console.log(iplist)
        this.ips = iplist.substr(0, iplist.length - 1);
      })
    },
    /* @method 刷新密钥 */
    RefreshKey () {
      this.$axios.get('/user/resetKey', '', s => {
        console.log(s.data)
        this.key = s.appkey
      })
    }
  }
}
</script>
<style>
.el-textarea__inner {
  background-color: #fff !important;
}
</style>
