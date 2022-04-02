<template>
  <div id="single-bar-y">
    single-bar-y
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'
import util from '@/utils'
const {pathUtil: path2json} = util

export default {
  data () {
    return {
      chart: null,
      categorylimit: 15
    };
  },
  mixins: [echartMixins],
  mounted () {
    this.draw();
  },
  props: {
    cookJson: {
      type: Object,
      required: true,
      default: () => {}
    },
    xalisPath: {
      type: String,
      required: true,
      default: () => ''
    },
    yalisPath: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  watch: {
    'xalisPath': function () {
      this.draw()
    },
    'yalisPath': function () {
      this.draw()
    }
  },
  inject: ['interfaceScriptSave'],
  computed: {
    xalis: function () {
      let xarr = this.xalisPath ? path2json(this.cookJson, this.xalisPath, this.categorylimit) : ''
      return xarr
    },
    yalis: function () {
      let yarr = this.yalisPath ? path2json(this.cookJson, this.yalisPath, this.categorylimit) : ''
      return yarr
    },
    valueName: function () {
      let slIndex = this.yalisPath ? this.yalisPath.lastIndexOf('.') : 0;

      return slIndex ? this.yalisPath.slice(slIndex) : 'demo'
    }
  },
  methods: {
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById('single-bar-y'));
      console.log(this.xalis, this.yalis)
      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: this.xalis,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          name: this.valueName,
          data: this.yalis,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      };

      this.presistScript();
      this.chart.setOption(option);
    },
    presistScript () {
      const _Sdraw = `(cookJson, _xalis, _yalis) => {
      const xalis = execpath2json(cookJson, _xalis);
      const yalis = execpath2json(cookJson, _yalis);
      const valueName = (() => {
        let slIndex = _yalis ? _yalis.lastIndexOf('.') : 0;

        return slIndex ? _yalis.slice(slIndex + 1) : 'demo'
      })();
      const toplimit = 15;
      const zoomEnd = Math.ceil(toplimit/(xalis.length) * 10) * 10;

      let option = {
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xalis,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval: 0,
            rotate: 40
          }
        },
        yAxis: {
          type: 'value'
        },
        'dataZoom': [
          {
              'show': true,
              'height': 30,
              'xAxisIndex': [
                  0
              ],
              bottom: 30,
              'start': 0,
              'end': zoomEnd,
              handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
              handleSize: '110%',
              handleStyle:{
                  color:'#d3dee5',

              },
                 textStyle:{
                  color:'#fff'},
                 borderColor:'#90979c'


          },
          {
              'type': 'inside',
              'show': true,
              'height': 15,
              'start': 1,
              'end': 35
          }
        ],
        series: [{
          name: valueName,
          data: yalis,
          type: 'line',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }

      return option
    }`;
      this.interfaceScriptSave(_Sdraw)
    }
  },
  destroyed () {
    window.onresize = null;
  }
}
</script>

