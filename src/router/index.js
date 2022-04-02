import Vue from 'vue'
import Router from 'vue-router'
import home from './home'
import project from './project'
import developer from './developer'
import moJing from './moJing'

/*const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}*/
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/WiseMotion/',
  routes: [
    {
      path: '/',
      redirect: '/home/page'
    },
    {
      path: '/msgCode',
      name: 'msgCode',
      component: () => import(/* webpackChunkName: 'login' */ '@/page/yzm'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: 'login' */ '@/page/login'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: 'register' */ '@/page/register'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/page/dashbord/card'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import(/* webpackChunkName: 'dashboard' */ '@/page/dashbord/card_new'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/index',
      name: 'index',
      redirect: '/home/page'
    },
    {
      path: '/topic/:layout/:id',
      name: 'viewTopic',
      component: () => import(/* webpackChunkName: 'viewTopic' */ '@/page/project/topic'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    {
      path: '/topic/preview/:layout/:id',
      name: 'previewTopic',
      component: () => import(/* webpackChunkName: 'previewTopic' */ '@/page/project/topic'),
      meta: {
        title: 'WISEMOTION应用平台'
      }
    },
    ...home,
    ...project,
    ...developer,
    ...moJing,
    {
      path: '/404',
      name: '404',
      component: () => import(/* webpackChunkName: 'error' */ '@/page/error/404')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})
