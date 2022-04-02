export default [
  {
    path: '/project',
    name: 'project',
    redirect: '/project/home',
    component: () => import(/* webpackChunkName: 'project' */ '@/page/project/index'),
    meta: {
      title: 'WISEMOTION应用平台'
    },
    children: [
      {
        path: 'home',
        name: 'projectHome',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/home'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'login',
        name: 'projectLogin',
        component: () => import(/* webpackChunkName: 'projectLoginProcess' */ '@/page/project/login_process'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'interface',
        name: 'projectInterface',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/interface'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'interfaceSubmit',
        name: 'projectInterfaceSubmit',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/interface_submit'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'charts/:type',
        name: 'projectCharts',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/charts'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'topic/:layout',
        name: 'projectTopic',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/topic'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'process',
        name: '/project/process',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/process'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'task',
        name: '/project/task',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/task'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'api',
        name: '/project/api',
        component: () => import(/* webpackChunkName: 'project' */ '@/page/project/api'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'flow/design',
        name: 'flowDesignPlugin',
        component: () => import(/* webpackChunkName: 'projectPlugin' */ '@/components/flow/designer/FlowDesigner'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      }
    ]
  },
  {
    path: '/console',
    redirect: '/project/home'
  }
]
