<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">结束</a-tag>
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
    <a-form-item label="返回变量"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="变量名"
               :value="currentSelect.retVarName"
               @change="retVarNameChange" />
    </a-form-item>
    <a-form-item label="等待异步节点"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.waitAllAsyncNodeEnd"
                 active-text="是否等待异步节点结束"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <a-form-item label="异常结束"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-switch v-model="currentSelect.retError"
                 active-text="是否异常结束"
                 :active-value="1"
                 :inactive-value="0">
      </el-switch>
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="异常代码"
                   v-if="currentSelect.retError"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input placeholder=""
                 :value="currentSelect.userCode"
                 @change="userCodeChange" />
      </a-form-item>
    </transition>
    <transition name="el-zoom-in-top">
      <a-form-item label="异常提示"
                   v-if="currentSelect.retError"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input placeholder=""
                 :value="currentSelect.userMessage"
                 @change="userMessageChange" />
      </a-form-item>
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'end',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    retVarNameChange (e) {
      this.nodeAttrChange({ attr: 'retVarName', payload: e.target.value })
    },
    userCodeChange (e) {
      this.nodeAttrChange({ attr: 'userCode', payload: Number(e.target.value) })
    },
    userMessageChange (e) {
      this.nodeAttrChange({ attr: 'userMessage', payload: e.target.value })
    }
  }
}
</script>
