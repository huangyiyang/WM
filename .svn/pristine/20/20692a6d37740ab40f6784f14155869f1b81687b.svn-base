<template>
  <div class="management-list-except developer">
    <el-dialog title="选择需要创建的登录类型"
               :visible.sync="dialogVisible"
               width="550px"
               top="10%"
               :before-close="handleClose">
      <div class="project-list">
        <div :class="itemclasshq"
             @click="addInterface1">
          <el-image :src="urlhq"></el-image>
        </div>
        <div :class="itemclasstj"
             @click="addInterface2">
          <el-image :src="urltj"></el-image>
        </div>
        <div class="item-name">包含验证码</div>
        <div class="item-name">无验证码</div>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="push">下一步</el-button>
      </span>
    </el-dialog>
    <section class="project-module">
      <p class="project-module-name">
        登录管理
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="addLogin">新增登录</el-button>
      </div>
    </section>
    <section class="project-info">
      <el-table height="100%"
                :data="loginData"
                max-height="100%"
                style="width: 100%;">
        <el-table-column align="center"
                         prop="autoLoginName"
                         label="系统名称">
        </el-table-column>
        <el-table-column prop="targetUrl"
                         show-overflow-tooltip
                         label="URL地址">
        </el-table-column>
        <el-table-column align="center"
                         label="登录状态"
                         width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.syncSuccessLoading">
              <p class="normal"
                 v-if="scope.row.status === 0">
                <i></i>
                成功
              </p>
              <p class="stop"
                 v-else>
                <i></i>
                失败
              </p>
            </template>
            <template v-else>
              <span>{{scope.row.opText}}</span>
              <i v-show="!scope.row.syncSuccessLoading"
                 class="el-icon-loading"></i>
            </template>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="syncSessionLogin(scope.row)"
                       type="text"
                       size="small">
              登录
            </el-button>
            <el-button @click.native.prevent="loginStatusValidate(scope.row)"
                       type="text"
                       size="small">
              刷新会话
            </el-button>
            <el-button @click.native.prevent="viewClick(scope.row)"
                       type="text"
                       size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-dialog top="0"
               ref="box"
               title="输入验证码"
               custom-class="enter-code"
               v-loading="codeLoading"
               :visible.sync="codeVisible">
      <el-form :model="codeForm"
               label-width="60px">
        <el-form-item label="验证码">
          <el-image :src="codeForm.verify_code_img_url + randomCode"
                    @load="codeLoad">
            <div slot="placeholder"
                 class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="输入码">
          <el-input v-model="codeForm.code"
                    autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="() => {this.codeVisible = false; loginData.find(login => !login.syncSuccessLoading).syncSuccessLoading = true;}">取 消</el-button>
        <el-button type="primary"
                   @click="saveCode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'developerLogin',
  data () {
    return {
      loginData: [],
      htmlType: 0,
      codeVisible: false,
      codeForm: {},
      codeLoaded: false,
      randomCode: '?time=' + Math.random(),
      codeLoading: false,
      dialogVisible: false,
      urlhq: '../../static/image/hq-no.png',
      urltj: '../../static/image/tj-no.png',
      type: '',
      itemclasshq: 'project-item',
      itemclasstj: 'project-item'
    }
  },
  created () {
    this.loginList();
  },
  methods: {
    /* @event 新增登录点击事件 */
    /*addLogin () {
      this.$router.push('/project/login');
    },*/
    /* @event 新增流程点击选择事件 */
    handleClose (done) {
      this.dialogVisible = false
    },
    /* @event 新增接口点击选择事件 */
    addLogin () {
      this.dialogVisible = true
    },
    /* @event 新增接口点击事件 */
    addInterface1 () {
      this.type = '1'
      this.itemclasshq = 'project-itemnew'
      this.itemclasstj = 'project-item'
      this.urlhq = '../../static/image/hq-yes.png'
      this.urltj = '../../static/image/tj-no.png'
    },
    /* @event 新增接口点击事件 */
    addInterface2 () {
      this.type = '2'
      this.itemclasshq = 'project-item'
      this.itemclasstj = 'project-itemnew'
      this.urlhq = '../../static/image/hq-no.png'
      this.urltj = '../../static/image/tj-yes.png'
    },
    push () {
      if (this.type === '1') {
        this.$router.push('/project/loginprocess');
      } else if (this.type === '2') {
        this.$router.push('/project/loginprocess');
      } else {
        this.$message.error('还未选择类型，请选择再进行下一步！');
      }
    },
    /* @method 登录管理列表 */
    loginList () {
      this.$axios.post('/autoLogin/list', '', s => {
        this.loginData = s.data.map(login => {
          return { ...login, syncSuccessLoading: true }
        });
      })
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      this.$router.push({ path: '/project/login', query: { id: item.id } });
    },
    syncSessionLogin (row) {
      try {
        row.opText = '登录中...';
        row.syncSuccessLoading = false;
        let paths = '/autoLogin/autoLoginwithSyncSession';
        let data = new URLSearchParams();
        data.append('loginId', row.id || '');

        this.$axios.get(paths, data, (res) => {
          console.log(res);
          if (Number(res.data.status) === 11) {
            row.syncSuccessLoading = true;
            this.$message.success(res.data.statusText);
            row.status = 0;
            return;
          }
          if (Number(res.data.status) === 13) {
            this.htmlType = '1';
            this.codeForm = res.data.result;
            this.$set(this.codeForm, 'code', '');
            this.codeVisible = true;
          } else {
            this.handleSessionLogin(row, res);
          }
        });
      } catch (e) {

      }
    },
    handleSessionLogin (row, res) {
      row.syncSuccessLoading = true;
      if (Number(res.data.status) === 12) {
        row.status = 1;
        this.$message.warning(res.data.statusText);
      }
      if (Number(res.data.status) === 0) {
        row.status = 0;
        this.$message.warning(res.data.statusText);
        this.$message.success('登录成功');
      }
    },
    /*  @event 验证码加载完成  */
    codeLoad () {
      this.codeLoaded = true;
    },
    /*  @event 重置验证码 */
    resetImg () {
      if (this.codeLoaded) {
        this.randomCode = '?time=' + Math.random();
        this.codeLoaded = false;
      }
    },
    /* @event 保存验证码 */
    saveCode () {
      this.codeLoading = true;
      let data = new URLSearchParams();
      data.append('verifycode', this.codeForm.code);
      axios.post(this.codeForm.post_url, data).then((res) => {
        let curRow = this.loginData.find(login => !login.syncSuccessLoading)

        this.htmlType = '0';
        this.codeLoading = false;
        this.codeVisible = false;
        this.handleSessionLogin(curRow, res);
      });
    },
    loginStatusValidate (row) {
      row.opText = '刷新登录会话状态';
      row.syncSuccessLoading = false;
      let paths = this.baseConfig.TAILOR_URL + '/tailor/wisemotion/sessionalive/' + row.id;

      axios.get(paths).then((res) => {
        let { status, statusText } = res.data;
        this.$nextTick(() => {
          row.syncSuccessLoading = true;
          if (status === 0) {
            row.status = 0;
            this.$message.success(statusText);
          }
          if (status === 13) {
            row.status = 1;
            this.$message.warning(statusText);
          }
        });
      });
    }
  }
}
</script>
