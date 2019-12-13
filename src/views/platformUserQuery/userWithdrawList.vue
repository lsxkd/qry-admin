<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="pages.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="formData.timer"
          type="daterange"
          value-format="yyyy-MM-dd"
          
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
          @click="changeTime"
        />
      </el-form-item>
    </el-form>
    <el-table :data="listData" v-loading="isComplet" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column label='时间' :min-width="170">
        <template slot-scope="scope">
          {{scope.row.createDate | initTime}}
        </template>
      </el-table-column>
      <el-table-column label='用户名' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.userName}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop='mobile' :min-width="150"></el-table-column>
      <el-table-column label='真实姓名' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.realName}}
        </template>
      </el-table-column>
      <el-table-column label="提现金额" prop='balance' :min-width="150">
        <template slot-scope="scope">
          {{Math.abs(scope.row.balance)}}
        </template>
      </el-table-column>
      <el-table-column label="余额" prop='afterBalance' :min-width="150"></el-table-column>
      <!-- <el-table-column label="金额" prop='balance' :min-width="150"></el-table-column> -->
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
import { userWithdrawList } from '@/api/api.js';
import moment from 'moment';

export default {
  name: 'userBalance',
  data() {
    return {
      listData: [],
      isComplet: true,
      total: 1,
      pages: {
        page: 1,
        size: 10,
        startDate: '',
        endDate:''
      },
      fishListPageLimit:20,
      formData: {
        timer: ''
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    changeTime(){
      this.pages.page = 1
      if(this.formData.timer && this.formData.timer.length>0){
        this.pages.startDate = this.formData.timer[0] + ' 00:00:00';
        this.pages.endDate = this.formData.timer[1] + ' 23:59:59';
      }else{
        this.pages.startDate = ''
        this.pages.endDate = ''
      }
      this.getData();
    },
    pageChange (p) {
      this.pages.page = p
      this.getData()
    },
    getData() {
      userWithdrawList(this.pages).then(res => {
        this.listData = res.data.list;
        this.total = res.data.totalRow || 1;
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

