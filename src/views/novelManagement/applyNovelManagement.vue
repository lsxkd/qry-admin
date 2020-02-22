<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="处理"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="是否添加:" prop="state">
          <el-radio-group v-model="dialogData.state">
            <el-radio label="1">已添加</el-radio>
            <el-radio label="2">未添加</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <div style="text-align:center;margin-top:40px;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="applyBookAudit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="applyBookListPage">
      <el-form-item label="处理状态:">
        <el-select v-model="applyBookListPage.state" clearable placeholder="请选择">
          <el-option label="未处理" value="0"> </el-option>
          <el-option label="已处理已添加" value="1"> </el-option>
          <el-option label="已处理未添加" value="2"> </el-option>
        </el-select>
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
    <el-table :data="applyBookList" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label='创建时间' :min-width="160">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="小说名称" prop='novelName' :min-width="150"></el-table-column>
      <el-table-column label="小说作者" prop='novelAuthor' :min-width="150"></el-table-column>
      <el-table-column label="用户ID" prop='userId' :min-width="150"></el-table-column>
      
      <el-table-column label="处理状态" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.state == 0">未处理</span>
          <span v-if="scope.row.state == 1">已处理已添加</span>
          <span v-if="scope.row.state == 2">已处理未添加</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额" prop='coinNum' :min-width="150"></el-table-column> -->
      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small">发行记录</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" v-if="scope.row.state != 1" @click="openEditOrAdd(scope.row.id)">处理</el-button>
          <el-button type="danger" size="small" icon="el-icon-edit" @click="delConfirm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="fishListPageLimit"
        :current-page="applyBookListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { applyBookPage,applyBookAudit,applyBookDelete } from '@/api/user.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'applyNovelManagement',
  directives: { elDragDialog },
  data() {
    return {
      applyBookList: [],
      fishListPageLimit:10,
      total: 1,
      applyBookListPage: {
        pageNum: 1,
        pageSize: 10,
        state:'',
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        id:'',
        state:'',
      },
      dialogRules: {
        state: [{ required: true, trigger: 'blur',message:'请选择是否已添加' }]
      },
    }
  },
  created() {
    this.applyBookPage();
  },
  methods: {
    searchBtn(){
      this.dialogData.pageNum = 1
      this.applyBookPage()
    },
    openEditOrAdd(id){
      this.dialogTableVisible = true
      this.dialogData.id = id
    },
    applyBookAudit(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          applyBookAudit(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
                  this.applyBookPage()
                  this.$message({
                      type: 'success',
                      message: '处理成功!'
                  });
                }else{
                  this.$message.error(res.msg);
                }
          })
        }
      })
    },
    pageChange (p) {
      this.applyBookListPage.pageNum = p
      this.applyBookPage()
    },
    applyBookPage() {
      this.listLoading = true
      applyBookPage(this.applyBookListPage).then(res => {
        // console.log(res.data)
        this.applyBookList = res.data.list
        this.total = res.data.total
        
      })
    },
    delConfirm(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.applyBookDelete(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    applyBookDelete(id){
      const data = {
        id:id
      }
      applyBookDelete(data).then(res => {
        if(res.code == 200){
              this.applyBookPage()
              this.$message({
                  type: 'success',
                  message: '删除成功!'
              });
            }else{
              this.$message.error(res.msg);
            }
      })
    },
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

