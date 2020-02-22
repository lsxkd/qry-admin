<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="添加一级栏目"
        :visible.sync="dialogTableVisible"
        width='500px'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="名称:" prop="name">
          <el-input class="article-textarea" placeholder="请输入名称" style="width:215px;" v-model.trim="dialogData.name"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="简介:" prop="introduce">
          <el-input type="textarea"  :rows="2"  placeholder="请输入简介" style="width:215px;"  v-model.trim="dialogData.introduce"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="排序:" prop="orderNum">
          <el-input class="article-textarea" placeholder="请输入排序" style="width:215px;" maxlength="11" v-model.trim="dialogData.orderNum"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="图片:">
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
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="topicParentDataPage">
      <el-form-item style="margin-bottom:15px;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加一级栏目</el-button>
        <el-button type="success" >刷新栏目</el-button>
      </el-form-item>
    </el-form>
    
    <div class="splitPanes">
      <div class="splitPanes-left">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened>
          <el-submenu   v-for="(item,index) in topicParentData" :key="index" :index="String(item.id)" @click.native="handleOpenChild(item.id)" >
            <template slot="title">
              <div style="display:flex;justify-content: space-between;padding-right:25px;">
                <div>
                  <i class="el-icon-menu"></i>
                  <span slot="title">{{item.topicName}}</span>
                </div>
                <div>
                  <el-button type="text" size='mini' @click.stop="aFun">添加</el-button>
                  <el-button type="text" size='mini' @click.stop="aFun">编辑</el-button>
                  <el-button type="text" size='mini' @click.stop="aFun">删除</el-button>
                </div>
              </div>
              
            </template>
            <el-menu-item-group v-if="isTopicChild">
              <!-- <span slot="title">分组一</span> -->
              <el-menu-item  :index="item.id+'-'+em.id" v-for="(em,indexs) in topicChildData[String(item.id)]" :key="indexs + 'a'" >
                <div style="display:flex;justify-content: space-between;">
                  <div> 
                    <i class="el-icon-s-unfold"></i>
                    <span slot="title">{{em.topicName}}</span>
                  </div>
                  
                  <div>
                    <el-button type="text" size='mini' @click.stop="aFun">编辑</el-button>
                    <el-button type="text" size='mini' @click.stop="aFun">删除</el-button>
                  </div>
                  
                </div>
              </el-menu-item>
              <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
            </el-menu-item-group>
          </el-submenu>
          <!-- <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item> -->
        </el-menu>
      </div>
      <div class="splitPanes-right">
        <div class="splitPanes-right-box">
          <BannnerList></BannnerList>
        </div>
        
      </div>
    </div>
        
  </div>
</template>

<script>
import { topicParent,topicChild,addCategory,delCategory,fileUpload } from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import BannnerList from './bannerList'
export default {
  name: 'columnList',
  directives: { elDragDialog },
  components: { BannnerList },
  data() {
    return {
      topicParentData: [],
      topicChildData:{},
      isTopicChild:false,
      fishListPageLimit:10,
      total: 1,
      topicParentDataPage: {
        pageNum: 1,
        pageSize: 10,
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        name:'',
        introduce:'',
        orderNum:''
      },
      dialogRules: {
        name: [{ required: true, trigger: 'blur',message:'请输入名称' }],
        introduce: [{ required: true, trigger: 'blur',message:'请输入简介'  }],
        orderNum: [{ required: true, trigger: 'blur',message:'请输入排序'  }]
      },
      imgUploadSrc:'',
      isCollapse: false,
      
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.topicParent();
    
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key);
    },
    handleClose(key, keyPath) {
      console.log(key);
    },

    handleOpenChild(id){
      let timers = setTimeout(()=>{
        this.topicChild(id)
        clearTimeout(timers)
        timers = null
      },300)
      
    },
    aFun(){
      console.log(11111111111)
    },







    handleAvatarSuccess(res, file) {
      this.imgUploadSrc = res.data.all_url
      this.dialogData.iconUrl = res.data.short_url;
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
        this.dialogData.id = row.id
        this.dialogData.name = row.name
        this.dialogData.introduce = row.introduce
        this.dialogData.orderNum = row.orderNum
        this.dialogData.iconUrl = row.iconUrl
        this.imgUploadSrc = row.iconUrlAll
      }else{
        this.dialogData.id = ''
        this.dialogData.name = ''
        this.dialogData.introduce = ''
        this.dialogData.orderNum = ''
        this.dialogData.iconUrl = ''
        this.imgUploadSrc = ''
      }
    },
    searchBtn(){
      this.topicParentDataPage.pageNum = 1
      this.topicParent()
    },
    pageChange (p) {
      this.topicParentDataPage.pageNum = p
      this.topicParent()
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
    addManagerBtn(){
      
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          if(this.dialogData.iconUrl == ''){
            this.$message.error('请上传分类图片！');
            return
          }
          addCategory(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData.id = ''
              this.dialogData.name = ''
              this.dialogData.introduce = ''
              this.dialogData.orderNum = ''
              this.dialogData.iconUrl = ''
              this.imgUploadSrc = ''
              this.topicParent()
              this.$message({
                  type: 'success',
                  message: '添加成功!'
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
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
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
      delCategory(data).then(res => {
        if(res.code == 200){
              this.topicParent()
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

