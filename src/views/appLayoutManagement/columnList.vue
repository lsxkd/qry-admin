<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="添加/编辑栏目"
        :visible.sync="dialogTableVisible"
        v-if='dialogTableVisible'
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="栏目名称:" prop="topicName">
          <el-input class="article-textarea" placeholder="请输入名称" style="width:215px;" v-model.trim="dialogData.topicName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="排序:" prop="orderNum">
          <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;" maxlength="9" v-model.trim="dialogData.orderNum"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="是否启用:" prop="enable">
          <el-select v-model="dialogData.enable" clearable placeholder="请选择" style="width:215px;">
            <el-option label="否" value="0"> </el-option>
            <el-option label="是" value="1"> </el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="内容类型:" prop="contentType" v-if="columnOneOrTwo == 2">
          <el-select v-model="dialogData.contentType" @change="selectChange" clearable placeholder="请选择" style="width:215px;">
            <el-option label="小说" :value="1" > </el-option>
            <el-option label="banner" :value="2" v-if="!zijiFlag"> </el-option>
            <el-option label="栏目" :value="3" v-if="!zijiFlag"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="展示类型:" prop="showType" v-if="columnOneOrTwo == 2&&dialogData.contentType==1">
          <el-select v-model="dialogData.showType" @change="selectChange" clearable placeholder="请选择" style="width:215px;">
            <!-- <el-option label="三列" :value="1"> </el-option>
            <el-option label="一行两列" :value="2"> </el-option>
            <el-option label="单个两列" :value="3"> </el-option> -->
            <el-option label="一竖" :value="4" v-if="!zijiFlag"> </el-option>
            <el-option label="一行" :value="5" v-if="!zijiFlag"> </el-option>
            <el-option label="多子" :value="6" > </el-option>
          </el-select>
          <!-- <p class="form-tips" v-show="dialogData.showType == 1">请至少添加<span>3</span>部小说</p>
          <p class="form-tips" v-show="dialogData.showType == 2">请至少添加<span>5</span>部小说</p>
          <p class="form-tips" v-show="dialogData.showType == 3">请至少添加<span>3</span>部小说</p> -->
          <p class="form-tips" v-show="dialogData.showType == 4">请至少添加<span>1</span>部小说</p>
          <p class="form-tips" v-show="dialogData.showType == 5">请至少添加<span>1</span>部小说</p>
          <p class="form-tips" v-show="dialogData.showType == 6">请至少添加<span>1</span>个栏目,每个栏目至少选择<span>1</span>部小说</p>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="topicSaveOrUpdate">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline>
      <el-form-item style="margin-bottom:15px;">
        <!-- <el-button type="primary" @click="openEditOrAdd('add')" >添加一级栏目</el-button> -->
        <el-button type="success" @click="refreshBtn">刷新栏目</el-button>
      </el-form-item>
    </el-form>
    
    <div class="splitPanes">
      <div class="splitPanes-left">
        <el-menu :default-active="activeMenuId" :default-openeds="activeSubMenuId" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
          <el-submenu   v-for="(item,index) in topicAllTreeData" :key="index" :index="String(item.id)"  >
            <template slot="title">
              <div style="display:flex;justify-content: space-between;padding-right:25px;">
                <div>
                  <i class="el-icon-s-grid"></i>
                  <span slot="title">{{item.topicName}} 
                    <span style="color:#f56c6c;font-size:12px;" v-if="item.enable == 0">
                      <!-- <svg-icon icon-class="stopUse"></svg-icon> -->
                      (已停用)
                    </span> 
                  </span>
                </div>
                <div>
                  <el-button type="text" size='mini' @click.stop="openEditOrAdd('add',item,2)">添加</el-button>
                  <!-- <el-button type="text" size='mini' @click.stop="openEditOrAdd('edit',item)">编辑</el-button>
                  <el-button type="text" size='mini' @click.stop="delConfirm(item.id)">删除</el-button> -->
                </div>
              </div>
              
            </template>
            <!-- <el-menu-item-group :index="item.id+'-'+em.id" v-for="(em,indexs) in item.childs" :key="indexs + 'a'" @click="menuItemBtn(em.id,em.contentType)" v-show="em.contentType == 1|| em.contentType==2">
              <el-menu-item  >
                <div style="display:flex;justify-content: space-between;">
                  <div> 
                    <i class="el-icon-s-unfold"></i>
                    <span slot="title">{{em.topicName}} <span style="color:#f56c6c;font-size:12px;" v-if="em.enable == 0">(已停用)</span> </span>
                  </div>
                  
                  <div>
                    <el-button type="text" size='mini' v-if="em.contentType == 3" @click.stop="openEditOrAdd('add',em,2)">添加</el-button>
                    <el-button type="text" size='mini' @click.stop="openEditOrAdd('edit',em,2)">编辑</el-button>
                    <el-button type="text" size='mini' @click.stop="delConfirm(em.id)">删除</el-button>
                  </div>
                  
                </div>
              </el-menu-item>
            </el-menu-item-group> -->
            <el-submenu   :index="item.id+'-'+em.id" v-for="(em,indexs) in item.childs" :key="indexs + 'b'" @click.native="menuItemBtn(em.id,em.contentType)">
              <template slot="title">
                <div style="display:flex;justify-content: space-between;padding-left:20px;">
                  <div> 
                    <i class="el-icon-menu"></i>
                    <span>{{em.topicName}} <span style="color:#f56c6c;font-size:12px;" v-if="em.enable == 0">(已停用)</span> </span>
                  </div>
                  <div>
                    <el-button type="text" size='mini' v-if="em.contentType == 3" @click.stop="openEditOrAdd('add',em,2,em)">添加</el-button>
                    <el-button type="text" size='mini' @click.stop="openEditOrAdd('edit',em,2,item)">编辑</el-button>
                    <el-button type="text" size='mini' @click.stop="delConfirm(em.id)">删除</el-button>
                  </div>
                </div>
              </template>
              <el-menu-item :index="em.id+'-'+m.id" v-for="(m,indexsm) in em.childs" :key="indexsm + 'c'" @click.stop.native="menuItemBtn(m.id,m.contentType)">
                <div style="display:flex;justify-content: space-between;padding-left:20px;">
                  <div> 
                    <i class="el-icon-s-unfold"></i>
                    <span>{{m.topicName}} <span style="color:#f56c6c;font-size:12px;" v-if="m.enable == 0">(已停用)</span> </span>
                  </div>
                  <div>
                    <el-button type="text" size='mini' v-if="m.contentType == 3" @click.stop.native="openEditOrAdd('add',m,2,em)">添加</el-button>
                    <el-button type="text" size='mini' @click.stop="openEditOrAdd('edit',m,2,em)">编辑</el-button>
                    <el-button type="text" size='mini' @click.stop="delConfirm(m.id)">删除</el-button>
                  </div>
                </div>
              </el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </div>
      <div class="splitPanes-right">
        <div class="splitPanes-right-box" v-if="contentTypeFlag == 1" :ss='columnIds'>
          <ColumnBookedit  :columnIds='columnIds'></ColumnBookedit>
        </div>
        <div class="splitPanes-right-box" v-else-if="contentTypeFlag == 2" :ss='columnIds'>
          <BannnerList  :columnIds='columnIds'></BannnerList>
        </div>
        <div class="splitPanes-right-box" v-else>
          <div class="no-data">
            暂无内容，请选择左侧要修改的内容！
          </div>
        </div>
      </div>
    </div>
        
  </div>
</template>

<script>
import { topicAllTree,topicParent,topicChild,topicSaveOrUpdate,topicDelete,fileUpload } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import BannnerList from '../novelManagement/bannerList'
import ColumnBookedit from '../novelManagement/columnBookedit'
import { validatorColumnName,validatorOrderNum } from '@/utils/validator'
export default {
  name: 'columnList',
  directives: { elDragDialog },
  components: { BannnerList,ColumnBookedit },
  data() {
    return {
      topicParentData: [],
      topicChildData:{},
      topicAllTreeData:[],
      isTopicChild:false,
      dialogTableVisible:false,
      dialogData:{
        topicName:'',
        enable:'',
        orderNum:'',
        showType:'',
        contentType:''
      },
      dialogRules: {
        topicName: [{ required: true, trigger: 'blur',validator: validatorColumnName }],
        enable: [{ required: true, trigger: 'blur',message:'请选择是否启用'  }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum  }],
        contentType: [{ required: true, trigger: 'blur',message:'请选择内容类型'  }],
        showType: [{ required: true, trigger: 'blur',message:'请选择展示类型'  }],
      },
      imgUploadSrc:'',
      isCollapse: false,
      contentTypeFlag:'',
      columnIds:'',
      activeMenuId:'',
      activeSubMenuId:[],
      columnOneOrTwo:1,//添加编辑是一级还是二级栏目，1是一级，2是二级
      zijiFlag:false,
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    // this.topicParent();
    this.topicAllTree()
    
  },
  methods: {
    selectChange(val){
      this.$forceUpdate();
    },
    refreshBtn(){
      // this.topicParentData = []
      // this.topicChildData = {}
      // this.topicParent();

      this.topicAllTree()
    },
    menuItemBtn(id,contentType){
      // console.log(id)
      // console.log(contentType)
      this.columnIds = id
      this.contentTypeFlag = contentType
    },
    handleOpen(key, keyPath) {
      // console.log(key);
    },
    handleClose(key, keyPath) {
      // console.log(key);
    },

    handleOpenChild(id){
      let timers = setTimeout(()=>{
        this.topicChild(id)
        clearTimeout(timers)
        timers = null
      },300)
      
    },


    openEditOrAdd(flag,row,columnOneOrTwos,parentLevel){
      this.dialogTableVisible = true
      console.log(parentLevel)
      if(parentLevel&&parentLevel.contentType == 3){
        this.zijiFlag = true
      }else{
        this.zijiFlag = false
      }
      console.log(this.zijiFlag)
      this.columnOneOrTwo = columnOneOrTwos
      console.log(row)
      if(flag == 'edit'){
        this.dialogData.id = row.id
        this.dialogData.topicName = row.topicName
        this.dialogData.enable = String(row.enable)
        this.dialogData.orderNum = String(row.orderNum)
        if(columnOneOrTwos == 2){
          this.dialogData.contentType = row.contentType
          this.dialogData.showType = row.showType
          this.dialogData.parentId = row.parentId
        }else{
          this.dialogData.parentId = -1
          this.dialogData.contentType = ''
          this.dialogData.showType = ''
        }
      }else{
        delete this.dialogData.id
        this.dialogData.topicName = ''
        this.dialogData.enable = ''
        this.dialogData.orderNum = ''
        if(columnOneOrTwos == 2){
          this.dialogData.contentType = ''
          this.dialogData.showType = ''
          this.dialogData.parentId = row.id
        }else{
          this.dialogData.parentId = -1
          this.dialogData.contentType = ''
          this.dialogData.showType = ''
        }
      }
    },
    topicAllTree() {
      topicAllTree().then(res => {
        this.$nextTick(() => {
          this.topicAllTreeData = res.data          
        })
        
      })
    },
    topicParent() {
      topicParent().then(res => {
        this.$nextTick(() => {
          this.topicParentData = res.data
          
          this.topicChild(this.topicParentData[0].id)
          
        })
        
      })
    },
    topicChild(id) {
      
      if(this.topicChildData.hasOwnProperty(id)){
        return
      }
      this.isTopicChild = false
      const data = {
        parentId:id
      }
      topicChild(data).then(res => {
        // this.$nextTick(() => {
          this.topicChildData[String(id)] = res.data
          console.log(this.topicChildData[String(id)])
          this.isTopicChild = true
        // })
        
        
      })
    },
    topicSaveOrUpdate(){
      // console.log(this.dialogData)
      const data = {}
      for(let key in this.dialogData){
        if(this.dialogData[key] == ""){
          // delete this.dialogData[key]
        }else{
          data[key] = String(this.dialogData[key])
        }
      }
      // console.log(this.dialogData)
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          topicSaveOrUpdate(data).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              delete this.dialogData.id
              this.dialogData.topicName = ''
              this.dialogData.enable = ''
              this.dialogData.orderNum = ''
              this.dialogData.contentType = ''
              this.dialogData.showType = ''
              this.topicAllTree()
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
      topicDelete(data).then(res => {
        if(res.code == 200){
              this.topicAllTree()
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
.no-data{
  display: flex;
  align-items: center;
  justify-content: center;
  width:100%;
  padding-top:50px;
  color:#999;
  font-size: 12px;
}
.el-select-dropdown__list{
  padding-bottom:17px;
}
.form-tips{
  font-size: 12px;
  color:#999;
  
}
.form-tips span{
  font-size: 14px;
  color:#f56c6c;
  padding:0 5px;
}
.splitPanes{
  width:100%;
  display: flex;
  justify-content: space-between;
   border: 1px solid #eee;
}
.splitPanes-left{
  flex: 0 0 auto;
  width:400px;
  background:#eef1f6;
  min-height: 500px;
}
.splitPanes-right{
  flex:1 1 auto;
  width:calc(100% - 400px);
}
.splitPanes-right-box{
  width:100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 400px;
    
  }
.el-menu-item-group__title{
  padding:0;
  height:0;
}
.el-submenu__title i{
  margin-top: -5px;
}
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
.el-submenu .el-menu-item{
  padding:0 20px 45px 0;
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

