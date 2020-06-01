<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="userListPage.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>    
      
      <el-form-item label="创建时间">
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
    
    <el-table :data="userList" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60" >
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label='创建时间' :min-width="160" align="center">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="用户ID" prop='userId' :min-width="150"></el-table-column> -->
      <el-table-column label="手机号" prop='mobile' :min-width="150" align="center"></el-table-column>
      <el-table-column label="免广告天数" prop='days' :min-width="150" align="center"></el-table-column>
      <el-table-column label="消耗金币数量" prop='coin' :min-width="150" align="center"></el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="fishListPageLimit"
        :current-page="userListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { orderCoinNoadvertPage } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'orderList',
  directives: { elDragDialog },
  data() {
    return {
      userList: [],
      fishListPageLimit:10,
      total: 1,
      userListPage: {
        pageNum: 1,
        pageSize: 10,
        mobile:'',
      },
      registrationTime:[],
            
    }
  },
  created() {
    this.getUserList();
  },
  methods: {

    searchBtn(){
      this.userListPage.pageNum = 1
      this.getUserList()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.getUserList()
    },
    getUserList() {
      this.listLoading = true
      if(!this.userListPage.mobile){
        delete this.userListPage.mobile
      }
      if(!this.userListPage.payWay){
        delete this.userListPage.payWay
      }
      if(!this.userListPage.status){
        delete this.userListPage.status
      }
      if(this.registrationTime&&this.registrationTime.length>0){
        this.userListPage.startTime = this.registrationTime[0] + ' 00:00:00'
        this.userListPage.endTime = this.registrationTime[1] + ' 23:59:59'
      }else{
        delete this.userListPage.startTime
        delete this.userListPage.endTime
      }
      orderCoinNoadvertPage(this.userListPage).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
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


