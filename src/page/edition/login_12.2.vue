<template>
  <div class="management-list-except project-login">
    <section class="project-header">
      <p class="project-header-name">
        登录管理 <span>[{{ detailData.autoLoginName || '新增登录' }}]</span>
      </p>
      <div class="rt">
        <el-button type="primary" @click="autoLoginSave">保存</el-button>
      </div>
    </section>
    <section class="project-info">
      <p class="project-title">
        <span @click="changeConfig('base')" :class="{active: currentConfig === 'base'}">基本配置</span>
        -
        <span @click="changeConfig('code')" :class="{active: currentConfig === 'code'}">验证码设置</span>
        <el-switch
          v-model="detailData.isCustom"
          active-text="是否自定义"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </p>
      <div v-show="detailData.isCustom === 1" class="project-list line">
        <div class="project-list-row">
          <div class="quarter">
            <label for="">名称：</label>
            <el-input v-model="detailData.autoLoginName"></el-input>
          </div>
          <div class="quarter">
            <label for="">登录URL：</label>
            <el-input v-model="detailData.targetUrl" @blur="iFrameLoad"></el-input>
          </div>
          <div class="quarter">
            <label for="">加载时间：</label>
            <el-input v-model="detailData.targetUrlLoadTime"></el-input>
          </div>
          <div class="quarter">
            <el-checkbox v-model="holdLogin">保持登录</el-checkbox>
          </div>
        </div>
        <div class="project-list-row all">
          <label for="">自定义脚本：</label>
          <el-input
            type="textarea"
            :rows="5"
            resize="none"
            placeholder="请输入自定义获取脚本"
            v-model="detailData.customScript">
          </el-input>
        </div>
      </div>
      <div v-show="currentConfig === 'base' && detailData.isCustom === 0" class="project-list line">
        <div class="project-list-row">
          <div class="quarter">
            <label for="">名称：</label>
            <el-input v-model="detailData.autoLoginName"></el-input>
          </div>
          <div class="quarter">
            <label for="">登录URL：</label>
            <el-input v-model="detailData.targetUrl" @blur="iFrameLoad"></el-input>
          </div>
          <div class="quarter">
            <label for="">加载时间：</label>
            <el-input v-model="detailData.targetUrlLoadTime"></el-input>
          </div>
          <div class="quarter">
            <el-checkbox v-model="holdLogin">保持登录</el-checkbox>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.user">
          <div class="quarter">
            <label for="">用户名：</label>
            <el-input v-model="detailData.user.setElementValue"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径：</label>
            <el-input
              :class="{active: isSelect === 'user'}"
              @focus="getPath('user')"
              v-model="detailData.user.elementPath" ></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.user.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.pass">
          <div class="quarter">
            <label for="">密码：</label>
            <el-input v-model="detailData.pass.setElementValue"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径：</label>
            <el-input
              :class="{active: isSelect === 'pass'}"
              @focus="getPath('pass')"
              v-model="detailData.pass.elementPath"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.pass.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.submit">
          <div class="quarter">
            <label for="">提交：</label>
            <el-input
              :class="{active: isSelect === 'submit'}"
              @focus="getPath('submit')"
              v-model="detailData.submit.elementPath"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.submit.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="quarter">
            <label for="">登录时延：</label>
            <el-input v-model="detailData.loginDelayTime"></el-input>
          </div>
        </div>
      </div>
      <div v-show="currentConfig === 'code' && detailData.isCustom === 0" class="project-list line">
        <div class="project-list-row">
          <template v-if="detailData.captchaGet">
            <div class="third">
              <label for="">获取验证码路径：</label>
              <el-input
                :class="{active: isSelect === 'captchaGet'}"
                @focus="getPath('captchaGet')"
                v-model="detailData.captchaGet.elementPath"></el-input>
            </div>
            <div class="quarter">
              <label for="">路径类型：</label>
              <el-select v-model="detailData.captchaGet.elementPathType" placeholder="请选择">
                <el-option
                  v-for="item in pathType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>
          <div class="quarter">
            <el-checkbox v-model="isCaptcha">启用验证码登录</el-checkbox>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.captchaInput">
          <div class="third">
            <label for="">验证码输入框路径：</label>
            <el-input
              :class="{active: isSelect === 'captchaInput'}"
              @focus="getPath('captchaInput')"
              v-model="detailData.captchaInput.elementPath"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.captchaInput.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.captchaImg">
          <div class="third">
            <label for="">验证码图片路径：</label>
            <el-input
              :class="{active: isSelect === 'captchaImg'}"
              @focus="getPath('captchaImg')"
              v-model="detailData.captchaImg.elementPath"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.captchaImg.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row" v-if="detailData.captchaRefresh">
          <div class="third">
            <label for="">验证码刷新路径：</label>
            <el-input
              :class="{active: isSelect === 'captchaRefresh'}"
              @focus="getPath('captchaRefresh')"
              v-model="detailData.captchaRefresh.elementPath"></el-input>
          </div>
          <div class="quarter">
            <label for="">路径类型：</label>
            <el-select v-model="detailData.captchaRefresh.elementPathType" placeholder="请选择">
              <el-option
                v-for="item in pathType"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <p class="project-title">
        登录成功条件判断
        <el-switch
          v-model="detailData.isCustomTestSuccess"
          active-text="是否自定义"
          :active-value="1"
          :inactive-value="0">
        </el-switch>
      </p>
      <div class="project-list">
        <div class="project-list-row">
          <div class="quarter">
            <label for="">判断URL：</label>
            <el-input v-model="detailData.testSuccessUrl"></el-input>
          </div>
          <div class="quarter">
            <label for="">加载时间：</label>
            <el-input v-model="detailData.testSuccessUrlLoadTime"></el-input>
          </div>
        </div>
        <div class="project-list-row all" v-if="detailData.isCustomTestSuccess === 1">
          <label for="">自定义脚本：</label>
          <el-input
            type="textarea"
            :rows="3"
            resize="none"
            placeholder="请输入自定义获取脚本"
            v-model="detailData.customTestSuccessScript">
          </el-input>
        </div>
        <div class="project-list-row" v-else>
          <template v-if="detailData.success">
            <div class="quarter">
              <label for="">路径：</label>
              <el-input
                :class="{active: isSelect === 'success'}"
                @focus="getPath('success')"
                v-model="detailData.success.elementPath"></el-input>
            </div>
            <div class="quarter">
              <label for="">路径类型：</label>
              <el-select v-model="detailData.success.elementPathType" placeholder="请选择">
                <el-option
                  v-for="item in pathType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="quarter">
              <label for="">属性：</label>
              <el-select v-model="detailData.success.elementAttributeName" placeholder="请选择">
                <el-option
                  v-for="item in valueName"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </template>
          <div class="quarter">
            <label for="">属性包含：</label>
            <el-input v-model="detailData.testSuccessContainValue"></el-input>
          </div>
        </div>
      </div>
    </section>
    <section class="project-preview">
      <p class="project-title">系统预览</p>
      <div class="project-title-except" id="iframeBox" v-blank="blankClick">
        <!--<el-scrollbar>
          <iframe id="iframe" name="iframe" src="" frameborder="0"></iframe>
        </el-scrollbar>-->
        <iframe id="iframe" name="iframe" src="" frameborder="0"></iframe>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
let utils = {
  getAbsolutelyPosition: function (element) {
    let position = element.getBoundingClientRect(),
      scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop),
      scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    return {
      left: position.left + scrollLeft,
      top: position.top + scrollTop
    }
  },
  getElementLineIndex: function (parent, ele) {
    let index = 1;
    let elements = [].slice.call(parent.children);
    for (let i = 0; i < elements.length; i += 1) {
      if (elements[i] === ele) {
        index = i + 1;
        return index;
      }
    }
    return index;
  },
  getTopParentPath: function (element) {
    let path = '';
    let nodeName = element.nodeName.toLowerCase();
    if (nodeName === 'html') {
      return path;
    }
    let _className = element.className.split(' ');
    let _classArr = _className.filter(function (s) {
      return s && s.trim();
    });
    _className = _classArr.join('.');
    let nodeClassName = _className === '' ? '' : '.' + _className;
    let cssSelector = ':nth-child(' + this.getElementLineIndex(element.parentNode, element) + ')';
    path = nodeName + nodeClassName;
    path = nodeName === 'body' ? path : this.getTopParentPath(element.parentNode) + '>' + path + cssSelector;
    return path;
  }
};
let scaleRatio = 1;
export default {
  name: 'projectLogin',
  data () {
    return {
      currentConfig: 'base',
      detailData: {
        id: '',
        autoLoginName: '',
        targetUrl: '',
        targetUrlLoadTime: '',
        isHold: 0,
        user: {
          setElementValue: '',
          elementPath: '',
          elementPathType: ''
        },
        pass: {
          setElementValue: '',
          elementPath: '',
          elementPathType: ''
        },
        submit: {
          elementPath: '',
          elementPathType: ''
        },
        loginDelayTime: '',
        testSucessContainValue: '',
        testSuccessUrl: '',
        testSuccessUrlLoadTime: '',
        isCustomTestSuccess: 0,
        customTestSuccessScript: '',
        success: {
          elementPath: '',
          elementPathType: '',
          valuSaveAsType: ''
        },
        isCaptcha: 0,
        captchaGet: {
          elementPath: '',
          elementPathType: ''
        },
        captchaInput: {
          elementPath: '',
          elementPathType: ''
        },
        captchaImg: {
          elementPath: '',
          elementPathType: ''
        },
        captchaRefresh: {
          elementPath: '',
          elementPathType: ''
        },
        isCustom: 0,
        customScript: ''
      },
      pathType: [],
      valueName: [],
      isSelect: '',
      sPath: '',
      parentNodeX: '',
      parentNodeY: ''
    }
  },
  computed: {
    holdLogin: {
      get () {
        return Boolean(this.detailData.isHold);
      },
      set (val, newVal) {
        val ? this.detailData.isHold = 1 : this.detailData.isHold = 0;
      }
    },
    isCaptcha: {
      get () {
        return Boolean(this.detailData.isCaptcha);
      },
      set (val, newVal) {
        val ? this.detailData.isCaptcha = 1 : this.detailData.isCaptcha = 0;
      }
    }
  },
  created () {
    this.loginDetail();
    this.loginSelect();
  },
  watch: {
    '$route' (to, form) {
      this.isSelect = '';
      this.loginDetail();
    }
  },
  directives: {
    blank: {
      bind (el, binding, vnode) {
        function documentHandler (e) {
          if (el.contains(e.target)) {
            return false;
          }
          if (binding.expression) {
            binding.value(e);
          }
        }
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
      },
      update () {},
      unbind (el, binding) {
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
      }
    }
  },
  methods: {
    /* @event 切换配置显示 */
    changeConfig (type) {
      this.currentConfig = type;
    },
    /* @method 登录系统详情信息 */
    loginDetail () {
      if (this.$route.query.id) {
        let data = new URLSearchParams();
        data.append('id', this.$route.query.id);
        this.$axios.post('/autoLogin/detail', data, s => {
          for (let one in s.data) {
            if (typeof s.data[one] === 'object') {
              for (let two in s.data[one]) {
                this.detailData[one][two] = s.data[one][two];
              }
            } else {
              this.detailData[one] = s.data[one];
            }
          }

          this.$nextTick(() => {
            this.iFrameLoad(this.iFrameShow);
          });
        });
      } else {
        this.detailData = {
          id: '',
          autoLoginName: '',
          targetUrl: '',
          targetUrlLoadTime: '',
          isHold: 0,
          user: {
            setElementValue: '',
            elementPath: '',
            elementPathType: ''
          },
          pass: {
            setElementValue: '',
            elementPath: '',
            elementPathType: ''
          },
          submit: {
            elementPath: '',
            elementPathType: ''
          },
          loginDelayTime: '',
          testSucessContainValue: '',
          testSuccessUrl: '',
          testSuccessUrlLoadTime: '',
          isCustomTestSuccess: 0,
          customTestSuccessScript: '',
          success: {
            elementPath: '',
            elementPathType: '',
            valuSaveAsType: ''
          },
          isCaptcha: 0,
          captchaGet: {
            elementPath: '',
            elementPathType: ''
          },
          captchaInput: {
            elementPath: '',
            elementPathType: ''
          },
          captchaImg: {
            elementPath: '',
            elementPathType: ''
          },
          captchaRefresh: {
            elementPath: '',
            elementPathType: ''
          },
          isCustom: 0,
          customScript: ''
        };
      }
    },
    /* @method 下拉数据 */
    loginSelect () {
      this.$axios.post('/autoLogin/selectData', '', s => {
        this.pathType = s.pathTypes;
        this.valueName = s.valueNames;
      });
    },
    getPath (name) {
      this.isSelect = name;
    },
    blankClick: function (e) {
      window.selectMask.remove();
    },
    /* @event 保存登录 */
    autoLoginSave () {
      let data = new URLSearchParams();
      for (let one in this.detailData) {
        if (typeof this.detailData[one] === 'object') {
          for (let two in this.detailData[one]) {
            data.append(one + '.' + two, this.detailData[one][two]);
          }
        } else {
          one !== 'createdTime' && one !== 'createUser' ? data.append(one, this.detailData[one]) : '';
        }
      }
      this.$axios.post('/autoLogin/save', data, s => {
        this.$message.success(s.message);
        if (!this.$route.query.id) {
          this.$emit('update-list', true);
        }
      })
    },
    /* @method iframe加载 */
    iFrameLoad (fun) {
      let iFrame = document.getElementById('iframe');
      let iWindow = iFrame.contentWindow;
      let iDoc = iWindow.document;

      if (this.$route.query.id) {
        let loginUrl = 'snapshot_url=' + this.detailData.targetUrl;
        let id = '&snapshot_login_id=' + this.detailData.id;
        let isTest = '&snapshot_test_success=' + 1 || 0;
        let paths = this.baseConfig.TAILOR_URL + '/tailor/wisemotion/snapshot?' + loginUrl + id + isTest;
        axios.get(paths).then((res) => {
          iDoc.body.innerHTML = res.data;
          iFrame.style.height = iDoc.body.offsetHeight;
          console.log(iDoc.body.offsetHeight);
          fun ? fun() : '';
        });
      } else {
        setTimeout(() => {
          iDoc.body.innerHTML = '';
        }, 4)
      }
    },
    maskClick (e) {
      e.preventDefault();
      this.detailData[this.isSelect].elementPath = this.sPath;
      window.selectMask.remove();
    },
    mouseEvent (e) {
      e.preventDefault();
      let event = e || window.event,
        target = event.target;
      let offsetX = this.parentNodeX + utils.getAbsolutelyPosition(target).left * scaleRatio,
        offsetY = this.parentNodeY + utils.getAbsolutelyPosition(target).top * scaleRatio;
      let eleWidth = target.offsetWidth * scaleRatio,
        eleHeight = target.offsetHeight * scaleRatio;
      let name = target.nodeName.toLowerCase();
      let path = (target.id === '' ? '' : '#' + target.id) + (target.className === '' ? '' : '.' + target.className);

      if (this.isSelect) {
        window.selectMask.show(eleWidth, eleHeight, offsetX, offsetY, 'rgba(101, 177, 247, 0.5)', name, path);
        this.sPath = utils.getTopParentPath(target);
      }
    },
    iFrameShow () {
      let iFrame = document.getElementById('iframe');
      let iWindow = iFrame.contentWindow;
      let iDoc = iWindow.document;

      this.parentNodeX = utils.getAbsolutelyPosition(iFrame.parentNode).left * scaleRatio;
      this.parentNodeY = utils.getAbsolutelyPosition(iFrame.parentNode).top * scaleRatio;

      this.iFrameRemove();

      iDoc.addEventListener('mousemove', this.mouseEvent, false);
      document.getElementById('iMask').addEventListener('click', this.maskClick);
      iDoc.addEventListener('click', (e) => {
        e.preventDefault();
      });
    },
    iFrameRemove () {
      let iFrame = document.getElementById('iframe');
      let iWindow = iFrame.contentWindow;
      let iDoc = iWindow.document;
      iDoc.removeEventListener('mousemove', this.mouseEvent, false);

      document.getElementById('iMask').removeEventListener('click', this.maskClick);
    }
  },
  mounted () {
    // this.iFrameLoad(this.iFrameShow);
  },
  //生命周期 - 销毁完成
  destroyed () {
    this.iFrameRemove();
  }
}
</script>
