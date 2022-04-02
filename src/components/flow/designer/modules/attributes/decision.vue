<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">条件</a-tag>
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
    <a-form-item label="条件"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input-group compact>
        <a-input style="width: 100%"
                 @change="leftChange"
                 placeholder=""
                 :value="currentSelect.leftVarName"
                 allow-clear />
        <a-select style="width: 100%"
                  placeholder="请选择"
                  :value="currentSelect.operator"
                  @change="handleChange">
          <a-select-option value="exist">
            存在
          </a-select-option>
          <a-select-option value="include">
            包含
          </a-select-option>
          <a-select-option value="==">
            等于
          </a-select-option>
          <a-select-option value=">">
            大于
          </a-select-option>
          <a-select-option value="<">
            小于
          </a-select-option>
          <a-select-option value=">=">
            大于等于
          </a-select-option>
          <a-select-option value="<=">
            小于等于
          </a-select-option>
          <a-select-option value="!=">
            不等于
          </a-select-option>
          <a-select-option value="ninclude">
            不包含
          </a-select-option>
          <a-select-option value="nexist">
            不存在
          </a-select-option>
        </a-select>
        <a-input style="width: 100%"
                 @change="rightChange"
                 :value="currentSelect.rightVarName"
                 allow-clear />
      </a-input-group>
    </a-form-item>
  </a-form>
</template>
<script>
export default {
  name: 'decision',
  data () {
    return {
      leftvalue: '',
      rightvalue: '',
      centervalue: '',
      condition: '',
      operator: ''
    }
  },
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  mounted () {
    this.loadNodes();
  },
  inject: ['nodeAttrChange'],
  watch: {
    // leftvalue (val) {
    //   this.condition = this.leftvalue + this.operator + this.rightvalue
    //   console.log(this.condition)
    //   this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    //   this.nodeAttrChange({ attr: 'leftVarName', payload: this.leftvalue })
    // },
    // rightvalue (val) {
    //   this.condition = this.leftvalue + this.operator + this.rightvalue
    //   console.log(this.condition)
    //   this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    //   this.nodeAttrChange({ attr: 'rightVarName', payload: this.rightvalue });
    // },
    // operator (val) {
    //   this.condition = this.leftvalue + this.operator + this.rightvalue
    //   console.log(this.condition)
    //   this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    //   this.nodeAttrChange({ attr: 'operator', payload: this.operator });
    // }
  },
  methods: {
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    leftChange (e) {
      this.leftvalue = e.target.value
      this.condition = this.leftvalue + this.operator + this.rightvalue
      this.nodeAttrChange({ attr: 'leftVarName', payload: e.target.value })
      this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    },
    rightChange (e) {
      this.rightvalue = e.target.value
      this.condition = this.leftvalue + this.operator + this.rightvalue
      this.nodeAttrChange({ attr: 'rightVarName', payload: e.target.value })
      this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    },
    handleChange (e) {
      this.operator = e
      this.condition = this.leftvalue + this.operator + this.rightvalue
      this.nodeAttrChange({ attr: 'operator', payload: e })
      this.nodeAttrChange({ attr: 'condition', payload: this.condition });
    },
    loadNodes () {
      let data = this.currentSelect;
      ['left', 'right'].forEach(initAlias => {
        data[initAlias + 'VarName'] && (this[initAlias + 'value'] = data[initAlias + 'VarName']);
      })
    }
  }
}
</script>
