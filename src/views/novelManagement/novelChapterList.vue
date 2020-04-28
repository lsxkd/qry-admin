<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <p class="warn-content" style="margin-bottom:30px;text-align:center;">
      <a href="javascript:;">书名：{{$route.query.bookName}}</a>
    </p>
    <el-form  size="small" inline :model="bookContentPage">
      <el-form-item label="章节名称:">
        <el-input placeholder="章节名称" v-model.trim="bookContentPage.chapter" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
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
        <router-link class="link-type" :to="'/novelManagement/novelChapterContent/'+$route.params.id+'?bookName=' + $route.query.bookName+'&flag=add'">
            <el-button type="primary" size="mini" >添加章节</el-button>
        </router-link>
        <!-- <el-button type="primary" @click="openEditOrAdd('add')" >添加章节</el-button> -->
      </el-form-item>
    </el-form>
    
    <el-table :data="bookContentListData" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="书ID" prop='bookId' align="center" :min-width="110"></el-table-column>
      <el-table-column label="章节名称" prop='chapter' align="center" :min-width="200"></el-table-column>
      <el-table-column label="字数" prop='typeNum' align="center" :min-width="110"></el-table-column>
      <el-table-column label="排序号" prop='orderNum' align="center" :min-width="110"></el-table-column>
      <!-- <el-table-column label="来源" prop='source' align="center" :min-width="110"></el-table-column> -->
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
          <router-link class="link-type" :to="'/novelManagement/novelChapterContent/'+scope.row.bookId+'?bookContentId=' + scope.row.idStr+'&bookName=' + $route.query.bookName+'&flag=edit'">
            <el-button type="primary" size="mini" >编辑</el-button>
          </router-link>
          <!-- <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)">编辑</el-button> -->
          <el-button type="danger" size="mini" icon="el-icon-edit" @click="delConfirm(scope.row.bookId,scope.row.idStr)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="bookContentPage.pageSize"
        :current-page="bookContentPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { bookContentList,managerBookContentDelete } from '@/api/category.js';
import moment from 'moment';
import { mapState,mapGetters } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
export default {
  name: 'novelChapterList',
  directives: { elDragDialog },
  data() {
    return {
      bookContentListData: [],
      total: 1,
      bookContentPage: {
        pageNum: 1,
        pageSize: 10,
        bookId:'',
        chapter:'',
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        chapter:'',
        bookId:'',
        id:'',
        orderNum:'',
        typeNum:'',
        source:'',
      },
      dialogRules: {
        name: [{ required: true, trigger: 'blur',message:'请输入书名' }],
      },
      
    }
  },
  computed: {
    tokenData(){
      return getToken()
    },
    ...mapGetters([
      'permission_routers'
    ]),
  },
  mounted() {
    // console.log(this.permission_routers)
    // this.permission_routers = {}
    // console.log(this.permission_routers)
  },
  created() {
    // console.log(this.$route.params.id)
    this.bookContentPage.bookId = this.$route.params.id
    this.bookContentList();
  },
  methods: {
    
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      delete this.dialogData.createTime
      // console.log(row)
      if(flag == 'edit'){
        this.dialogData = row
        
        for(let key in this.dialogData){
          if(this.dialogData[key] == null){
            this.dialogData[key] = ''
          }
        }
        this.imgUploadSrc = this.dialogData.coverImgUrl
      }else{
        delete this.dialogData.id
        for(let key in this.dialogData){
          this.dialogData[key] = ''
        }
      }
    },
    searchBtn(){
      this.bookContentList()
    },
    pageChange (p) {
      this.bookContentPage.pageNum = p
      this.bookContentList()
    },
    bookContentList() {
      // this.listLoading = true
      if(!this.bookContentPage.chapter){
        delete this.bookContentPage.chapter
      }
      bookContentList(this.bookContentPage).then(res => {
        this.bookContentListData = res.data.list
        this.total = res.data.total
        
      })
    },
    managerBookSave(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          if(this.dialogData.coverImgUrl == ''){
            this.$message.error('请上传分类图片！');
            return
          }
          managerBookSave(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              delete this.dialogData.id
              for(let key in this.dialogData){
                this.dialogData[key] = ''
              }
              this.managerBookPage()
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
    delConfirm(bookIds,bookContentIds){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delManagers(bookIds,bookContentIds)
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
    delManagers(bookIds,bookContentIds){
      const data = {
        bookId:bookIds,
        bookContentId:bookContentIds
      }
      managerBookContentDelete(data).then(res => {
        if(res.code == 200){
              this.bookContentList();
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

