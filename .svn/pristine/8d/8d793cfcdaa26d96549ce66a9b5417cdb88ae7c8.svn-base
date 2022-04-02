<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">功能模块</a-tag>
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
      <a-input placeholder="@last"
               :value="currentSelect.inputVarName"
               @change="inputVarNameChange" />
    </a-form-item>
    <a-form-item label="输出"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder="输出参数"
               :value="currentSelect.outputVarName"
               @change="outputVarNameChange" />
    </a-form-item>
    <a-form-item label="功能模块"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.subBlockId"
                 placeholder="请选择功能模块">
        <el-option v-for="item in processList"
                   :key="item.value"
                   :label="item.name"
                   :value="item.value">
        </el-option>
      </el-select>
    </a-form-item>
    <transition name="el-zoom-in-top">
      <a-form-item label="编辑"
                   v-if="currentSelect.subBlockId"
                   :label-col="formItemLayout.labelCol"
                   :wrapper-col="formItemLayout.wrapperCol">
        <el-button type="primary"
                   size="mini"
                   icon="el-icon-edit"></el-button>
      </a-form-item>
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'subBlock',
  data () {
    return {
      processList: []
    }
  },
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange'],
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
    /* @method 下拉数据 */
    interfaceSelect () {
      this.$axios.post('/process/list', '', s => {
        this.processList = s.data.map(process => {
          let { processName, id } = process;

          return Object.assign(process, { value: id, name: processName })
        });
      });
    }
  },
  mounted () {
    this.interfaceSelect();
  }
}
</script>
