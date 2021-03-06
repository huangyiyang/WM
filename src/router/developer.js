export default [
  {
    path: '/developer',
    name: 'developer',
    component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/index'),
    meta: {
      title: 'WISEMOTION应用平台'
    },
    children: [
      {
        path: 'login',
        name: 'developerLogin',
        component: () => import(/* webpackChunkName: 'developerLoginProcess' */ '@/page/developer/login_process'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'interface',
        name: 'developerInterface',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/interface'),
        //component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/process'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'charts',
        name: 'developerCharts',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/charts'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'topic',
        name: 'developerTopic',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/topic'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'executor',
        name: 'executor',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/executor'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'shelves',
        name: 'developerShelves',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/shelves'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'apply',
        name: 'developerApply',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/apply'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'process',
        name: 'process',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/process'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'task',
        name: 'task',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/task'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'card',
        name: 'card',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/card'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'security',
        name: 'security',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/security'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      },
      {
        path: 'application',
        name: 'application',
        component: () => import(/* webpackChunkName: 'developer' */ '@/page/developer/application'),
        meta: {
          title: 'WISEMOTION应用平台'
        }
      }
    ]
  }
]
