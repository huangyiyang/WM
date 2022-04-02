<template>
  <div class="management-list-except user">
    <section class="project-module">
      <p class="project-module-name">
        接口调用记录
      </p>
    </section>
    <section class="project-info">
      <el-table
        height="100%"
        :data="recordData"
        max-height="100%"
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="title"
          label="商品名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          show-overflow-tooltip
          label="接口描述">
        </el-table-column>
        <el-table-column
          align="center"
          prop="useTime"
          label="调用时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="status"
          label="返回状态码">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'userRecord',
  data () {
    return {
      startTime: '',
      endTime: '',
      recordData: [],
      pageNum: 1,
      numPerPage: 20
    }
  },
  created () {
    this.recordList();
  },
  methods: {
    /* @method 接口调用记录列表 */
    recordList () {
      this.$axios.post('/buy/myUse', '', s => {
        this.recordData = s.data;
      });
    },
    /* @event 详情查看点击 */
    viewClick (item) {

    }
  }
}
</script>
