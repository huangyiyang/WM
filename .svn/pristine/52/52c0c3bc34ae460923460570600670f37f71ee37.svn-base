<template>
  <div class="management-list-except"
       v-loading="testLoading">
    <el-dialog title="选择需要创建的登录类型"
               :visible.sync="dialogVisible"
               width="550px"
               top="10%"
               :before-close="handleClose">
      <ul class="dialog-type-box">
        <li>
          <p :class="['dialog-type-icon', {active: loginType === 'no'}]"
             @click="loginTypeSelect('no')">
            <i class="icon icon-no"></i>
          </p>
          <p class="dialog-type-name">无验证码</p>
        </li>
        <li>
          <p :class="['dialog-type-icon', {active: loginType === 'code'}]"
             @click="loginTypeSelect('code')">
            <i class="icon icon-code"></i>
          </p>
          <p class="dialog-type-name">有验证码</p>
        </li>
      </ul>
      <span slot="footer"
            class="dialog-footer">
        <el-button :type="loginType ? 'primary' : ''"
                   @click="loginAddJump">下一步</el-button>
      </span>
    </el-dialog>
    <section class="project-module">
      <p class="project-module-name">
        自动登录管理
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="addInterface">新增登录流程</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="developer-query">
        <el-input class="developer-query-input"
                  v-model="search"
                  clearable
                  @input.native="queryChange($event)"
                  @clear="interfaceList"
                  placeholder="关键字搜索：登录流程名称"></el-input>
      </div>
      <el-table height="100%"
                :data="interfaceData"
                max-height="100%"
                style="width: 100%;"
                v-loading="loading"
                element-loading-text="登录数据加载中...">
        <el-table-column align="center"
                         fixed
                         prop="processName"
                         label="登录流程名称"
                         width="180">
        </el-table-column>
        <el-table-column align="center"
                         prop="createTime"
                         show-overflow-tooltip
                         label="创建时间"
                         width="150">
        </el-table-column>
        <el-table-column align="center"
                         label="发布地址"
                         show-overflow-tooltip
                         width="150">
          <template slot-scope="scope">
            <p v-if="scope.row.isPublished === 1"
               @click="copyPath(scope.row.publishPath)">{{scope.row.publishPath}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         label="是否保持登录">
          <template slot-scope="scope">
            <p class="stop"
               v-if="scope.row.isHold === 0">
              <i></i>
              否
            </p>
            <p class="normal"
               v-if="scope.row.isHold === 1">
              <i></i>
              是
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="id"
                         show-overflow-tooltip
                         label="ID">
        </el-table-column>
        <el-table-column align="center"
                         label="登录状态">
          <template slot-scope="scope">
            <p class="normal"
               v-if="scope.row.status === 0">
              <i></i>
              登录
            </p>
            <p class="abnormal"
               v-else-if="scope.row.status === 1">
              <i></i>
              异常
            </p>
            <p class="unknown"
               v-else-if="scope.row.status === 2">
              <i></i>
              异常
            </p>
            <p class="stop"
               v-else>
              <i></i>
              停用
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="备注">
        </el-table-column>
        <el-table-column align="center"
                         fixed="right"
                         label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="interfaceTest(scope.row)"
                       type="text"
                       size="small">
              自动登录
            </el-button>
            <el-button @click.native.prevent="WiseMotionClientLogin(scope.row)"
                       :disabled="!isWiseMotionClient"
                       type="text"
                       size="small">
              人工登录
            </el-button>
            <el-button @click.native.prevent="loginProcessValidate(scope.row)"
                       type="text"
                       size="small">
              登录验证
            </el-button>
            <el-button @click.native.prevent="viewClick(scope.row)"
                       type="text"
                       size="small">
              编辑
            </el-button>
            <el-button @click.native.prevent="deleteClick(scope.row)"
                       type="text"
                       style="color:red"
                       size="small">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <!--processTestResult-->
    <el-dialog top="0"
               title="测试结果"
               custom-class="json-box"
               :visible.sync="jsonVisible">
      <pre slot="footer">{{ jsonString }}</pre>
    </el-dialog>
    <!--processTestTable-->
    <el-dialog top="0"
               ref="processTestTable"
               title="测试参数"
               custom-class="enter-code"
               width="700px"
               :visible.sync="TVisible">
      <div class="TjVisible-info">
        <el-table :data="processTestTableData"
                  style="width: 100%">
          <el-table-column prop="tit"
                           label="参数名"
                           width="180">
          </el-table-column>
          <!--<el-table-column prop="type"-->
          <!--label="参数类型"-->
          <!--width="180">-->
          <!--</el-table-column>-->
          <el-table-column label="值">
            <template slot-scope="scope">
              <el-input v-model="scope.row.val"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button type="primary"
                   @click="processTestRun(curTestRow)">测试</el-button>
        <el-button @click="processClearData">清空内容</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'developerLoginProcessList',
  data () {
    return {
      loading: false,
      dialogVisible: false,
      interfaceData: [],
      publishPath: '',
      testLoading: false,
      TVisible: false,
      processTestTableData: [],
      curTestRow: {},
      loginType: '', // 新增登录种类 （no-无验证码 | code-有验证码）
      search: '',
      value: '1',
      jsonString: '',
      jsonVisible: false
    }
  },
  computed: {
    isWiseMotionClient: function () {
      console.log(window)
      return window.WiseMotionClientVersion
      //return true
    }
  },
  created () {
    this.interfaceList();
  },
  methods: {
    /*WiseMotionClientLogin*/
    WiseMotionClientLogin (listdata) {
      let data = new URLSearchParams();
      //console.log(listdata.id)
      data.append('id', listdata.id);
      this.$axios.post('/process/detail', data, s => {
        let json = s.data.flowData
        let nodeList = JSON.parse(json).nodeList
        nodeList.map(s => {
          if (s.type === 'start') {
            console.log(s.url)
            window['_wmClientManualLogin'] ? window['_wmClientManualLogin']({
              id: listdata.id,
              targetUrl: s.url,
              user: {
                setElementValue: ''
              },
              pwd: {
                setElementValue: ''
              }
            }) : window.open(s.url, '_blank');
          }
        })
      })
    },
    copyPath (url) {
      //要复制的内容
      var msg = url;
      try {
        var txtEl = document.createElement('textarea');
        txtEl.value = msg;
        document.body.appendChild(txtEl);
        txtEl.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        txtEl.remove();
        this.$message.success('复制成功！');
      } catch (err) {
        this.$message.error('复制错误！');
      }
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    /* @event 新增接口点击选择事件 */
    addInterface () {
      this.dialogVisible = true
    },
    /* @event 新增接口点击事件 */
    push () {
      if (this.type === '1') {
        this.$router.push({ name: 'projectLogin', params: { existCode: false } });
      } else if (this.type === '2') {
        this.$router.push({ name: 'projectLogin', params: { existCode: true } });
      } else {
        this.$message.error('还未选择登录类型，请选择再进行下一步！');
      }
    },
    /* @event 登录种类选择 */
    loginTypeSelect (type) {
      this.loginType = type;
    },
    /* @event 跳转到新增登录流程页面 */
    loginAddJump () {
      if (this.loginType) {
        this.$router.push({
          name: 'projectLogin',
          params: { existCode: this.loginType === 'code' }
        });
      } else {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'warning',
          message: '还未选择登录类型，请选择再进行下一步'
        });
      }
    },
    /* @event 关键字查询change事件 */
    queryChange (e) {
      this.inputTime = e.timeStamp;
      setTimeout(() => {
        if ((this.inputTime - e.timeStamp) === 0) {
          this.interfaceList();
        }
      }, 500);
    },
    /* @method 登录管理列表 */
    interfaceList () {
      let pubBase = this.$axios.downUrl();
      pubBase = /http/.test(pubBase) ? pubBase : [window.location.origin, pubBase].join('');
      this.publishPath = [pubBase, this.baseConfig.FLOW_PUB_BASE_URL].join('');
      console.log(this.publishPath)
      this.loading = true;
      let data = new URLSearchParams();
      data.append('isPublished', '');
      data.append('type', this.value);
      data.append('processName', this.search);
      this.$axios.post('/process/list', data, s => {
        s.data.map(x => {
          x.publishPath = this.publishPath + x.id
        })
        this.interfaceData = s.data;
        console.log(this.interfaceData)
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    /* @event 接口测试数据清空 */
    processClearData () {
      this.interfaceTest(this.curTestRow);
    },
    /* @event 接口测试结果 */
    processTestRun (row) {
      let datarun = new URLSearchParams();
      let wmRedirectUrlList = [];
      let wmRedirectUrl = '';
      for (var p in this.processTestTableData) { //遍历json数组时，这么写p为索引，0,1
        if (this.processTestTableData[p].isUrl) {
          (wmRedirectUrl = this.processTestTableData[p].val);
        } else {
          wmRedirectUrlList.push(`${this.processTestTableData[p].tit}={${this.processTestTableData[p].tit}}`);
        }
        this.processTestTableData[p].val && datarun.append(this.processTestTableData[p].tit, this.processTestTableData[p].val);
      }
      // datarun.append('wm_redirect_url', [wmRedirectUrl, `${wmRedirectUrlList.join('&')}`].join(!wmRedirectUrlList.length ? '' : /\?/.test(wmRedirectUrl) ? '&' : '?'));
      this.TVisible = false;
      this.testLoading = true;
      let paths = '/process/test?id=' + row.id;
      this.$axios.post(paths, datarun, (res) => {
        this.jsonString = res.data ? JSON.stringify(res.data, null, 4) : JSON.stringify(res, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      }, f => {
        this.testLoading = false;
      });
    },
    async FlowDetail (id) {
      let data = new URLSearchParams();
      data.append('id', id);
      return new Promise((resolve, reject) => {
        this.$axios.post('/process/detail', data, r => {
          resolve(JSON.parse(r.data.sendData))
        }, f => {

        })
      })
    },
    /* @event 接口测试 */
    async interfaceTest (row) {
      this.processTestTableData = [];
      !row.flowData && (row.flowData = await this.FlowDetail(row.id));
      this.curTestRow = row;
      let startNode = row.flowData.nodeList.find(node => node.type === 'start');
      if (startNode) {
        try {
          let urlParam = startNode.urlVarName;
          let variable = startNode.variable;
          if (urlParam) {
            this.processTestTableData.push({
              tit: urlParam,
              isUrl: 1,
              val: ''
            });
          }
          if (variable) {
            Reflect.ownKeys(JSON.parse(variable)).forEach(paramKey => {
              this.processTestTableData.push({
                tit: paramKey,
                val: ''
              });
            })
          }
        } catch (e) {
          this.$message.error(e.message)
          return false
        }
      }

      if (this.processTestTableData.length) {
        this.TVisible = true;
        return false;
      }
      this.testLoading = true;
      /*let paths = this.baseConfig.TAILOR_URL + '/tailor/wisemotion/testrun?id=' + this.detailData.id + '&type=0 ';
      axios.post(paths).then((res) => {
        this.jsonString = JSON.stringify(res.data, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      });*/
      /*wisemotion deliver to exeactors*/
      let paths = '/process/test?id=' + row.id;
      this.$axios.get(paths, '', (res) => {
        this.jsonString = res.data ? JSON.stringify(res.data, null, 4) : JSON.stringify(res, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      }, f => {
        this.testLoading = false;
      });
    },

    /* @event 登录验证测试*/
    loginProcessValidate (row) {
      let data = new URLSearchParams();
      data.append('id', row.id)
      this.$axios.get('/process/loginValid', data, r => {
        console.log(r.status)
        let noticeMsg = [row.processName, '当前会话'];
        if (Number(r.status) === 0) {
          noticeMsg.push('有效')
          this.$message.success(noticeMsg.join(''))
        } else {
          noticeMsg.push('失效')
          this.$message.warning(noticeMsg.join(''))
        }
      }, e => {
        this.$message.warning({
          message: '失效',
          center: true
        })
      })
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      console.log(item)
      if (item.type === 0) {
        this.$router.push({ name: 'projectLogin', query: { id: item.id } });
      } else {
        this.$router.push({ name: 'projectLogin', query: { id: item.id } });
      }
    },
    /* @event 删除事件 */
    deleteClick (row) {
      this.$confirm(`确认删除登录流程-[${row.processName}]？，如果有关联流程将受到影响`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let data = new URLSearchParams();
        data.append('id', row.id);
        this.$axios.post('/process/del', data, s => {
          this.$message.success(s.message);
          this.interfaceList();
        });
      }).catch(() => { });
    }
  }
}
</script>
