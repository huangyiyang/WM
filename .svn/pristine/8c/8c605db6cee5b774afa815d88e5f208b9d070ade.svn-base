<template>
  <div class="singleColorGradationMap" id="singleColorGradationMap">
    色阶地图
  </div>
</template>

<script>
import echartMixins from '@/mixins/resize-charts-mixins'
import Util from '@/utils/index'

const {path2JsonUtil: {execpath2json, toNameStringofMapValue}} = Util;
const path2json = execpath2json;
export default {
  name: 'single-color-gradation-map',
  data () {
    return {
      chart: null,
      categorylimit: 100
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
      let slIndex = this.yalisPath ? this.yalisPath.lastIndexOf(']') : 0;

      return slIndex ? this.yalisPath.slice(slIndex + 2) : 'demo'
    }
  },
  methods: {
    draw () {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.$echarts.init(document.getElementById('singleColorGradationMap'));

      //数据转换
      var data = this.xalis.map((name, index) => {
        return {
          name: name,
          value: this.yalis[index]
        }
      })

      var yData = [];

      data.sort(function (o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1;
        if (isNaN(o2.value) || o2.value == null) return 1;
        return o1.value - o2.value;
      });
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        yData.push(data[i].name);
      }
      let option = {
        title: {
          text: '全国色阶地图条形图',
          textStyle: {
            fontSize: 30
          },
          x: 'center'
        },
        tooltip: {
          show: true,
          formatter: function (params) {
            return params.name + '：' + params.data['value']
          }
        },
        visualMap: {
          type: 'continuous',
          text: ['', ''],
          showLabel: true,
          seriesIndex: [0],
          min: 0,
          max: 10,
          inRange: {
            color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
          },
          textStyle: {
            color: '#000'
          },
          bottom: 30,
          left: 'left'
        },
        grid: {
          right: 10,
          top: 80,
          bottom: 30,
          width: '10%'
        },
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          splitNumber: 1,
          boundaryGap: true,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: '#aaa'
            }
          }
        },
        yAxis: {
          type: 'category',
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#999'
            }
          },
          data: yData
        },
        geo: {
          roam: true,
          map: 'china',
          left: '6%',
          right: '160',
          layoutSize: '90%',
          label: {
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              areaColor: '#fff464'
            }
          },
          regions: [{
            name: '南海诸岛',
            value: 0,
            itemStyle: {
              normal: {
                opacity: 0,
                label: {
                  show: true
                }
              }
            }
          }]
        },
        series: [{
          name: 'mapSer',
          type: 'map',
          roam: false,
          geoIndex: 0,
          label: {
            show: false
          },
          data: data
        }, {
          name: 'barSer',
          type: 'bar',
          roam: false,
          visualMap: false,
          zlevel: 2,
          barMaxWidth: 20,
          itemStyle: {
            normal: {
              color: '#40a9ed'
            },
            emphasis: {
              color: '#3596c0'
            }
          },
          label: {
            normal: {
              show: false,
              position: 'right',
              offset: [0, 10]
            },
            emphasis: {
              show: true,
              position: 'right',
              offset: [10, 0]
            }
          },
          data: data
        }]
      };

      this.presistScript();
      this.chart.setOption(option);
    },
    presistScript () {
      const _Sdraw = (cookJson, _xalis, _yalis, FuncHub) => {
        const execpath2json = FuncHub['execpath2json'];
        const toNameStringofMapValue = FuncHub['toNameStringofMapValue'];
        const xalis = execpath2json(cookJson, _xalis);
        const yalis = execpath2json(cookJson, _yalis);
        const valueName = (() => {
          return toNameStringofMapValue(cookJson, _yalis)
        })();
        console.log('valueName', valueName)
        //数据纯属虚构
        var data = xalis.map((name, index) => {
          return {
            name: name,
            value: yalis[index]
          }
        })

        var yData = [];

        data.sort(function (o1, o2) {
          if (isNaN(o1.value) || o1.value == null) return -1;
          if (isNaN(o2.value) || o2.value == null) return 1;
          return o1.value - o2.value;
        });
        console.log(data)
        for (var i = 0; i < data.length; i++) {
          yData.push(data[i].name);
        }
        let option = {
          title: {
            text: '全国色阶地图条形图',
            textStyle: {
              fontSize: 30
            },
            x: 'center'
          },
          tooltip: {
            show: true,
            formatter: function (params) {
              return params.name + '：' + params.data['value']
            }
          },
          visualMap: {
            type: 'continuous',
            text: ['', ''],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: 10,
            inRange: {
              color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096']
            },
            textStyle: {
              color: '#000'
            },
            bottom: 30,
            left: 'left'
          },
          grid: {
            right: 10,
            top: 80,
            bottom: 30,
            width: '10%'
          },
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            splitNumber: 1,
            boundaryGap: true,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            nameGap: 16,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#999'
              }
            },
            data: yData
          },
          geo: {
            roam: true,
            map: 'china',
            left: '6%',
            right: '160',
            layoutSize: '90%',
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                areaColor: '#fff464'
              }
            },
            regions: [{
              name: '南海诸岛',
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: true
                  }
                }
              }
            }]
          },
          series: [{
            name: valueName,
            type: 'map',
            roam: false,
            geoIndex: 0,
            label: {
              show: false
            },
            data: data
          }, {
            name: valueName,
            type: 'bar',
            roam: false,
            visualMap: false,
            zlevel: 2,
            barMaxWidth: 20,
            itemStyle: {
              normal: {
                color: '#40a9ed'
              },
              emphasis: {
                color: '#3596c0'
              }
            },
            label: {
              normal: {
                show: false,
                position: 'right',
                offset: [0, 10]
              },
              emphasis: {
                show: true,
                position: 'right',
                offset: [10, 0]
              }
            },
            data: data
          }]
        };

        return option
      };
      this.interfaceScriptSave(_Sdraw.toString())
    }
  },
  destroyed () {
    window.onresize = null;
  }
}
</script>
