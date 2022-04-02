<template>
  <div class="management-list-except user">
    <section class="project-module">
      <p class="project-module-name">
        接口申请
      </p>
    </section>
    <section class="project-info">
      <el-table
        height="100%"
        :data="interfaceData"
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
          prop="buyTime"
          label="购买时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="usenum"
          label="已调用次数">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'userInterface',
  data () {
    return {
      startTime: '',
      endTime: '',
      interfaceData: [],
      pageNum: 1,
      numPerPage: 20
    }
  },
  created () {
    this.interfaceList();
  },
  methods: {
    /* @method 接口申请记录列表 */
    interfaceList () {
      let data = new URLSearchParams();
      data.append('startTime', this.startTime);
      data.append('endTime', this.endTime);
      data.append('pageNum', this.pageNum);
      data.append('numPerPage', this.numPerPage);
      this.$axios.post('/buy/myObjects', '', s => {
        this.interfaceData = s.data;
      });
    }
  }
}
</script>
