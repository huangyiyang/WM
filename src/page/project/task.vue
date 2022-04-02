<template>
  <div class="management-list-except project-interface">
    <section class="project-module">
      <p class="project-module-name">
        任务管理 <span>[{{ title || '新增任务' }}]</span>
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="interfaceSave">
          保存
        </el-button>
        <el-button v-if="id !== ''"
                   type="danger"
                   @click="deleteClick">删除</el-button>
      </div>
    </section>
    <section class="project-info">
      <div>
        <div class="project-title"
             style="float: left;width:200px;">{{ $route.query.type ? '动态' : '计划' }}任务信息</div>
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
            <label for="">名称：</label>
            <el-input v-model="title"></el-input>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">备注：</label>
            <el-input v-model="remark"></el-input>
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
            <label for="">流程选择：</label>
            <el-select v-model="processId"
                       placeholder="请选择">
              <el-option v-for="item in processList"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row"
             v-if="$route.query.type"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">动态参数：</label>
            <el-input v-model="startParam"></el-input>
          </div>
        </div>
      </div>
      <div>
        <div class="project-title"
             style="float: left;width:200px;">执行配置</div>
      </div>
      <div class="project-list">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">并发数量：</label>
            <el-input v-model="concurrency"></el-input>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">执行资源：</label>
            <el-select v-model="clientId"
                       placeholder="请选择">
              <el-option v-for="item in clients"
                         :key="item.value"
                         :label="item.name"
                         :value="item.value">
              </el-option>
            </el-select>
            <i class="el-icon-refresh"
               @click="update"></i>
          </div>
        </div>
      </div>
      <div v-if="total !== ''">
        <div class="project-title"
             style="float: left;width:200px;">执行情况</div>
      </div>
      <div class="project-list"
           v-if="total !== ''">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">执行总数：</label>
            <el-input v-model="total"></el-input>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">执行数量：</label>
            <el-input v-model="finish"></el-input>
          </div>
        </div>
      </div>
      <div class="project-list"
           v-if="total !== ''">
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="third longsite">
            <label for="">开始时间：</label>
            <el-input v-model="startTime"></el-input>
          </div>
        </div>
        <div class="project-list-row"
             style="padding-bottom: 0rem;
                    width: 50%;
                    display: block;
                    float: left;">
          <div class="half">
            <label for="">结束时间：</label>
            <el-input v-model="finishTime"></el-input>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'projectInterface',
  components: {
  },
  data () {
    return {
      accessFail: false,
      clients: [],
      processList: [],
      id: '',
      processId: '',
      title: '',
      concurrency: '',
      clientId: '',
      remark: '',
      startParam: '',
      startTime: '',
      finishTime: '',
      total: '',
      finish: ''
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
    this.interfaceClients();
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
    update () {
      this.interfaceClients()
    },
    /* @method 接口系统详情信息 */
    interfaceDetail () {
      if (this.$route.query.id) {
        let data = new URLSearchParams();
        data.append('id', this.$route.query.id);
        this.$axios.post('/task/detail', data, s => {
          this.id = s.data.id
          this.title = s.data.title
          this.remark = s.data.remark
          this.processId = s.data.processId
          this.clientId = s.data.clientId
          this.concurrency = s.data.concurrency
          this.startTime = s.data.startTime
          this.finishTime = s.data.finishTime
          this.total = s.data.total
          this.finish = s.data.finish
          this.startParam = s.data.startParam;
        });
      } else {
      }
    },
    /* @method 流程下拉数据 1同步2异步 */
    interfaceSelect () {
      let data = new URLSearchParams();
      data.append('responseMode', this.$route.query.type ? 2 : 1);
      this.$axios.post('/process/list', data, s => {
        this.processList = s.data.map(process => {
          let { processName, id } = process;
          return Object.assign(process, { value: id, name: processName })
        });
      });
    },
    interfaceClients () {
      /*已注册在线执行客户端资源*/
      this.$axios.get('/client/getClient', '', s => {
        this.clients = s.data.map(client => {
          let { name, value, status, canUse, mac, ip, id, version } = client;
          let nameStr = id ? [id.slice(0, 5), id.slice(-5)].join('-') : '';
          name = `[ID_${nameStr}][v${version}]`;
          value = id;
          return { name, value, canUse: canUse || status }
        }).filter(client => !client.canUse) || [
          {
            name: '无可用运行资源',
            value: ''
          }
        ];
        this.$message.success('资源更新成功！');
      });
    },
    /* @event 删除事件 */
    deleteClick () {
      if (this.id === '') {
        this.$message.warning('还未保存！');
        return false
      } else {
        this.$confirm('确认删除当前接口？', '提示', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除',
          cancelButtonText: '取消'
        }).then(() => {
          let data = new URLSearchParams();
          data.append('id', this.id);
          this.$axios.post('/task/del', data, s => {
            this.$message.success('删除成功！');
            this.$router.push('/developer/task');
          });
        }).catch(() => { });
      }
    },
    /* @event 保存接口 */
    interfaceSave (fun) {
      let data = new URLSearchParams();
      data.append('id', this.id);
      data.append('processId', this.processId);
      data.append('title', this.title);
      data.append('concurrency', this.concurrency);
      data.append('clientId', this.clientId);
      data.append('remark', this.remark);
      data.append('type', this.$route.query.type);
      if (this.$route.query.type) {
        data.append('startParam', this.startParam);
      }
      this.$axios.post('/task/save', data, s => {
        this.$message.success('保存成功！');
        //this.$router.push({ path: '/developer/task', query: { id: s.id } });
        this.$router.push({ path: '/developer/task', query: {} });
        //this.interfaceDetail();
      }, f => {
      });
    }
    /* @event 提交bug点击事件 */
    /* @event 关闭bug点击事件 */
    /* @method 提交bug */
  },
  mounted () {
    this.interfaceSelect();
  },
  //生命周期 - 销毁完成
  destroyed () {
  }
}
</script>
