<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="处理"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="是否处理:" prop="state">
          <el-radio-group v-model="dialogData.state">
            <el-radio label="0">未处理</el-radio>
            <el-radio label="1">已处理</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <div style="text-align:center;margin-top:40px;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="feedbackBookAudit">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="userListPage">
      <el-form-item label="处理状态:">
        <el-select v-model="userListPage.state" clearable placeholder="请选择">
          <el-option label="未处理" value="0"> </el-option>
          <el-option label="已处理" value="1"> </el-option>
        </el-select>
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
      <el-table-column label='联系方式类型' :min-width="160">
        <template slot-scope="scope">
          <span v-if="scope.row.contactType == 1">手机号</span>
          <span v-if="scope.row.contactType == 2">固定电话</span>
          <span v-if="scope.row.contactType == 3">电子邮件</span>
          <span v-if="scope.row.contactType == 4">微信</span>
          <span v-if="scope.row.contactType == 5">QQ</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" prop='contact' :min-width="150"></el-table-column>
      <!-- <el-table-column label="书本ID" prop='bookId' :min-width="150"></el-table-column> -->
      <el-table-column label="书本名称" prop='bookName' :min-width="150"></el-table-column>
      <!-- <el-table-column label="章节ID" prop='chapterId' :min-width="150"></el-table-column> -->
      <el-table-column label="章节名称" prop='chapterName' :min-width="150"></el-table-column>
      <el-table-column label="问题类型" prop='problemType' :min-width="150"></el-table-column>
      <el-table-column label="问题内容" prop='problemContent' :min-width="150"></el-table-column>
      
      <el-table-column label="用户ID" prop='userId' :min-width="150"></el-table-column>
      <el-table-column label="状态" :min-width="100" >
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.state == 0">未处理</el-tag>
          <el-tag type="success" v-if="scope.row.state == 1">已处理</el-tag>     
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small">发行记录</el-button> -->
          <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditOrAdd(scope.row.id)">处理</el-button>
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
// 1.章节顺序不正确
// 2.章节缺失
// 3.章节内容有误
// 4.章节内容缺失
// 5.其他问题
import { feedbackBookPage,feedbackBookAudit,feedbackBookDelete } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
export default {
  name: 'feedbackBook',
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
      dialogTableVisible:false,
      dialogData:{
        state:'',
      },
      dialogRules: {
        state: [{ required: true, trigger: 'blur',message:'请选择是否处理' }],
      },
      
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.feedbackBookPage();
  },
  methods: {
    openEditOrAdd(id){
      this.dialogTableVisible = true
      this.dialogData.id = id
      this.dialogData.state = ''
    },
    feedbackBookAudit(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          feedbackBookAudit(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
                  this.feedbackBookPage()
                  this.$message({
                      type: 'success',
                      message: '处理成功!'
                  });
                }else{
                  this.$message.error(res.msg);
                }
          })
        }
      })
    },
    searchBtn(){
      this.userListPage.pageNum = 1
      this.feedbackBookPage()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.feedbackBookPage()
    },
    feedbackBookPage() {

      feedbackBookPage(this.userListPage).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
      })
    },

    delConfirm(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delManagers(id)
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
      feedbackBookDelete(data).then(res => {
        if(res.code == 200){
              this.feedbackBookPage()
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

