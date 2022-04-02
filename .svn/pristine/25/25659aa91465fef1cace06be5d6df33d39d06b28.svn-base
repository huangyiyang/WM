<template>
  <div :id="id">
    single-pie
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'
import util from '@/utils'
const {pathUtil: path2json} = util

export default {
  data () {
    return {
      textColor: '#5085f2',
      limit: 10
    };
  },
  mixins: [echartMixins],
  mounted () {
    this.draw();
  },
  props: {
    id: {
      type: String,
      default: 'singlePie'
    },
    colors: {
      type: Array,
      default: () => ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec', '#cf9ef1']
    },
    title: {
      type: String,
      default: ''
    },
    cookJson: {
      type: Object,
      required: true,
      default: () => {}
    },
    xalisPath: {
      type: String,
      required: true,
      default: ''
    },
    yalisPath: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    nameArr: function () {
      let xarr = this.xalisPath ? path2json(this.cookJson, this.xalisPath, this.limit) : [335, 310]
      return xarr
    },
    valueArr: function () {
      let yarr = this.yalisPath ? path2json(this.cookJson, this.yalisPath, this.limit) : ['种类01', '种类02']
      return yarr
    },
    legendPos: function () {
      return this.nameArr.length > 3 ? 'outside' : 'inside'
    }
  },
  watch: {
    valueArr: function () {
      this.draw();
    }
  },
  inject: ['interfaceScriptSave'],
  methods: {
    convertData () {
      if (!!this.nameArr.length && !!this.valueArr.length) {
        return this.nameArr.reduce((acc, _name, _index) => {
          acc.push({
            value: this.valueArr[_index] ? this.valueArr[_index] : 0,
            name: _name
          });
          return acc
        }, []).slice(0, this.limit)
      }

      return [{value: 335, name: '种类01'}, {value: 310, name: '种类02'}]
    },
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById(this.id));

      let option = {
        title: [
          {
            text: this.title,
            show: !!this.title,
            textStyle: {
              fontSize: 16,
              color: this.textColor
            },
            left: '2%'
          },
          {
            text: '合计',
            show: 0,
            subtext: 12312,
            textStyle: {
              fontSize: 20,
              color: this.textColor
            },
            subtextStyle: {
              fontSize: 20,
              color: this.textColor
            },
            textAlign: 'center',
            x: '34.5%',
            y: '47%'
          }
        ],
        color: this.colors,
        tooltip: {
          trigger: 'item',
          formatter: function (parms) {
            var str = [parms.seriesName, '</br>', parms.marker, '', parms.data.name, '</br>',
              '数量：', parms.data.value, '</br>', '占比：', parms.percent, '%'].join('');

            return str
          }
        },
        legend: {
          type: 'scroll',
          orient: 'vertical',
          left: '70%',
          align: 'left',
          top: 'middle',
          textStyle: {
            color: '#8C8C8C'
          },
          height: 250
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            center: ['35%', '50%'],
            radius: ['5%', '45%'],
            clockwise: true, //饼图的扇区是否是顺时针排布
            // avoidLabelOverlap: true,
            label: {
              alignTo: 'labelLine', //labelLine,edge
              normal: {
                show: true,
                // position: this.legendPos,
                formatter: function (parms) {
                  return [parms.data.name, '\n', parms.percent, '%'].join('')
                }
              }
            },
            data: this.convertData()
          }
        ]
      };

      this.presistScript();
      this.chart.setOption(option);
    },
    presistScript () {
      const _Sdraw = `(cookJson, _xalis, _yalis) => {
        const title = '';
        const toplimit = 10;
        const textColor = '#5085f2';
        const colors = ['#8d7fec', '#5085f2', '#e75fc3', '#f87be2', '#f2719a', '#fca4bb', '#f59a8f', '#fdb301', '#57e7ec', '#cf9ef1'];
        const nameArr = execpath2json(cookJson, _xalis, toplimit);
        const valueArr = execpath2json(cookJson, _yalis, toplimit);
        const convertData = (() => {
          if (!!nameArr.length && !!valueArr.length) {
            return nameArr.reduce((acc, _name, _index) => {
              acc.push({
                value: valueArr[_index] ? valueArr[_index] : 0,
                name: _name
              });
              return acc
            }, []).slice(0, toplimit)
          }
        })();
        const legendPos = (() => {
          return nameArr.length > 3 ? 'outside' : 'inside'
        })();

        let option = {
          title: [
            {
              text: title,
              show: !!title,
              textStyle: {
                fontSize: 16,
                color: textColor
              },
              left: '2%'
            },
            {
              text: '合计',
              show: 0,
              subtext: 12312,
              textStyle: {
                fontSize: 20,
                color: textColor
              },
              subtextStyle: {
                fontSize: 20,
                color: textColor
              },
              textAlign: 'center',
              x: '34.5%',
              y: '47%'
            }
          ],
          color: colors,
          tooltip: {
            trigger: 'item',
            formatter: function (parms) {
              var str = [parms.seriesName, '</br>', parms.marker, '', parms.data.name, '</br>',
                '数量：', parms.data.value, '</br>', '占比：', parms.percent, '%'].join('');

              return str
            }
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: '70%',
            align: 'left',
            top: 'middle',
            textStyle: {
              color: '#8C8C8C'
            },
            height: 250,
            data: convertData.map(l => l.name)
          },
          series: [
            {
              name: title,
              type: 'pie',
              center: ['35%', '50%'],
              radius: ['5%', '45%'],
              clockwise: true, //饼图的扇区是否是顺时针排布
              // avoidLabelOverlap: true,
              label: {
                alignTo: 'labelLine', //labelLine,edge
                normal: {
                  show: true,
                  position: legendPos,
                  formatter: function (parms) {
                    return [parms.data.name, '\\n', parms.percent, '%'].join('')
                  }
                }
              },
              data: convertData
            }
          ]
        };

        return option
      }`;

      this.interfaceScriptSave(_Sdraw)
    }
  },
  destroyed () {
    window.onresize = null;
  }
};
</script>
