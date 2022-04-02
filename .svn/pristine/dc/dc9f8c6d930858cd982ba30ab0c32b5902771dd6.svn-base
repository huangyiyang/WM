<template>
  <div class="management-list-except">
    <el-dialog title="导入文件"
               :visible.sync="dialogVisible"
               width="550px"
               top="10%"
               :before-close="handleClose">
      <div class="">
        <input type="file"
               ref="fileInt"
               @change="changeHandle">
      </div>
    </el-dialog>
    <el-dialog title="任务执行数据"
               :visible.sync="dataVisible"
               width="12rem"
               custom-class="dialog-center"
               :before-close="datahandleClose">
      <div class="">
        <el-select v-model="status"
                   placeholder="请选择">
          <el-option v-for="item in dataoptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top:20px">
        <el-table :data="datatableData"
                  height="400"
                  style="width: 100%">
          <el-table-column align="center"
                           prop="seq"
                           label="数据序号"
                           :width="this.rem2Px(100)">
          </el-table-column>
          <el-table-column align="center"
                           prop="params"
                           label="数据参数"
                           :width="this.rem2Px(320)">
          </el-table-column>
          <el-table-column align="center"
                           prop="result"
                           label="执行结果">
          </el-table-column>
          <el-table-column align="center"
                           prop="status"
                           label="数据状态"
                           :width="this.rem2Px(150)">
            <template slot-scope="scope">
              {{ scope.row.status | executionStatus }}
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px">
        <el-pagination layout="prev, pager, next, total"
                       @current-change="changepage"
                       :page-size="20"
                       :total="datatableDatatotal">
        </el-pagination>
      </div>
    </el-dialog>
    <el-dialog title="任务操作日志"
               :visible.sync="logVisible"
               width="10rem"
               custom-class="dialog-center"
               top="10%"
               :before-close="loghandleClose">
      <div class="">
        <el-select v-model="optype"
                   placeholder="请选择">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div style="margin-top:20px">
        <el-table :data="logtableData"
                  height="400"
                  style="width: 100%">
          <el-table-column align="center"
                           prop="ip"
                           label="IP地址"
                           :width="this.rem2Px(150)">
          </el-table-column>
          <el-table-column align="center"
                           prop="userName"
                           label="操作账号"
                           :width="this.rem2Px(150)">
          </el-table-column>
          <el-table-column align="center"
                           prop="msg"
                           label="内容描述">
          </el-table-column>
          <el-table-column align="center"
                           prop="optype"
                           label="操作类型"
                           :width="this.rem2Px(150)">
            <template slot-scope="scope">
              {{ scope.row.optype | operationType }}
            </template>
          </el-table-column>
          <el-table-column align="center"
                           prop="logTime"
                           label="时间"
                           :width="this.rem2Px(180)">
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-top:20px">
        <el-pagination layout="prev, pager, next, total"
                       @current-change="changepage1"
                       :page-size="20"
                       :total="logtableDatatotal">
        </el-pagination>
      </div>
    </el-dialog>

    <el-dialog title="选择需要创建的任务类型"
               :visible.sync="typeDialog"
               width="550px"
               top="10%"
               custom-class="dialog-type"
               :before-close="typeClose">
      <ul class="dialog-type-box">
        <li>
          <p :class="['dialog-type-icon', {active: newType === 0}]"
             @click="newTypeSelect(0)">
            <i class="icon icon-gain"></i>
          </p>
          <p class="dialog-type-name">计划任务</p>
        </li>
        <li>
          <p :class="['dialog-type-icon', {active: newType === 1}]"
             @click="newTypeSelect(1)">
            <i class="icon icon-submit"></i>
          </p>
          <p class="dialog-type-name">动态任务</p>
        </li>
      </ul>
      <span slot="footer"
            class="dialog-footer">
        <el-button :type="typeof newType === 'number' ? 'primary' : ''"
                   @click="newTaskJump">下一步</el-button>
      </span>
    </el-dialog>
    <section class="project-module">
      <p class="project-module-name">
        任务管理
      </p>
      <div class="rt">
        <el-button type="primary"
                   @click="interfaceList">更新</el-button>
        <el-button type="primary"
                   @click="addTask">新增任务</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="developer-query">
        <div class="developer-query-option">
          <div class="align-center">
            <label>任务类型</label>
            <el-select v-model="taskType"
                       @change="interfaceList"
                       placeholder="请选择">
              <el-option v-for="item in typeOptions"
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
                  placeholder="关键字搜索：任务名称"></el-input>
      </div>
      <el-table height="100%"
                :data="interfaceData"
                max-height="100%"
                style="width: 100%;"
                v-loading="loading"
                element-loading-text="任务数据加载中...">

        <el-table-column v-for="(item, i) in tableMenu"
                         :key="i"
                         v-if="item.isCheck"
                         :width="item.width || 'auto'"
                         :align="item.align || 'center'"
                         :prop="item.prop"
                         :sortable="item.sortable"
                         :show-overflow-tooltip="item.prop !== ''"
                         :label="item.label">
          <template slot-scope="scope">
            <template v-if="item.prop === 'quantity'">
              <span>{{scope.row.finish}}/{{scope.row.total}}</span>
              <i class="el-icon-info"
                 @click="dataPage(scope.row)"></i>
            </template>
            <template v-else-if="item.prop === 'regTime'">
              {{ timestampToTime(scope.row[item.prop], 'YYYY-MM-DD hh:mm:ss') }}
            </template>
            <template v-else-if="item.prop === 'status'">
              <span v-if="scope.row.status === 0">无数据</span>
              <span v-if="scope.row.status === 1">未开始</span>
              <span v-if="scope.row.status === 2">执行中</span>
              <span v-if="scope.row.status === 3">暂停</span>
              <span v-if="scope.row.status === 4">结束</span>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center"
                         :width="this.rem2Px(560)"
                         label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status == 1"
                       @click.native.prevent="Run(scope.row)"
                       type="warning"
                       size="small">
              运行
            </el-button>
            <el-button v-if="scope.row.status == 4"
                       @click.native.prevent="Run(scope.row)"
                       type="warning"
                       size="small">
              重新运行
            </el-button>
            <el-button v-if="scope.row.status == 2 && scope.row.type == 0"
                       @click.native.prevent="Suspend(scope.row)"
                       type="warning"
                       size="small">
              暂停
            </el-button>
            <el-button v-if="scope.row.status == 3 && scope.row.type == 0"
                       @click.native.prevent="Run(scope.row)"
                       type="warning"
                       size="small">
              继续
            </el-button>
            <el-button v-if="scope.row.status == 2 || scope.row.status == 3"
                       @click.native.prevent="End(scope.row)"
                       type="warning"
                       size="small">
              终止
            </el-button>
            <el-button v-if="scope.row.status == 0 || scope.row.status == 1 || scope.row.status == 4"
                       @click.native.prevent="Import(scope.row)"
                       type="primary"
                       size="small">
              导入
            </el-button>
            <el-button v-if="scope.row.status == 3 || scope.row.status == 4"
                       @click.native.prevent="Export(scope.row)"
                       type="primary"
                       size="small">
              导出
            </el-button>
            <el-button v-if="scope.row.status == 0 || scope.row.status == 1 || scope.row.status == 3 || scope.row.status == 4"
                       @click.native.prevent="viewClick(scope.row)"
                       type="success"
                       size="small">
              编辑
            </el-button>
            <el-button v-if="scope.row.status == 0 || scope.row.status == 1 || scope.row.status == 4"
                       @click.native.prevent="deleteClick(scope.row)"
                       type="danger"
                       size="small">
              删除
            </el-button>
            <el-button @click.native.prevent="logPage(scope.row)"
                       type="success"
                       size="small">
              日志
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>

    <el-dialog title="选择需要重新运行的数据"
               :visible.sync="rerunVisible"
               width="550px"
               top="10%"
               custom-class="dialog-type"
               :before-close="rerunClose">
      <ul class="dialog-type-box">
        <li>
          <p :class="['dialog-type-icon', {active: rerunType === 'all'}]"
             @click="rerunTypeSelect('all')">
            <i class="icon icon-all"></i>
          </p>
          <p class="dialog-type-name">全部数据</p>
        </li>
        <li>
          <p :class="['dialog-type-icon', {active: rerunType === 'fail'}]"
             @click="rerunTypeSelect('fail')">
            <i class="icon icon-fail"></i>
          </p>
          <p class="dialog-type-name">失败数据</p>
        </li>
      </ul>
      <span slot="footer"
            class="dialog-footer">
        <el-button :type="rerunType ? 'primary' : ''"
                   @click="rerunSubmit">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'developerInterface',
  data () {
    return {
      loading: false,
      interfaceData: [],
      tableMenu: [
        { isCheck: true, label: '任务名称', prop: 'title' },
        { isCheck: true, label: '状态', prop: 'status', width: this.rem2Px(80) },
        { isCheck: true, label: '已执行时间', prop: 'runTime', width: this.rem2Px(150) },
        { isCheck: true, label: '执行数量', prop: 'quantity', width: this.rem2Px(150) },
        { isCheck: true, label: '并发数', prop: 'concurrency', width: this.rem2Px(80) },
        { isCheck: true, label: '备注', prop: 'remark', width: this.rem2Px(150) }
      ],
      search: '',
      logvalue: '',
      fileToId: '',
      dialogVisible: false,
      dataVisible: false,
      logVisible: false,
      rerunVisible: false,
      rerunType: '',
      rerunId: 0,
      fileList: [],
      logPageId: '',
      dataoptions: [{
        value: '0,1,2,3',
        label: '全部'
      }, {
        value: '0',
        label: '未执行'
      },
      {
        value: '1',
        label: '执行中'
      },
      {
        value: '2',
        label: '执行完成'
      },
      {
        value: '3',
        label: '执行失败'
      }],
      options: [{
        value: '',
        label: '全部'
      }, {
        value: 0,
        label: '创建'
      },
      {
        value: 1,
        label: '修改'
      },
      {
        value: 7,
        label: '运行'
      },
      {
        value: 8,
        label: '暂停'
      },
      {
        value: 9,
        label: '取消'
      }],
      logPageNum: '1',
      dataPageNum: '1',
      logtableData: [],
      logtableDatatotal: 0,
      datatableData: [],
      datatableDatatotal: 0,
      optype: '',
      status: '0,1,2,3',
      taskType: '',
      typeOptions: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 0,
          label: '计划任务'
        },
        {
          value: 1,
          label: '动态任务'
        }
      ],
      typeDialog: false,
      newType: ''
    }
  },
  created () {
    this.search = this.$route.query.keyword || '';
    this.interfaceList();
  },
  //监控data中的数据变化
  watch: {
    optype (val) {
      this.logtableData = []
      this.logPageSearch()
    },
    status (val) {
      this.datatableData = []
      this.dataPageSearch()
    }
  },
  beforeDestroy () {
    this.runTimeEnd();
  },
  filters: {
    executionStatus (code) {
      let status = '';
      switch (code) {
        case 0:
          status = '未执行';
          break;
        case 1:
          status = '执行中';
          break;
        case 2:
          status = '执行完成';
          break;
        case 3:
          status = '执行失败';
          break;
      }
      return status;
    },
    operationType (code) {
      let operation = '';
      switch (code) {
        case 0:
          operation = '创建';
          break;
        case 1:
          operation = '修改';
          break;
        case 7:
          operation = '运行';
          break;
        case 8:
          operation = '暂停';
          break;
        case 9:
          operation = '取消';
          break;
      }
      return operation;
    }
  },
  methods: {
    /* @method 定时刷新已执行时间 */
    runTimeRefresh () {
      this.runTimeEnd();
      this.setRunTime = setInterval(() => {
        this.interfaceList('no-loading');
      }, 15000);
    },
    /* @method 结束已执行时间定时刷新 */
    runTimeEnd () {
      clearTimeout(this.setRunTime);
    },
    /**timeFormat */
    timeFormat (value) {
      var theTime = parseInt(value);// 秒
      var theTime1 = 0;// 分
      var theTime2 = 0;// 小时
      // alert(theTime);
      if (theTime > 60) {
        theTime1 = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        // alert(theTime1+"-"+theTime);
        if (theTime1 > 60) {
          theTime2 = parseInt(theTime1 / 60);
          theTime1 = parseInt(theTime1 % 60);
        }
      }
      var result = '' + parseInt(theTime) + '秒';
      if (theTime1 > 0) {
        result = '' + parseInt(theTime1) + '分' + result;
      }
      if (theTime2 > 0) {
        result = '' + parseInt(theTime2) + '小时' + result;
      }
      return result;
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    loghandleClose (done) {
      this.logVisible = false
    },
    datahandleClose (done) {
      this.dataVisible = false
    },
    rerunClose (done) {
      this.rerunVisible = false
    },
    typeClose () {
      this.typeDialog = false;
    },
    /* @event 新增任务 */
    addTask () {
      this.typeDialog = true;
    },
    newTypeSelect (type) {
      this.newType = type;
    },
    newTaskJump () {
      if (this.newType !== '') {
        this.$router.push({ name: '/project/task', query: { type: this.newType } });
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
    /* @method 管理列表 */
    interfaceList (type) {
      this.loading = type !== 'no-loading';
      let that = this
      let data = new URLSearchParams();
      data.append('title', this.search);
      data.append('type', this.taskType);
      this.$axios.post('/task/list', data, s => {
        this.interfaceData = s.data;
        //秒数转换
        this.interfaceData.map(task => {
          task.runTime = that.timeFormat(task.runTime)
        });
        let isRun = s.data.filter(item => item.status === 2);
        if (isRun.length) {
          this.runTimeRefresh();
        } else {
          this.runTimeEnd();
        }
        if (type === 'no-loading') return;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      });
    },
    /*日志查询*/
    logPage (item) {
      this.logPageId = item.id
      this.logVisible = true
      this.logPageSearch()
    },
    logPageSearch () {
      let data = new URLSearchParams();
      data.append('taskId', this.logPageId);
      data.append('pageNum', this.logPageNum);
      data.append('optype', this.optype);
      this.$axios.post('/task/logPage', data, s => {
        this.logtableData = s.data
        let num = Math.ceil(s.total / 20)
        this.logtableDatatotal = s.total
      });
    },
    /*任务数据查询*/
    dataPage (item) {
      this.logPageId = item.id
      this.dataVisible = true
      this.dataPageSearch()
    },
    dataPageSearch () {
      let data = new URLSearchParams();
      data.append('taskId', this.logPageId);
      data.append('pageNum', this.dataPageNum);
      data.append('status', this.status);
      this.$axios.post('/task/dataPage', data, s => {
        this.datatableData = s.data
        let num = Math.ceil(Number(s.total) / 20)
        this.datatableDatatotal = s.total
      });
    },
    /*任务执行数据日志翻页*/
    changepage (val) {
      this.dataPageNum = val
      this.dataPageSearch()
    },
    /*任务操作日志翻页*/
    changepage1 (val) {
      this.logPageNum = val
      this.logPageSearch()
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      this.$router.push({ path: '/project/task', query: { id: item.id, type: item.type } });
    },
    /* @event 删除事件 */
    deleteClick (row) {
      this.$confirm(`确认删除流程-[${row.title}]？`, '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let data = new URLSearchParams();
        data.append('id', row.id);
        this.$axios.post('/task/del', data, s => {
          this.$message.success('删除成功！');
          this.interfaceList();
        });
      }).catch(() => { });
    },
    /* @event 开始/继续执行 */
    Run (item) {
      if (item.status === 4) {
        this.rerunVisible = true;
        this.rerunId = item.id;
      } else {
        let data = new URLSearchParams();
        data.append('id', item.id);
        this.$axios.post('/task/run', data, s => {
          this.$message.success('开始执行！');
          this.interfaceList();
        });
      }
    },
    /* @event 暂停执行 */
    Suspend (item) {
      let data = new URLSearchParams();
      data.append('id', item.id);
      this.$axios.post('/task/pause', data, s => {
        this.$message.success('暂停执行！');
        this.interfaceList();
      });
    },
    /* @event 终止执行 */
    End (item) {
      let data = new URLSearchParams();
      data.append('id', item.id);
      this.$axios.post('/task/cancel', data, s => {
        this.$message.success('终止执行！');
        this.interfaceList();
      });
    },
    /* @event 导入 */
    Import (item) {
      this.dialogVisible = true
      this.fileToId = item.id
    },
    /* @event 导出 */
    Export (item) {
      let elink = document.createElement('a');
      elink.href = this.$axios.downUrl() + '/task/export?id=' + item.id + '&token=' + sessionStorage.getItem('token')
      elink.click();
    },
    handleRemove (file, fileList) {
      console.log(file, fileList);
    },
    handlePreview (file) {
      console.log(file);
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    changeHandle () {
      const file = this.$refs.fileInt.files[0];
      this.$refs.fileInt.value = ''
      const data = new FormData();
      data.append('file', file);
      data.append('id', this.fileToId);
      this.$axios.post('/task/import', data, res => {
        this.interfaceList()
        this.$message.success(res.message);
        this.dialogVisible = false
      });
    },
    /* @event 重新运行种类选择 */
    rerunTypeSelect (type) {
      this.rerunType = type;
    },
    /* @event 重新运行 */
    rerunSubmit () {
      if (this.rerunType) {
        let data = new URLSearchParams();
        data.append('id', this.rerunId);
        if (this.rerunType === 'all') {
          this.$axios.post('/task/cancel', data, s => {
            this.$axios.post('/task/run', data, s => {
              this.$message.success('开始执行！');
              this.interfaceList();
              this.rerunVisible = false;
            });
          });
        } else {
          this.$axios.get('/task/retry', data, s => {
            this.$message.success('开始执行！');
            this.interfaceList();
            this.rerunVisible = false;
          });
        }
      } else {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'warning',
          message: '请选择重新运行的数据，再进行下一步'
        });
      }
    }
  }
}
</script>
<style>
.el-table .cell {
  line-height: 0.45rem !important;
}
</style>
