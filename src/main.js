// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueContextMenu from 'vue-contextmenu'
import vcolorpicker from 'vcolorpicker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from './store'
import axios from './axios/index'
import custom from './assets/js/custom'
import './assets/js/rem'
import 'url-search-params-polyfill'
import 'formdata-polyfill'
import ajax from 'axios'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-javascript.min';
import 'prismjs/themes/prism.css';
import '../static/js/iconfont'
import mm from 'mm-method'
//import VueJsonPretty from 'vue-json-pretty'
import echarts from 'echarts'
import china from 'echarts/map/json/china.json'

import HomeHeader from './components/HomeHeader'
import HomeFooter from './components/HomeFooter'
import ProjectHeader from './components/ProjectHeader'
import ManagementList from './components/ManagementList'

import VuePrismEditor from 'vue-prism-editor';
import 'vue-prism-editor/dist/VuePrismEditor.css'; // import the styles
import VueJsonViewer from 'vue-json-viewer'
Vue.component('json-viewer', VueJsonViewer);
Vue.component('prism-editor', VuePrismEditor);

Vue.component('home-header', HomeHeader);
Vue.component('home-footer', HomeFooter);
Vue.component('project-header', ProjectHeader);
Vue.component('management-list', ManagementList);
//引入json可视化选择插件 Vue.use(VueJsonPretty);
//Vue.component('VueJsonPretty', VueJsonPretty);

Object.keys(mm).forEach(key => {
  Vue.prototype[key] = mm[key];
});

Prism.highlightAll();

Vue.prototype.$axios = axios
Vue.config.productionTip = false
//引入echart
echarts.registerMap('china', china);
Vue.prototype.$echarts = echarts;

Vue.use(custom);
Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(VueContextMenu);
Vue.use(vcolorpicker);

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，验证本地存储是否有token
    if (!localStorage.token) { // 判断当前的token是否存在
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
  next()
});

// 设置请求配置文件
const path = require('path');
let url = '';
if (process.env.NODE_ENV === 'development') {
  url = path.join(__dirname, 'static', 'config.json');
} else {
  url = path.join(__dirname, 'WiseMotion/static', 'config.json');
}

ajax.get(url).then(s => {
  Vue.prototype.baseConfig = s.data;

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    components: { App },
    template: '<App/>'
  });
}).catch(e => {
  console.log(e);
});
