<template>
  <div :class="['project-topic', 'chartsColors', {'topicViews': viewMode || previewMode}]">
    <section class="project-module" v-if="setupMode">
      <p class="project-module-name">
        专题配置 <span>[{{ detailData.topicName || '新增专题配置' }}]</span>
      </p>
      <div class="rt">
        <template v-if="status.isPublished === 1">
          发布地址：
          <el-input id="publishPath" class="publish-path" v-model="publishPath" readonly
                    @click.native="copyPath"></el-input>
        </template>
        <el-button type="primary" @click="topicPublish">
          {{ status.isPublished === 0 ? '发布' : '取消发布' }}
        </el-button>
        <el-button type="primary"   @click="topicPreView">预览</el-button>
        <el-button type="primary"  :disabled="topicSaveLoading" @click="topicSave">保存</el-button>
        <el-button type="danger" v-if="detailData.id" @click="deleteClick">删除</el-button>
      </div>
    </section>
    <div class="project-topic-header">
      <p class="project-topic-name" @click="topicEidt = true">
        <template v-if="setupMode && (topicEidt || !detailData.id)"><el-input v-model="detailData.topicName"></el-input></template>
        <template v-else>{{detailData.topicName}}</template>
      </p>
    </div>
    <div class="project-topic-body">
      <div class="topic-panel-area topic-panel-area__left">
        <div class="topic-cards">
          <p class="topic-cards-title">
            {{charts[0].partName || '信息卡片组'}}
          </p>
          <panel-body
            class="chart0"
            :chartProp="charts[0]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[0], 'hover')"
            @mouseleave.native="panelHandle(charts[0], 'leave')">
          </panel-body>
        </div>
        <div class="topic-panel topic-panel-half">
          <p class="topic-panel-title">
            {{charts[1].partName || '图表1'}}
          </p>
          <panel-body
            class="chart1"
            :chartProp="charts[1]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[1], 'hover')"
            @mouseleave.native="panelHandle(charts[1], 'leave')">
          </panel-body>
        </div>
        <div class="topic-panel topic-panel-half">
          <p class="topic-panel-title">
            {{charts[2].partName || '图表2'}}
          </p>
          <panel-body
            class="chart2"
            :chartProp="charts[2]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[2], 'hover')"
            @mouseleave.native="panelHandle(charts[2], 'leave')">
          </panel-body>
        </div>
      </div>
      <div class="topic-panel-area topic-panel-area__center">
        <panel-body
          class="no-title"
          :chartProp="charts[3]"
          @panelOpreat="panelAction"
          @mouseenter.native="panelHandle(charts[3], 'hover')"
          @mouseleave.native="panelHandle(charts[3], 'leave')">
        </panel-body>
      </div>
      <div class="topic-panel-area topic-panel-area__right">
        <div class="topic-panel topic-panel-trisection">
          <p class="topic-panel-title">
            {{charts[4].partName || '图表3'}}
          </p>
          <panel-body
            class="chart3"
            :chartProp="charts[4]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[4], 'hover')"
            @mouseleave.native="panelHandle(charts[4], 'leave')">
          </panel-body>
        </div>
        <div class="topic-panel topic-panel-trisection">
          <p class="topic-panel-title">
            {{charts[5].partName || '图表4'}}
          </p>
          <panel-body
            class="chart6"
            :chartProp="charts[5]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[5], 'hover')"
            @mouseleave.native="panelHandle(charts[5], 'leave')">
          </panel-body>
        </div>
        <div class="topic-panel topic-panel-trisection">
          <p class="topic-panel-title">
            {{charts[6].partName || '图表5'}}
          </p>
          <panel-body
            class="chart7"
            :chartProp="charts[6]"
            @panelOpreat="panelAction"
            @mouseenter.native="panelHandle(charts[6], 'hover')"
            @mouseleave.native="panelHandle(charts[6], 'leave')">
          </panel-body>
        </div>
      </div>
    </div>

    <el-dialog title="选择专题区域图表"
               class="cookJson-dailog custom-dialog"
               v-if="panelSelectShow"
               :visible.sync="panelSelectShow"
               :modal-append-to-body='false'
    >
      <el-form :model="regionForm">
        <el-form-item label="区域图表">
          <el-select v-model="regionForm.regionChart" placeholder="请选择区域图表">
            <el-option
              v-for="option in panelSelectOptions"
              :key="option.id"
              :label="option.chartName"
              :value="option.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="panelSelectShow = false">取 消</el-button>
        <el-button type="primary" @click="panelSelectDone">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import panelBody from '@/components/topic/1/panel'
export default {
  name: 'topic',
  data () {
    return {
      topicEidt: false,
      topicSaveLoading: false,
      panelSelectShow: false,
      panelSelectOptions: [],
      curChart: {
        id: '',
        name: ''
      },
      regionForm: {
        regionChart: ''
      },
      detailData: {
        id: '',
        topicName: ''
      },
      publishPath: '',
      status: {
        isPublished: 0
      },
      charts: [
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '6',
          name: 'chart1',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '',
          name: 'chart2',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '',
          name: 'chart3',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '5',
          name: 'chart4',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '',
          name: 'chart5',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '',
          name: 'chart6',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        },
        {
          id: '',
          edit: true,
          empty: true,
          active: false,
          type: '',
          name: 'chart7',
          contentId: '',
          contentUrl: '',
          contentType: '',
          partName: ''
        }
      ]
    }
  },
  components: {
    panelBody
  },
  computed: {
    viewId: function () {
      return this.$route.query.id || this.$route.params.id
    },
    setupMode: function () {
      return this.$route.name === 'projectTopic'
    },
    viewMode: function () {
      return this.$route.name === 'viewTopic'
    },
    previewMode: function () {
      return this.$route.name === 'previewTopic'
    },
    detailDataUrl: function () {
      return this.viewMode ? '/wiseMotion/topicData' : '/topic/detail'
    }
  },
  provide () {
    return {
      setupMode: this.setupMode,
      previewMode: this.previewMode
    }
  },
  methods: {
    panelHandle (chart, action) {
      // console.log(chart, action)
      if (action === 'hover') {
        chart.edit && (this.charts.find(_chart => _chart.name === chart.name).active = true);
      }
      if (action === 'leave') {
        chart.edit && (this.charts.find(_chart => _chart.name === chart.name).active = false);
      }
    },
    panelAction (action) {
      const {type, data: {name: panel}} = action;
      if (type === 'del') {
        this.panelDel(panel)
      } else {
        this.panelSelect(panel)
      }
    },
    panelSelect (panel) {
      if (!this.viewId) {
        this.$message.info('请保存专题页名称后再选择！')
        return false
      }
      this.panelSelectShow = true;
      this.curChart.name = panel;
      let curChart = this.charts.find(chart => chart.name === panel);
      let data = new URLSearchParams();
      if (curChart.type) {
        data.append('type', curChart.type);
      } else {
        data.append('type', '1,2,3,4');
      }
      this.$axios.get('chart/options', data, r => {
        this.panelSelectOptions = r.data
      })
    },
    panelSelectDone () {
      this.panelSelectShow = false;
      this.curChart.id = this.regionForm.regionChart;
      let curChart = this.charts.find(chart => chart.name === this.curChart.name);
      let checkedChart = this.panelSelectOptions.find(chart => chart.id === this.curChart.id);

      curChart = Object.assign({}, curChart, {
        contentId: checkedChart.id,
        contentUrl: checkedChart.publishUrl,
        contentType: checkedChart.type,
        empty: false
      });

      const {chartName, publishUrl, type, id} = checkedChart;
      const {name: position, id: panelId} = curChart;
      const partPost = {
        id: panelId,
        partName: chartName,
        positionCode: position,
        contentUrl: publishUrl,
        fillType: '2',
        contentType: type,
        contentId: id,
        topicId: this.detailData.id
      }

      let data = new URLSearchParams(partPost);
      this.$axios.post('/topic/savePart', data, r => {
        this.charts = this.charts.map(chart => {
          if (chart.name === this.curChart.name) {
            return Object.assign({}, curChart, {
              id: '',
              contentId: '',
              contentUrl: '',
              contentType: '',
              empty: true,
              partName: ''
            })
          }
          return chart
        });
        this.$message.success('保存成功！')
        curChart = Object.assign({}, curChart, {
          id: r.data.id,
          partName: r.data.partName
        })
        this.charts = this.charts.map(chart => {
          if (chart.name === this.curChart.name) {
            return curChart
          }
          return chart
        });
      })

      this.panelSelectOptions = [];
    },
    panelDel (panel) {
      this.$confirm('确认删除当前图表？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let curChart = this.charts.find(chart => chart.name === panel);
        console.log(curChart)
        let data = new URLSearchParams();
        data.append('id', curChart.id);
        let self = this;
        this.$axios.post('/topic/deletePart', data, s => {
          this.$message.success({
            message: '删除成功！',
            duration: 1500,
            onClose: () => {
              curChart = Object.assign({}, curChart, {
                id: '',
                contentId: '',
                contentUrl: '',
                contentType: '',
                empty: true,
                partName: ''
              });
              self.charts = self.charts.map(chart => {
                if (chart.name === panel) {
                  return curChart
                }
                return chart
              });
            }
          });
        });
      }).catch(() => {});
    },
    /*获取专题页所有展示位配置*/
    async topicLoad () {
      this.topicSaveLoading = true;
      let data = new URLSearchParams();
      data.append('id', this.viewId);
      if (!this.viewId) {
        this.topicSaveLoading = false;
        return false
      }
      let url = this.detailDataUrl;
      // if (this.viewMode) {
      //   console.log(this.baseConfig)
      //   url = [this.detailDataUrl, this.viewId].join('/');
      // }
      this.$axios.post(url, data, s => {
        this.topicSaveLoading = false;
        /*容器*/
        Object.keys(this.detailData).forEach(rk => {
          this.detailData[rk] = s.data[rk];
        })
        /*发布状态及发布地址*/
        this.status.isPublished = s.data.isPublished;
        this.publishPath = s.data.publishUrl;
        /*展示位 code*/
        const ExsitChartList = s.data.topicPartList;
        this.charts = this.charts.map(chart => {
          const ExsitChart = ExsitChartList.find(_chart => {
            return _chart.positionCode === chart.name
          })
          if (ExsitChart) {
            let {id, contentId, contentUrl, contentType, partName} = ExsitChart
            return Object.assign({}, chart, {
              id,
              contentId,
              contentUrl,
              contentType,
              partName,
              empty: false
            })
          }
          return chart
        });
      });
    },
    /*创建专题页容器*/
    async topicSave () {
      this.topicEidt = false;
      this.topicSaveLoading = true;
      let data = new URLSearchParams(this.detailData);
      this.$axios.post('/topic/save', data, r => {
        this.topicSaveLoading = false;
        Object.keys(this.detailData).forEach(rk => {
          this.detailData[rk] = r.data[rk];
        })
        this.$router.push({path: '/project/topic/1', query: {id: r.data.id}});
      }, e => {
        this.topicSaveLoading = true;
      });
    },
    /* @event 删除事件 */
    async deleteClick () {
      this.$confirm('确认删除当前专题？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        let data = new URLSearchParams();
        data.append('id', this.detailData.id);
        this.$axios.post('/topic/delete', data, s => {
          this.$message.success('删除成功！');
          this.$emit('update-list', true);
          this.$router.push('/developer/topic');
        });
      }).catch(() => {});
    },
    /*专题发布*/
    async topicPublish () {
      let data = new URLSearchParams();
      data.append('id', this.viewId);
      data.append('isPublished', this.status.isPublished ? '0' : '1');
      this.$axios.post('/topic/publish', data, r => {
        this.$message.success(r.message);
        this.topicLoad();
      })
    },
    /*专题预览*/
    async topicPreView () {
      window.open('/WiseMotion/topic/preview/1/' + this.viewId)
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
    }
  },
  created () {
    this.topicLoad()
  }
}
</script>
