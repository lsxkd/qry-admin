<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        :title="dialogTitle"
        :visible.sync="dialogTableVisible"
        v-if="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="用户名:" prop="username">
          <el-input class="article-textarea" placeholder="请输入用户名" style="width:215px;" maxlength="16" v-model.trim="dialogData.username"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="密码:" prop="password" v-if="dialogFlag == 'add'">
          <el-input type="password" class="article-textarea" placeholder="请输入密码" style="width:215px;" maxlength="16"   v-model.trim="dialogData.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="密码:"  v-if="dialogFlag == 'edit'">
          <el-input type="password" class="article-textarea" placeholder="请输入密码" style="width:215px;" maxlength="16"   v-model.trim="dialogData.password"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="手机号:" prop="mobile" v-if="dialogData.mobile">
          <el-input class="article-textarea" placeholder="请输入手机号" style="width:215px;" maxlength="11" v-model.trim="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="手机号:" v-if="!dialogData.mobile">
          <el-input class="article-textarea" placeholder="请输入手机号" style="width:215px;" maxlength="11" v-model.trim="dialogData.mobile"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="账户状态:" prop="status" >
          <el-select v-model="dialogData.status" @change="selectChange" clearable placeholder="请选择" style="width:215px;">
            <el-option label="启用" value="0"> </el-option>
            <el-option label="停用" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="邮箱:" prop="email" v-if="dialogData.email">
          <el-input class="article-textarea" placeholder="请输入邮箱" style="width:215px;"  v-model.trim="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="邮箱:"  v-if="!dialogData.email">
          <el-input class="article-textarea" placeholder="请输入邮箱" style="width:215px;"  v-model.trim="dialogData.email"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="真实姓名:">
          <el-input class="article-textarea" placeholder="请输入真实姓名" style="width:215px;" maxlength="7"  v-model.trim="dialogData.realname"></el-input>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
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
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加管理员</el-button>
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
      <!-- <el-table-column label="身份证号" prop='idCard' :min-width="150"></el-table-column> -->
      <el-table-column label="手机号" prop='mobile' :min-width="150"></el-table-column>
      <el-table-column label="真实姓名" prop='realname' :min-width="150"></el-table-column>
      <!-- <el-table-column label="qq" prop='qq' :min-width="150"></el-table-column>
      <el-table-column label="微信" prop='wechat' :min-width="150"></el-table-column> -->
      <el-table-column label="账户状态" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">启用</span>
          <span v-if="scope.row.status == 1">停用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额" prop='coinNum' :min-width="150"></el-table-column> -->
      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small">发行记录</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)">编辑</el-button>
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
        :current-page="userListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { managersList,addManagers,delManagers } from '@/api/user.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui

import { validatorUserName,validatorPassword,validatorPasswordEdit ,validatorPhone,validatorEmail} from '@/utils/validator'

export default {
  name: 'managersList',
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
        status:'' , //状态0正常1拉黑
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        username:'',
        password:'',
        status:'',
        mobile:'',
        realname:'',
        email:'',
        // passwordEdit:'',
      },
      dialogRules: {
        username: [{ required: true, trigger: 'blur',validator: validatorUserName }],
        password: [{ required: true, trigger: 'blur',validator: validatorPassword  }],
        passwordEdit: [{ required: true, trigger: 'blur',validator: validatorPasswordEdit  }],
        mobile: [{ required: false, trigger: 'blur',validator: validatorPhone  }],
        email: [{ required: false, trigger: 'blur',validator: validatorEmail  }],
      },
      dialogFlag:'',
      dialogTitle:'添加'
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
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
      this.getUserList()
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      this.dialogFlag = flag
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.username = row.username
        this.dialogData.password = row.password
        // this.dialogData.passwordEdit = row.password
        this.dialogData.mobile = row.mobile
        this.dialogData.realname = row.realname
        this.dialogData.email = row.email
        this.dialogData.status = String(row.status)
      }else{
        this.dialogTitle = '添加'
        delete this.dialogData.id
        this.dialogData.username = ''
        this.dialogData.password = ''
        this.dialogData.mobile = ''
        this.dialogData.realname = ''
        this.dialogData.email = ''
        this.dialogData.status = ''
      }
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.getUserList()
    },
    getUserList() {
      const data = {}
      for(let key in this.userListPage){
        if(this.userListPage[key] == '' || this.userListPage[key] == null){
          this.userListPage[key]=''
        }else{
          data[key] = this.userListPage[key]
        }
      }
      managersList(data).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
      })
    },
    addManagerBtn(){
      // if(this.dialogFlag == 'edit'){
      //   this.dialogData.password = this.dialogData.passwordEdit
      //   // delete this.dialogData.passwordEdit
      // }else{
      //   // delete this.dialogData.passwordEdit
      // }
      console.log(this.dialogData)
      const data = {}
      for(let key in this.dialogData){
        if(this.dialogData[key] == '' || this.dialogData[key] == null){
          this.dialogData[key]=''
        }else{
          data[key] = this.dialogData[key]
        }
      }
      console.log(data)
      // console.log(data.password.length)
      if(data.password && data.password.length<6){
        this.$message({
          type: 'info',
          message: '密码长度必须大于或等于6位'
        });
        return
      }
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          addManagers(data).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData = {
                username:'',
                password:'',
                status:'',
                mobile:'',
                realname:'',
                email:'',
              },
              this.getUserList()
              this.$message({
                  type: 'success',
                  message: this.dialogTitle + '成功!'
              });
            }else{
              this.$message.error(res.msg);
            }
          })
        }
      })
    },
    delConfirm(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delManagers(id)
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    delManagers(id){
      const data = {
        adminUserId:id
      }
      delManagers(data).then(res => {
        if(res.code == 200){
              this.getUserList()
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

