<template>
  <div class="management-list-except charts">
    <section class="project-module">
      <p class="project-module-name">
        图表管理
      </p>
      <div class="rt">
        <el-button type="primary" @click="addCharts">创建图表</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="filters">
        <div class="filters-type">
          <p class="label">图表类型</p>
          <el-select v-model="listFilter.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="filters-input">
          <el-input
            placeholder="关键字检索：图表名、接口名"
            v-model="listFilter.searchValue"
            clearable>
          </el-input>
        </div>
      </div>
      <el-table
        height="100%"
        :data="interfaceData"
        max-height="100%"
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="chartName"
          label="接口名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishUrl"
          show-overflow-tooltip
          label="发布URL地址">
        </el-table-column>
        <el-table-column
          align="center"
          label="接口图表类型">
          <template slot-scope="scope">
            <p>{{'123456'.includes(scope.row.type) ? ['', '饼状图', '柱状图', '折线图', '表格', '地图', '信息卡片'][scope.row.type] : ''}}</p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishTime"
          :formatter="dateFormatter"
          label="发布时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="apiUrl"
          show-overflow-tooltip
          label="使用数据接口">
        </el-table-column>
        <el-table-column
          align="center"
          label="发布状态">
          <template slot-scope="scope">
            <p class="normal" v-if="scope.row.isPublished === 1">
              <i></i>
              已发布
            </p>
            <p class="stop" v-else>
              <i></i>
              未发布
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <template v-if="scope.row.isPublished === 1">
              <p class="normal" v-if="scope.row.isEnable === 1 && scope.row.status === 1">
                <i></i>
                正常
              </p>
              <p class="abnormal" v-else-if="scope.row.isEnable === 1 && scope.row.status === 0">
                <i></i>
                异常
              </p>
              <p class="unknown" v-else-if="scope.row.isEnable === 1 && scope.row.status === 2">
                <i></i>
                未知
              </p>
              <p class="stop" v-else>
                <i></i>
                停用
              </p>
            </template>

            <template v-else>
              <p class="unknown">
                <i></i>
                已保存
              </p>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="viewClick(scope.row)"
              type="text"
              size="small">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <el-dialog title="选择需要创建的图表类型" v-if="chartsChoiceVisible" :visible.sync="chartsChoiceVisible" :before-close="chartsChoiceCancel">
      <el-radio-group class="charts-enable" v-model="chartsToSetup">
        <el-radio-button class="charts-enable-cell" v-for="chart in options.slice(1)" :label="chart.value" :key="chart.value">
          <figure class="charts-card">
            <img :src="'../../static/image/' + chartsIcons[chart.value] + '.png'" :alt="chart.label">
            <p>{{chart.label}}</p>
          </figure>
        </el-radio-button>
        <el-radio-button class="charts-enable-cell"  label="more" key="more" disabled>
          <figure class="charts-card">
            <img :src="'../../static/image/chart-more.png'" alt="更多">
            <p>更多类型即将上线</p>
          </figure>
        </el-radio-button>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button class="charts-next" :type="chartsToSetup ? 'primary' : ''" :plain="!chartsToSetup" @click="chartsSetupNext">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const chartsIcons = {
  '1': 'chart-pie',
  '2': 'chart-bar',
  '3': 'chart-line',
  '4': 'chart-table',
  '5': 'chart-map',
  '6': 'chart-cards',
  'more': 'chart-more'
}
export default {
  name: 'charts',
  data () {
    return {
      chartsIcons,
      interfaceData: [],
      listFilter: {
        type: '',
        searchValue: ''
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '饼状图'
        },
        {
          value: '2',
          label: '柱状图'
        },
        {
          value: '3',
          label: '折线图'
        },
        {
          value: '4',
          label: '表格'
        },
        {
          value: '5',
          label: '地图'
        },
        {
          value: '6',
          label: '信息卡片'
        }
      ],
      chartsChoiceVisible: false,
      chartsToSetup: ''
    }
  },
  created () {
    this.interfaceList();
  },
  watch: {
    'listFilter.type': function (newval, val) {
      if (newval !== val) {
        this.interfaceList()
      }
    },
    'listFilter.searchValue': function (newval, val) {
      if (newval !== val) {
        this.interfaceList()
      }
    }
  },
  methods: {
    // 日期格式化
    dateFormatter (row, column) {
      let datetime = row.publishTime;
      if (datetime) {
        return this.timestampToTime(datetime, true)
      }
      return ''
    },
    /* @event 新增接口点击事件 */
    addCharts () {
      this.chartsChoiceVisible = true;
    },
    chartsChoiceCancel (done) {
      this.chartsToSetup = '';
      done();
    },
    chartsSetupNext () {
      if (this.chartsToSetup) {
        this.$router.push('/project/charts/' + this.chartsToSetup);
      } else {
        this.$message.warning('请选择配置图表类型');
      }
    },
    /* @method 图表管理列表 */
    interfaceList () {
      let data = new URLSearchParams();
      Object.keys(this.listFilter).forEach(filter => {
        this.listFilter[filter] ? data.append(filter, this.listFilter[filter]) : data.append(filter, '')
      })
      this.$axios.post('/chart/list', data, s => {
        this.interfaceData = s.data;
      });
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      this.$router.push({path: '/project/charts/' + item.type, query: {id: item.id}});
    }
  }
}
</script>
