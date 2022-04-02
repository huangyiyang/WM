<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">等待</a-tag>
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
    <a-form-item label="数据频道ID"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-input placeholder=""
                v-model.number="currentSelect.dataId"
                @change="dataIdChange" />
    </a-form-item>
    <a-form-item label="超时时长"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-input placeholder=""
                v-model.number="currentSelect.timeout"
                @change="waitTimeChange" />
    </a-form-item>
    <a-form-item label="输出"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-input placeholder=""
                v-model="currentSelect.outputVarName"
                @change="outputVarNameChange" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'data-slot',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processGetPath'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    waitTimeChange (e) {
      // 验证输入数字 v-model.number
      this.nodeAttrChange({ attr: 'timeout', payload: e.target.value })
    },
    dataIdChange (e) {
      // 验证输入数字 v-model.number
      this.nodeAttrChange({ attr: 'dataId', payload: e.target.value })
    },
    outputVarNameChange (e) {
      //this.nodeAttrChange({ attr: 'elementPath', payload: e.target.value })
      this.nodeAttrChange({ attr: 'outputVarName', payload: e.target.value })
    }
  }
}
</script>
