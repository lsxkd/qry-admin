<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <!-- <el-dialog
        v-el-drag-dialog
        title="充值"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData"  ref="postForm">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="充值数量:">
          <el-input class="article-textarea" placeholder="请输入充值数量" style="width:215px;" maxlength="7"   v-model.trim="dialogData.money"></el-input>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="rechargeBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog> -->
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="用户名:">
        <el-input placeholder="用户名" v-model.trim="userListPage.userName" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="userListPage.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="真实姓名:">
        <el-input placeholder="真实姓名" v-model.trim="userListPage.realName" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
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
          {{scope.row.created}}
        </template>
      </el-table-column>
      <el-table-column label="用户名" prop='username' :min-width="150"></el-table-column>
      <el-table-column label="邮箱" prop='email' :min-width="150"></el-table-column>
      <el-table-column label="身份证号" prop='idCard' :min-width="150"></el-table-column>
      <el-table-column label="手机号" prop='mobile' :min-width="150"></el-table-column>
      <el-table-column label="姓名" prop='realName' :min-width="150"></el-table-column>
      <el-table-column label="qq" prop='qq' :min-width="150"></el-table-column>
      <el-table-column label="微信" prop='wechat' :min-width="150"></el-table-column>
      <el-table-column label="账户状态" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">正常</span>
          <span v-if="scope.row.status == 1">禁用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额" prop='coinNum' :min-width="150"></el-table-column> -->
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
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
        :current-page="userListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { managersList } from '@/api/user.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'userList',
  directives: { elDragDialog },
  data() {
    return {
      userList: [],
      fishListPageLimit:10,
      total: 1,
      userListPage: {
        pageNum: 1,
        pageSize: 10,
        // startTime:'',
        // endTime:'',
        // username:'',//账号
        // status:'' , //状态0正常1拉黑
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        userId:'',
        money:'',
      },
    }
  },
  created() {
    this.getUserList();
  },
  methods: {

    pageChange (p) {
      this.userListPage.pageNum = p
      this.getUserList()
    },
    getUserList() {
      this.listLoading = true
      managersList(this.userListPage).then(res => {
        console.log(res.data)
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

