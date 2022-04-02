<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">循环结束</a-tag>
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
    <a-form-item label="追加目标"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入将被添加循环产出的变量名"
               :value="currentSelect.outputVarName"
               @change="outputVarNameChange" />
    </a-form-item>
    <a-form-item label="循环产出"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="请输入循环产出变量名"
               :value="currentSelect.outputVarItem"
               @change="outputVarItemChange" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'start',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    outputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'outputVarName', payload: e.target.value })
    },
    outputVarItemChange (e) {
      this.nodeAttrChange({ attr: 'outputVarItem', payload: e.target.value })
    }
  }
}
</script>
