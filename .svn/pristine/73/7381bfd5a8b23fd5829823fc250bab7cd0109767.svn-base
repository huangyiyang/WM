<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">点击</a-tag>
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
    <a-form-item label="点击位置"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.elementPath"
               @change="nodePathChange" />
      <a-icon style="width: 20%;fontSize:16px;"
              type="fullscreen-exit"
              @click="getPath" />
    </a-form-item>
    <a-form-item label="截图"
                 v-if="false"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder=""
               :value="currentSelect.screenShot"
               @change="screenShotChange" />
    </a-form-item>
    <a-form-item label="鼠标点击"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.mouseClick"
                 active-text="是否鼠标点击"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <a-form-item label="尝试点击"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.ignoreError"
                 active-text="是否尝试点击"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <a-form-item label="执行等待"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.waitNecessary"
                 active-text="是否需要等待"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="等待时间"
                   v-if="currentSelect.waitNecessary"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <el-input placeholder=""
                 v-model.number="currentSelect.waitTime"
                 @change="waitTimeChange" />
      </a-form-item>
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'click',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processGetPath'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    nodePathChange (e) {
      this.nodeAttrChange({ attr: 'elementPath', payload: e.target.value })
    },
    waitTimeChange (e) {
      // 验证输入数字 v-model.number
      this.nodeAttrChange({ attr: 'waitTime', payload: e.target.value })
    },
    screenShotChange (e) {
      this.nodeAttrChange({ attr: 'screenShot', payload: e.target.value })
    },
    getPath () {
      this.processGetPath(this.currentSelect.id, this.currentSelect)
    }
  }
}
</script>
