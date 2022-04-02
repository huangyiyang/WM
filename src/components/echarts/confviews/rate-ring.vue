<template>
  <div :id="id">
    rate-ring
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'

export default {
  data () {
    return {
      chart: null
    };
  },
  mixins: [echartMixins],
  mounted () {
    this.draw();
  },
  props: {
    id: {
      type: String,
      default: 'chartRate'
    },
    tips: {
      type: Number,
      required: true,
      default: 50
    },
    colorObj: {
      type: Object,
      default: function () {
        return {
          textStyle: '#3fc0fb',
          series: {
            color: ['#00bcd44a', 'transparent'],
            dataColor: {
              normal: '#03a9f4',
              shadowColor: '#97e2f5'
            }
          }
        };
      }
    }
  },
  watch: {
    tips: function () {
      this.draw();
    }
  },
  methods: {
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.id));
      //  ----------------------------------------------------------------
      let tips = this.tips;
      let option = {
        title: [
          {
            text: tips * 1 + '%\ncompleted',
            x: 'center',
            y: 'center',
            textStyle: {
              color: this.colorObj.textStyle,
              fontSize: 16
            }
          }
        ],
        series: [
          {
            type: 'pie',
            radius: ['75%', '80%'],
            center: ['50%', '50%'],
            hoverAnimation: false,
            color: this.colorObj.series.color,
            label: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: tips,
                itemStyle: {
                  normal: {
                    color: this.colorObj.series.dataColor.normal,
                    shadowBlur: 10,
                    shadowColor: this.colorObj.series.dataColor.shadowColor
                  }
                }
              },
              {
                value: 100 - tips
              }
            ]
          }
        ]
      };
      this.chart.setOption(option);
    }
  },
  destroyed () {
    window.onresize = null;
  }
};
</script>
