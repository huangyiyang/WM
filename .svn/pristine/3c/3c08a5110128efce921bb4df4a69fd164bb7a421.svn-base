<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">短信验证</a-tag>
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
    <a-form-item label="通知类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.notificationType"
                 @change="notificationTypeChange"
                 placeholder="请选择">
        <el-option v-for="item in notificationTypes"
                   :key="item.id"
                   :label="item.name"
                   :value="item.name">
        </el-option>
      </el-select>
    </a-form-item>
    <a-form-item label="通知地址"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.notificationAddr"
               @change="notificationAddrChange" />
    </a-form-item>
    <a-form-item label="超时设置"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-input placeholder=""
                v-model.number="currentSelect.timeout"
                @change="timeoutChange" />
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="输入位置"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <a-input style="width: 80%"
                 placeholder=""
                 :value="currentSelect.setElementPath"
                 @change="setElementPathChange" />
        <a-icon style="width: 20%;fontSize:16px;"
                type="fullscreen-exit"
                @click="getPath('setElementPath')" />
      </a-form-item>
      
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'smsVerification',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  data () {
    return {
      notificationTypes: [
        {
          id: 1,
          name: 'none'
        }, {
          id: 2,
          name: 'phone'
        }, {
          id: 3,
          name: 'email'
        }, {
          id: 4,
          name: 'url'
        }
      ]
    }
  },
  inject: ['nodeAttrChange', 'processGetPath', 'processAttrChange'],
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    timeoutChange (e) {
      this.nodeAttrChange({ attr: 'loadTime', payload: Number(e.target.value) })
    },
    notificationTypeChange (e) {
      this.nodeAttrChange({ attr: 'notificationType', payload: e.target.value })
    },
    setElementPathChange (e) {
      this.nodeAttrChange({ attr: 'setElementPath', payload: e.target.value })
    },
    notificationAddrChange (e) {
      this.nodeAttrChange({ attr: 'notificationAddr', payload: e.target.value })
    },
    getPath (attr) {
      this.processGetPath(this.currentSelect.id, this.currentSelect, attr)
    }
  },
  mounted () {
  }
}
</script>
