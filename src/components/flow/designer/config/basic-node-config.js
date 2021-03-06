export const tools = [
  {
    type: 'drag',
    icon: 'drag',
    name: '拖拽'
  },
  {
    type: 'connection',
    icon: 'fork',
    name: '连线'
  },
  {
    type: 'zoom-in',
    icon: 'zoom-in',
    name: '放大'
  },
  {
    type: 'zoom-out',
    icon: 'zoom-out',
    name: '缩小'
  }
];


const ComponentNameHub = {
  start: 'start',
  end: 'end',
  set: 'common',
  get: 'gain',
  click: 'event',
  custom: 'custom',
  decision: 'condition',
  wait: 'wait',
  loopStart: 'loopStart',
  loopEnd: 'loopEnd',
  loopBreak: 'loopBreak',
  loopContinue: 'loopContinue',
  subprocess: 'subprocess',
  checkLogin: 'checkLogin',
  captcha: 'captcha',
  screenshot: 'screenshot',
  extendedFunction: 'extendedFunction',
  varAssignment: 'varAssignment',
  httpFetch: 'httpFetch',
  passwordSet: 'passwordSet',
  subBlock: 'subBlock',
  pageLoad: 'pageLoad',
  dataSlot: 'dataSlot',
  merge: 'merge',
  goto: 'goto',
  download: 'download',
  asyncQuery: 'asyncQuery',
  smsVerification: 'smsVerification',
  chooseFile: 'chooseFile',
  cleanCache: 'cleanCache',
  innerBlock: 'innerBlock',
  blockStart: 'blockStart',
  blockEnd: 'blockEnd'
};

export const completeNodes = (() => Object.keys(ComponentNameHub))();
const curComponentName = function (curType) {
  return completeNodes.includes(curType) ? ComponentNameHub[curType] : 'start';
}
export const judgeCurAttrName = function () {
  let curType = this.currentSelect.type;
  return [curComponentName(curType), 'Attr'].join('')
};
export const judgeCurNodeName = function () {
  let curType = this.node.type;
  return [curComponentName(curType), 'Node'].join('')
};
const commonNodes = [
  {
    type: 'start',
    nodeName: '开始',
    url: '',
    variable: '',
    urlVarName: '',
    loginId: '',
    icon: 'StartIcon',
    flag: true,
    openInMainTab: 0,
    checkLogin: 0,
    checkTimes: 0
  },
  {
    type: 'end',
    nodeName: '结束',
    icon: 'EndIcon',
    retVarName: '',
    retError: 0, //是否异常 0,1
    userCode: 0,
    userMessage: '',
    waitAllAsyncNodeEnd: 0 //等待异步节点完成 1等待,0 不等待
  },
  {
    type: 'set',
    nodeName: '输入节点',
    icon: 'CommonIcon',
    elementPath: '',
    screenShot: '',
    setAttribute: 'value',
    setVarName: ''
  },
  {
    type: 'get',
    nodeName: '获取节点',
    icon: 'FreedomIcon',
    outputVarName: '',
    maxOrder: 2,
    ignoreError: 0,
    elementInfos: [
      {
        customScript: '',
        children: [
        ],
        elementAttributeName: 0,
        subOrder: 1,
        isCustom: 0,
        elementPath: '',
        valueSaveToKey: '',
        valueSaveAsType: 0,
        elementPathType: 0,
        exeMode: 0,
        setElementValue: ''
      }
    ]
  },
  {
    type: 'click',
    nodeName: '点击节点',
    icon: 'EventIcon',
    elementPath: '',
    screenShot: '',
    mouseClick: 0,
    waitNecessary: 0,
    waitTime: 800,
    ignoreError: 0
  },
  {
    type: 'custom',
    nodeName: '自定义代码',
    icon: 'EventIcon',
    script: 'function(){wmExitEval(null);}',
    inputVarName: '',
    outputVarName: '',
    framePath: ''
  },
  {
    type: 'decision',
    nodeName: '条件判断',
    icon: 'EventIcon',
    condition: '',
    operator: 'exist',
    leftVarName: '',
    rightVarName: ''
  },
  {
    type: 'wait',
    nodeName: '等待节点',
    icon: 'EventIcon',
    waitTime: 600,
    isCustom: 0,
    script: '',
    waitUntilEle: ''
  },
  {
    type: 'loopStart',
    nodeName: '循环起点',
    icon: 'EventIcon',
    loopVarName: ''
  },
  {
    type: 'loopEnd',
    nodeName: '循环终点',
    icon: 'EventIcon',
    outputVarName: '',
    outputVarItem: ''
  },
  {
    type: 'loopBreak',
    nodeName: '循环跳出',
    icon: 'EventIcon',
    leftVarName: '',
    rightVarName: '',
    operator: 'exist'
  },
  {
    type: 'loopContinue',
    nodeName: '循环继续',
    icon: 'EventIcon',
    leftVarName: '',
    rightVarName: '',
    operator: 'exist'
  },
  {
    type: 'subprocess',
    nodeName: '子流程',
    icon: 'ChildFlowIcon',
    subProcessId: '',
    inputVarName: '',
    outputVarName: '',
    urlVarName: '',
    assignToLastTab: 0
  },
  {
    type: 'subBlock',
    nodeName: '公共代码快',
    icon: 'ChildFlowIcon',
    subBlockId: '',
    inputVarName: '',
    outputVarName: ''
  },
  {
    type: 'pageLoad',
    nodeName: '页面加载',
    icon: 'EventIcon',
    loadUrl: '',
    loadType: 'load'
  },
  {
    type: 'innerBlock',
    nodeName: '内部代码块',
    icon: 'EventIcon',
    innerBlockName: '',
    inputVarName: '',
    outputVarName: ''
  },
  {
    type: 'blockStart',
    nodeName: '块开始',
    icon: 'EventIcon',
    blockName: ''
  },
  {
    type: 'blockEnd',
    nodeName: '块结束',
    icon: 'EventIcon',
    retVarName: ''
  }
];
const highNodes = [
  {
    type: 'chooseFile',
    nodeName: '选择文件',
    clickPath: '', //选择按钮路径  (路径选择)
    fileRootPath: '', //文件根目录  下拉(download,screenshot,file)
    relativePath: '' //文件相对路径   (字符串)
  },
  {
    type: 'cleanCache',
    nodeName: '清理缓存',
    fileRootPath: '', //文件根目录 下拉(download,screenshot,file)
    relativePath: '' //清理相对路径   (字符串)
  },
  {
    type: 'download',
    nodeName: '下载',
    isAsync: 2, //是否异步 1异步 2 同步
    clickPath: '', //点击路径
    timeout: 0, //大于0 生效
    relativePath: '', //本地相对路径
    token: '', //回调标识 (字符串)
    uploadUrl: '', //上传地址
    fromUrl: 0, //url下载
    downloadUrl: '', //下载地址
    outputVarName: '',
    ignoreError: 0
  },
  {
    type: 'asyncQuery',
    nodeName: '异步查询',
    queryType: '', //查询类型 下拉 (download, all)
    waitEnd: '', //等待完成 1等待, 0 不等待
    timeout: 0, //超时
    outputVarName: '' //输出变量名
  },
  {
    type: 'screenshot',
    nodeName: '网页截屏',
    icon: 'EventIcon',
    scrollInterval: 800, // 每屏渲染等待时长
    relativePath: '',
    timeout: 0, //大于0 生效
    fullPage: 0, // 长截屏开关，默认0关闭，1打开
    topOffset: 0,
    outputVarName: ''
  },
  {
    type: 'extendedFunction',
    nodeName: '扩展函数',
    icon: 'FreedomIcon',
    functionName: '',
    inputVarName: '',
    outputVarName: ''
  },
  {
    type: 'varAssignment',
    nodeName: '变量赋值',
    icon: 'FreedomIcon',
    varName: '',
    varValue: '',
    isClone: 0
  },
  {
    type: 'httpFetch',
    nodeName: 'HTTP请求',
    icon: 'FreedomIcon',
    url: '',
    method: 0, //是否POST
    content: '',
    outputVarName: '',
    isJson: false
  },
  {
    type: 'dataSlot',
    nodeName: '数据槽',
    icon: 'FreedomIcon',
    dataId: '',
    timeout: '',
    outputVarName: ''
  },
  {
    type: 'merge',
    nodeName: '合并',
    icon: 'FreedomIcon'
  },
  {
    type: 'goto',
    nodeName: '跳转',
    icon: 'FreedomIcon'
  }
];
const loginGroupCommonNodes = [
  {
    type: 'start',
    nodeName: '开始',
    url: '',
    variable: '',
    urlVarName: '',
    loginId: '',
    icon: 'StartIcon',
    flag: false
  },
  {
    type: 'end',
    nodeName: '结束',
    icon: 'EndIcon',
    retVarName: ''
  },
  {
    type: 'set',
    nodeName: '输入节点',
    icon: 'CommonIcon',
    elementPath: '',
    screenShot: '',
    setAttribute: 'value',
    setVarName: ''
  },
  {
    type: 'passwordSet',
    nodeName: '密码输入',
    icon: 'CommonIcon',
    elementPath: '',
    screenShot: '',
    isVar: 0,
    setAttribute: 'value',
    setVarName: ''
  },
  {
    type: 'click',
    nodeName: '点击节点',
    icon: 'EventIcon',
    elementPath: '',
    screenShot: '',
    mouseClick: 0,
    waitNecessary: 0,
    waitTime: 600
  },
  {
    type: 'wait',
    nodeName: '等待节点',
    icon: 'EventIcon',
    waitTime: 600,
    isCustom: 0,
    script: '',
    waitUntilEle: ''
  },
  {
    type: 'checkLogin',
    isCustom: 0,
    uploadSession: 1,
    nodeName: '验证登录',
    icon: 'EventIcon',
    elementPath: '',
    url: '',
    loadTime: 500,
    contain: '',
    script: ''
  },
  {
    type: 'captcha',
    nodeName: '验证码节点',
    icon: 'EventIcon',
    imgElementPath: '',
    setElementPath: '',
    ocrUrl: ''
  },
  {
    type: 'smsVerification',
    nodeName: '短信验证',
    icon: 'EventIcon',
    notificationType: 'none',
    notificationAddr: '',
    timeout: 0,
    setElementPath: ''
  },
  {
    type: 'custom',
    nodeName: '自定义代码',
    icon: 'EventIcon',
    script: 'function(){wmExitEval(null);}',
    inputVarName: '',
    outputVarName: '',
    framePath: ''
  }
];
const loginGroupHighNodes = [];

export const Nodes = {
  loginGroup: {
    name: '登录',
    commonNodes: loginGroupCommonNodes,
    highNodes: loginGroupHighNodes
  },
  commonGroup: {
    name: '通用',
    commonNodes,
    highNodes
  }
}


export const laneNodes = [
  {
    type: 'x-lane',
    nodeName: '横向泳道',
    icon: 'XLaneIcon'
  },
  {
    type: 'y-lane',
    nodeName: '纵向泳道',
    icon: 'YLaneIcon'
  }
];
