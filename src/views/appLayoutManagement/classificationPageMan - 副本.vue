<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        :title="dialogTitle"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="名称:" prop="dictName">
          <el-input class="article-textarea" placeholder="请输入名称" maxlength="30" style="width:215px;" v-model.trim="dialogData.dictName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="编码:" prop="dictCode">
          <el-input class="article-textarea"  placeholder="请输入编码" maxlength="20" style="width:215px;"  v-model.trim="dialogData.dictCode"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="是否启用:">
          <!-- <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;"  v-model="fishEditData.disable"></el-input> -->
          <el-radio v-model="dialogData.enable" :label="1" border>启用</el-radio>
          <el-radio v-model="dialogData.enable" :label="0" border>停用</el-radio>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="排序:" prop="orderNum">
          <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;" maxlength="9" v-model.trim="dialogData.orderNum"></el-input>
        </el-form-item>

        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="userListPage">
      <!-- <el-form-item label="名称:">
        <el-input placeholder="名称" v-model.trim="userListPage.name" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
      </el-form-item> -->
      
      <!-- <el-form-item label="注册时间">
        <el-date-picker
          v-model="registrationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="searchBtn"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </!--> 
      <!-- <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          title="搜索"
          style="font-size: 16px"
          @click="searchBtn()"
        />
      </el-form-item> -->
      <el-form-item label="提示:">
        <p style="font-size:12px;color:#999;">因为这个页面是配置功能模块，现在只有小说模块已经基本开发完成，其他功能模块完全没有开发，即使开启了其他模块 app端也是没有内容显示，所以没必要开启！</p>
      </el-form-item>
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加分类</el-button>
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
      <el-table-column label="名称" prop='dictName' :min-width="150"></el-table-column>
      <el-table-column label="dictCode" prop='dictCode' :min-width="150"></el-table-column>
      <el-table-column label="排序" prop='orderNum' :min-width="60"></el-table-column>
      
      <el-table-column label="是否启用" :min-width="100" >
        <template slot-scope="scope">
          <!-- <span v-if="scope.row.enable == 0">禁用</span>
          <span v-if="scope.row.enable == 1">启用</span> -->
          <div style="height:21px;">
            <el-switch
              style="display: block"
              v-model="scope.row.enable"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="" 
              :active-value="1"
              :inactive-value="0"
              @change="dictEaableFn(scope.row)">
            </el-switch>
          </div>
          
        </template>
      </el-table-column>
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
import { dictClassifyList,dictClassifySaveOrUpdate,dictDelete,dictClassifyEnable } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import { validatorColumnName,validatorOrderNum,validatorEncoded } from '@/utils/validator'
export default {
  name: 'classificationPageMan',
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
        dictCode:'',
        dictName:'',
        enable:0,
        orderNum:'',
      },
      dialogRules: {
        dictName: [{ required: true, trigger: 'blur',validator: validatorColumnName  }],
        dictCode: [{ required: true, trigger: 'blur',validator: validatorEncoded  }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum   }]
      },
      dialogTitle:'添加'
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.dictClassifyList();
  },
  methods: {
    dictEaableFn(row){
      console.log(row)
      let flag = 0
      if(row.enable == 1){
        flag = 0
      }else{
        flag = 1
      }
      console.log(flag)
      this.dictClassifyEnable(row.id,row.enable)
    },
    dictClassifyEnable(ids,flag){
      const data = {
        enable:flag,
        id:ids
      }
      dictClassifyEnable(data).then(res => {
        // console.log(res.data)
        this.$message({
            type: 'success',
            message: '修改成功!'
        });
        this.dictClassifyList();
      })
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      console.log(row)
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.dictCode = row.dictCode
        this.dialogData.dictName = row.dictName
        this.dialogData.enable = row.enable
        this.dialogData.orderNum = row.orderNum
      }else{
        delete this.dialogData.id
        this.dialogTitle = '添加'
        this.dialogData.dictCode = ''
        this.dialogData.dictName = ''
        this.dialogData.enable = 0
        this.dialogData.orderNum = ''
      }
    },
    searchBtn(){
      this.userListPage.pageNum = 1
      this.dictClassifyList()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.dictClassifyList()
    },
    dictClassifyList() {

      dictClassifyList().then(res => {
        // console.log(res.data)
        this.userList = res.data
        
      })
    },
    addManagerBtn(){
      
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          dictClassifySaveOrUpdate(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData.dictCode = ''
              this.dialogData.dictName = ''
              this.dialogData.enable = 0
              this.dialogData.orderNum = ''
              this.dictClassifyList()
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
      dictDelete(data).then(res => {
        if(res.code == 200){
              this.dictClassifyList()
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

