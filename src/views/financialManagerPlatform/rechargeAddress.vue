<template>
  <div class="app-container">

    <el-table :data="list" v-loading="listLoading" border fit highlight-current-row style="width: 100%">

      <el-table-column align="center" label="#" width="80">
        <template slot-scope="scope">
          <span>{{scope.$index}}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" align="center" label="账户类型">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="最后修改时间">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="二维码" width="110">
        <template slot-scope="scope">
          
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="钱包地址">
        <template slot-scope="scope">
          <template v-if="scope.row.edit">
            <el-input class="edit-input" size="small" v-model="scope.row.walletAddress"></el-input>
            <el-button class='cancel-btn' size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row)">取消</el-button>
          </template>
          <span v-else>{{ scope.row.walletAddress }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="120">
        <template slot-scope="scope">
          <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">保存</el-button>
          <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">修改</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'

export default {
  name: 'inlineEditTable',
  data() {
    return {
      list: [
        {
          title: 'MXH账户',
          timestamp: 27352373298,
          walletAddress: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          originalTitle: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          edit: false
        },
        {
          title: 'DD积分',
          timestamp: 27352373298,
          walletAddress: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          originalTitle: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          edit: false
        },
        {
          title: 'USDT账户',
          timestamp: 27352373298,
          walletAddress: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          originalTitle: '1NKAvGVRi24ygNHugBYv188pETLvmM5BDe',
          edit: false
        }
      ],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },

  created() {
    // this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        const items = response.data.items
        this.list = items.map(v => {
          this.$set(v, 'edit', false) // https://vuejs.org/v2/guide/reactivity.html
          v.originalTitle = v.title //  will be used when user click the cancel botton
          return v
        })
        this.listLoading = false
      })
    },
    cancelEdit(row) {
      row.walletAddress = row.originalTitle
      row.edit = false
      this.$message({
        message: '已取消修改',
        type: 'warning'
      })
    },
    confirmEdit(row) {
      row.edit = false
      row.originalTitle = row.walletAddress
      this.$message({
        message: '修改成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>
