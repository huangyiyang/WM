import { flowConfig } from '../config/args-config.js'

let del = {
  node: ['x', 'y', 'width', 'height', 'leftvalue', 'rightvalue', 'centervalue', 'condition'],
  link: ['cls', 'decision'],
  own: ['config', 'status', 'remarks'] //'attr',
}

const checkLoginNeeds = ['start', 'checkLogin', 'end'];

export let ZFSN = {
  seqNo: 1,
  consoleLog: function (strArr) {
    let log = '';
    for (let i = 0, len = strArr.length; i < len; i++) {
      log += strArr[i] + '\n';
    }
    console.log('%c' + log, 'color: red; font-weight: bold;');
  },
  getId: function () {
    let idType = flowConfig.idType;
    if (typeof idType === 'string') {
      if (idType === 'uuid') {
        return this.getUUID();
      } else if (idType === 'time_stamp') {
        return this.getTimeStamp();
      }
    } else if (idType instanceof Array) {
      if (idType[0] === 'time_stamp_and_sequence') {
        return this.getSequence(idType[1]);
      } else if (idType[0] === 'time_stamp_and_sequence') {
        return this.getTimeStampAndSequence(idType[1]);
      } else if (idType[0] === 'custom') {
        return idType[1]();
      }
    }
  },
  getUUID: function () {
    let s = [];
    let hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';

    let uuid = s.join('');
    return uuid.replace(/-/g, '');
  },
  getTimeStamp: function () {
    return new Date().getTime();
  },
  getSequence: function (seqNoLength) {
    let zeroStr = new Array(seqNoLength).fill('0').join('');
    return (zeroStr + (this.seqNo++)).slice(-seqNoLength);
  },
  getTimeStampAndSequence: function (seqNoLength) {
    return this.getTimeStamp() + this.getSequence(seqNoLength);
  },
  add: function (a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    //eslint-disable-next-line
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) + this.mul(b, e)) / e;
  },
  sub: function (a, b) {
    let c, d, e;
    try {
      c = a.toString().split('.')[1].length;
    } catch (f) {
      c = 0;
    }
    try {
      d = b.toString().split('.')[1].length;
    } catch (f) {
      d = 0;
    }
    //eslint-disable-next-line
    return e = Math.pow(10, Math.max(c, d)), (this.mul(a, e) - this.mul(b, e)) / e;
  },
  mul: function (a, b) {
    let c = 0, d = a.toString(), e = b.toString();
    try {
      c += d.split('.')[1].length;
    } catch (f) {}
    try {
      c += e.split('.')[1].length;
    } catch (f) {}
    //eslint-disable-next-line
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
  },
  div: function (a, b) {
    let c, d, e = 0, f = 0;
    try {
      e = a.toString().split('.')[1].length;
    } catch (g) {}
    try {
      f = b.toString().split('.')[1].length;
    } catch (g) {}
    //eslint-disable-next-line
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), this.mul(c / d, Math.pow(10, f - e));
  },
  filterSendJson: (target) => ((target, {node, link, own}) => {
    let _target = JSON.parse(JSON.stringify(target));
    let redundancyIndexs = [];
    let exitsLinkList = [];
    let nodeIds = [];
    _target.nodeList.map(_node => {
      node.forEach(del => {
        Reflect.deleteProperty(_node, del)
      })
      nodeIds.push(_node.id);
      return _node
    });
    _target.linkList.map((_link, index) => {
      link.forEach(del => {
        Reflect.deleteProperty(_link, del)
      })

      let exits = exitsLinkList.filter(link => link.sourceId === _link.sourceId && link.targetId === _link.targetId);
      exits.length && redundancyIndexs.push(_link.id);
      exitsLinkList.push(_link);
      return _link
    })
    console.log(redundancyIndexs, exitsLinkList.length)
    redundancyIndexs.forEach(id => {
      let redundancyIndex = _target.linkList.findIndex(link => link.id === id);
      _target.linkList.splice(redundancyIndex, 1);
    })
    _target.linkList = _target.linkList.filter(link => (nodeIds.includes(link.sourceId) && nodeIds.includes(link.targetId)));
    own.forEach(del => {
      Reflect.deleteProperty(_target, del)
    })
    return _target
  })(target, del),
  calcValidteJson: (target) => (() => {
    let _target = JSON.parse(target);
    let {attr, nodeList, linkList} = _target;
    let {start, checkLogin, end} = nodeList.reduce((acc, node) => {
      var nodeKey = node.type;
      acc[node.type] = node;
      return acc
    }, {});

    start.url = checkLogin.url;
    start.variable = '';
    start.urlVarName = '';
    checkLogin.uploadSession = 0;
    let ValLinkSourceIds = [start.id, checkLogin.id];

    let {startLink, checkLoginLink} = linkList.reduce((acc, link) => {
      let isValLink = ValLinkSourceIds.includes(link.sourceId);
      let linkKey = checkLoginNeeds.find(nodeName => link.sourceId.includes(nodeName));
      isValLink && (acc[linkKey + 'Link'] = link);
      return acc
    }, {});

    startLink.targetId = checkLogin.id;
    checkLoginLink.targetId = end.id;

    return {
      nodeList: [
        start,
        checkLogin,
        end
      ],
      linkList: [
        startLink,
        checkLoginLink
      ],
      attr
    }
  })(target, checkLoginNeeds)
};
