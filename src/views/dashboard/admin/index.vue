<template>
  <div class="dashboard-editor-container">
    <section class="data-summary">
      <el-card>
        <div slot="header">
          <i class="fa fa-gears"></i>
          <span> 关键数据实时指标</span>
        </div>
        <div class="colorBox">
          <el-row :gutter="16">
            <el-col :xs="24" :sm="18" :md='12' :lg="6" v-for="(item,index) in summary" :key="index + 'a'"  >
              <div class="colorBox-item" :class="item.color">
                <p class="data-summary-number">
                  <AnimatedNumber  v-if="item.flag == 'number'" :value="item.identifier" :formatValue="formatValue" :duration="600" />
                  <span v-if="item.flag == 'string'">{{item.identifier}}</span>
                </p>
                <p class="data-summary-title">{{item.title}}</p>
              </div>
            </el-col>
            <!-- <el-col :xs="24" :sm="12" :lg="4" v-for="(item,index) in summary" :key="index + 'a'"  v-show="index >= 2">
              <div class="colorBox-item" :class="item.color">
                <p class="data-summary-number">
                  <AnimatedNumber value="20" :formatValue="formatValue" :duration="600" />
                </p>
                <p class="data-summary-title">今日新增用户数量</p>
              </div>
            </el-col> -->
            
          </el-row>
        </div>
        <!-- <ul  class="clearfix">
          <router-link
            v-for="(item,index) in summary"
            :key="index + 'a'"
            :to="item.path"
            :class="item.color"
            class="data-summary-item"
            tag="li"
            v-show="index < 2"
          >
            <p class="data-summary-number">
              <AnimatedNumber :value="item.identifier" :formatValue="formatValue" :duration="600" />
            </p>
            <p class="data-summary-title">{{item.title}}</p>
          </router-link>
          <router-link
            v-for="(item,index) in summary"
            :key="index"
            :to="item.path"
            :class="item.color"
            class="data-summary-item"
            tag="li"
            v-show="index >= 2"
          >
            <p class="data-summary-number">
              <AnimatedNumber :value="item.identifier" :formatValue="formatValueTwo" :duration="600" />
            </p>
            <p class="data-summary-title">{{item.title}}</p>
          </router-link>
        </ul> -->
      </el-card>
    </section>
    <section class="data-summary">
      <el-card>
        <!-- <div slot="header">
          <i class="fa fa-gears"></i>
          <span> 今日各个游戏收益</span>
        </div> -->

        <el-row :gutter="32">
          <!-- <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
              <bar-chart></bar-chart>
            </div>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="8">
            <div class="chart-wrapper">
              <pie-chart></pie-chart>
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="24" :lg="24">
            <div class="chart-wrapper">
              <PieChartTwo></PieChartTwo>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </section>
    <!-- <section class="data-summary">
      <el-card>
        <div slot="header">
          <i class="fa fa-gears"></i>
          <span> 关键数据指标</span>
        </div>

        <el-table :data="tableData1" :show-header="false" size="small" border stripe style="width: 100%">
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="value">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.$index === 0">{{ scope.row.value }}</span>
                <span v-else>{{ scope.row.value }}</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </section> -->

  </div>
</template>


<script>

import AnimatedNumber from 'animated-number-vue'
import { categoryPie,todayKpi } from '@/api/user.js';
// import PieChart from './components/PieChart'
import PieChartTwo from './components/PieChartTwo'
// import BarChart from './components/BarChart'
export default {
  name: 'dashboard-admin',
  components: {
    AnimatedNumber,
    // BarChart,PieChart,
    PieChartTwo
  },
  data() {
    return {
      summary: [
        { title: '今日新增用户数', identifier: 0, color: 'blue',flag:'number', path: { name: 'dashboard' }},
        { title: '总用户数量', identifier: 0, color: 'orange',flag:'number', path: { name: 'dashboard' }},
        { title: '今日用户活跃数量', identifier: 0, color: 'purple',flag:'number', path: { name: 'dashboard' }},
        { title: '今日阅读时间', identifier: 0, color: 'green',flag:'string', path: { name: 'dashboard' }},
        // { title: '今日USDT充值量', identifier: 60, color: 'red', path: { name: 'dashboard' }}
      ],
      tableData1: [
        { name: '今日充值金额', value: 0 },
        { name: '今日VIP充值金额', value: 0 }
      ],
      // tableData2: [
      //   { name: 'DD积分总充值量', value: 20 },
      //   { name: 'DD积分总提现量', value: 20 },
      //   { name: 'DD积分锁定量', value: 20 }
      // ],
      // tableData3: [
      //   { name: 'USDT总充值量', value: 20 },
      //   { name: 'USDT总提现量', value: 20 }

      // ],
      // tableData4: [
      //   { name: '麻将游戏今日盈利', value: 20 },
      //   { name: 'pcdd今日盈利', value: 20 },
      //   { name: '转盘今日盈利', value: 20 }
      // ],
      listData: {},
      isComplet: true,
      categoryPieData:[],
      todayKpiData:{},
    }
  },
  created() {
    // this.getData();
    // this.categoryPie()
    this.todayKpi()
  },
  methods: {
    formatValue(value) {
      return value.toFixed(0)
    },
    formatValueTwo(value) {
      return value.toFixed(2)
    },
    categoryPie() {
      categoryPie().then(res => {
        // console.log(res.data)
        this.categoryPieData = res.data
        
      })
    },
    todayKpi() {
      todayKpi().then(res => {
        // console.log(res.data)
        this.todayKpiData = res.data
        this.summary[0].identifier = this.todayKpiData.dayNewUsers || 0
        this.summary[1].identifier = this.todayKpiData.allUser || 0
        this.summary[2].identifier = this.todayKpiData.dayAlive || 0
        this.summary[3].identifier = this.todayKpiData.readTime || 0
      }).catch(err => {
        this.todayKpiData = {};
      });
    },

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.colorBox{
  width:100%;
  .colorBox-item{
    width: 100%;
    height: 80px;
    padding: 15px;
    margin: 0 0.8%;
    margin-bottom:15px;
    cursor: pointer;
    &.red {
      background-color: #FC7A6A;
    }
    &.blue {
      background-color: #60A5B5;
    }
    &.orange {
      background-color: #F1C77A;
    }
    &.purple {
      background-color: #8994A8;
    }
    &.green {
      background-color: #5AC79D;
    }
    &.zise{
      background-color:#b6a2de;
    }

    .data-summary-number {
      font-size: 20px;
      color: #fff;
    }
    .data-summary-title {
      margin-top: 10px;
      font-size: 12px;
      color: #fff;
    }
  }
}
.dashboard-editor-container {
  padding:15px;
  background-color: rgb(240, 242, 245);
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
  .data-summary {
  width: 960px;
  margin-bottom: 20px;
}
.data-summary-item {
  float: left;
  width: 18%;
  height: 80px;
  padding: 15px;
  margin: 0 1%;
  cursor: pointer;
  &.red {
    background-color: #FC7A6A;
  }
  &.blue {
    background-color: #60A5B5;
  }
  &.orange {
    background-color: #F1C77A;
  }
  &.purple {
    background-color: #8994A8;
  }
  &.green {
    background-color: #5AC79D;
  }
}
.data-summary-number {
  font-size: 20px;
  color: #fff;
}
.data-summary-title {
  margin-top: 10px;
  font-size: 12px;
  color: #fff;
}
// 优博公告
.note-item {
  line-height: 26px;
}
.note-info {
  float: left;
}
.note-new {
  font-size: 14px;
  color: red;
}
.note-time {
  float: right;
  color: #bbb;
}
}
</style>
