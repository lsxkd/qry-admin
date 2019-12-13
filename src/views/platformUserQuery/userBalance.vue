<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-table :data="listData" v-loading="isComplet" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column label='创建时间' :min-width="150">
        <template slot-scope="scope">
          {{scope.row.createDate | initTime}}
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop='email' :min-width="150"></el-table-column>
      <el-table-column label="ID" prop='id' :min-width="150"></el-table-column>
      <el-table-column label="手机号" prop='mobile' :min-width="150"></el-table-column>
      <el-table-column label="姓名" prop='realName' :min-width="150"></el-table-column>
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
import { userBalanceList } from '@/api/api.js';
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
        size: 10
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    changePage(v) {
      const self = this;
      self.pages.page = v;
      self.getData();
    },
    getData() {
      const self = this;
      userBalanceList({uid: 0}).then(d => {
        self.listData = d.data;
        // self.totalPage = d.data.totalElements;
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

