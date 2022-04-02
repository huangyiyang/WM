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
    <a-form-item label="等待时长"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-input placeholder=""
               v-model.number="currentSelect.waitTime"
               @change="waitTimeChange" />
    </a-form-item>
    <a-form-item label="监听类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.isCustom"
                 active-text="是否自定义"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="监听元素"
                   v-if="!currentSelect.isCustom"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input style="width: 80%"
                 placeholder=""
                 :value="currentSelect.waitUntilEle"
                 @change="nodePathChange" />
        <a-icon style="width: 20%;fontSize:16px;"
                type="fullscreen-exit"
                @click="getPath" />
      </a-form-item>
    </transition>
    <transition name="el-zoom-in-top">
      <a-form-item label="监听脚本"
                   v-if="currentSelect.isCustom"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-textarea placeholder="输入自定义代码"
                    :rows="3"
                    :value="currentSelect.script"
                    @change="codeChange"
                    style="height:80px" />
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
  inject: ['nodeAttrChange', 'processGetPath'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    waitTimeChange (e) {
      // 验证输入数字 v-model.number
      this.nodeAttrChange({ attr: 'waitTime', payload: e.target.value })
    },
    nodePathChange (e) {
      //this.nodeAttrChange({ attr: 'elementPath', payload: e.target.value })
      this.nodeAttrChange({ attr: 'waitUntilEle', payload: e.target.value })
    },
    codeChange (e) {
      this.nodeAttrChange({ attr: 'script', payload: e.target.value })
    },
    getPath () {
      this.processGetPath(this.currentSelect.id, this.currentSelect)
    }
  }
}
</script>
