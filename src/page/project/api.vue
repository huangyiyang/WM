<template>
  <div class="management-list-except project-interface">
    <section class="project-module">
      <p class="project-module-name">
        汇行API接口文档 <span>[跨平台HTTP 标准WEB接口]</span>
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="goback">
          返回
        </el-button>
      </div>
    </section>
    <section class="project-info">
      <div>
        <div class="project-title"
             style="float: left;width:200px;">基本信息</div>
        <div class="project-info-control"
             style="float: right;width:300px;margin-top: 0.15rem;">
          <div :class="['button-group', {'accessInvalid': accessFail}]">
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">流程名称：</label>{{processName}}
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">流程ID：</label>{{id}}
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">需要登录：</label>{{isLogin === 0 ? '否' : '是'}}
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">验证密钥：</label>{{needKey === 0 ? '否' : '是'}}
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">调用方式：</label>{{responseMode === 1 ? '同步' : '异步'}}
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="">
            <label for="">回调地址：</label>{{responseAccess === '' ? '不需要回调' : responseAccess}}
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">资源数：</label>{{concurrencyCount}}
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">执行数：</label>{{exeTimes}}
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">创建时间：</label>{{createTime}}
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">最后执行：</label>{{lastExeTime}}
          </div>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">备注：</label>{{remark}}
          </div>
        </div>
      </div>
      <div>
        <div class="project-title"
             style="float: left;width:200px;">调用说明</div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 100%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">接口地址：</label>
            <el-input id="publishPath"
                      style="width:85%;"
                      v-model="publishPath"
                      readonly
                      @click.native="copyPath"></el-input>
            <span> </span>
            <i class="el-icon-share"
               @click="copyPath"></i>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 90%;
                    display: block;
                    float: left;">
          <div class="">
            <label for="">特别说明：</label><span style="color:red;">基本信息中，配置了验证密钥，需要在接口网址中添加密钥参数进行调用,如无则直接调用</span>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 90%;
                    display: block;
                    float: left;">
          <div class="">
            <label for="">示例：</label><span style="color:red;">http://汇行系统ip:端口/api/wiseMotion/process/{接口id}?appkey=汇行系统在接口安全配置中生成的密钥</span>
          </div>
        </div>
      </div>
      <div>
        <div class="project-title"
             style="float: left;width:200px;">参数说明</div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">参数：</label>{{variable}}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'api',
  components: {
  },
  data () {
    return {
      accessFail: false,
      id: '',
      processName: '',
      isLogin: '',
      needKey: '',
      remark: '',
      variable: '',
      responseMode: '',
      concurrencyCount: '',
      responseAccess: '',
      createTime: '',
      lastExeTime: '',
      exeTimes: '',
      type: '',
      publishPath: ''
    }
  },
  provide () {
    return {
    }
  },
  computed: {
  },
  created () {
    this.interfaceDetail();
  },
  watch: {
    '$route' (to, form) {
      this.isSelect = '';
      this.isSuccess = false;
      this.loginLoading = false;
      this.maxOrder = 0;
      this.interfaceDetail();
    }
  },
  directives: {
  },
  methods: {
    goback () {
      history.go(-1);
    },
    /* @event 复制已发布地址 */
    copyPath () {
      try {
        let oInput = document.getElementById('publishPath');
        oInput.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        this.$message.success('复制成功！');
      } catch (e) {
        this.$message.error('复制错误！');
      }
    },
    /* @method 接口系统详情信息 */
    interfaceDetail () {
      let data = new URLSearchParams();
      if (this.$route.query.appkey) {
        data.append('appkey', this.$route.query.appkey);
      }
      this.$axios.get('wiseMotion/processDef/' + this.$route.query.id, data, s => {
        this.id = s.data.id
        this.processName = s.data.processName
        this.isLogin = s.data.isLogin
        this.needKey = s.data.needKey
        this.remark = s.data.remark
        this.variable = s.data.variable
        this.responseMode = s.data.responseMode
        this.concurrencyCount = s.data.concurrencyCount
        this.responseAccess = s.data.responseAccess
        this.createTime = s.data.createTime
        this.lastExeTime = s.data.lastExeTime
        this.exeTimes = s.data.exeTimes
        this.type = s.data.type
        let pubBase = this.$axios.downUrl();
        pubBase = /http/.test(pubBase) ? pubBase : [window.location.origin, pubBase].join('');
        this.publishPath = [pubBase, this.baseConfig.FLOW_PUB_BASE_URL, s.data.id].join('');
      });
    }
  },
  mounted () {
  },
  //生命周期 - 销毁完成
  destroyed () {
  }
}
</script>

