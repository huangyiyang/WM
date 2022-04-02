<template>
  <div class="management-list-except"
       v-loading="testLoading">
    <section class="project-module">
      <p class="project-module-name">
        流程管理
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="addInterface">新增流程</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="developer-query">
        <el-input class="developer-query-input"
                  v-model="search"
                  clearable
                  @input.native="queryChange($event)"
                  @clear="interfaceList"
                  placeholder="关键字搜索：流程名称"></el-input>
      </div>
      <el-table height="100%"
                :data="interfaceData"
                max-height="100%"
                style="width: 100%;"
                v-loading="loading"
                element-loading-text="流程数据加载中...">
        <el-table-column align="center"
                         prop="processName"
                         label="流程名称">
        </el-table-column>
        <el-table-column align="center"
                         prop="createTime"
                         show-overflow-tooltip
                         label="创建时间"
                         width="150">
        </el-table-column>
        <el-table-column align="center"
                         prop="loginName"
                         label="登录系统"
                         width="240">
        </el-table-column>
        <el-table-column align="center"
                         prop="id"
                         label="ID"
                         show-overflow-tooltip
                         width="150">
        </el-table-column>
        <el-table-column align="center"
                         prop="remark"
                         label="备注">
        </el-table-column>
        <!-- <el-table-column align="center"
                         label="状态"
                         width="100">
          <template slot-scope="scope">
            <p class="normal"
               v-if="scope.row.isEnable === 1 && scope.row.status === 0">
              <i></i>
              正常
            </p>
            <p class="abnormal"
               v-else-if="scope.row.isEnable === 1 && scope.row.status === 1">
              <i></i>
              异常
            </p>
            <p class="unknown"
               v-else-if="scope.row.isEnable === 1 && scope.row.status === 2">
              <i></i>
              未知
            </p>
            <p class="stop"
               v-else>
              <i></i>
              停用
            </p>
          </template>
        </el-table-column> -->
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
               custom-class="dialog-center-height"
               width="700px"
               :visible.sync="TVisible">
      <el-table height="100%"
                max-height="100%"
                :data="processTestTableData"
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
      activeName: '',
      dialogVisible: false,
      interfaceData: [],
      testLoading: false,
      TVisible: false,
      processTestTableData: [],
      curTestRow: {},
      search: '',
      jsonString: '',
      jsonVisible: false
    }
  },
  created () {
    this.interfaceList();
  },
  methods: {
    /* @event 新增接口点击选择事件 */
    addInterface () {
      this.$router.push({ name: '/project/process', params: { processType: '0' } })
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
    /* @method 自动流程管理列表 */
    interfaceList () {
      this.loading = true;
      let data = new URLSearchParams();
      data.append('isPublished', '');
      data.append('type', 0);
      data.append('processName', this.search || '');
      this.$axios.post('/process/list', data, s => {
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
