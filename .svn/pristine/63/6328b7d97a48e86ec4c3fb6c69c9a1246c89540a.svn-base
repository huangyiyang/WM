<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">输入</a-tag>
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
    <a-form-item label="输入位置"
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
    <a-form-item label="选择类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.setAttribute"
                 placeholder="请选择">
        <el-option v-for="item in valueName"
                   :key="item.value"
                   :label="item.name"
                   :value="item.value">
        </el-option>
      </el-select>
    </a-form-item>
    <a-form-item label="输入值"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder=""
               :value="currentSelect.setVarName"
               @change="valueChange" />
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'set',
  data () {
    return {
      valueName: [
        {
          name: 'value',
          value: 'value'
        },
        {
          name: 'innerText',
          value: 'innerText'
        },
        {
          name: 'innerHTML',
          value: 'innerHTML'
        },
        {
          name: 'outerHTML',
          value: 'outerHTML'
        }
      ]
    }
  },
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
    screenShotChange (e) {
      this.nodeAttrChange({ attr: 'screenShot', payload: e.target.value })
    },
    valueChange (e) {
      this.nodeAttrChange({ attr: 'setVarName', payload: e.target.value })
    },
    getPath () {
      this.processGetPath(this.currentSelect.id, this.currentSelect)
    }
  }
}
</script>
