<template>
  <div>
    <div style="text-align:center;margin-bottom:20px;">
      <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="6" border>最近7天</el-radio>
      <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="13" border>最近14天</el-radio>
      <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="30" border>最近30天</el-radio>
    </div>
    <div :class="className" ref="chartBar" :style="{height:height,width:width}"></div>
  </div>
  
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
// import { newUserChart } from '@/api/report.js';
const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
  },
  data() {
    return {
      chart: null,
      newUserChartData:{},
      userNumber: '6',
    }
  },
  mounted() {
    // this.initChart()
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  created() {
    this.newUserChart()
  },
  methods: {
    radioBtn(val){
      this.newUserChart()
    },
    getDay(day){
        //获取最近7天日期
        // getDay(0);//当天日期
        // getDay(-7);//7天前日期
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = this.doHandleMonth(tMonth + 1);
      tDate = this.doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
    },
    doHandleMonth(month){
      var m = month;
      if(month.toString().length == 1){
        m = "0" + month;
      }
      return m;
    },
    newUserChart() {
      const data = {
        startDate:this.getDay(-this.userNumber)+' 00:00:00',
        endDate:this.getDay(0)+' 23:59:59',
      }
      newUserChart(data).then(res => {
        if(res.code == 200){
          this.newUserChartData = res.data
          this.initChart()
          this.__resizeHanlder = debounce(() => {
            if (this.chart) {
              this.chart.resize()
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHanlder)
        }else{
          this.$message.error(res.msg);
          
        }
        
      }).catch(err => {
        this.newUserChartData = {};
      });
    },
    initChart() {
      // console.log(this.$el)
      // this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(this.$refs.chartBar, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            label: {
              show: true
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            // dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        legend: {
          data: ['新增用户', ],
          itemGap: 1,
        },
        calculable: true,
        grid: {
          top: 40,
          left: '2%',
          right: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data:this.newUserChartData.xAxisData,
          axisTick: {
            alignWithLabel: true
          }
        }],
        yAxis: [{
          name:'新增用户数',
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: '新增用户',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          // data: [79, 52, 200, 334, 390, 330, 220],
          data:this.newUserChartData.yAxisData,
          animationDuration
        }, 
        // {
        //   name: 'pageB',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [80, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }, {
        //   name: 'pageC',
        //   type: 'bar',
        //   stack: 'vistors',
        //   barWidth: '60%',
        //   data: [30, 52, 200, 334, 390, 330, 220],
        //   animationDuration
        // }
        ]
      })
    }
  }
}
</script>
