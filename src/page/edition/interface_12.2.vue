<template>
  <div class="management-list-except project-interface">
    <section class="project-header">
      <p class="project-header-name">
        数据接口管理 <span>[{{ detailData.interfaceName || '新增接口' }}]</span>
      </p>
      <div class="rt">
        发布地址：
        <el-input></el-input>
        <el-button type="primary" @click="interfacePublish">发布</el-button>
      </div>
    </section>
    <section class="project-info">
      <p class="project-title">接口信息</p>
      <div class="project-info-control">
        <p class="info">
          <i class="el-icon-time"></i>
          <span>创建时间： {{ detailData.createdTime }}</span>
          <i class="el-icon-user"></i>
          <span>创建账号： {{ detailData.createUser }}</span>
        </p>
        <div class="button-group">
          <el-button type="primary" @click="interfaceTest">测试</el-button>
          <el-button type="primary" @click="interfaceSave">保存</el-button>
        </div>
      </div>
      <div class="project-list">
        <div class="project-list-row">
          <div class="quarter">
            <label for="">接口名称：</label>
            <el-input v-model="detailData.interfaceName"></el-input>
          </div>
          <div class="quarter">
            <label for="">URL地址：</label>
            <el-input v-model="detailData.targetUrl" @blur="iFrameLoad"></el-input>
          </div>
          <div class="quarter">
            <label for="">加载时间：</label>
            <el-input v-model="detailData.targetUrlLoadTime"></el-input>
          </div>
          <div class="quarter">
            <label for="">登录选项：</label>
            <el-select v-model="detailData.autoLoginId" placeholder="请选择">
              <el-option
                v-for="item in logins"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="project-list-row">
          <div class="half">
            <label for="">备注：</label>
            <el-input v-model="detailData.remark" resize="none" :autosize="{ minRows: 3 }" type="textarea"></el-input>
          </div>
        </div>
      </div>
      <div class="project-info-table">
        <p class="table-control" @click="addRow">
          <i class="el-icon-circle-plus"></i>
          <span>新增一行</span>
        </p>
        <el-table
          :data="tableData"
          max-height="250"
          style="width: 100%;">
          <el-table-column
            align="center"
            type="index"
            width="50"
            label="序号">
          </el-table-column>
          <el-table-column
            align="center"
            prop="valueSaveToKey"
            label="属性名称">
            <template slot-scope="scope">
              <el-input v-model="scope.row.valueSaveToKey"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="自定义接口">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.isCustom"
                :active-value="1"
                :inactive-value="0"
                @change="changeCustom($event, scope.row)">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            width="160"
            align="center"
            prop="elementPath"
            label="值路径">
            <template slot-scope="scope">
              <el-input v-if="scope.row.isCustom === 0"
                        :class="{active: isSelect === scope.$index}"
                        @focus="getPath(scope.$index)"
                        v-model="scope.row.elementPath"></el-input>
              <el-button @click="importScript(scope.$index, scope.row)" v-else>导入自定义脚本</el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            align="center"
            prop="elementPathType"
            label="值路径类型">
            <template slot-scope="scope">
              <el-select v-if="scope.row.isCustom === 0" v-model="scope.row.elementPathType" placeholder="请选择">
                <el-option
                  v-for="item in pathType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column
            width="140"
            align="center"
            prop="elementAttributeName"
            label="值属性名称">
            <template slot-scope="scope">
              <el-select  v-if="scope.row.isCustom === 0"
                          v-model="scope.row.elementAttributeName" placeholder="请选择">
                <el-option
                  v-for="item in valueName"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column
            width="140"
            align="center"
            prop="valueSaveAsType"
            label="值类型">
            <template slot-scope="scope">
              <el-select  v-if="scope.row.isCustom === 0"
                          v-model="scope.row.valueSaveAsType" placeholder="请选择">
                <el-option
                  v-for="item in valueType"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value">
                </el-option>
              </el-select>
              <template v-else></template>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="获取结果">
          </el-table-column>
          <el-table-column
            align="center"
            label="删除">
            <template slot-scope="scope">
              <span class="delete-button" @click="deleteRow(scope.$index, scope.row)">
                <i class="el-icon-delete"></i>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
          title="自定义脚本"
          top="0"
          custom-class="custom-dialog"
          :visible.sync="isVisible">
          <el-input
            type="textarea"
            :rows="10"
            resize="none"
            placeholder="请输入自定义获取脚本"
            v-model="textarea">
          </el-input>
          <div slot="footer">
            <el-button type="primary" @click="confirmSave">保 存</el-button>
            <el-button type="primary" @click="cancellation">取 消</el-button>
          </div>
        </el-dialog>
      </div>
    </section>
    <section class="project-preview">
      <p class="project-title">系统预览</p>
      <div class="project-title-except" id="iframeBox" v-blank="blankClick">
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
  name: 'projectInterface',
  data () {
    return {
      detailData: {
        id: '',
        interfaceName: '',
        targetUrl: '',
        targetUrlLoadTime: '',
        autoLoginId: '',
        remark: ''
      },
      tableData: [],
      pathType: [],
      valueName: [],
      valueType: [],
      logins: [],
      isSelect: '',
      isVisible: false,
      textarea: '',
      currentRow: '',
      pageVisible: true,
      sPath: '',
      parentNodeX: '',
      parentNodeY: ''
    }
  },
  created () {
    this.interfaceDetail();
    this.interfaceSelect();
  },
  watch: {
    '$route' (to, form) {
      this.isSelect = '';
      this.interfaceDetail();
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
    importScript (i, row) {
      this.isVisible = true;
      this.currentRow = i;
      this.textarea = row.customScript;
    },
    confirmSave () {
      this.tableData[this.currentRow].customScript = this.textarea;
      this.isVisible = false;
    },
    cancellation () {
      this.isVisible = false;
      this.currentRow = '';
      this.textarea = '';
    },
    /* @method 接口系统详情信息 */
    interfaceDetail () {
      if (this.$route.query.id) {
        let data = new URLSearchParams();
        data.append('id', this.$route.query.id);
        this.$axios.post('/interface/detail', data, s => {
          this.detailData = s.data;
          for (let key in s.data) {
            if (typeof this.detailData[key] !== 'object') {
              this.detailData[key] = s.data[key];
            }
          }
          this.tableData = s.data.items;

          this.$nextTick(() => {
            this.iFrameLoad(this.iFrameShow);
          });
        });
      } else {
        this.interfaceEmpty();
      }
    },
    /* @method 下拉数据 */
    interfaceSelect () {
      this.$axios.post('/interface/selectData', '', s => {
        this.pathType = s.pathTypes;
        this.valueName = s.valueNames;
        this.valueType = s.valueTypes;
        s.logins.unshift({
          name: '不需要登录',
          value: ''
        });
        this.logins = s.logins;
      });
    },
    /* @method 清除现有数据 */
    interfaceEmpty () {
      this.detailData = {
        id: '',
        interfaceName: '',
        targetUrl: '',
        targetUrlLoadTime: '',
        autoLoginId: '',
        remark: ''
      };
      this.tableData = [];
    },
    /* @event 新增一行 */
    addRow () {
      this.tableData.push({
        customScript: '',
        elementAttributeName: '',
        elementPath: '',
        elementPathType: '',
        isCustom: 0,
        subOrder: '',
        valueSaveAsType: '',
        valueSaveToKey: ''
      });
    },
    /* @event 删除当前行 */
    deleteRow (i, item) {
      this.tableData.splice(i, 1);
    },
    /* @method 自定义接口 */
    changeCustom (val, row) {
      console.log(val, row);
    },
    getPath (name) {
      this.isSelect = name;
    },
    blankClick: function (e) {
      window.selectMask.remove();
    },
    /* @event 接口发布 */
    interfacePublish () {
      let data = new URLSearchParams();
      data.append('id', this.$route.query.id || '');
      data.append('isPublish', 1);
      this.$axios.post('/interface/publish', data, s => {
        this.$message.success(s.message);
      });
    },
    /* @event 接口测试 */
    interfaceTest () {
      let paths = this.baseConfig.TAILOR_URL + '/tailor/wisemotion/testrun?id=' + this.detailData.id + '&type=0 ';
      axios.post(paths).then((res) => {
        this.$alert(res.data, '提示', {
          confirmButtonText: '确定',
          type: 'warning',
          callback: action => {

          }
        });
      });
    },
    /* @event 保存接口 */
    interfaceSave () {
      let data = new URLSearchParams();
      for (let key in this.detailData) {
        if (typeof this.detailData[key] !== 'object') {
          key !== 'createdTime' && key !== 'createUser' ? data.append(key, this.detailData[key]) : '';
        }
      }

      console.log(this.tableData);
      this.tableData.forEach((item, i) => {
        for (let key in item) {
          if (key !== 'subOrder') {
            data.append('items[' + i + '].' + key, item[key]);
          }
        }
      });
      this.$axios.post('/interface/save', data, s => {
        this.$message.success(s.message);
        if (!this.$route.query.id) {
          this.$emit('update-list', true);
        }
      });
    },
    /* @method iframe加载 */
    iFrameLoad (fun) {
      let iFrame = document.getElementById('iframe');
      let iWindow = iFrame.contentWindow;
      let iDoc = iWindow.document;

      if (this.$route.query.id) {
        let loginUrl = 'snapshot_url=' + this.detailData.targetUrl;
        let id = '&snapshot_login_id=' + this.detailData.id;
        let paths = 'http://192.168.2.11:8070/tailor/wisemotion/snapshot?' + loginUrl + id;
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
      this.tableData[this.isSelect].elementPath = this.sPath;
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

      if (this.isSelect || this.isSelect === 0) {
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

  },
  //生命周期 - 销毁完成
  destroyed () {
    this.iFrameRemove();
  }
}
</script>
