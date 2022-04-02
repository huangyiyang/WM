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
    <a-form-item label="加载地址"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入地址"
               :value="currentSelect.loadUrl"
               @change="urlChange" />
    </a-form-item>
    <a-form-item label="加载方式"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.loadType"
                 placeholder="请选择">
        <el-option v-for="item in loadTypes"
                   :key="item.value"
                   :label="item.name"
                   :value="item.value">
        </el-option>
      </el-select>
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'pageLoad',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processSnapshot', 'processSnapShotchange', 'processAttrChange'],
  data () {
    return {
      loadTypes: [
        {
          name: 'load',
          value: 'load'
        },
        {
          name: 'goBack',
          value: 'goBack'
        },
        {
          name: 'goForward',
          value: 'goForward'
        },
        {
          name: 'reload',
          value: 'reload'
        },
        {
          name: 'stopLoad',
          value: 'stopLoad'
        }
      ]
    }
  },
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    urlChange (e) {
      this.nodeAttrChange({ attr: 'loadUrl', payload: e.target.value })
      //快照更新地址
      this.processSnapShotchange({ targetUrl: e.target.value });
    },
    forwardSnapTarget () {
      let { loadUrl } = this.currentSelect;
      if (loadUrl) {
        this.processSnapshot({ targetUrl: loadUrl });
      }
    }
  },
  mounted () {
    this.forwardSnapTarget();
  }
}
</script>
