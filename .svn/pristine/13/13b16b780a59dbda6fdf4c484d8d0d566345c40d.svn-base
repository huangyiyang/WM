export default {
  install: function (Vue, options) {
    // 设置cookie
    Vue.prototype.$setCookie = function (options) {
      let self = this;
      let setCookie = {
        _cookieInit: function () {
          options.isSave ? this._cookieSave() : this._cookieShow()
        },
        _cookieSave: function () {
          let encodeName = encodeURI(options.data.userName);
          if (options.data.isRemember) {
            this._cookieSet(options.name, options.data.userName, options.time);
            this._cookieSet(encodeName, options.data.passWord, options.time);
          } else {
            this._cookieSet(options.name, '', -1);
            this._cookieSet(encodeName, '', -1);
          }
        },
        _cookieShow: function () {
          let name = this._cookieGet(options.name);
          if (name !== '' && name !== undefined) {
            let encodeName = encodeURI(name);
            let word = this._cookieGet(encodeName);
            /*Vue.set(self, options.data.userName, name);
            Vue.set(self, options.data.passWord, word);
            Vue.set(self, options.data.isRemember, true);*/
            Vue.set(options.form, options.data.userName, name);
            Vue.set(options.form, options.data.passWord, word);
            Vue.set(options.form, options.data.isRemember, true);
          }
        },
        _cookieSet: function (name, value, days) {
          let date = new Date();
          date.setTime(date.getTime() + (days * 86400000));
          let expires = 'expires=' + date.toUTCString();
          document.cookie = name + '=' + escape(value) + '; ' + expires;
        },
        _cookieGet: function (name) {
          let start = document.cookie.indexOf(name + '=');
          if (start !== -1) {
            start = start + name.length + 1;
            //获取value的终止位置
            let end = document.cookie.indexOf(';', start);
            if (end === -1) {
              end = document.cookie.length;
            }
            //截获cookie的value值,并返回
            return unescape(document.cookie.substring(start, end));
          }
        }
      };
      setCookie._cookieInit();
    };

    /*  @function 弹窗拾取工具
     */
    Vue.prototype.utils = {
      getAbsolutelyPosition: function (element) {
        let position = element.getBoundingClientRect(),
          scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
          scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        return {
          left: position.left + scrollLeft,
          top: position.top + scrollTop
        }
      },
      getTopParentPath: function (element) {
        let path = '';
        let nodeName = element.nodeName.toLowerCase();
        if (nodeName === 'html') {
          return path;
        }
        let _className = element.className.split(' ');
        let _classArr = _className.filter(function (s) {
          return s && s.trim() && /^[_a-zA-Z][_a-zA-Z0-9-]*$/.test(s);
        });
        _className = _classArr.join('.');
        let nodeClassName = _className === '' ? '' : '.' + _className;
        let lineIndexParams = this.getElementLineIndex(element.parentNode, element);
        let cssSelector = '';
        if (!lineIndexParams.only) {
          cssSelector = ':nth-child(' + lineIndexParams.index + ')';
        }
        path = nodeName + nodeClassName;
        path = nodeName === 'body' ? path : this.getTopParentPath(element.parentNode) + '>' + path + cssSelector;
        return path;
      },
      getTopParentPath2: function (el) {
        // console.log(Object.prototype.toString.call(el))
        if (!(Object.prototype.toString.call(el).includes('Element'))) {
          return '';
        }

        let path = [];
        while (el.nodeType === Node.ELEMENT_NODE) {
          let selector = el.nodeName.toLowerCase();
          let strId = el.id;
          if (strId && typeof strId === 'string' && strId.length > 0) {
            let firLet = strId.charCodeAt(0);
            if (firLet > 47 && firLet < 58) {
              strId = '\\3' + strId.charAt(0) + ' ' + strId.substring(1);
            }
            selector += '#' + strId.trim();
            path.unshift(selector);
            break;
          } else {
            let sib = el, nth = 1;
            /* eslint-disable no-cond-assign */
            while (sib = sib.previousElementSibling) {
              if (sib.nodeName.toLowerCase() === selector) {
                nth++;
              }
            }
            if (nth !== 1) {
              selector += ':nth-of-type(' + nth + ')';
            }
          }
          path.unshift(selector);
          if (selector === 'body') {
            break;
          }
          el = el.parentNode;
        }
        return path.join('>');
      },
      getElementLineIndex: function (parent, ele) {
        let lineParams = {
          index: 1,
          only: false
        };
        let index = 1;
        let elements = [].slice.call(parent.children);
        let eleId = ele.id === '' ? '' : '#' + ele.id;
        let _className = ele.className.split(' ');
        let _classArr = _className.filter(function (s) {
          return s && s.trim() && /^[_a-zA-Z][_a-zA-Z0-9-]*$/.test(s);
        });
        _className = _classArr.join('.');
        let eleClass = _className === '' ? '' : '.' + _className;

        for (let i = 0; i < elements.length; i += 1) {
          if (elements[i] === ele) {
            index = i + 1;
            if (eleClass !== '') {
              let eleSame = [].slice.call(parent.querySelectorAll(eleClass));
              lineParams.index = index;
              lineParams.only = eleSame.length === 1;
            } else {
              lineParams.index = index;
              lineParams.only = elements.length === 1;
            }
            return lineParams;
          }
        }
        return lineParams;
      }
    }
  }
}
