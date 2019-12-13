<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="userListPage.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="支付方式:">
        <el-select v-model="userListPage.payWay" placeholder="请选择" clearable>
          <el-option label="微信支付" value="WechatPay"></el-option>
          <el-option label="支付宝支付" value="AliPay"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态:">
        <el-select v-model="userListPage.status" placeholder="请选择" clearable>
          <el-option label="待支付" value="0"></el-option>
          <el-option label="支付失败" value="1"></el-option>
          <el-option label="支付成功" value="2"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="注册时间">
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
      <el-table-column label="手机号" prop='mobile' :min-width="150"></el-table-column>
      <el-table-column label="订单金额" prop='orderAmount' :min-width="150"></el-table-column>
      <el-table-column label="订单类型" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.orderType == 0">VIP订单</span>
          <span v-if="scope.row.orderType == 1">充值订单</span>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.payWay == 'WechatPay'">微信支付</span>
          <span v-if="scope.row.payWay == 'AliPay'">支付宝支付</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">待支付</span>
          <span v-if="scope.row.status == 1">支付失败</span>
          <span v-if="scope.row.status == 2">支付成功</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)">编辑</el-button>
          <el-button type="danger" size="small" icon="el-icon-edit" @click="delConfirm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> -->
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
import { orderVipList } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'vipOrderList',
  directives: { elDragDialog },
  data() {
    return {
      userList: [],
      fishListPageLimit:10,
      total: 1,
      userListPage: {
        pageNum: 1,
        pageSize: 10,
      },
      registrationTime:[],
            
    }
  },
  created() {
    this.getUserList();
  },
  methods: {

    searchBtn(){
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
      orderVipList(this.userListPage).then(res => {
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


