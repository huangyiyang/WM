<template>
  <div class="management-list-except bi-mojing">

    <section class="project-module">
      <p class="project-module-name">
        数据可视化-{{moudleName[module]}}
      </p>
      <div class="rt">
        <div class="project-application">
          <label>当前应用</label>
          <el-select v-model="curProject" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.projectId"
              :label="item.projectName"
              :value="item.projectId">
            </el-option>
          </el-select>
        </div>
      </div>
    </section>
    <section class="project-info">
      <div class="bi-mojing-container">
        <iframe v-if="modulePageShow" :src="modulePage" frameborder="0"></iframe>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'mojinglayout',
  data () {
    return {
      uri: {
        projects: 'http://www.wosoo.net:18122/projects.html',
        datasource: 'http://www.wosoo.net:18122/datasource.html',
        analyse: 'http://www.wosoo.net:18122/analyse.html#/',
        board: 'http://www.wosoo.net:18122/board.html#/board/'
      },
      moudleName: {
        projects: '应用列表',
        datasource: '数据准备',
        analyse: '数据分析',
        board: '专题设计'
      },
      projectInfoData: {},
      boardInfoData: {},
      options: [],
      curProject: '',
      bProjectId: '',
      modulePageShow: true
    }
  },
  watch: {
    'curProject': function (val) {
      sessionStorage.setItem('moPresistProject', val);
    },
    'module': function (newval, val) {
      if (['board', 'analyse'].includes(newval) && !this.curProject) {
        this.$message.warning('请选择应用或者创建应用!')
      }
    }
  },
  computed: {
    ...mapState({
      user: 'user'
    }),
    module: function () {
      return this.$route.meta.moudle
    },
    moduleUri: function () {
      return this.uri[this.module]
    },
    moToken: function () {
      let {token} = this.user.mojiongInfo;
      return token
    },
    modulePage: function () {
      let pageUri = '';
      switch (this.module) {
        case 'projects':
          pageUri = this.ModelPage();
          break;
        case 'datasource':
          pageUri = this.ModelPage();
          break;
        case 'analyse':
          pageUri = this.analysePage();
          break;
        case 'board':
          pageUri = this.boardPage();
          break;
        default:
          pageUri = this.ModelPage();
          break;
      }

      return pageUri
    }
  },
  methods: {
    ...mapMutations({
      setUser: 'setUser'
    }),
    ModelPage () {
      if (this.bProjectId !== this.curProject) {
        this.mojingList();
      }

      let {mProjects, mBoards} = this.projectInit();
      if (mBoards.length) {
        let [{id: mboardId, projectId: bProjectId}] = mBoards;
        this.curProject && (this.bProjectId = bProjectId);
      }
      return [this.moduleUri, '?mode=embed&token=', this.moToken].join('')
    },
    analysePage () {
      if (this.bProjectId !== this.curProject) {
        this.mojingList();
      }

      let {mProjects, mBoards} = this.projectInit();
      console.log(mProjects, mBoards)
      if (mProjects.length) {
        let [{id: mboardId, projectId: bProjectId}] = mBoards;
        this.curProject && (this.bProjectId = bProjectId);
        return [this.moduleUri, '?p=', this.curProject, '&mode=embed&token=', this.moToken].join('')
      }

      return [this.moduleUri, '?mode=embed&token=', this.moToken].join('')
    },
    boardPage () {
      if (this.bProjectId !== this.curProject) {
        this.mojingList();
      }

      let {mProjects, mBoards} = this.projectInit();
      if (mProjects.length) {
        let [{id: mboardId, projectId: bProjectId}] = mBoards;
        this.curProject && (this.bProjectId = bProjectId);
        return [this.moduleUri, mboardId, '?p=', this.curProject, '&token=', this.moToken].join('')
      }

      return [this.moduleUri, '?mode=embed&token=', this.moToken].join('')
    },
    async mojingList () {
      this.modulePageShow = false;
      let projectInfo = await this.projectInfo();
      this.projectInfoData = projectInfo;
      let {statusCode, data} = projectInfo;
      if (statusCode === 0) {
        let {data: projects} = data;
        if (projects.length) {
          let [{projectId}] = projects;
          if (!projectId) {
            this.modulePageShow = true;
            return false;
          }
          let presistProject = sessionStorage.getItem('moPresistProject');
          let boardInfo = presistProject ? await this.boardInfo(Number(presistProject)) : this.curProject ? await this.boardInfo(this.curProject) : await this.boardInfo(projectId);
          this.modulePageShow = true;
          this.boardInfoData = boardInfo;
          let {mojiongInfo} = this.user;
          mojiongInfo = Object.assign(mojiongInfo, {projectInfo, boardInfo, curProject: this.curProject});
          if (this.bProjectId !== this.curProject) {
            console.log(this.bProjectId !== this.curProject && this.curProject);
            this.setUser(Object.assign(this.user, {mojiongInfo}));
          }
        } else {
          this.modulePageShow = true;
          return false;
        }
      }
    },
    projectInfo () {
      return new Promise((resolve, reject) => {
        this.$axios.get('/mojing/getProjects', '', s => {
          resolve(s)
        }, e => reject(e))
      })
    },
    boardInfo (projectId) {
      return new Promise((resolve, reject) => {
        this.$axios.get('/mojing/getBoards?pId=' + projectId, '', s => {
          resolve(s)
        }, e => reject(e))
      })
    },
    projectInit () {
      let {mojiongInfo: {curProject, projectInfo: initProjectInfo, boardInfo: initBoardInfo}} = this.user;
      if (initProjectInfo) {
        let {data: {data: mProjects}} = initProjectInfo;
        if (mProjects.length) {
          let {data: {data: mBoards}} = initBoardInfo;
          // console.log(mProjects, mBoards, curProject)
          this.options = mProjects;
          if (!this.curProject) {
            let presistProject = sessionStorage.getItem('moPresistProject');
            presistProject && (this.curProject = Number(presistProject));
          }

          return {mProjects, mBoards}
        }
      }




      return {mProjects: [], mBoards: []}
    }
  },
  created () {
    this.mojingList();
    if (['board', 'analyse'].includes(this.module) && !sessionStorage.getItem('moPresistProject')) {
      this.$message.warning('请选择应用或者创建应用!')
    }
  }
}
</script>
