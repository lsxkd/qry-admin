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
    <!-- <el-form  size="small" inline :model="categoryPagePage">
     
      <el-form-item label="提示:">
        <p style="font-size:12px;color:#999;">因为这个页面是配置功能模块，现在只有小说模块已经基本开发完成，其他功能模块完全没有开发，即使开启了其他模块 app端也是没有内容显示，所以没必要开启！</p>
      </el-form-item>
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加分类</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="categoryPage" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      
      <el-table-column label='创建时间' :min-width="160">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="名称" prop='dictName' :min-width="150"></el-table-column>
      <el-table-column label="dictCode" prop='dictCode' :min-width="150"></el-table-column>
      <el-table-column label="排序" prop='orderNum' :min-width="60"></el-table-column>
      
      <el-table-column label="是否启用" :min-width="100" >
        <template slot-scope="scope">
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
        :current-page="categoryPagePage.pageNum"
        :total="total"
      ></el-pagination> -->
    <div class="classification">
      <el-row>
        <el-col :span="24">
          <el-tabs tab-position="left" style="min-height: 400px;"  v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="item.dictName" :name="item.dictCode" v-for="(item,index) in categoryPage" :key="index">
              <h3 class="classification-left-title" slot="label">{{item.dictName}}</h3>
              <div class="classification-box">
                <div class="classification-box-btn">
                  <el-switch
                    style="display: block"
                    v-model="item.enable"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="启用"
                    inactive-text="" 
                    :active-value="1"
                    :inactive-value="0"
                    @change="dictEaableFn(item)">
                  </el-switch>
                </div>
                <el-tabs type="border-card" v-model="activeNameMan" @tab-click="handleClickMan" v-if="item.dictName == '小说'">
                  <el-tab-pane label="男生" name="2">
                    <ClassificationPageManEdit :classificationId="activeNameMan" v-if="activeNameMan == 2"></ClassificationPageManEdit>
                  </el-tab-pane>
                  <el-tab-pane label="女生" name="3">
                    <ClassificationPageManEdit :classificationId="activeNameMan" v-if="activeNameMan == 3"></ClassificationPageManEdit>
                  </el-tab-pane>
                </el-tabs>

                <p class="noDatas" v-else>暂无内容！</p>
                <!-- <el-tabs type="border-card" >
                  <el-tab-pane label="男" >
                    <p class="noDatas">暂无内容！</p>
                  </el-tab-pane>
                  <el-tab-pane label="女">
                    <p class="noDatas">暂无内容！</p>
                  </el-tab-pane>
                </el-tabs> -->
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane> -->
          </el-tabs>
        </el-col> 
      </el-row>
    </div>

  </div>
</template>

<script>
import { dictClassifyList,dictClassifySaveOrUpdate,dictDelete,dictClassifyEnable,categoryList } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import draggable from 'vuedraggable'
import { getToken } from '@/utils/auth'
import { validatorColumnName,validatorOrderNum,validatorEncoded } from '@/utils/validator'

import ClassificationPageManEdit from './classificationPageManEdit'
export default {
  name: 'classificationPageMan',
  directives: { elDragDialog },
  components: {
    draggable,ClassificationPageManEdit
  },
  data() {
    return {
      categoryPage: [],
      fishListPageLimit:10,
      total: 1,
      categoryPagePage: {
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
      dialogTitle:'添加',
      activeName: 'first',

      classifiedsList: [],
      fishListPageLimit:10,
      totalTwo: 1,
      classifiedsListPage: {
        pageNum: 1,
        pageSize: 10,
      },
      activeNameMan:'2',
      
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
    
    handleClickMan(tab){
      console.log(tab.name);
      this.activeNameMan = tab.name
    },
    handleClick(tab, event) {
      console.log(tab);
    },
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
      this.categoryPagePage.pageNum = 1
      this.dictClassifyList()
    },
    pageChange (p) {
      this.categoryPagePage.pageNum = p
      this.dictClassifyList()
    },
    dictClassifyList() {

      dictClassifyList().then(res => {
        // console.log(res.data)
        this.categoryPage = res.data
        this.activeName = this.categoryPage[0].dictCode
        
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
.classification .el-tabs__item{
    padding:0px 40px !important;
}
.is-left .el-tabs__item{
    padding:0px 40px !important;
    height:60px;
    line-height: 60px;
}
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
<style scoped>
  .app-container{
    display:flex;
    flex-direction:column;
  }
  .classification-left-title{
    /* padding:20px 0; */
  }
  .classification-box-btn{
    text-align: right;
    margin:10px auto 20px auto;
  }
  .noDatas{
    font-size:14px;
    color:#999;
    text-align: center;
    margin:50px auto;
  }

 
</style>
