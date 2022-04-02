<template>
  <div class="management-list-except">
    <section class="project-module">
      <p class="project-module-name">
        执行资源列表
      </p>
      <div class="rt">
        <el-button type="primary" @click="freshExecutor">更新</el-button>
      </div>
    </section>
    <section class="project-info">
      <el-table
        height="100%"
        :data="executorData"
        max-height="100%"
        style="width: 100%;"
        v-loading="loading"
        element-loading-text="资源数据加载中...">

        <el-table-column
          v-for="(item, i) in tableMenu" :key="i"
          v-if="item.isCheck"
          :width="item.width || 'auto'"
          :align="item.align || 'center'"
          :prop="item.prop"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.prop !== ''"
          :label="item.label">
          <template slot-scope="scope">
            <template v-if="item.prop === 'id'">
              {{ idToMark(scope.row[item.prop]) }}
            </template>
            <template v-else-if="item.prop === 'regTime'">
              {{ timestampToTime(scope.row[item.prop], 'YYYY-MM-DD hh:mm:ss') }}
            </template>
            <template v-else-if="item.prop === 'status'">
              <p class="abnormal" v-if="0 === scope.row.freeCount && scope.row.capacity">
                <i></i>
                繁忙
              </p>
              <p class="unknown" v-else-if="scope.row.capacity > scope.row.freeCount">
                <i></i>
                可用
              </p>
              <p class="stop" v-else-if="scope.row.status">
                <i></i>
                离线
              </p>
              <p class="normal" v-else>
                <i></i>
                空闲
              </p>
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'executor',
  data () {
    return {
      loading: false,
      executorData: [],
      tableMenu: [
        {isCheck: true, label: '版本', prop: 'version', width: this.rem2Px(180)},
        {isCheck: true, label: 'IP地址', prop: 'ip'},
        {isCheck: true, label: 'Mac地址', prop: 'mac'},
        {isCheck: true, label: '标识', prop: 'id'},
        {isCheck: true, label: '执行能力 ', prop: 'capacity', width: this.rem2Px(120)},
        {isCheck: true, label: '可用能力', prop: 'freeCount', width: this.rem2Px(120)},
        {isCheck: true, label: '启动时间', prop: 'regTime', width: this.rem2Px(180)},
        {isCheck: true, label: '状态', prop: 'status', width: this.rem2Px(180)}
      ]
    }
  },
  created () {
    this.executorList();
  },
  methods: {
    /* @event 新增登录点击事件 */
    freshExecutor () {
      this.executorList();
    },
    /* @method id转换为标识 */
    idToMark (param) {
      return param ? [param.slice(0, 5), param.slice(-5)].join('-') : '';
    },
    /* @method 登录管理列表 */
    executorList () {
      this.loading = true;
      this.$axios.get('/client/getClient', '', s => {
        this.executorData = s.data;
        setTimeout(() => {
          this.loading = false;
        }, 500);
      })
    }
  }
}
</script>
