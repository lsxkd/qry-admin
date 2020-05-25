<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        :title="dialogTitle"
        :visible.sync="dialogTableVisible"
        width='800px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="名称:" prop="title">
          <el-input class="article-textarea" placeholder="请输入名称" style="width:515px;" maxlength="50" v-model.trim="dialogData.title"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="公告状态:" prop="state">
          <el-radio v-model="dialogData.state" :label="1" border>发布</el-radio>
          <el-radio v-model="dialogData.state" :label="0" border>草稿</el-radio>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="公告内容:" prop="message">
          <el-input  type="textarea"  :rows="12" placeholder="请输入内容" style="width:515px;" maxlength="500"  v-model.trim="dialogData.message"></el-input>
        </el-form-item>
        <!-- <el-form-item style="margin-bottom: 20px;" label-width="120px" label="活动开始时间:" prop="activityStartTime">
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
        </el-form-item> -->
        
        
        <!-- <el-form-item style="margin-bottom: 20px;" label-width="120px" label="排序:" prop="orderNum">
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
        </el-form-item> -->
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="noticePageObj">
      <el-form-item label="名称:">
        <el-input placeholder="名称" v-model.trim="noticePageObj.title" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item>
      <el-form-item label="公告状态:">
        <el-select v-model="noticePageObj.state" clearable placeholder="请选择">
          <el-option label="草稿" value="0"> </el-option>
          <el-option label="已发布" value="1"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
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
        <el-button type="primary" @click="openEditOrAdd('add')" >添加公告</el-button>
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
      <el-table-column label="名称" prop='title'  align="center" :min-width="150"></el-table-column>
      
      <!-- <el-table-column label="公告内容" prop='message'  align="center" :min-width="150"></el-table-column> -->
      <el-table-column label='公告内容' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <div style="white-space: pre-wrap;padding:10px;">
              <!-- {{scope.row.introduction}} -->
              <p v-html="scope.row.message"></p>
            </div>
            <div slot="reference" style="width:150px;height:81px;line-height:27px;overflow: hidden;white-space: pre-wrap;">
              <!-- {{scope.row.introduction}} -->
              <p v-html="scope.row.message"></p></div>
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label='更新时间'  align="center" :min-width="160">
        <template slot-scope="scope">
          {{scope.row.updateTime}}
        </template>
      </el-table-column>
      <!-- <el-table-column label="公告状态" align="center" :min-width="150">
        <template slot-scope="scope">
          <el-tag type="warning" v-if="scope.row.state == 0">草稿</el-tag>
          <el-tag type="success" v-if="scope.row.state == 1">已发布</el-tag>     
        </template>
      </el-table-column> -->
      <el-table-column label="公告状态" :min-width="150" align="center">
        <template slot-scope="scope">
          <div style="height:21px;">
            <el-switch
              style="display: block"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="发布"
              inactive-text="草稿" 
              :active-value="1"
              :inactive-value="0"
              @change="noticeUpdateState(scope.row.id,scope.row.state)">
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
        :current-page="noticePageObj.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { noticePage,noticeSaveOrUpdate,noticeDelete,noticeUpdateState } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import { validatorJumpUrl,validatorOrderNum,validatorColumnName } from '@/utils/validator'
export default {
  name: 'messageCenter',
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
      noticePageObj: {
        pageNum: 1,
        pageSize: 10,
        title:'',
        startTime:'',
        endTime:'',
        state:'',
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        title:'',//名称
        message:'',//消息内容
        state:'',//公告状态：0草稿，1已发布        
      },
      dialogRules: {
        title: [{ required: true, trigger: 'blur',validator:validatorColumnName }],
        message: [{ required: true, trigger: 'blur',message:'请输入公告内容'  }],
        state:[{ required: true, trigger: 'blur',message:'请选择公告状态'  }],
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
    this.noticePage();
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
    },
    noticeUpdateState(ids,flag){
      const data = {
        state:flag,
        id:ids
      }
      noticeUpdateState(data).then(res => {
        // console.log(res.data)
        this.$message({
            type: 'success',
            message: '修改成功!'
        });
        this.noticePage();
      })
    },
   
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      console.log(row)
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.title = row.title
        this.dialogData.message = row.message
        this.dialogData.state = row.state
      }else{
        this.dialogTitle = '添加'
        this.dialogData.id = ''
        this.dialogData.title = ''
        this.dialogData.message = ''
        this.dialogData.state = ''
      }
    },
    searchBtn(){
      this.noticePageObj.pageNum = 1
      if(this.registrationTime&&this.registrationTime.length>0){
        this.noticePageObj.startTime = this.registrationTime[0] + " 00:00:00"
        this.noticePageObj.endTime = this.registrationTime[1] + " 23:59:59"
      }else{
        this.noticePageObj.startTime = ''
        this.noticePageObj.endTime = ''
      }
      this.noticePage()
    },
    pageChange (p) {
      this.noticePageObj.pageNum = p
      this.noticePage()
    },
    noticePage() {
      for(let key in this.noticePageObj){
        if(!this.noticePageObj[key]){
          delete this.noticePageObj[key]
        }
      }
      console.log(this.noticePageObj)
      noticePage(this.noticePageObj).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
      })
    },
    addManagerBtn(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          noticeSaveOrUpdate(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData.id = ''
              this.dialogData.title = ''
              this.dialogData.message = ''
              this.dialogData.state = ''
              this.noticePage()
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
      noticeDelete(data).then(res => {
        if(res.code == 200){
              this.noticePage()
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

