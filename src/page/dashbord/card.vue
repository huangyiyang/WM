<template>
  <div class="dashbordCard" v-loading="testLoading">
    <div class="dashbordCard-box">
      <div class="dashbordCard-head">
        <div class="dashbordCard-head-left"></div>
        <div class="dashbordCard-head-split"></div>
        <div class="dashbordCard-head-right">
          <el-button type="success" round @click="jumpHome">首页</el-button>
          <div class="interface-total">
            <i :class="['el-icon-arrow-left', {'available': available.left}]" @click="clustersAnimation('left')"></i>
            <span>当前运行数量: {{total}}</span>
            <i :class="['el-icon-arrow-right', {'available': available.right}]" @click="clustersAnimation('right')"></i>
          </div>
        </div>
      </div>
      <div class="dashbordCard-content"  v-loading="interFaceLoading">
        <ul class="clusters" :style="`margin-left: ${curStyleVal}px`">
          <li class="clusters-card" v-for="unit in cluster" :key="unit.login ? unit.login.id : ['clusters-card__', new Date().getTime()].join('')">
            <div class="clusters-card-box">
              <div class="clusters-card-head">
              <i class="telm"></i>
              <span class="tit">
                {{unit.login ? unit.login.autoLoginName : '无需登录接口'}}
              </span>
              </div>
              <div class="clusters-card-content">
                <div :class="['clusters-card-login', {'unnecessary-login': unit.login.unnecessaryLogin}]" v-if="unit.login">
                  <div class="login-iframe"
                       @click="targetGlance(unit.login)"
                       :element-loading-text="unit.login.opText"
                       v-loading="!unit.login.syncSuccessLoading">
                    <template v-if="isSnapshotImage">
                      <img :src="unit.login.sessionStatus === 0 ? '../static/image/dashbord/login/success-' + unit.login.id + '.png' : '../static/image/dashbord/login/login-' + unit.login.id + '.png'" v-if="unit.login.syncSuccessLoading" alt="">
                    </template>
                    <template v-else>
                      <iframe v-if="unit.login.syncSuccessLoading" sandbox="allow-forms allow-same-origin allow-scripts" name="myframe" :src="unit.login.testSuccessUrl" frameborder="0"></iframe>
                    </template>
                  </div>
                  <div class="login-op" v-if="!unit.login.unnecessaryLogin">
                    <el-button-group>
                      <el-button class="login" type="info" plain @click="syncSessionLogin(unit.login)">
                        <template v-if="unit.login.syncSuccessLoading">
                          <p class="normal" v-if="unit.login.sessionStatus === 0">
                            <i></i>
                            已登录
                          </p>
                          <p class="stop" v-else>
                            <i></i>
                            登录
                          </p>
                        </template>
                        <template v-else>
                          <span>{{unit.login.opText}}</span>
                          <i v-show="!unit.login.syncSuccessLoading" class="el-icon-loading"></i>
                        </template>
                      </el-button>
                      <el-button class="refresh" type="info" icon="el-icon-refresh" plain @click="loginStatusValidate(unit.login)">刷新</el-button>
                    </el-button-group>
                  </div>
                </div>

                <div class="clusters-card-group" v-if="unit.obtainList.length">
                  <div class="clusters-card-interface" v-for="obtain in unit.obtainList" :key="obtain.id">
                    <div class="interface-head">
                      <div class="interface-stauts">
                        <i></i><span @click="interFaceGlance(obtain)">数据获取接口</span>
                      </div>
                      <div class="interface-op">
                        <el-button type="success" round @click="interfaceTest(obtain)">点击测试</el-button>
                        <el-switch
                          @change="changeEnable($event, obtain)"
                          v-model="obtain.isEnable"
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#74bab6">
                        </el-switch>
                      </div>
                    </div>
                    <div class="interface-detail">
                      <el-form>
                        <el-form-item label="接口名称:">
                          {{obtain.interfaceName}}
                        </el-form-item>
                        <el-form-item label="发布地址:">
                          <template v-if="obtain.isPublished">
                            <el-input v-model="obtain.newpublishPath" readonly  @click.native="copyPath"></el-input>
                          </template>
                          <template v-else>
                            未发布
                          </template>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>

                <div class="clusters-card-group  submit" v-if="unit.isubmitList.length">
                  <div class="clusters-card-interface submit" v-for="isubmit in unit.isubmitList" :key="isubmit.id">
                    <div class="interface-head">
                      <div class="interface-stauts submit">
                        <i></i><span @click="interFaceGlance(isubmit)">数据提交接口</span>
                      </div>
                      <div class="interface-op">
                        <el-button type="success" round @click="interfaceIsubmitTest(isubmit)">点击测试</el-button>
                        <el-switch
                          @change="changeEnable($event, isubmit)"
                          v-model="isubmit.isEnable"
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#74bab6">
                        </el-switch>
                      </div>
                    </div>
                    <div class="interface-detail">
                      <el-form>
                        <el-form-item label="接口名称:">
                          {{isubmit.interfaceName}}
                        </el-form-item>
                        <el-form-item label="发布地址:">
                          <template v-if="isubmit.isPublished">
                            <el-input v-model="isubmit.newpublishPath" readonly  @click.native="copyPath"></el-input>
                          </template>
                          <template v-else>
                            未发布
                          </template>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
                <!--流程数据-->
                <div class="clusters-card-group  process" v-if="unit.processList && unit.processList.length">
                  <div class="clusters-card-interface process" v-for="process in unit.processList" :key="process.id">
                    <div class="interface-head">
                      <div class="interface-stauts process">
                        <i></i><span @click="interFaceGlance(process)">流程</span>
                      </div>
                      <div class="interface-op">
                        <el-button type="success" round @click="processTest(process)">点击测试</el-button>
                        <el-switch
                          @change="changeEnable($event, process)"
                          v-model="process.isEnable"
                          :active-value="1"
                          :inactive-value="0"
                          active-color="#74bab6">
                        </el-switch>
                      </div>
                    </div>
                    <div class="interface-detail">
                      <el-form>
                        <el-form-item label="流程名称:">
                          {{process.processName}}
                        </el-form-item>
                        <el-form-item label="发布地址:">
                          <template v-if="process.isPublished">
                            <el-input v-model="process.newpublishPath" readonly  @click.native="copyPath"></el-input>
                          </template>
                          <template v-else>
                            未发布
                          </template>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!--登录验证码-->
    <el-dialog
      top="0"
      ref="box"
      title="输入验证码"
      custom-class="enter-code"
      v-loading="codeLoading"
      :visible.sync="codeVisible">
      <el-form :model="codeForm" label-width="60px">
        <el-form-item label="验证码">
          <el-image :src="codeForm.verify_code_img_url + randomCode" @load="codeLoad">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </el-form-item>
        <el-form-item label="输入码">
          <el-input v-model="codeForm.code" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="() => {this.codeVisible = false; cluster.find(({login}) => !login.syncSuccessLoading).login.syncSuccessLoading = true;}">取 消</el-button>
        <el-button type="primary" @click="saveCode">确 定</el-button>
      </div>
    </el-dialog>
    <!--获取接口测试结果-->
    <el-dialog
      top="0"
      title="测试结果"
      custom-class="json-box"
      :visible.sync="jsonVisible">
      <pre slot="footer">{{ jsonString }}</pre>
    </el-dialog>
    <!--提交参数设置-->
    <el-dialog top="0"
               ref=""
               title="接口提交测试"
               custom-class="enter-code"
               width="700px"
               :visible.sync="TjVisible">
      <div class="TjVisible-info">
        <el-table :data="tableData1"
                  style="width: 100%">
          <el-table-column prop="tit"
                           label="参数名"
                           width="180">
          </el-table-column>
          <el-table-column prop="type"
                           label="参数类型"
                           width="180">
          </el-table-column>
          <el-table-column label="值">
            <template slot-scope="scope">
              <el-input v-model="scope.row.val"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer">
        <el-button type="primary"
                   @click="interfaceTestRun">提交测试</el-button>
        <el-button @click="interfaceClearData">清空内容</el-button>
      </div>
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
import axios from 'axios';

export default {
  name: 'card',
  data () {
    return {
      total: 0,
      cardAnimationWidth: 0,
      moving: false,
      available: {
        left: 0,
        right: 0
      },
      clusterLeftDis: 0,
      value: 1,
      interFaceLoading: true,
      cluster: [],
      htmlType: 0,
      codeVisible: false,
      codeForm: {},
      codeLoaded: false,
      randomCode: '?time=' + Math.random(),
      codeLoading: false,
      jsonString: '',
      jsonVisible: false,
      testLoading: false,
      interface: {},
      tableData: [],
      TjVisible: false,
      tableData1: [],
      TVisible: false,
      processTestTableData: [],
      curTestRow: {}
    }
  },
  computed: {
    userInfo: function () {
      return this.$store.state.user
    },
    isSnapshotImage: function () {
      return this.userInfo.username === '演示'
    },
    curStyleVal: function () {
      return this.cardAnimationWidth * this.clusterLeftDis
    }
  },
  created () {
    this.loadLogins();
  },
  mounted () {
    window.addEventListener('resize', this.calcCardAnimationParam);
  },
  methods: {
    jumpHome () {
      this.$router.push('/project/home');
    },
    calcCardAnimationParam () {
      let card = document.querySelector('.clusters-card');
      let cardWidth = parseInt(window.getComputedStyle(card)['width']),
        cardMarginRight = parseInt(window.getComputedStyle(card)['marginRight']);

      let cardAnimationWidth = cardWidth + cardMarginRight;
      this.cardAnimationWidth = cardAnimationWidth;
    },
    clustersAnimation (direction) {
      if (this.moving) {
        return false;
      }

      this.moving = true;
      if (!this.cardAnimationWidth) {
        this.calcCardAnimationParam();
      }
      let canMoveNum = this.available[direction];

      if (canMoveNum) {
        let moveNum = canMoveNum > 4 ? 4 : canMoveNum;
        let dis = canMoveNum > 4 ? moveNum : (moveNum - 0.302);
        this.clustersAnimationHook(direction, moveNum, dis)
      } else {
        this.moving = false;
      }
    },
    clustersAnimationHook (direction, num, dis) {
      let aniStyleVal = direction === 'left' ? dis : -1 * dis;
      this.available[direction] = this.available[direction] - num;
      this.clusterLeftDis = this.clusterLeftDis + aniStyleVal;

      if (direction === 'left') {
        this.available.right = this.available.right + num;
      } else {
        this.available.left = this.available.left + num;
      }
      this.moving = false;
    },
    loadLogins () {
      this.$axios.post('/autoLogin/listAll', '', s => {
        this.loadInterfaces(s.data);
      })
    },
    loadInterfaces (loginList) {
      let data = new URLSearchParams();
      data.append('isPublished', '');
      data.append('type', '');
      data.append('searchValue', '');
      this.$axios.post('/interface/listAll', data, async s => {
        //add flowList
        let flowList = await this.loadProcess();
        flowList.map(flow => {
          let pubBase = this.$axios.downUrl();
          pubBase = /http/.test(pubBase) ? pubBase : [window.location.origin, pubBase].join('');
          flow.newpublishPath = [pubBase, this.baseConfig.FLOW_PUB_BASE_URL, flow.id].join('');
        });
        s.data = flowList.length ? s.data.concat(flowList) : s.data;

        this.total = s.data.length;
        this.cluster = loginList.reduce((acc, logincell) => {
          acc.push({
            login: Object.assign(logincell, {syncSuccessLoading: true, opText: ''}),
            obtainList: s.data.filter(cell => cell.type === 1 && logincell.id === cell.autoLoginId),
            isubmitList: s.data.filter(cell => cell.type === 0 && logincell.id === cell.autoLoginId),
            processList: s.data.filter(cell => cell.processName && logincell.id === cell.autoLoginId)
          })
          return acc
        }, []);



        if (this.isSnapshotImage) {
          let tiledList = s.data.filter(cell => !cell.autoLoginId);
          tiledList.forEach(tiled => {
            let obtainList = [],
              isubmitList = [],
              processList = [];
            tiled.processName ? processList.push(tiled) : tiled.type === 1 ? obtainList.push(tiled) : isubmitList.push(tiled);
            this.cluster.push({
              login: {
                id: tiled.id,
                autoLoginName: this.summary(tiled.interfaceName || tiled.processName, 10),
                syncSuccessLoading: true,
                opText: '',
                sessionStatus: 0,
                unnecessaryLogin: 1,
                unnecessaryTargetPreview: tiled.targetUrl || (async () => {
                  let flowData = await this.FlowDetail(tiled.id);
                  let startNode = flowData.nodeList.find(node => node.type === 'start');
                  return startNode.url
                })
              },
              obtainList,
              isubmitList,
              processList
            })
          })
        } else {
          let otherObtainList = s.data.filter(cell => cell.type === 1 && !cell.autoLoginId);
          let otherIsubmitList = s.data.filter(cell => cell.type === 0 && !cell.autoLoginId);
          let otherProcessList = s.data.filter(cell => cell.processName && !cell.autoLoginId);
          if (otherObtainList.length || otherIsubmitList.length || otherProcessList.length) {
            this.cluster.push({
              login: null,
              obtainList: otherObtainList,
              isubmitList: otherIsubmitList,
              processList: otherProcessList
            })
          }
        }

        //数据加载完成
        this.interFaceLoading = false;

        if (this.cluster.length > 4) {
          this.available.right = this.cluster.length - 4;
        }
      });
    },
    async loadProcess () {
      return new Promise((resolve, reject) => {
        let data = new URLSearchParams();
        data.append('isPublished', '');
        data.append('type', '');
        data.append('processName', '');
        this.$axios.post('/process/list', data, s => {
          resolve(s.data)
        }, e => { reject(e) });
      })
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
        row.sessionStatus = 1;
        this.$message.warning(res.data.statusText);
      }
      if (Number(res.data.status) === 0) {
        row.sessionStatus = 0;
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
        let curRow = this.cluster.find(({login}) => !login.syncSuccessLoading).login;

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
        let {status, statusText} = res.data;
        this.$nextTick(() => {
          row.syncSuccessLoading = true;
          if (status === 0) {
            row.sessionStatus = 0;
            this.$message.success(statusText);
          }
          if (status === 13) {
            row.sessionStatus = 1;
            this.$message.warning(statusText);
          }
        });
      });
    },

    /* @event 启用禁用修改 */
    changeEnable (isEnable, row) {
      let data = new URLSearchParams();
      data.append('id', row.id);
      data.append('isEnable', isEnable);
      this.$axios.post('/interface/enable', data, s => {
        let tip = isEnable ? '启用成功' : '禁用成功';
        this.$message.success(tip)
        row.isEnable = isEnable;
      });
    },
    /* @event 接口测试 */
    interfaceTest (row) {
      this.testLoading = true;
      /*let paths = this.baseConfig.TAILOR_URL + '/tailor/wisemotion/testrun?id=' + this.detailData.id + '&type=0 ';
      axios.post(paths).then((res) => {
        this.jsonString = JSON.stringify(res.data, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      });*/
      /*wisemotion deliver to exeactors*/
      let paths = '/interface/test?interfaceId=' + row.id + '&type=0 ';
      this.$axios.post(paths, '', (res) => {
        this.jsonString = res.data ? JSON.stringify(res.data, null, 4) : JSON.stringify(res, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      }, (e) => {
        this.testLoading = false;
      });
    },
    /* @event 接口测试 */
    interfaceIsubmitTest (row) {
      if (row) {
        this.tableData = row.items;
        this.interface = row;
      }

      console.log('接口结果填写数据')
      console.log(this.tableData)
      this.tableData1 = []
      this.tableData.forEach((item) => {
        let typename
        if (item.valueSaveAsType === 0) {
          typename = '字符串'
        } else if (item.valueSaveAsType === 1) {
          typename = '数字'
        } else if (item.valueSaveAsType === 2) {
          typename = '字符串列表'
        } else if (item.valueSaveAsType === 3) {
          typename = '数字列表'
        } else if (item.valueSaveAsType === 4) {
          typename = '对象'
        } else if (item.valueSaveAsType === 5) {
          typename = '对象列表'
        }
        let obj = {
          tit: item.valueSaveToKey,
          type: typename,
          val: ''
        }
        this.tableData1.push(obj)
      })
      console.log(this.tableData1)
      this.TjVisible = true
    },
    /* @event 接口测试数据清空 */
    interfaceClearData () {
      //console.log('接口测试数据清空')
      this.interfaceIsubmitTest()
    },
    /* @event 接口测试结果 */
    interfaceTestRun () {
      console.log('接口结果测试')
      console.log(this.baseConfig.TAILOR_URL)
      console.log(this.interface.id)
      console.log(' = ' + JSON.stringify(this.tableData1))
      let datarun = new URLSearchParams();
      //let dataNew = []
      for (var p in this.tableData1) { //遍历json数组时，这么写p为索引，0,1
        if (this.tableData1[p].val === '') {
          alert(this.tableData1[p].tit + '不能为空')
          return false;
        } else {
          datarun.append(this.tableData1[p].tit, this.tableData1[p].val)
        }

        //  let item = {
        //    key:this.tableData1[p].tit,
        //    val:this.tableData1[p].val
        //  }
        //  dataNew.append(item)
      }
      //datarun.push('data', this.tableData1)
      console.log(datarun);
      this.TjVisible = false;
      this.testLoading = true;
      this.jsonVisible = true;
      this.jsonString = '数据提交中';
      let paths = '/interface/test?interfaceId=' + this.interface.id + '&type=0 ';
      console.log('paths1 = ' + paths)
      this.$axios.post(paths, datarun, (res) => {
        this.jsonString = res.data ? JSON.stringify(res.data, null, 4) : JSON.stringify(res, null, 4);
        this.jsonVisible = true;
        this.testLoading = false;
      }, (e) => {
        this.jsonVisible = true;
        this.testLoading = false;
      });
    },
    /* @event 流程测试数据清空 */
    processClearData () {
      this.processTest(this.curTestRow);
    },
    /* @event 流程测试结果 */
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
    /* @event 流程测试 */
    async processTest (row) {
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
    targetGlance (row) {
      let {unnecessaryTargetPreview: path} = row;
      if (typeof path === 'function') {
        path().then(r => {
          row.unnecessaryTargetPreview = r;
          window.open(row.unnecessaryTargetPreview, '_blank');
        })
      } else {
        path && window.open(path, '_blank');
      }
    },
    interFaceGlance (row) {
      let path = row.processName ? '/WiseMotion/project/process?id=' : row.type === 1 ? '/WiseMotion/project/interface?id=' : '/WiseMotion/project/interfaceSubmit?id=';
      window.open([window.location.origin, path, row.id].join(''), '_blank');
    },
    /* @event 复制已发布地址 */
    copyPath (e) {
      try {
        e.target.select(); // 选择对象
        document.execCommand('Copy'); // 执行浏览器复制命令
        this.$message.success('复制成功！');
      } catch (e) {
        this.$message.error('复制错误！');
      }
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.calcCardAnimationParam);
  }
}
</script>
