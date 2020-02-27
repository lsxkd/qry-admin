<template>
  <div>
    <div style="text-align:center;margin-bottom:20px;height:28px;">
      <!-- <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="6" border>最近7天</el-radio>
      <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="13" border>最近14天</el-radio>
      <el-radio @change='radioBtn' v-model="userNumber" size="mini" label="30" border>最近30天</el-radio> -->
    </div>
    <div :class="className" ref="chartPie" :style="{height:height,width:width}"></div>
  </div>
  
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { rechargePieChart } from '@/api/report.js';
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
    }
  },
  data() {
    return {
      chart: null,
      userNumber: '6',
      rechargePieChartData:[],
      nameArr:[],
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
    this.rechargePieChart()
  },
  methods: {
    radioBtn(val){
      this.rechargePieChart()
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
    rechargePieChart() {
      const data = {
        startDate:this.getDay(-this.userNumber)+' 00:00:00',
        endDate:this.getDay(0)+' 23:59:59',
      }
      rechargePieChart(data).then(res => {
        if(res.code == 200){
          this.rechargePieChartData = res.data
          this.rechargePieChartData.map((item)=>{
            this.nameArr.push(item.name)
          })
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
        this.rechargePieChartData = [];
      });
    },
    initChart() {
      // this.chart = echarts.init(this.$el, 'macarons')
      this.chart = echarts.init(this.$refs.chartPie, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: this.nameArr
        },
        calculable: true,
        series: [
          {
            name: '用户数',
            type: 'pie',
            // roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '40%'],
            // data: [
            //   { value: 320, name: 'Industries' },
            //   { value: 240, name: 'Technology' },
            //   { value: 149, name: 'Forex' },
            //   { value: 100, name: 'Gold' },
            //   { value: 59, name: 'Forecasts' }
            // ],
            data:this.rechargePieChartData,
            animationEasing: 'cubicInOut',
            animationDuration: 1600,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
          }
        ]
      })
    }
  }
}
</script>
