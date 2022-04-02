<template>
  <div class="topic-panel-body">
    <template v-if="chartEnable">
      <div class="topic-panel-content" v-if="chartHtml && panelHTML" v-html="panelHTML">
      </div>
      <div class="topic-panel-content" :id="chartConf.name" v-else-if="chartEchart && panelChartOption">
      </div>
      <template v-else>
        <div class="topic-panel-mask__loading"
             v-loading="!panelHTML"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)"
        ></div>
      </template>
    </template>
    <template v-if="chartConf.edit && setupMode">
      <div :class="['topic-panel-editBox',{'active': chartConf.active, 'empty': chartConf.empty}]">
        <el-button v-if="create" @click="panelOpreat('add')" type="success" icon="el-icon-plus" circle></el-button>
        <el-button v-if="edit" @click="panelOpreat('update')" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button v-if="edit" @click="panelOpreat('del')" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </template>
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'
import axios from 'axios'
export default {
  name: 'panel',
  data () {
    return {
      panelHTML: '',
      panelChartOption: null,
      colorOptions: ['lineColor']
    }
  },
  mixins: [echartMixins],
  inject: ['setupMode', 'previewMode'],
  props: {
    chartProp: Object
  },
  computed: {
    chartConf: function () {
      return this.chartProp
    },
    create: function () {
      return this.chartConf.empty
    },
    edit: function () {
      return !this.chartConf.empty
    },
    chartEnable: function () {
      return !this.chartConf.empty && !!this.chartConf.contentUrl
    },
    chartEchart: function () {
      return '1235'.includes(this.chartConf.contentType)
    },
    chartHtml: function () {
      return '46'.includes(this.chartConf.contentType)
    },
    chartColors: function () {
      return this.colorOptions.reduce((acc, cssVar) => {
        acc[cssVar] = getComputedStyle(document.querySelector('.chartsColors')).getPropertyValue(`--${cssVar}`).trim()
        return acc
      }, {})
    }
  },
  watch: {
    'chartProp': {
      handler (n, o) {
        if (n.contentId !== o.contentId) {
          this.panelLoad();
        }
      },
      // immediate: true,  //刷新加载 立马触发一次handler
      deep: true // 可以深度检测到 person 对象的属性值的变化
    }
  },
  methods: {
    panelOpreat (action) {
      this.$emit('panelOpreat', {type: action, data: this.chartConf})
    },
    panelLoad () {
      this.panelHTML = '';
      this.panelChartOption = null;
      if (this.chartEnable) {
        axios.get(this.chartConf.contentUrl).then(this.panelContentHandle).catch(e => {
          console.log(e)
        })
      }
    },
    panelContentHandle (r) {
      const {data: {data, statusCode: code}} = r;
      if (this.chartEchart) {
        this.panelChartOption = data;
        const timer = setTimeout(() => {
          this.draw();
          clearTimeout(timer)
        }, 3e2)
      }
      if (this.chartHtml) {
        let docFragment = document.createElement('div');
        docFragment.innerHTML = data;
        let styleEl = docFragment.querySelector('.wisemotion-simpleTable--defaultstyle')
        console.log(docFragment, styleEl)
        if (styleEl) {
          styleEl.parentNode.removeChild(styleEl);
        }
        this.panelHTML = docFragment.innerHTML;
      }
    },
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.chartConf.name));
      this.chart.setOption(this.panelChartOption);
      console.log(this.chartColors)
    }
  },
  created () {
    this.panelLoad();
  },
  destroyed () {
    window.onresize = null;
  }
}
</script>
