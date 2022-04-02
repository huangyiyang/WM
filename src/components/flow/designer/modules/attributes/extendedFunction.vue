<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">截屏</a-tag>
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
    <a-form-item label="函数名"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.functionName"
               @change="functionNameChange" />
    </a-form-item>
    <a-form-item label="输入变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.inputVarName"
               @change="inputVarNameChange" />
    </a-form-item>
    <a-form-item label="输出变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.outputVarName"
               @change="outputVarNameChange" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'extendedFunction',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processGetPath'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    functionNameChange (e) {
      this.nodeAttrChange({ attr: 'functionName', payload: e.target.value })
    },
    inputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'inputVarName', payload: e.target.value })
    },
    outputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'outputVarName', payload: e.target.value })
    },
    getPath () {
      this.processGetPath(this.currentSelect.id, this.currentSelect)
    }
  }
}
</script>
