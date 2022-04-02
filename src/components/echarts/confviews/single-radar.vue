<template>
  <div :id="id">
    single-radar
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'

export default {
  data () {
    return {
      splitAreaColor: '#0d6dba',
      axisLineColor: '#4f8bbe'
    };
  },
  mixins: [echartMixins],
  mounted () {
    this.draw();
  },
  props: {
    id: {
      type: String,
      default: 'singleRadar'
    },
    colors: {
      type: Array,
      default: () => ['#f5a623', '#13adff', '#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec', '#cf9ef1']
    },
    backgroundColor: {
      type: String,
      default: '#0c4d90'
    },
    title: {
      type: String,
      default: 'radar'
    },
    splitNumber: {
      type: Number,
      default: 5
    },
    axisMax: {
      type: Number,
      default: 5000000
    },
    legendArr: {
      type: Array,
      // required: true,
      default: () => ['正常指标', '实际指标']
    },
    indicatorArr: {
      type: Array,
      // required: true,
      default: () => ['CO', 'CO₂', 'NO', 'H₂S', 'O₄', 'SF6', 'CH']
    },
    valueArr: {
      type: Array,
      // required: true,
      default: () => [[80, 50, 55, 80, 50, 80, 48], [60, 60, 65, 60, 70, 40, 80]]
    }
  },
  watch: {
    valueArr: function () {
      this.draw();
    }
  },
  methods: {
    hexToRgba (hex, opacity) {
      return ['rgba(', parseInt('0x' + hex.slice(1, 3)), ',', parseInt('0x' + hex.slice(3, 5)), ',', parseInt('0x' + hex.slice(5, 7)), ',', opacity, ')'].join('');
    },
    convertData () {
      let _indicator = this.indicatorArr.map(indicator => {
        return {name: indicator, max: this.axisMax}
      });

      let _series = this.valueArr.map((seriesData, index) => {
        return {
          name: this.legendArr[index],
          type: 'radar',
          symbol: 'circle',
          symbolSize: 10,
          areaStyle: {
            normal: {
              color: this.hexToRgba(this.colors[index], '.4')
            }
          },
          itemStyle: {
            color: this.hexToRgba(this.colors[index], '1'),
            borderColor: this.hexToRgba(this.colors[index], '.3'),
            borderWidth: 10
          },
          lineStyle: {
            normal: {
              type: 'dashed',
              color: this.hexToRgba(this.colors[index], '1'),
              width: 2
            }
          },
          data: [
            seriesData
          ]
        }
      });

      return {_indicator, _series}
    },
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.id));

      let {_indicator, _series} = this.convertData();
      let option = {
        title: {
          text: this.title,
          show: !!this.title,
          textStyle: {
            fontSize: 16,
            color: '#fff'
          },
          left: '2%'
        },
        backgroundColor: this.backgroundColor,
        normal: {
          top: 200,
          left: 300,
          width: 500,
          height: 400,
          zIndex: 6,
          backgroundColor: ''
        },
        color: this.colors,
        tooltip: {
          show: true,
          trigger: 'item'
        },
        legend: {
          show: true,
          icon: 'circle',
          left: '43%',
          top: '90%',
          orient: 'horizontal',
          textStyle: {
            fontSize: 16,
            color: '#fff'
          },
          data: this.legendArr
        },
        radar: {
          center: ['50%', '45%'],
          radius: '70%',
          startAngle: 90,
          splitNumber: this.splitNumber,
          shape: 'polygon',
          name: {
            textStyle: {
              color: '#fff',
              fontSize: 18
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: this.splitAreaColor,
              opacity: 0.1
            }
          },
          axisLabel: {
            show: false,
            fontSize: 18,
            color: '#fff',
            fontWeight: 'normal'
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.axisLineColor,
              opacity: 1
            }
          },
          splitLine: {

            lineStyle: {
              color: this.axisLineColor,
              opacity: 0.5
            }
          },
          indicator: _indicator
        },
        series: _series
      };

      console.log(JSON.stringify(option, null, 2))
      this.chart.setOption(option);
    }
  },
  destroyed () {
    window.onresize = null;
  }
};
</script>
