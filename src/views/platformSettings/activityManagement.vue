<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        :title="dialogTitle"
        :visible.sync="dialogTableVisible"
        width='600px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="名称:" prop="activityName">
          <el-input class="article-textarea" placeholder="请输入活动名称" style="width:215px;" maxlength="50" v-model.trim="dialogData.activityName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="活动开始时间:" prop="activityStartTime">
          <el-date-picker
            v-model="dialogData.activityStartTime"
            type="datetime"
            style="width:215px;"
            :picker-options="pickerOptionsOne"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00"
            placeholder="选择活动开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="活动结束时间:" prop="activityEndTime">
          <el-date-picker
            v-model="dialogData.activityEndTime"
            :picker-options="pickerOptionsTwo"
            type="datetime"
            style="width:215px;"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59"
            placeholder="选择活动结束时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="跳转URL:" prop="jumpUrl">
          <el-input class="article-textarea" placeholder="请输入跳转URL" style="width:215px;"  v-model.trim="dialogData.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="是否启用:" prop="state">
          <el-radio v-model="dialogData.state" :label="1" border>启用</el-radio>
          <el-radio v-model="dialogData.state" :label="0" border>关闭</el-radio>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="排序:" prop="orderNum">
          <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;" maxlength="9" v-model.number.trim="dialogData.orderNum"></el-input>
        </el-form-item>
        <el-form-item class="is-required" style="margin-bottom: 20px;" label-width="120px" label="图片:">
          <el-upload
          style="width:215px;"
            class="avatar-uploader"
            :action="FileUpload"
            :show-file-list="false"
            :headers="{'Authorization':tokenData}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUploadSrc" :src="imgUploadSrc" class="avatar" style="width:auto;height:auto;max-width:215px;max-height:215px;margin:0 auto;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="名称:">
        <el-input placeholder="名称" v-model.trim="userListPage.activityName" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="处理状态:">
        <el-select v-model="userListPage.state" clearable placeholder="请选择">
          <el-option label="关闭" value="0"> </el-option>
          <el-option label="启用" value="1"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动时间">
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
        <el-button type="primary" @click="openEditOrAdd('add')" >添加活动</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="userList" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label='创建时间'  align="center" :min-width="160">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="活动名称" prop='activityName'  align="center" :min-width="150"></el-table-column>
      <el-table-column label='活动封面' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <img :src="scope.row.coverImgUrlAll" style="width:100%;height:auto;">
            <img :src="scope.row.coverImgUrlAll" slot="reference" style="max-width:100px;max-height:80px;display:block;margin:0 auto;">
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label='活动开始时间' :min-width="160">
        <template slot-scope="scope">
          {{scope.row.activityStartTime}}
        </template>
      </el-table-column>
      <el-table-column label='活动结束时间' :min-width="160">
        <template slot-scope="scope">
          {{scope.row.activityEndTime}}
        </template>
      </el-table-column>
      
      <el-table-column label="跳转URL" prop='jumpUrl'  align="center" :min-width="150"></el-table-column>
      <el-table-column label="排序" prop='orderNum'  align="center" :min-width="60"></el-table-column>
      
      <!-- <el-table-column label="账户状态" :min-width="150">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.state == 0">关闭</el-tag>
          <el-tag type="success" v-if="scope.row.state == 1">启用</el-tag>     
        </template>
      </el-table-column> -->
      <el-table-column label="账户状态" :min-width="150" align="center">
        <template slot-scope="scope">
          <div style="height:21px;">
            <el-switch
              style="display: block"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="关闭" 
              :active-value="1"
              :inactive-value="0"
              @change="activityChangestate(scope.row.id,scope.row.state)">
            </el-switch>
          </div>
          
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
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
import { activityPage,activitySaveOrUpdate,activityDelete,fileUpload,activityChangestate } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import { validatorJumpUrl,validatorOrderNum,validatorColumnName } from '@/utils/validator'
export default {
  name: 'activityManagement',
  directives: { elDragDialog },
  data() {
    // const validatorJumpUrl = (rule, value, callback) => {
    //   if (!value) {
    //     callback(new Error('请输入跳转URL'))
    //   }else if(!(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/.test(value))){
    //     callback(new Error('请输入正确的URL地址'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      userList: [],
      fishListPageLimit:10,
      total: 1,
      userListPage: {
        pageNum: 1,
        pageSize: 10,
        activityName:'',
        startTime:'',
        endTime:'',
        state:'',
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        activityName:'',//活动名称
        jumpUrl:'',//活动封面URL
        orderNum:'',
        activityStartTime:'',//活动开始时间
        activityEndTime:'',//活动结束时间
        state:'',//活动状态:0关闭,1启用
        activityDetail:'',//活动详情
        
      },
      dialogRules: {
        activityName: [{ required: true, trigger: 'blur',validator:validatorColumnName }],
        activityStartTime: [{ required: true, trigger: 'blur',message:'请选择开始时间'  }],
        activityEndTime: [{ required: true, trigger: 'blur',message:'请选择结束时间'  }],
        jumpUrl: [{ required: true, trigger: 'blur',validator: validatorJumpUrl  }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum  }],
        state:[{ required: true, trigger: 'blur',message:'请选择是否开启'  }],
      },
      dialogTitle:'添加',
      imgUploadSrc:'',
      pickerOptionsOne: {
        disabledDate: t => {
            // if(this.searchInfo.endDate !==null){
            //     return t.getTime() > new Date(this.searchInfo.endDate).getTime() || t.getTime() < new Date(new Date(this.searchInfo.endDate).getTime()  - 3600 * 1000 * 24 * 7).getTime()
            // }else{
            //     return false
            // }
            if(this.dialogData.activityEndTime !==null){
                return t.getTime() >= new Date(this.dialogData.activityEndTime).getTime() || t.getTime() <= new Date(new Date().getTime() - 3600 * 1000 * 24 * 1).getTime()
            }else{
                return t.getTime() <= new Date(new Date().getTime() - 3600 * 1000 * 24 * 1).getTime()
            }
            // return false
        }
      },
      pickerOptionsTwo: {
        disabledDate: t => {
            // if(this.searchInfo.startDate !== null){
            //     return t.getTime() < new Date(this.searchInfo.startDate).getTime() || t.getTime() > new Date(new Date(this.searchInfo.startDate).getTime() + 3600 * 1000 * 24 * 7).getTime()
            // }else{
            //     return false
            // }
            if(this.dialogData.activityStartTime !== null){
                return t.getTime() <= new Date(new Date(this.dialogData.activityStartTime).getTime() - 3600 * 1000 * 24 * 1).getTime() || t.getTime() <= new Date(new Date().getTime() - 3600 * 1000 * 24 * 1).getTime()
            }else{
                return t.getTime() <= new Date(new Date().getTime() - 3600 * 1000 * 24 * 1).getTime()
            }
            // return false
        }
      },
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.activityPage();
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
    },
    activityChangestate(ids,flag){
      const data = {
        state:flag,
        id:ids
      }
      activityChangestate(data).then(res => {
        // console.log(res.data)
        this.$message({
            type: 'success',
            message: '修改成功!'
        });
        this.activityPage();
      })
    },
    handleAvatarSuccess(res, file) {
      this.imgUploadSrc = res.data.all_url
      this.dialogData.coverImgUrl = res.data.short_url;
    },
    beforeAvatarUpload(file) {
      var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
      const isJPG = testmsg == "jpg" || testmsg == "JPG" || testmsg == "png" || testmsg == "PNG" || testmsg == "bpm" || testmsg == "JPEG" || testmsg == "jpeg" || testmsg == "BPM"
      const isLt2M = file.size / 1024 / 1024 < 0.4;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 jpg,png,bpm 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 400kb!');
      }
      return isJPG && isLt2M;
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      console.log(row)
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.activityName = row.activityName
        this.dialogData.jumpUrl = row.jumpUrl
        this.dialogData.state = row.state
        this.dialogData.orderNum = row.orderNum || 0
        this.dialogData.coverImgUrl = row.coverImgUrl
        this.imgUploadSrc = row.coverImgUrlAll
        this.dialogData.activityStartTime = row.activityStartTime
        this.dialogData.activityEndTime = row.activityEndTime
      }else{
        this.dialogTitle = '添加'
        this.dialogData.id = ''
        this.dialogData.activityName = ''
        this.dialogData.jumpUrl = ''
        this.dialogData.orderNum = ''
        this.dialogData.coverImgUrl = ''
        this.dialogData.state = ''
        this.imgUploadSrc = ''
        this.dialogData.activityStartTime = ''
        this.dialogData.activityEndTime = ''
      }
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
      this.activityPage()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.activityPage()
    },
    activityPage() {
      for(let key in this.userListPage){
        if(!this.userListPage[key]){
          delete this.userListPage[key]
        }
      }
      console.log(this.userListPage)
      activityPage(this.userListPage).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
      })
    },
    addManagerBtn(){

      this.$refs.dialogData.validate(valid => {
        if (valid) {
          if(this.dialogData.coverImgUrl == ''){
            this.$message.error('请上传活动图片！');
            return
          }
          activitySaveOrUpdate(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData.id = ''
              this.dialogData.name = ''
              this.dialogData.introduce = ''
              this.dialogData.orderNum = ''
              this.dialogData.coverImgUrl = ''
              this.imgUploadSrc = ''
              this.dialogData.activityStartTime = ''
              this.dialogData.activityEndTime = ''
              this.activityPage()
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
        id:id
      }
      activityDelete(data).then(res => {
        if(res.code == 200){
              this.activityPage()
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
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

