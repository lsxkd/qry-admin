<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="编辑"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData"  ref="postForm">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="账户状态:">
          <el-select v-model="dialogData.enable" clearable @change="selectChange" placeholder="请选择" style="width:215px;">
            <el-option label="正常" :value="0"> </el-option>
            <el-option label="禁用" :value="1"> </el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:center;margin-top:50px;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="managerAppuserUpdateStatus">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="昵称:">
        <el-input placeholder="昵称" v-model.trim="userListPage.userName" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="手机号:">
        <el-input placeholder="手机号" v-model.trim="userListPage.mobile" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="性别:">
        <el-select v-model="userListPage.sex" clearable placeholder="请选择" style="width:150px;">
          <el-option label="男" value="0"> </el-option>
          <el-option label="女" value="1"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否是VIP:">
        <el-select v-model="userListPage.vip" clearable placeholder="请选择" style="width:150px;">
          <el-option label="否" value="0"> </el-option>
          <el-option label="是" value="1"> </el-option>
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
      <el-table-column label='注册时间' :min-width="160">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop='mobile' :min-width="120"></el-table-column>
      <el-table-column label="昵称" prop='userName' :min-width="110"></el-table-column>
      
      <el-table-column label="个性签名" prop='signWork' :min-width="110"></el-table-column>
      <el-table-column label="性别" :min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 0">男</span>
          <span v-if="scope.row.sex == 1">女</span>
        </template>
      </el-table-column>
      <el-table-column label="如意币" prop='coin' :min-width="100"></el-table-column>
      <el-table-column label="被赞次数" prop='likeNum' :min-width="100"></el-table-column>
      <el-table-column label="读书数量" prop='readBookNum' :min-width="100"></el-table-column>
      <el-table-column label="阅读时长" prop='readTime' :min-width="100"></el-table-column>
      
      <el-table-column label="是否是VIP" :min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.vip == 0">否</span>
          <span v-if="scope.row.vip == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="vip过期时间" prop='vipExpDate' :min-width="160"></el-table-column>
      <el-table-column label="账户状态" :min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 0">正常</span>
          <span v-if="scope.row.enable == 1">禁用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额" prop='coinNum' :min-width="150"></el-table-column> -->
      <el-table-column align="center" label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small" @click="handleOpens()">发行记录</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="handleOpens(scope.row)">编辑</el-button>
          <!-- <el-button type="danger" size="small" icon="el-icon-edit" @click="delConfirm(scope.row.fishType,scope.row.fishId)">删除</el-button> -->
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
import { managerAppuserList,managerAppuserUpdateStatus } from '@/api/user.js';
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
        startTime:'',
        endTime:'',
        username:'',//账号
        enable:'' , //状态0正常1拉黑
        mobile:'',
        sex:'',
        vip:''
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        userId:'',
        enable:'',
      },
    }
  },
  created() {
    this.managerAppuserList();
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
    },
    handleOpens(row){
      this.dialogTableVisible = true
      this.dialogData.userId = row.id
      this.dialogData.enable = row.enable
    },
    managerAppuserUpdateStatus() {
      
      managerAppuserUpdateStatus(this.dialogData).then(res => {
        if(res.code == 200){
          this.dialogTableVisible = false
          this.dialogData.userId = ''
          this.dialogData.enable = ''
          this.managerAppuserList()
          this.$message({
              type: 'success',
              message: '操作成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
        
      })
    },
    searchBtn(){
      this.userListPage.pageNum = 1
      if(this.registrationTime&&this.registrationTime.length>0){
        this.userListPage.startTime = this.registrationTime[0] + " 00:00:00"
        this.userListPage.endTime = this.registrationTime[1] + " 23:59:59"
      }else{
        this.userListPage.startTime = ''
        this.userListPage.endTime = ''
      }
      this.managerAppuserList()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.managerAppuserList()
    },
    managerAppuserList() {
      for(let key in this.userListPage){
        if(this.userListPage[key] == '' || this.userListPage[key] == null){
          delete this.userListPage[key]
        }
      }
      managerAppuserList(this.userListPage).then(res => {
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

