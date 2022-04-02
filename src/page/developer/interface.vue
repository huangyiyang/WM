<template>
  <div class="management-list-except"
       v-loading="testLoading">
    <el-dialog title="选择需要创建的接口类型"
               :visible.sync="dialogVisible"
               width="550px"
               top="10%"
               custom-class="dialog-type"
               :before-close="handleClose">
      <ul class="dialog-type-box">
        <li>
          <p :class="['dialog-type-icon', {active: interfaceType === 2}]"
             @click="interfaceTypeSelect(2)">
            <i class="icon icon-gain"></i>
          </p>
          <p class="dialog-type-name">获取接口</p>
        </li>
        <li>
          <p :class="['dialog-type-icon', {active: interfaceType === 3}]"
             @click="interfaceTypeSelect(3)">
            <i class="icon icon-submit"></i>
          </p>
          <p class="dialog-type-name">填报接口</p>
        </li>
      </ul>
      <span slot="footer"
            class="dialog-footer">
        <el-button :type="interfaceType ? 'primary' : ''"
                   @click="interfaceAddJump">下一步</el-button>
      </span>
    </el-dialog>
    <section class="project-module">
      <p class="project-module-name">
        数据接口管理
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="addInterface">新增数据接口</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="developer-query">
        <div class="developer-query-option">
          <div class="align-center">
            <label>接口类型</label>
            <el-select v-model="value"
                       @change="interfaceList"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-input class="developer-query-input"
                  v-model="search"
                  clearable
                  @input.native="queryChange($event)"
                  @clear="interfaceList"
                  placeholder="关键字搜索：URL,接口名称"></el-input>
      </div>
      <el-table height="100%"
                :data="interfaceData"
                max-height="100%"
                style="width: 100%;"
                v-loading="loading"
                element-loading-text="数据接口加载中...">

        <el-table-column v-for="(item, i) in tableMenu"
                         :key="i"
                         :width="item.width || 'auto'"
                         :align="item.align || 'center'"
                         :prop="item.prop"
                         :sortable="item.sortable"
                         :show-overflow-tooltip="item.prop !== ''"
                         :label="item.label">
          <template slot-scope="scope">
            <p class="normal"
               v-if="item.prop === 'type'">
              {{ scope.row[item.prop] === 2 ? '获取接口' : '填报接口' }}
            </p>
            <p class="normal"
               v-show="scope.row.isPublished === 1"
               @click="copyPath(scope.row.publishPath)"
               v-else-if="item.prop === 'publishPath'">
              {{ scope.row.publishPath}}
            </p>
            <template v-else-if="item.prop === 'status'">
              <p class="normal"
                 v-if="scope.row[item.prop] === 0">
                <i></i>
                正常
              </p>
              <p class="abnormal"
                 v-else-if="scope.row[item.prop] === 1">
                <i></i>
                异常
              </p>
              <p class="unknown"
                 v-else-if="scope.row[item.prop] === 2">
                <i></i>
                未知
              </p>
              <p class="stop"
                 v-else>
                <i></i>
                停用
              </p>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         label="操作">
          <template slot-scope="scope">
            <el-button @click.native.prevent="interfaceTest(scope.row)"
                       type="text"
                       size="small">
              测试
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
  name: 'developerInterface',
  data () {
    return {
      loading: false,
      interfaceData: [],
      tableMenu: [
        { isCheck: true, label: '接口名称', prop: 'processName' },
        { isCheck: true, label: '发布地址', prop: 'publishPath' },
        { isCheck: true, label: '创建时间', prop: 'createTime', width: this.rem2Px(180) },
        { isCheck: true, label: '登录系统', prop: 'loginName' },
        { isCheck: true, label: '类型 ', prop: 'type', width: this.rem2Px(120) },
        { isCheck: true, label: 'ID', prop: 'id', width: this.rem2Px(120) },
        { isCheck: true, label: '备注', prop: 'remark', width: this.rem2Px(120) }
      ],
      dialogVisible: false,
      interfaceType: '', // 接口种类 （2-获取  | 3-填报）
      search: '',
      value: '2,3',
      publishPath: '',
      options: [{
        value: '2,3',
        label: '全部'
      },
      {
        value: '2',
        label: '获取接口'
      },
      {
        value: '3',
        label: '填报接口'
      }],
      curTestRow: {},
      jsonString: '',
      jsonVisible: false,
      TVisible: false,
      processTestTableData: [],
      testLoading: false
    }
  },
  created () {
    this.interfaceList();
  },
  methods: {
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
    /* @event 接口种类选择 */
    interfaceTypeSelect (type) {
      this.interfaceType = type;
    },
    /* @event 跳转到新增接口页面 */
    interfaceAddJump () {
      if (this.interfaceType) {
        this.$router.push({ name: '/project/process', params: { processType: this.interfaceType } });
      } else {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'warning',
          message: '还未选择类型，请选择再进行下一步'
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
      data.append('processName', this.search || '');
      this.$axios.post('/process/list', data, s => {
        s.data.map(x => {
          x.publishPath = this.publishPath + x.id
        })
        this.interfaceData = s.data;
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
    /* @event 详情查看点击 */
    viewClick (item) {
      console.log(item)
      if (item.type === 0) {
        this.$router.push({ path: '/project/process', query: { id: item.id } });
      } else {
        this.$router.push({ path: '/project/process', query: { id: item.id } });
      }
    },
    /* @event 删除事件 */
    deleteClick (row) {
      this.$confirm(`确认删除流程-[${row.processName}]？，如果有关联流程将受到影响`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let data = new URLSearchParams();
        data.append('id', row.id);
        this.$axios.post('/process/del', data, s => {
          this.$message.success('删除成功！');
          this.interfaceList();
        });
      }).catch(() => { });
    }
  }
}
</script>
