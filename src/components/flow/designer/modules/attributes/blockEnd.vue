<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">块结束</a-tag>
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
    <a-form-item label="返回变量名"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入返回变量名"
               :value="currentSelect.retVarName"
               @change="retVarNameChange" />
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'blockEnd',
  data () {
    return {
    }
  },
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  mounted () {
    this.loadNodes();
  },
  inject: ['nodeAttrChange'],
  watch: {
  },
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    retVarNameChange (e) {
      this.nodeAttrChange({ attr: 'retVarName', payload: e.target.value })
    }
  }
}
</script>
