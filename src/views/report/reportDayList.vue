<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item>
        <el-date-picker
          v-model="formData.timer"
          type="daterange"
          value-format="yyyy-MM-dd"
          @change="changeTime"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <el-table :data="listData" v-loading="isComplet" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column label='创建时间' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.createDate | initTime}}
        </template>
      </el-table-column>
      <el-table-column label='金额' prop="balance" :min-width="150"></el-table-column>
    </el-table>
    <el-pagination
      style="text-align: center;"
      background
      @current-change="changePage"
      layout="prev, pager, next"
      :total="totalPage">
    </el-pagination>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { userRechargeList } from '@/api/api.js';
import moment from 'moment';

export default {
  name: 'userBalance',
  data() {
    return {
      listData: [],
      isComplet: true,
      totalPage: 1,
      pages: {
        page: 1,
        size: 10,
        startDate: moment().format('YYYY-MM-DD 00:00:00'),
        endDate: moment().format('YYYY-MM-DD 23:59:59')
      },
      formData: {
        timer: ''
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    changeTime(v){
      console.log(v);
      this.pages.startDate = v[0] + ' 00:00:00';
      this.pages.endDate = v[1] + ' 23:59:59';
      this.getData();
    },
    changePage(v) {
      const self = this;
      self.pages.page = v - 1;
      self.isComplet = true;
      self.getData();
    },
    getData() {
      const self = this;
      userRechargeList(this.pages).then(d => {
        self.listData = d.data.content;
        self.totalPage = d.data.totalElements || 1;
        self.isComplet = false;
        console.log(d);
      }).catch(err => {
        self.listData = [];
        self.isComplet = false;
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
.el-date-editor .el-range-separator{
  width: 6%;
}
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

