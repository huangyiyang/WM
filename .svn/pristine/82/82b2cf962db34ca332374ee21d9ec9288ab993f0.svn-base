<template>
  <a-form layout="horizontal">
    <a-form-item label="类型"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-tag color="purple">{{ currentSelect.type }}</a-tag>
      <a-tag color="purple">验证码节点</a-tag>
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
    <a-form-item label="图片位置"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input style="width: 80%"
               placeholder=""
               :value="currentSelect.imgElementPath"
               @change="imgElementPathChange" />
      <a-icon style="width: 20%;fontSize:16px;"
              type="fullscreen-exit"
              @click="getPath('imgElementPath')" />
    </a-form-item>
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
    <a-form-item label="识别服务"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <el-select class="select-in-afi"
                 v-model="currentSelect.ocrUrl"
                 @change="ocrUrlChange"
                 placeholder="请选择">
        <el-option v-for="item in ocrUrls"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
        </el-option>
      </el-select>
    </a-form-item>
    <a-form-item label="截图"
                 v-if="false"
                 :label-col="formItemLayout.labelCol"
                 :wrapper-col="formItemLayout.wrapperCol">
      <a-input placeholder=""
               :value="currentSelect.screenShot"
               @change="screenShotChange" />
    </a-form-item>
    <transition name="el-zoom-in-top">
    </transition>
  </a-form>
</template>

<script>
export default {
  name: 'captcha',
  props: [
    'currentSelect',
    'formItemLayout'
  ],
  inject: ['nodeAttrChange', 'processGetPath'],
  data () {
    return {
      ocrUrls: []
    }
  },
  methods: {
    ocrUrlChange (e) {
      this.processAttrChange({ attr: 'ocrUrl', payload: e });
    },
    nameChange (e) {
      this.nodeAttrChange({ attr: 'nodeName', payload: e.target.value })
    },
    imgElementPathChange (e) {
      this.nodeAttrChange({ attr: 'imgElementPath', payload: e.target.value })
    },
    setElementPathChange (e) {
      this.nodeAttrChange({ attr: 'setElementPath', payload: e.target.value })
    },
    waitTimeChange (e) {
      // 验证输入数字
      this.nodeAttrChange({ attr: 'waitTime', payload: Number(e.target.value) })
    },
    screenShotChange (e) {
      this.nodeAttrChange({ attr: 'screenShot', payload: e.target.value })
    },
    getPath (attr) {
      this.processGetPath(this.currentSelect.id, this.currentSelect, attr)
    },
    /* @method 下拉数据 */
    interfaceSelect () {
      let data = new URLSearchParams();
      this.$axios.get('/process/imgService', '', s => {
        console.log(s.data)
        this.ocrUrls = s.data;
      });
    }
  },
  created () {
    this.interfaceSelect();
  }
}
</script>
