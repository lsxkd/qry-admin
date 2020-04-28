<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="添加/修改banner"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="banner名称:" prop="bannerName">
          <el-input class="article-textarea" placeholder="请输入banner名称" style="width:215px;" v-model.trim="dialogData.bannerName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="小说:" prop="bookId">
          <el-select v-model="dialogData.bookId" @change="selectChange"  filterable remote reserve-keyword :remote-method="remoteMethod" clearable placeholder="请选择" style="width:215px;">
            <el-option
              v-for="item in managerBookPageData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="是否启用:" prop="enable">
          <el-radio v-model="dialogData.enable" :label="0">否</el-radio>
          <el-radio v-model="dialogData.enable" :label="1">是</el-radio>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="排序:" prop="orderNum">
          <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;" maxlength="9" v-model.trim="dialogData.orderNum"></el-input>
        </el-form-item>
        <el-form-item class="is-required" style="margin-bottom: 20px;" label-width="120px" label="图片:">
          <el-upload
            class="avatar-uploader"
            :action="FileUpload"
            :show-file-list="false"
            :headers="{'Authorization':tokenData}"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imgUploadSrc" :src="imgUploadSrc" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="topicBannerSave">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="topicBannerListPage">
      <!-- <el-form-item label="名称:">
        <el-input placeholder="名称" v-model.trim="topicBannerListPage.name" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
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
      </el-form-item> -->
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加banner</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="topicBannerList" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      
      <el-table-column label="banner名称" align="center" prop='bannerName' :min-width="150"></el-table-column>
      <el-table-column label='图片'  :min-width="200" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <img :src="scope.row.bannerUrlAll" style="width:100%;height:auto;">
            <img :src="scope.row.bannerUrlAll" slot="reference" style="width:auto;height:80px;">
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label="对应书名" align="center" prop='bookName' :min-width="150"></el-table-column>
      <el-table-column label="排序" align="center" prop='orderNum' :min-width="60"></el-table-column>
      
      <el-table-column label="是否启用" align="center" :min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.enable == 0">否</span>
          <span v-if="scope.row.enable == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label='创建时间' align="center" :min-width="160">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small">发行记录</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="delConfirm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="fishListPageLimit"
        :current-page="topicBannerListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { topicBannerPage,topicBannerSave,topicBannerDelete,fileUpload,managerBookPage  } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import { validatorColumnName,validatorOrderNum } from '@/utils/validator'
export default {
  name: 'bannerList',
  directives: { elDragDialog },
  props:{
    columnIds: {
      type: Number,
      default: ''
    },
  },
  data() {
    return {
      topicBannerList: [],
      fishListPageLimit:10,
      total: 1,
      topicBannerListPage: {
        pageNum: 1,
        pageSize: 10,
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        bannerName:'',
        bannerUrl:'',
        bookId:'',
        enable:'',
        orderNum:'',
        id:'',
        topicId:'',

      },
      dialogRules: {
        bannerName: [{ required: true, trigger: 'blur',validator: validatorColumnName }],
        enable: [{ required: true, trigger: 'blur',message:'请输入简介'  }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum   }],
        bookId: [{ required: true, trigger: 'blur',message:'请选择小说'  }],
        bannerUrl:[{ required: true, trigger: 'blur',message:'请上传图片'  }],
      },
      imgUploadSrc:'',
      managerBookPagePage:{
        pageNum: 1,
        pageSize: 100,
        name:'',
      },
      managerBookPageData:[],
    }
  },
  watch: {
    columnIds(val){
      console.log(val)
      this.dialogData.topicId = val
      this.topicBannerListPage.topicId = val
      this.topicBannerPage();
    },
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.dialogData.topicId = this.columnIds
    this.topicBannerListPage.topicId = this.columnIds
    console.log(this.topicBannerListPage)
    this.topicBannerPage();
    this.managerBookPage()
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
    },
    remoteMethod(query){
      if (query !== '') {
        this.managerBookPagePage.name = query
        this.managerBookPage()
        
      }else{
        delete this.managerBookPagePage.name
        this.managerBookPage()
      }
      
    },
    managerBookPage() {
      this.listLoading = true
      if(!this.managerBookPagePage.name){
        delete this.managerBookPagePage.name
      }
      managerBookPage(this.managerBookPagePage).then(res => {
        this.managerBookPageData = res.data.list
        this.managerBookPageData.map(item =>{
          item.label = item.name
          item.value = item.id
          item.bookId = item.id
        })
        
      })
    },
    handleAvatarSuccess(res, file) {
      this.imgUploadSrc = res.data.all_url
      this.dialogData.bannerUrl = res.data.short_url;
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

        this.dialogData.bannerName = row.bannerName
        this.dialogData.bookId = row.bookId
        this.dialogData.enable = row.enable
        this.dialogData.orderNum = row.orderNum
        this.dialogData.id = row.id
        this.dialogData.bannerUrl = row.bannerUrl
        this.imgUploadSrc = row.bannerUrlAll
        this.dialogData.topicId = row.topicId
      }else{
        this.dialogData.bannerName = ''
        this.dialogData.bookId = ''
        this.dialogData.enable = ''
        this.dialogData.orderNum = ''
        this.dialogData.id = ''
        this.dialogData.bannerUrl = ''
        this.imgUploadSrc = ''
        this.dialogData.topicId = this.columnIds
      }
    },
    searchBtn(){
      this.topicBannerListPage.pageNum = 1
      this.topicBannerPage()
    },
    pageChange (p) {
      this.topicBannerListPage.pageNum = p
      this.topicBannerPage()
    },
    topicBannerPage() {
      topicBannerPage(this.topicBannerListPage).then(res => {
        // console.log(res.data)
        this.topicBannerList = res.data.list
        this.total = res.data.total
        
      })
    },
    topicBannerSave(){
      console.log(this.dialogData)
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          if(!this.dialogData.bannerUrl){
            this.$message.error('请上传分类图片！');
            return
          }
          topicBannerSave(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              
              this.imgUploadSrc = ''
              this.topicBannerPage()
              this.$message({
                  type: 'success',
                  message: '操作成功!'
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
      topicBannerDelete(data).then(res => {
        if(res.code == 200){
              this.topicBannerPage()
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
<style  scope>
  .app-container{
    width:100%
  }
</style>

