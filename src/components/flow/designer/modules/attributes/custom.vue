<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">自定义</a-tag>
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
    <a-form-item label="输入"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="输入参数"
               :value="currentSelect.inputVarName"
               @change="inputVarNameChange" />
    </a-form-item>
    <a-form-item label="输出"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="输出变量"
               :value="currentSelect.outputVarName"
               @change="outputVarNameChange" />
    </a-form-item>
    <a-form-item label="执行位置"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder="执行位置"
               :value="currentSelect.framePath"
               @change="framePathChange" />
      <a-icon style="width: 20%;fontSize:16px;"
              type="fullscreen-exit"
              @click="getPath('framePath')" />
    </a-form-item>
    <a-form-item label="代码"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <!-- <a-button type="primary"
                @click="showmore">
        导入
      </a-button> -->
      <a-textarea placeholder="输入自定义代码"
                  :rows="3"
                  :value="currentSelect.script"
                  @change="codeChange"
                  style="height:200px" />
    </a-form-item>
  </a-form>
</template>

<script>
export default {
  name: 'custom',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processGetPath'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    inputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'inputVarName', payload: e.target.value })
    },
    outputVarNameChange (e) {
      this.nodeAttrChange({ attr: 'outputVarName', payload: e.target.value })
    },
    framePathChange (e) {
      this.nodeAttrChange({ attr: 'framePath', payload: e.target.value })
    },
    codeChange (e) {
      this.nodeAttrChange({ attr: 'script', payload: e.target.value })
    },
    getPath (attr) {
      this.processGetPath(this.currentSelect.id, this.currentSelect, attr)
    }
  }
}
</script>
