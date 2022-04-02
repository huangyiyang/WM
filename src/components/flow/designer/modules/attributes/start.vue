<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">开始</a-tag>
    </a-form-item>
    <a-form-item label="id"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input :value="currentSelect.id"
               disabled />
    </a-form-item>
    <a-form-item label="名称"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入节点名称"
               :value="currentSelect.nodeName"
               @change="nameChange" />
    </a-form-item>
    <a-form-item label="打开地址"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入地址"
               :value="currentSelect.url"
               @change="urlChange" />
    </a-form-item>
    <a-form-item label="地址参数名"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入地址参数变量名"
               :value="currentSelect.urlVarName"
               @change="paramUrlChange" />
    </a-form-item>
    <a-form-item label="设置变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入新增变量"
               :value="currentSelect.variable"
               @change="variableChange" />
    </a-form-item>
    <a-form-item label="选择会话"
                 v-if="currentSelect.flag"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.loginId"
                 @change="loginSessionChange"
                 placeholder="请选择">
        <el-option v-for="item in logins"
                   :key="item.value"
                   :label="item.name"
                   :value="item.value">
        </el-option>
      </el-select>
    </a-form-item>
    <a-form-item label="页面打开"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.openInMainTab"
                 active-text="是否主页面打开"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <a-form-item label="判断会话"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.checkLogin"
                 @change="checkLogin"
                 active-text="是否判断会话"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="判断次数"
                   v-if="currentSelect.checkLogin"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input placeholder=""
                 :value="currentSelect.checkTimes"
                 @change="checkTimes" />
      </a-form-item>
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'start',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processSnapshot', 'processSnapShotchange', 'processAttrChange'],
  data () {
    return {
      logins: []
    }
  },
  methods: {
    checkLogin (e) {
      this.nodeAttrChange({ attr: 'checkLogin', payload: e === 1 ? 1 : 0 })
      this.processAttrChange({ attr: 'checkLogin', payload: e === 1 ? 1 : 0 });
    },
    checkTimes (e) {
      this.nodeAttrChange({ attr: 'checkTimes', payload: Number(e.target.value) })
      this.processAttrChange({ attr: 'checkTimes', payload: Number(e.target.value) });
    },
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    paramUrlChange (e) {
      this.nodeAttrChange({ attr: 'urlVarName', payload: e.target.value })
    },
    urlChange (e) {
      this.nodeAttrChange({ attr: 'url', payload: e.target.value })
      //快照更新地址
      this.processSnapShotchange({ targetUrl: e.target.value });
    },
    forwardSnapTarget () {
      let { url } = this.currentSelect;
      if (url) {
        this.processSnapshot({ targetUrl: url });
      }
    },
    loginSessionChange (id) {
      this.processAttrChange({ attr: 'autoLoginId', payload: id });
      this.processAttrChange({ attr: 'isLogin', payload: (id) ? 1 : 0 });
    },
    variableChange (e) {
      this.nodeAttrChange({ attr: 'variable', payload: e.target.value })
    },
    /* @method 下拉数据 */
    interfaceSelect () {
      /*  this.$axios.post('/interface/selectData', '', s => {
          s.logins.unshift({
            name: '不需要登录',
            value: ''
          });
          this.logins = s.logins;
        });*/
      let data = new URLSearchParams();
      data.append('type', '1');
      data.append('processName', '');
      this.$axios.post('/process/list', data, s => {
        s.data = s.data.map(login => {
          let { id, processName } = login;
          return { name: processName, value: id }
        })
        s.data.unshift({
          name: '不需要登录',
          value: ''
        });
        // this.logins = s.data;
        // s.data = s.data.map(loginEl => {
        //   let { processName, id } = loginEl
        //   return { name: processName, value: id }
        // });

        // s.data.unshift({
        //   name: '不需要登录',
        //   value: ''
        // });
        console.log(s.data)
        this.logins = s.data;
      });
    }
  },
  mounted () {
    this.forwardSnapTarget();
  },
  created () {
    this.interfaceSelect();
  }
}
</script>
