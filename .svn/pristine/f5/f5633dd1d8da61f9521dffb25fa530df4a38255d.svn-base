<template>
  <div class="management-list-except topic">
    <section class="project-module">
      <p class="project-module-name">
        专题管理
      </p>
      <div class="rt">
        <el-button type="primary" @click="addTopic">创建专题页</el-button>
      </div>
    </section>
    <section class="project-info">
      <div class="filters">
        <div class="filters-type">
          <p class="label">专题类型</p>
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
            placeholder="关键字检索：专题名"
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
          prop="topicName"
          label="专题名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishUrl"
          show-overflow-tooltip
          label="发布URL地址">
        </el-table-column>
        <el-table-column
          align="center"
          prop="publishTime"
          :formatter="dateFormatter"
          label="发布时间">
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
              <p class="normal" v-if="scope.row.isEnable === 1">
                <i></i>
                正常
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
              @click.native.prevent="publishedClick(scope.row)"
              type="text"
              v-if="scope.row.isPublished"
              size="small">
              查看
            </el-button>
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
    <el-dialog title="选择需要创建的专题布局" v-if="topicChoiceVisible" :visible.sync="topicChoiceVisible" :before-close="topicChoiceCancel">
      <el-radio-group class="topic-enable" v-model="topicToSetup">
        <el-radio-button class="topic-enable-cell" v-for="topic in options.slice(1)" :label="topic.value" :key="topic.value">
          <figure class="topic-card">
            <img :src="'../../static/image/topic/' + topicIcons[topic.value] + '.png'" :alt="topic.label">
            <p>{{topic.label}}</p>
          </figure>
        </el-radio-button>
      </el-radio-group>
      <div slot="footer" class="dialog-footer">
        <el-button class="topic-next" :type="topicToSetup ? 'primary' : ''" :plain="!topicToSetup" @click="topicSetupNext">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
const topicIcons = {
  '1': 'layout-1'
}
export default {
  name: 'topic',
  data () {
    return {
      topicIcons,
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
          label: '专题layout1'
        }
      ],
      topicChoiceVisible: false,
      topicToSetup: ''
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
    addTopic () {
      this.topicChoiceVisible = true;
    },
    topicChoiceCancel (done) {
      this.topicToSetup = '';
      done();
    },
    topicSetupNext () {
      if (this.topicToSetup) {
        this.$router.push('/project/topic/' + this.topicToSetup);
      } else {
        this.$message.warning('请选择配置专题模板');
      }
    },
    /* @method 专题管理列表 */
    interfaceList () {
      let data = new URLSearchParams();
      Object.keys(this.listFilter).forEach(filter => {
        this.listFilter[filter] ? data.append(filter, this.listFilter[filter]) : data.append(filter, '')
      })
      this.$axios.post('/topic/list', data, s => {
        this.interfaceData = s.data;
      });
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      this.$router.push({path: '/project/topic/1', query: {id: item.id}});
    },
    /* @event 发布页面查看点击 */
    publishedClick (item) {
      window.open(item.publishUrl);
    }
  }
}
</script>
