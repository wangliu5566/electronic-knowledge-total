<template>
  <div>
    <Row>
      <div class="view-main">
        <Row class="pt10">
          <Radio-group v-model="defaultType" @on-change="getMonthDtats">
            <Radio label="0"><span class="view-type">汇总</span></Radio>
            <Radio label="pc"><span class="view-type">PC</span></Radio>
            <Radio label="mobile"><span class="view-type">WAP</span></Radio>
          </Radio-group>
        </Row>
        <div class="view-header">
          <Row>
            <h3>本月流量</h3>
          </Row>
          <Row>
            <Col span="6" offset="2">浏览量(PV)</Col>
            <Col span="6">访客数(UV)</Col>
          </Row>
          <Row>
            <Col span="2">本月</Col>
            <Col span="6">{{monthData.total.current.pv}}</Col>
            <Col span="6">{{monthData.total.current.uv}}</Col>
          </Row>
          <Row>
            <Col span="2">上月</Col>
            <Col span="6">{{monthData.total.last.pv}}</Col>
            <Col span="6">{{monthData.total.last.uv}}</Col>
          </Row>
          <Row>
            <Col span="2">月环比</Col>
            <Col span="6">
            <span class="data-up" v-if="monthData.point.day.pv>0">{{monthData.point.day.pv}}%</span>
            <span class="data-down" v-if="monthData.point.day.pv<0">{{monthData.point.day.pv}}%</span>
            <span v-if="monthData.point.day.pv==0">{{monthData.point.day.pv}}%</span>
            </Col>
            <Col span="6">
            <span class="data-up" v-if="monthData.point.day.uv>0">{{monthData.point.day.uv}}%</span>
            <span class="data-down" v-if="monthData.point.day.uv<0">{{monthData.point.day.uv}}%</span>
            <span v-if="monthData.point.day.uv==0">{{monthData.point.day.uv}}%</span>
            </Col>
          </Row>
          <Row>
            <Col span="2">年同比</Col>
            <Col span="6">
            <span class="data-up" v-if="monthData.point.week.pv>0">{{monthData.point.week.pv}}%</span>
            <span class="data-down" v-if="monthData.point.week.pv<0">{{monthData.point.week.pv}}%</span>
            <span v-if="monthData.point.week.pv==0">{{monthData.point.week.pv}}%</span>
            </Col>
            <Col span="6">
            <span class="data-up" v-if="monthData.point.week.uv>0">{{monthData.point.week.uv}}%</span>
            <span class="data-down" v-if="monthData.point.week.uv<0">{{monthData.point.week.uv}}%</span>
            <span v-if="monthData.point.week.uv==0">{{monthData.point.week.uv}}%</span>
            </Col>
          </Row>
        </div>
        <div class="view-container">
          <Row>时间：
            <Radio-group v-model="defaultStatus" type="button" size="large" @on-change="getMonthDtats">
              <Radio label="-29">本月</Radio>
              <Radio label="-365">最近一年</Radio>
            </Radio-group>
          </Row>
          <Row>
            <div class="show-view-data" ref="viewDataContainer">
            </div>
            <Row>
              <Col span="20" offset="2">
              <Table :columns="accountColumns" :data="accountDatas" highlight-row></Table>
              </Col>
            </Row>
          </Row>
        </div>
      </div>
    </Row>
  </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入折线图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
export default {
  data() {
    return {
      defaultType: '0',
      defaultStatus: '-29',

      //本月统计数据
      monthData: {
        total: {
          current: {
            pv: '-',
            uv: '-'
          },
          last: {
            pv: '-',
            uv: '-'
          }
        },
        point: {
          day: {
            pv: '0',
            uv: '0',
          },
          week: {
            pv: '0',
            uv: '0',
          }
        }
      },

      //echarts数据
      option: {
        title: {
          text: '',
        },
        tooltip: {
          trigger: 'axis',
          padding: 10,
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
              precision: 0,
            }
          }
        },
        legend: {
          data: ['浏览量(PV)', '访客数(UV)', ]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          },
          right: 20,
        },
        grid: {
          left: '3%',
          right: '12%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          name: '时间/日期轴',
          nameGap: '10',
          boundaryGap: false,
          data: []
        }],
        yAxis: [{
          type: 'value',
          name: '浏览量/访客数',
        }],
        series: [{
          name: '浏览量(PV)',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          itemStyle: {
            normal: {
              color: '#0099ff',
            },
          },
          data: []
        }, {
          name: '访客数(UV)',
          type: 'line',
          smooth: true,
          showAllSymbol: true,
          itemStyle: {
            normal: {
              color: '#ff0000',
            },
          },
          data: []
        }],
      },
      //表格配置
      accountColumns: [{
        title: '日期/月份',
        key: 'time'
      }, {
        title: '浏览量(PV)',
        key: 'pv',
        sortable: true,
      }, {
        title: '访客量(UV)',
        key: 'uv',
        sortable: true,
      }],


      //表格数据
      accountDatas: [],
    }
  },
  methods: {
    renderViewLine() {
      var myEcharts = echarts.init(this.$refs.viewDataContainer);
      myEcharts.setOption(this.option)
      this.getMonthDtats();
    },
    getMonthDtats() {
      let myEcharts = echarts.getInstanceByDom(this.$refs.viewDataContainer);
      myEcharts.showLoading();
      let gran = '';
      switch (this.defaultStatus) {
        case '-29':
          gran = 'day'
          break;
        case '-365':
          gran = 'month'
          break;
        default:
          break;
      }
      this.$http.get('/v1/admin/flow/current-day', {
        params: {
          deviceType: this.defaultType,
          days: this.defaultStatus,
          gran: gran,
          type:'year'
        }
      }).then((res) => {
        this.monthData.total = res.data.data.total;
        this.monthData.point = res.data.data.point;
        myEcharts.hideLoading();
        myEcharts.setOption({
          xAxis: {
            data: res.data.data.list.rows
          },
          series: [{
            name: '浏览量(PV)',
            data: res.data.data.list.pv
          }, {
            name: '访客数(UV)',
            data: res.data.data.list.uv
          }]
        });
        this.accountDatas = res.data.data.table;
      })
    }
  },
  mounted() {
    this.renderViewLine();
  }
}

</script>
<style lang="less">


</style>
