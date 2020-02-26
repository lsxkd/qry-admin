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
            <el-col :xs="24" :sm="12" :md='8' :lg="4" v-for="(item,index) in summary" :key="index + 'a'"  >
              <div class="colorBox-item" :class="item.color">
                <p class="data-summary-number">
                  <AnimatedNumber :value="item.identifier" :formatValue="formatValue" :duration="600" />
                </p>
                <p class="data-summary-title">今日新增用户数量</p>
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
<!-- 
        <el-table
            :data="tableData4"
            :show-header="false"
            size="small"
            border
            stripe
            style="width: 100%; margin-top: 30px;"
          >
          <el-table-column prop="name">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <span>{{ scope.row.value }}</span>
            </template>
          </el-table-column>
        </el-table> -->
      </el-card>
    </section>

  </div>
</template>


<script>

import AnimatedNumber from 'animated-number-vue'
import { dailyKpiList } from '@/api/api.js';
export default {
  name: 'dashboard-admin',
  components: {
    AnimatedNumber
  },
  data() {
    return {
      summary: [
        { title: '今日新增用户数量', identifier: 0, color: 'blue', path: { name: 'dashboard' }},
        { title: '总用户数量', identifier: 0, color: 'orange', path: { name: 'dashboard' }},
        { title: '今日充值金额', identifier: 0.00, color: 'purple', path: { name: 'dashboard' }},
        { title: '今日VIP充值金额', identifier: 0.00, color: 'green', path: { name: 'dashboard' }},
        // { title: '今日USDT充值量', identifier: 60, color: 'red', path: { name: 'dashboard' }}
      ],
      tableData1: [
        { name: '今日充值金额', value: 20 },
        { name: '今日VIP充值金额', value: 20 }
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
      isComplet: true
    }
  },
  created() {
    // this.getData();
  },
  methods: {
    formatValue(value) {
      return value.toFixed(0)
    },
    formatValueTwo(value) {
      return value.toFixed(2)
    },
    getData() {
      dailyKpiList().then(d => {
        this.listData = d.data
        this.summary[0].identifier = this.listData.todayUser || 0
        this.summary[1].identifier = this.listData.totalUser || 0
        this.summary[2].identifier = this.listData.todayIncome || 0
        this.summary[3].identifier = this.listData.todayRecharge || 0
      }).catch(err => {
        this.listData = {};
      });
    }
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
