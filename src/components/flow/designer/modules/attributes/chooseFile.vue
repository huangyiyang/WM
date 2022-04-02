<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">选择文件</a-tag>
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
    <a-form-item label="选择按钮位置"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.clickPath"
               @change="clickPathChange" />
      <a-icon style="width: 20%;fontSize:16px;"
              type="fullscreen-exit"
              @click="getPath('clickPath')" />
    </a-form-item>
    <a-form-item label="文件根目录"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.fileRootPath"
                 placeholder="请选择">
        <el-option v-for="item in valueName"
                   :key="item.value"
                   :label="item.name"
                   :value="item.value">
        </el-option>
      </el-select>
    </a-form-item>
    <a-form-item label="文件相对路径"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder=""
               :value="currentSelect.relativePath"
               @change="relativePathChange" />
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'chooseFile',
  data () {
    return {
      valueName: [
        {
          name: 'download',
          value: 'download'
        },
        {
          name: 'screenshot',
          value: 'screenshot'
        },
        {
          name: 'file',
          value: 'file'
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
    clickPathChange (e) {
      this.nodeAttrChange({ attr: 'clickPath', payload: e.target.value })
    },
    relativePathChange (e) {
      this.nodeAttrChange({ attr: 'relativePath', payload: e.target.value })
    },
    getPath (attr) {
      this.processGetPath(this.currentSelect.id, this.currentSelect, attr)
    }
  }
}
</script>
