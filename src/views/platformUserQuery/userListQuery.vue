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
    <el-dialog
        v-el-drag-dialog
        :title="'金币流水-' + dialogName"
        :visible.sync="dialogTableVisibleCoinLog"
        width='70%'
      >
      <el-form class="form-container" size="small" inline :model="managerUserCoinLogObj"  ref="postForm">
        <el-form-item style="margin-bottom: 20px;"  label="业务类型:">
          <el-select v-model="managerUserCoinLogObj.businessType" clearable @change="selectChange" placeholder="请选择" style="width:130px;">
            <el-option label="签到" :value="1"> </el-option>
            <el-option label="阅读奖励" :value="2"> </el-option>
            <el-option label="申请书籍" :value="3"> </el-option>
            <el-option label="兑换物品" :value="4"> </el-option>
            <el-option label="提现" :value="5"> </el-option>
            <el-option label="充值" :value="6"> </el-option>
            <el-option label="邀请好友注册" :value="7"> </el-option>
            <el-option label="新用户注册" :value="8"> </el-option>
            <el-option label="被邀请注册" :value="9"> </el-option>
            <el-option label="兑换会员" :value="10"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;"  label="操作类型:">
          <el-select v-model="managerUserCoinLogObj.operateType" clearable @change="selectChange" placeholder="请选择" style="width:120px;">
            <el-option label="收入" :value="'0'"> </el-option>
            <el-option label="支出" :value="'1'"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker
            v-model="registrationTimeLog"
            type="daterange"
            value-format="yyyy-MM-dd"
            @keyup.enter.native="searchBtnLog"
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
          @click="searchBtnLog()"
        />
      </el-form-item>     
        
      </el-form>
      <el-table :data="managerUserCoinLogData" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
          <el-table-column align="center" label='#' :min-width="60">
            <template slot-scope="scope">
              {{scope.$index + 1}}
            </template>
          </el-table-column>
          <el-table-column label='时间' align="center" :min-width="160">
            <template slot-scope="scope">
              {{scope.row.createTime}}
            </template>
          </el-table-column>
          <!-- <el-table-column label="业务ID" align="center" prop='businessId' :min-width="120"></el-table-column> -->
          <el-table-column label="变动金额" align="center" prop='coinNum' :min-width="110"></el-table-column>          
          <el-table-column label="变动后余额" prop='afterCoinNum' :min-width="110"></el-table-column>
          <el-table-column label="业务类型" align="center" :min-width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.businessType == 1">签到</span>
              <span v-if="scope.row.businessType == 2">阅读奖励</span>
              <span v-if="scope.row.businessType == 3">申请书籍</span>
              <span v-if="scope.row.businessType == 4">兑换物品</span>
              <span v-if="scope.row.businessType == 5">提现</span>
              <span v-if="scope.row.businessType == 6">充值</span>
              <span v-if="scope.row.businessType == 7">邀请好友注册</span>
              <span v-if="scope.row.businessType == 8">新用户注册</span>
              <span v-if="scope.row.businessType == 9">被邀请注册</span>
              <span v-if="scope.row.businessType == 10">兑换会员</span>
            </template>
          </el-table-column>          
          <el-table-column label="操作类型" align="center" :min-width="100">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.operateType == 0">收入</el-tag>
              <el-tag type="danger" v-if="scope.row.operateType == 1">支出</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" prop='remark' :min-width="160"></el-table-column>
        </el-table>
        <el-pagination
            @current-change="pageChangeLog"
            style="text-align:center;margin-top:3px"
            background
            layout="prev, pager, next"
            :page-size="fishListPageLimit"
            :current-page="managerUserCoinLogObj.pageNum"
            :total="totalCoinLog"
          ></el-pagination>
        <div style="text-align:center;margin-top:50px;">
          <el-button type="cancle"  @click="dialogTableVisibleCoinLog = false">关闭</el-button>
          <!-- <el-button type="success" @click="managerAppuserUpdateStatus">确定</el-button> -->
        </div>
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
          <el-option label="男" :value="'2'"> </el-option>
          <el-option label="女" :value="'3'"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否是VIP:">
        <el-select v-model="userListPage.vip" clearable placeholder="请选择" style="width:150px;">
          <el-option label="否" :value="'0'"> </el-option>
          <el-option label="是" :value="'1'"> </el-option>
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
      <el-table-column label='注册时间' align="center" :min-width="160">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="用户头像" align="center" :min-width="100">
        <template slot-scope="scope">
          <img v-if="scope.row.headIcoUrl " :src="hostPath+scope.row.headIcoUrl" alt="" style="width:60px;height:60px;border-radius:50%;">
          <img v-else src="../../assets/images/head_portrait_icon.png" alt="" style="width:60px;height:60px;border-radius:50%;">
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop='mobile' :min-width="120"></el-table-column>
      <el-table-column label="昵称" align="center" prop='userName' :min-width="110"></el-table-column>
      
      <!-- <el-table-column label="个性签名" prop='signWork' :min-width="110"></el-table-column> -->
      <el-table-column label="性别" align="center" :min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.sex == 2">男</span>
          <span v-if="scope.row.sex == 3">女</span>
        </template>
      </el-table-column>
      <el-table-column label="金币" align="center" prop='coin' :min-width="100"></el-table-column>
      <el-table-column label="被赞次数" align="center" prop='likeNum' :min-width="100"></el-table-column>
      <!-- <el-table-column label="读书数量" prop='readBookNum' :min-width="100"></el-table-column> -->
      <el-table-column label="总阅读时长" align="center" prop='readTime' :min-width="150">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.readTime | initTimeturn}}</span> -->
          <span>{{getDateStr(scope.row.readTime)}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="是否是VIP" align="center" :min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.vip == 0">否</span>
          <span v-if="scope.row.vip == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="vip过期时间" align="center" prop='vipExpDate' :min-width="160"></el-table-column>
      
      <el-table-column label="是否免广告" align="center" :min-width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.noAdvert == 1">是</span>
          <span v-else>否</span>
          
        </template>
      </el-table-column>
      <el-table-column label="免广告过期时间" align="center" prop='noAdvertExpDate' :min-width="160"></el-table-column>

      <el-table-column label="账户状态" align="center" :min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 0">正常</span>
          <span v-if="scope.row.enable == 1">禁用</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="余额" prop='coinNum' :min-width="150"></el-table-column> -->
      <el-table-column align="center" label="操作" fixed="right" width="250">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="managerUserCoinLog(scope.row.id,scope.row.mobile)">金币流水</el-button>
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
import { managerAppuserList,managerAppuserUpdateStatus,managerUserCoinLog } from '@/api/user.js';
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

      registrationTimeLog:[],
      dialogTableVisibleCoinLog:false,
      managerUserCoinLogData:[],
      totalCoinLog:0,
      managerUserCoinLogObj:{
        businessType:'',//业务类型(1签到,2阅读,3申请书本,4兑换物品,5提现,6充值,7邀请注册,8注册,9被邀请注册)
        startTime:'',//开始时间
        endTime:'',//结束时间
        operateType:'',//操作类型(0收入,1支出)
        pageNum:1,
        pageSize:10,
        userId:'',//用户ID
      },
      dialogName:'',
      hostPath:'',
    }
  },
  created() {
    this.hostPath = localStorage.getItem("hostPath");
    this.managerAppuserList();
  },
  methods: {
    searchBtnLog(){
      this.userListPage.pageNum = 1
      if(this.registrationTimeLog&&this.registrationTimeLog.length>0){
        this.managerUserCoinLogObj.startTime = this.registrationTimeLog[0] + " 00:00:00"
        this.managerUserCoinLogObj.endTime = this.registrationTimeLog[1] + " 23:59:59"
      }else{
        this.managerUserCoinLogObj.startTime = ''
        this.managerUserCoinLogObj.endTime = ''
      }
      this.managerUserCoinLog()
    },
    pageChangeLog (p) {
      this.managerUserCoinLogObj.pageNum = p
      this.managerUserCoinLog()
    },
    managerUserCoinLog(id,name){
      
      if(name){
        this.dialogName = name
      }  
      this.dialogTableVisibleCoinLog = true
      if(id){
        this.managerUserCoinLogObj.userId = id
      }      
      for(let key in this.managerUserCoinLogObj){
        if(this.managerUserCoinLogObj[key] == '' || this.managerUserCoinLogObj[key] === undefined || this.managerUserCoinLogObj[key] === null){
          delete this.managerUserCoinLogObj[key]
        }
      }
      managerUserCoinLog(this.managerUserCoinLogObj).then(res => {
        console.log(res.data)
        this.managerUserCoinLogData = res.data.list
        this.totalCoinLog = res.data.total
        
      })
    },




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
    getDateStr(secondCount){
      let retval = ''
      let years = (secondCount / (60 * 60 * 24 * 365)).toFixed(0);
      let days = ((secondCount %  (60 * 60 * 24 * 365)) / (60 * 60 * 24)).toFixed(0);
      let hours = ((secondCount % (60 * 60 * 24)) / (60 * 60)).toFixed(0);
      let minutes = ((secondCount % (60 * 60)) / 60).toFixed(0);
      let seconds = (secondCount % 60).toFixed(0);
      if (years > 0) {
          retval = years+"年"+days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
      }else if (days > 0) {
          retval = days + "天" + hours + "小时" + minutes + "分" + seconds + "秒";
      } else if (hours > 0) {
          retval = hours + "小时" + minutes + "分" + seconds + "秒";
      } else if (minutes > 0) {
          retval = minutes + "分" + seconds + "秒";
      } else {
          retval = seconds + "秒";
      }

      return retval;
      // var date = new Date(seconds*1000)
      // var year = date.getFullYear();
      // var month = date.getMonth() + 1;
      // var day = date.getDate();
      // var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      // var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      // var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // var currentTime = year + "-" + month + "-" + day + "  " + hour + ":" + minute + ":" + second;
      // return currentTime
    },
  },
  filters: {
    initTime(v) {
      return moment(v).format('YYYY-MM-DD HH:hh:ss');
    },
    initTimeturn(v) {  //把秒转换为小时
      v = 121212121
      return moment.duration(v, 'seconds').as('hours').toFixed(2);
    },
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

