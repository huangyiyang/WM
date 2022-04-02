<template>
  <div class="management-list-except developer">
    <section class="project-module">
      <div class="project-module-name">
        上架管理
      </div>
      <div class="rt">
        <el-button type="primary" @click="putShelves">上架申请</el-button>
      </div>
    </section>
    <section class="project-info">
      <el-table
        height="100%"
        :data="shelvesData"
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
          prop="typeName"
          label="接口类型">
        </el-table-column>
        <el-table-column
          align="center"
          prop="onlineTime"
          label="上架时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="usenum"
          label="调用次数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="180">
          <template slot-scope="scope">
            <p class="normal" v-if="scope.row.status === 0">
              <i></i>
              审核中
            </p>
            <p class="abnormal" v-else-if="scope.row.status === 1">
              <i></i>
              已上架
            </p>
            <p class="unknown" v-else-if="scope.row.status === 2">
              <i></i>
              已下架
            </p>
            <p class="stop" v-else>
              <i></i>
              禁用
            </p>
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
  </div>
</template>

<script>
export default {
  name: 'developerShelves',
  data () {
    return {
      shelvesData: []
    }
  },
  created () {
    this.interfaceList();
  },
  methods: {
    /* @event 申请上架 */
    putShelves () {
      this.$router.push('/developer/apply');
    },
    /* @method 上架管理列表 */
    interfaceList () {
      this.$axios.post('/sell/myObjects', '', s => {
        this.shelvesData = s.data;
      });
    },
    /* @event 详情查看点击 */
    viewClick (item) {
      this.$router.push({path: '/developer/apply', query: {id: item.id}});
    }
  }
}
</script>
