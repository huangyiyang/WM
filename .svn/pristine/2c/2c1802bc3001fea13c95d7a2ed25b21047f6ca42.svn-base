<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">内部代码块</a-tag>
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
    <a-form-item label="代码块名字"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入代码块名字"
               :value="currentSelect.innerBlockName"
               @change="innerBlockNameChange" />
    </a-form-item>
    <a-form-item label="输入变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入输入变量"
               :value="currentSelect.inputVarName"
               @change="inputVarNameChange" />
    </a-form-item>
    <a-form-item label="输出变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入输出变量"
               :value="currentSelect.outputVarName"
               @change="outputVarNameChange" />
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'innerBlock',
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
    innerBlockNameChange (e) {
      this.nodeAttrChange({ attr: 'innerBlockName', payload: e.target.value })
    },
    inputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'inputVarName', payload: e.target.value })
    },
    outputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'outputVarName', payload: e.target.value })
    }
  }
}
</script>
