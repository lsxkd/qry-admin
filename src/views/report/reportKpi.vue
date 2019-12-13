<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-table :data="listData" v-loading="isComplet" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column label='今日收入' prop='todayIncome' :min-width="150"></el-table-column>
      <el-table-column label="今日提现" prop='todayRecharge' :min-width="150"></el-table-column>
      <el-table-column label="今日用户" prop='todayUser' :min-width="150"></el-table-column>
      <el-table-column label="总用户" prop='totalUser' :min-width="150"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { parseTime } from '@/utils'
import { dailyKpiList } from '@/api/api.js';
import moment from 'moment';

export default {
  data() {
    return {
      listData: [],
      isComplet: true
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const self = this;
      dailyKpiList().then(d => {
        self.listData.push(d.data);
        // self.totalPage = d.data.totalElements;
        self.isComplet = false;
        console.log(self.listData);
        console.log(d);
      }).catch(err => {
        self.listData = [];
        self.isComplet = false;
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
</style>

