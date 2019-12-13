<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-form  size="small" inline>
      <el-form-item label="会员账户">
        <el-input 
        placeholder="会员账户"
        :style="{ width: '150px' }"
        clearable
      />
      </el-form-item>
      <el-form-item label="支付时间">
        <el-date-picker
          v-model="registrationTime"
          type="datetimerange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="支付账户类型">
        <el-select v-model="memberGroupings" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          title="搜索"
          style="font-size: 16px"
        />
      </el-form-item>
    </el-form>
    <el-table :data="list" v-loading="listLoading" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="订单流水号" :min-width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.orderNum}}
        </template>
      </el-table-column>
      <el-table-column label="会员账户" :min-width="110">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      
      <el-table-column label="支付账户类型" :min-width="115" align="center">
        <template slot-scope="scope">
          {{scope.row.memberGrouping}}
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="支付时间" :min-width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" :min-width="110" align="center">
        <template slot-scope="scope">
          <el-tag>{{scope.row.accountStatus}}</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
// import { parseTime } from '@/utils'

export default {
  name: 'exportExcel',
  data() {
    return {
      registrationTime: '',
      options: [{
        value: '0',
        label: 'MXH账户'
      }, {
        value: '1',
        label: 'DD积分'
      }, {
        value: '2',
        label: 'USDT账户'
      }],
      memberGroupings: '',
      list: [
        {
          title: 'test01',
          timestamp: 27352373298,
          memberGrouping: 'DD积分',
          orderNum: 498743546546546,
          accountStatus: '审批成功'
        },
        {
          title: 'test02',
          timestamp: 27352373298,
          memberGrouping: 'DD积分',
          orderNum: 498743546546546,
          accountStatus: '审批成功'
        },
        {
          title: 'test03',
          timestamp: 27352373298,
          memberGrouping: 'DD积分',
          orderNum: 498743546546546,
          accountStatus: '审批成功'
        }
      ],
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      fetchList().then(response => {
        // this.list = response.data.items
        this.listLoading = false
        console.log(this.list)
      })
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

