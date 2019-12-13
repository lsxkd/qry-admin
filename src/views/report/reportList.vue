<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item>
        <el-form-item label="开始日期">
        <el-date-picker
          v-model="registrationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          title="搜索"
          style="font-size: 16px"
          @click="changeTime"
        />
      </el-form-item>
      <el-form-item style="float:right;">
        <el-button type="primary" @click="settlementBtn">手动结算今天</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="listData" v-loading="isComplet" :summary-method="getSummaries" show-summary element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="130">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label='日期' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.reportDate}}
        </template>
      </el-table-column>
      <el-table-column label="金额" prop='money' :min-width="150"></el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="fishListPageLimit"
        :current-page="pages.page"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { dailyReportList,dailyReportDayList } from '@/api/api.js';
import moment from 'moment';

export default {
  data() {
    return {
      listData: [],
      isComplet: true,
      total: 1,
      pages: {
        page: 1,
        size: 10,
        startDate:'',
        endDate:''
      },
      formData: {
        timer: ''
      },
      fishListPageLimit:10,
      totalAmount:0,
      registrationTime:[],
    }
  },
  created() {
    this.getData();
  },
  methods: {
    settlementBtn(){
      const date = this.getDay(0)
      const data = {
        date:date
      }
      dailyReportDayList(data).then(res => {
        if(res.code == 200){
          this.getData();
          this.$message({
            message: '手动结算成功！',
            type: 'success'
          });
        }
      })
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '平台盈亏总金额:';
          return;
        }else if(index == 2){
          sums[index] = this.totalAmount;
        }
        // const values = data.map(item => Number(item[column.property]));
        // if (!values.every(value => isNaN(value))) {
        //   sums[index] = values.reduce((prev, curr) => {
        //     const value = Number(curr);
        //     if (!isNaN(value)) {
        //       return prev + curr;
        //     } else {
        //       return prev;
        //     }
        //   }, 0);
        //   // sums[index] += ' 元';
        // } else {
        //   sums[index] = '';
        // }
        // if(index == 3 || index == 4){
        //   if(sums[index]){
        //     sums[index] = sums[index].toFixed(2)
        //   }
          
        // }
      });
      return sums;
    },
    changeTime(){
      this.pages.date = this.formData.timer;
      this.getData();
    },
    pageChange (p) {
      this.pages.page = p
      this.getData()
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
    getData() {
      if(this.registrationTime && this.registrationTime.length>0){
        this.pages.startDate = this.registrationTime[0]
        this.pages.endDate = this.registrationTime[1]
      }else{
        this.pages.startDate = ''
        this.pages.endDate = ''
      }
      dailyReportList(this.pages).then(res => {
        console.log(res.data)
        this.listData = res.data.list;
        this.totalAmount = res.data.countData.totalAmount
        this.total = res.data.totalRow;
        this.isComplet = false;
        console.log(d);
      }).catch(err => {
        // this.listData = [];
        this.isComplet = false;
      });
    }
  },
  filters: {
    initTime(v) {
      return moment(v).format('YYYY-MM-DD HH:mm:ss');
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
/* table 组件 */
/* .el-table .warning-row {
  color: #f56c6c;
}
.el-table .success-row {
  color: #4d9728
}
.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f0f9eb;
} */
</style>

