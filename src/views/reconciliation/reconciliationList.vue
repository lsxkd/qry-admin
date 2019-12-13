<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="明细"
        :visible.sync="dialogTableVisible"
        width='900px'
      >
      <div>
        <el-form  size="small" inline :model="dialogData">
        <el-form-item label="流水类型:">
          <el-select v-model="dialogData.balanceType" clearable placeholder="请选择">
            <el-option
              v-for="item in balanceTypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始日期">
          <el-date-picker
            v-model="registrationTimeTwo"
            type="daterange"
            value-format="yyyy-MM-dd"
            @keyup.enter.native="searchBtnTwo"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            clearable>
          </el-date-picker>
          
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            title="搜索"
            style="font-size: 16px"
            @click="searchBtnTwo()"
          />
        </el-form-item>
      </el-form>
      <el-table :data="balancelogData" v-loading="isComplet"  :summary-method="getSummariesTwo" show-summary element-loading-text="拼命加载中" border fit stripe highlight-current-row>
        <el-table-column align="center" label='#' :min-width="100">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column label="时间" :min-width="170">
          <template slot-scope="scope">
            {{scope.row.createDate}}
          </template>
        </el-table-column>
        <el-table-column label="ID" :min-width="120">
          <template slot-scope="scope">
            {{scope.row.userId}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="手机号"  :min-width="150">
          <template slot-scope="scope">
            {{scope.row.mobile}}
          </template>
        </el-table-column> -->
        <el-table-column label="变动金额" :min-width="100">
          <template slot-scope="scope">
            {{scope.row.balance}}
          </template>
        </el-table-column>
        <el-table-column label="类型" :min-width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.optType == 1">{{scope.row.optName}}</el-tag>
            <el-tag type="warning" v-if="scope.row.optType == 2">{{scope.row.optName}}</el-tag>
            <el-tag type="danger" v-if="scope.row.optType == 3">{{scope.row.optName}}</el-tag>
            <el-tag type="success" v-if="scope.row.optType == 4">{{scope.row.optName}}</el-tag>
            <!-- {{scope.row.optName}} -->
          </template>
        </el-table-column>
        <el-table-column label="余额" :min-width="100">
          <template slot-scope="scope">
            {{scope.row.afterBalance}}
          </template>
        </el-table-column>
        <!-- <el-table-column label="总的统计金额" :min-width="120">
          <template slot-scope="scope">
            {{scope.row.totalAmount}}
          </template>
        </el-table-column> -->
      </el-table>
      <el-pagination
          @current-change="pageChangeTwo"
          style="text-align:center;margin-top:3px"
          background
          layout="prev, pager, next"
          :page-size="fishListPageLimit"
          :current-page="dialogData.page"
          :total="totalTwo"
        ></el-pagination>
      </div>
    </el-dialog>
    <el-form  size="small" inline :model="pages">
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="pages.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="registrationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="searchBtn"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          title="搜索"
          style="font-size: 16px"
          @click="searchBtn()"
        />
      </el-form-item>
    </el-form>
    <el-table :data="listData" v-loading="isComplet" :summary-method="getSummaries" show-summary element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="130">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="ID" :min-width="150">
        <template slot-scope="scope">
          {{scope.row.userId}}
        </template>
      </el-table-column>
      <el-table-column label='用户名' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column label="手机号"  :min-width="150">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column label='真实姓名' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.realName}}
        </template>
      </el-table-column>
      <el-table-column label="输赢金额" :min-width="150">
        <template slot-scope="scope">
          {{scope.row.money}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="openRecharge(scope.row)">查看详情</el-button>
          <!-- <el-button type="primary" size="small">发行记录</el-button>
          <el-button type="primary" size="small" icon="el-icon-edit">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-edit" @click="delConfirm(scope.row.fishType,scope.row.fishId)">删除</el-button> -->
        </template>
      </el-table-column>
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
import { billReport,balancelog } from '@/api/reconciliation.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'userList',
  directives: { elDragDialog },
  data() {
    return {
      listData: [],
      isComplet: true,
      fishListPageLimit:10,
      total: 1,
      pages: {
        page: 1,
        size: 10,
        mobile:'',
        startDate:'',
        endDate:''
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        userId:'',
        page: 1,
        size: 10,
        balanceType:3,
        startDate:'',
        endDate:''
      },
      totalAmount:0,

      balanceTypeOption:[
        {
          value:0,
          label:'全部',
        },
        {
          value:1,
          label:'充值',
        },
        {
          value:2,
          label:'提现',
        },
        {
          value:3,
          label:'输赢',
        },
      ],
      balancelogData:[],
      registrationTimeTwo:[],
      totalTwo:1,
      totalAmountTwo:0,
    }
  },
  created() {
    // this.pages.startDate = this.getDay(-7)
    // this.pages.endDate = this.getDay(0)
    this.getData();
  },
  methods: {
    getSummariesTwo(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '变动总金额';
          return;
        }else if(index == 3){
          sums[index] = this.totalAmountTwo;
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
    searchBtnTwo(){
      this.dialogData.page = 1
      this.balancelogs()
    },
    openRecharge(row){
      this.dialogData.page = 1
      this.registrationTimeTwo = []
      this.dialogData.startDate = ''
      this.dialogData.endDate = ''
      this.dialogTableVisible = true
      this.dialogData.userId = row.userId
      this.balancelogs()
    },
    pageChangeTwo (p) {
      this.dialogData.page = p
      this.balancelogs()
    },
    balancelogs(){
      if(this.registrationTimeTwo && this.registrationTimeTwo.length>0){
        this.dialogData.startDate = this.registrationTimeTwo[0]+' 00:00:00';
        this.dialogData.endDate = this.registrationTimeTwo[1]+' 23:59:59';
      }else{
        this.dialogData.startDate = this.getDay(-31)+' 00:00:00';
        this.dialogData.endDate = this.getDay(0)+' 23:59:59';
        // this.dialogData.startDate = '';
        // this.dialogData.endDate = '';
      }
      balancelog(this.dialogData).then(res => {
        if(res.code == 200){
          this.balancelogData = res.data.list
          this.totalAmountTwo = res.data.countData.totalAmount
          this.totalTwo = res.data.totalRow
        }
      })
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
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '平台盈亏总金额:';
          return;
        }else if(index == 1){
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
    searchBtn(){
      this.pages.page = 1
      this.getData();
    },
    
    pageChange (p) {
      this.pages.page = p
      this.getData()
    },
    getData() {
      if(this.registrationTime && this.registrationTime.length>0){
        this.pages.startDate = this.registrationTime[0]+' 00:00:00';
        this.pages.endDate = this.registrationTime[1]+' 23:59:59';
      }else{
        this.pages.startDate = this.getDay(-31)+' 00:00:00';
        this.pages.endDate = this.getDay(0)+' 23:59:59';
        // this.pages.startDate = '';
        // this.pages.endDate = '';
      }
      console.log(this.registrationTime)
      billReport(this.pages).then(res => {
        console.log(res);
        this.listData = res.data.list;
        this.totalAmount = res.data.countData.totalAmount
        this.total = res.data.totalRow;
        this.isComplet = false;
        
      }).catch(err => {
        this.listData = [];
        this.isComplet = false;
      });
    }
  },
  filters: {
    initTime(v) {
      return moment(v).format('YYYY-MM-DD HH:hh:ss');
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

