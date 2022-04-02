<template>
  <div class="management-list-except">
    <section class="project-module">
      <p class="project-module-name">
        应用管理配置
      </p>
      <div class="rt">
        <el-button @click="newApplication" type="primary">新增应用</el-button>
      </div>
    </section>
    <section class="project-info developer-application flex-column">
      <div class="developer-application-title">
        <p class="title-text">自动登录应用</p>
        <div class="title-control">
          <i v-if="false" @click="applicationMove('l', 'login')"
             :class="['el-icon-arrow-left', {active: currentMax.login > pageSize}]"></i>
          <span>当前总数量: {{ total.login }}</span>
          <i v-if="false" @click="applicationMove('r', 'login')"
             :class="['el-icon-arrow-right', {active: total.login > currentMax.login}]"></i>
        </div>
      </div>
      <div class="developer-application-box">
        <ul ref="loginBox" class="developer-application-list" :style="`margin-left: ${moveDistance.login}px`">
          <li class="application" v-for="(item, i) in applicationData.login" :key="i">
            <el-image @click.native="applicationClick(item)" class="application-icon" :src="$axios.downUrl() + '/' + item.icon">
              <i slot="error" class="el-icon-picture-outline"></i>
            </el-image>
            <p class="application-title">
              {{ item.title || '暂无' }}
            </p>
            <el-tooltip class="application-more" effect="dark" placement="top">
              <div slot="content" class="more-tooltip">
                <p @click="applicationEdit(item)">编辑</p>
                <p @click="applicationDelete(item)">删除</p>
              </div>
              <i class="icon icon-more"></i>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="developer-application-title">
        <p class="title-text">自动任务应用</p>
        <div class="title-control">
          <i v-if="false" @click="applicationMove('l', 'task')"
             :class="['el-icon-arrow-left', {active: currentMax.task > pageSize}]"></i>
          <span>当前总数量: {{ total.task }}</span>
          <i v-if="false" @click="applicationMove('r', 'task')"
             :class="['el-icon-arrow-right', {active: total.task > currentMax.task}]"></i>
        </div>
      </div>
      <div class="developer-application-box box-flex">
        <el-scrollbar class="bottom-hidden">
          <ul ref="taskBox" class="developer-application-list" :style="`margin-left: ${moveDistance.task}px`">
            <li class="application" v-for="(item, i) in applicationData.task" :key="i">
              <el-image @click.native="applicationClick(item)" class="application-icon" :src="$axios.downUrl() + '/' + item.icon">
                <i slot="error" class="el-icon-picture-outline"></i>
              </el-image>
              <p class="application-title">
                {{ item.title || '暂无' }}
              </p>
              <el-tooltip class="application-more" effect="dark" placement="top">
                <div slot="content" class="more-tooltip">
                  <p @click="applicationEdit(item)">编辑</p>
                  <p @click="applicationDelete(item)">删除</p>
                </div>
                <i class="icon icon-more"></i>
              </el-tooltip>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </section>

    <ApplicationEdit :application-option="currentApplication" @save-success="applicationList"></ApplicationEdit>
    <ApplicationDetail :application-option="currentApplication" ></ApplicationDetail>
  </div>
</template>

<script>
import ApplicationEdit from '../../components/ApplicationEdit';
import ApplicationDetail from '../../components/ApplicationDetail';
export default {
  name: 'developer_application',
  components: {
    ApplicationEdit,
    ApplicationDetail
  },
  data () {
    return {
      queryOption: {},
      loading: false,
      pageSize: 4, // 每行个数
      currentMax: {
        login: 0,
        task: 0
      }, // 当前最大数
      moveDistance: {
        login: 0,
        task: 0
      }, // 移动距离
      total: {
        login: 0,
        task: 0
      }, // 总数
      applicationData: {
        login: [],
        task: []
      },
      currentApplication: {}
    }
  },
  created () {
    this.applicationList();
  },
  methods: {
    /* @method 新增应用 */
    newApplication () {
      this.currentApplication = {};
      this.$store.commit('setApplicationEdit', true);
    },
    /* @method 应用列表请求 */
    applicationList () {
      this.$axios.get('/app/list', '', s => {
        this.applicationData.login = s.data.filter(item => item.type === 1);
        this.total.login = this.applicationData.login.length;
        this.applicationData.task = s.data.filter(item => item.type === 3);
        this.total.task = this.applicationData.task.length;
      });
    },
    /* @event 移动
     * @param type | String --- 移动类型 [l/r]
     * @param dataType | String --- 数据类型 [login/task] */
    applicationMove (type, dataType) {
      let moveNum = 0;
      if (type === 'l') {
        if (this.currentMax[dataType] > this.pageSize) {
          if (this.currentMax[dataType] - this.pageSize >= this.pageSize) {
            this.currentMax[dataType] -= this.pageSize;
            moveNum = this.currentMax[dataType] - this.pageSize;
          } else {
            this.currentMax[dataType] = this.pageSize;
            moveNum = 0;
          }
          moveNum = this.currentMax[dataType] - this.pageSize;
        } else {
          return;
        }
      }
      if (type === 'r') {
        if (this.total[dataType] > this.currentMax[dataType]) {
          if (this.total[dataType] - this.currentMax[dataType] >= this.pageSize) {
            moveNum = this.currentMax[dataType];
            this.currentMax[dataType] += this.pageSize;
          } else {
            this.currentMax[dataType] = this.total[dataType];
            moveNum = this.total[dataType] - this.pageSize;
          }
        } else {
          return;
        }
      }
      this.$nextTick(() => {
        this.moveDistance[dataType] = -moveNum * (this.$refs[`${dataType}Box`].offsetWidth / this.pageSize);
      });
    },
    /* @event 应用点击 */
    applicationClick (item) {
      console.log(item);
      this.currentApplication = item;
      this.$store.commit('setApplicationDetail', true);
    },
    /* @event 应用编辑 */
    applicationEdit (item) {
      this.currentApplication = item;
      this.$store.commit('setApplicationEdit', true);
    },
    /* @event 应用删除 */
    applicationDelete (item) {
      console.log(item);
      this.$confirm('确认删除当前卡片？', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      }).then(() => {
        const data = new URLSearchParams();
        data.append('id', item.id);
        this.$axios.post('/app/del', data, s => {
          this.$message({
            showClose: true,
            duration: 2000,
            type: 'success',
            message: '删除成功！'
          });
          this.applicationList();
        });
      }).catch(() => { });
    }
  }
}
</script>
