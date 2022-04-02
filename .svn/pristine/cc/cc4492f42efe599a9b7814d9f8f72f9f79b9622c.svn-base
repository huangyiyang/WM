import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: sessionStorage.getItem('token'),
    user: JSON.parse(sessionStorage.getItem('user')),
    type: '',
    loginStatus: [
      { label: '在线', value: 0 },
      { label: '离线', value: 1 }
    ],
    taskStatus: [
      { label: '无数据', value: 0 },
      { label: '未开始', value: 1 },
      { label: '执行中', value: 2 },
      { label: '暂停', value: 3 },
      { label: '结束', value: 4 }
    ], // 任务状态
    applicationEditDialog: false, // 应用编辑
    applicationDetailDialog: false // 应用详情
  },
  getters: {
    applicationEditVisible (state, getters) {
      return state.applicationEditDialog;
    },
    applicationDetailVisible (state, getters) {
      return state.applicationDetailDialog;
    }
  },
  mutations: {
    setToken (state, token) {
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    setUser (state, user) {
      state.user = user;
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    loginOut (state) {
      state.token = '';
      state.user = '';
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
    setType (state, type) {
      state.type = type;
    },
    setApplicationEdit (status, dialog) {
      status.applicationEditDialog = dialog;
    },
    setApplicationDetail (status, dialog) {
      status.applicationDetailDialog = dialog;
    }
  },
  actions: {
  },
  modules: {
  }
})
