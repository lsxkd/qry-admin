<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div>
    <!-- <p class="warn-content" style="margin-bottom:30px;text-align:center;">
      <a href="javascript:;">书名：{{$route.query.bookName}} - 章节名称：{{managerBookContentData.chapter}}</a>
    </p> -->
    <div class="createPost-container">
    <el-form class="form-container" :model="postForm" :rules="rules" ref="postForm">

      <sticky :className="'sub-navbar white'" >
        <div style="display:flex;justify-content: space-between;padding-left:20px;">
          <span style="color: #42b983;font-weight: 600;">书名：{{$route.query.bookName}} - 章节名：{{managerBookContentData.chapter}}</span>
          <div>
            <el-button  style="margin-left: 10px;" type="success" @click.native="managerBookContentSave">保存</el-button>
            <el-button  type="warning" @click.native="cancelBtn">取消</el-button>
          </div>
        </div>
        
        
      </sticky>
      <div class="app-container">
        <div class="createPost-main-container">
          <el-row :gutter="20">
            <el-col :span="16" >
              <el-form-item label-width="90px" style="margin-bottom: 40px;" label="章节名:" prop="chapter">
                <!-- <MDinput name="chapter" v-model="postForm.chapter" required :maxlength="20">
                  章节名
                </MDinput> -->
                <el-input placeholder="请输入章节名" v-model="postForm.chapter" maxlength="20" :style="{ width: '100%' }" clearable />
              </el-form-item>
              <div class="postInfo-container">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label-width="90px" label="排序序号:" prop="orderNum" class="postInfo-container-item">
                      <el-input placeholder="排序序号" v-model.trim="postForm.orderNum"  :style="{ width: '150px' }" clearable />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label-width="90px" label="本章节字数:" class="postInfo-container-item">
                      <el-input placeholder="本章节字数"  v-model.trim="postForm.content.length" disabled :style="{ width: '200px' }" clearable />
                    </el-form-item>
                  </el-col>

                  <!-- <el-col :span="10">
                    <el-form-item label-width="80px" label="发布时间:" class="postInfo-container-item">
                      <el-date-picker v-model="postForm.display_time" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间">
                      </el-date-picker>
                    </el-form-item>
                  </el-col> -->

                  <!-- <el-col :span="6">
                    <el-form-item label-width="60px" label="重要性:" class="postInfo-container-item">
                      <el-rate style="margin-top:8px;" v-model="managerBookContentData.importance" :max='3' :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :low-threshold="1"
                        :high-threshold="3">
                      </el-rate>
                    </el-form-item>
                  </el-col> -->
                </el-row>
              </div>
              <div class="postInfo-container">
                <el-form-item style="margin-bottom: 40px;" label-width="90px" prop="content" label="章节内容:">
                  <!-- <el-input type="textarea" class="article-textarea" :rows="1" autosize placeholder="请输入内容" v-model="managerBookContentData.content">
                  </el-input> -->
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 10,maxRows:30}"
                    placeholder="请输入内容"
                    v-model="postForm.content">
                  </el-input>
                  <!-- <div v-html="managerBookContentData.content"></div> -->
                  <!-- <span class="word-counter" v-show="contentShortLength">{{contentShortLength}}字</span> -->
                  <p class="tips" style="color:#999;">注：标签 <input style="background:none;border:0;width:80px;color:#999;" v-model="spStr" disabled />代表首行缩进两个字符！</p>
                </el-form-item>
                
              </div>
            </el-col>
            <el-col :span="8">
              <div class="reader-con">
                <div  class="reader-con-box">
                  <h3 class="reader-con-title">{{postForm.chapter}}</h3>
                  <p class="reader-con-p" v-html="strReplace(postForm.content)"></p>
                </div>
              </div>
            </el-col>
          </el-row>

          

        </div>
      </div>
    </el-form>

  </div>
    
  </div>
</template>

<script>
import { managerBookContent,managerBookContentSave } from '@/api/category.js';
import moment from 'moment';
import { mapState,mapGetters } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'

import Sticky from '@/components/Sticky' // 粘性header组件
import MDinput from '@/components/MDinput'
import Multiselect from 'vue-multiselect'// 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css'// 多选框组件css
// import VoiceAnnouncements from './voiceAnnouncements'

import { validatorColumnName,validatorOrderNum } from '@/utils/validator'
export default {
  name: 'novelChapterContent',
  directives: { elDragDialog },
  components: {  MDinput,  Multiselect, Sticky, },
  data() {
    return {
      managerBookContentData: {},
      bookContentPage: {
        bookContentId: '',
        bookId: '',
      },
      postForm:{
        chapter: '',
        bookId:'',
        content: '', // 文章内容
        id:'',
        orderNum:'',
        typeNum:'',
      },
      rules: {
        chapter: [{ required: true, trigger: 'blur',message:'请输入章节名称'  }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum  }],
        content: [{ required: true, trigger: 'blur',message:'请输入内容' }],
      },
      spStr:'<sp></sp>',
    }
  },
  computed: {},
  mounted() {
  },
  created() {
    console.log(this.$route.params.id)
    this.bookContentPage.bookId = this.$route.params.id
    if(this.$route.query.flag == 'edit'){
      this.managerBookContent();
    }
    
  },
  methods: {
    cancelBtn(){
      this.$store.dispatch('delVisitedViews', this.$route);
      this.$router.go(-1);
    },
    managerBookContent() {
      // this.listLoading = true
      this.bookContentPage.bookContentId = this.$route.query.bookContentId
      this.bookContentPage.bookId =  this.$route.params.id
      managerBookContent(this.bookContentPage).then(res => {
        this.managerBookContentData = res.data
        this.postForm.chapter = this.managerBookContentData.chapter
        this.postForm.bookId = this.managerBookContentData.bookId
        this.postForm.content = this.managerBookContentData.content
        // this.postForm.content = this.managerBookContentData.content.replace(/<sp><\/sp>/ig, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
        this.postForm.orderNum = this.managerBookContentData.orderNum
        this.postForm.typeNum = this.managerBookContentData.typeNum
        
      })
    },
    managerBookContentSave(){
      this.postForm.id = this.$route.query.bookContentId
      this.postForm.bookId =  this.$route.params.id
      this.$refs.postForm.validate(valid => {
        if (valid) {
          
          managerBookContentSave(this.postForm).then(res => {
            if(res.code == 200){
              if(this.$route.query.flag == 'edit'){
                this.managerBookContent();
              }
              for(let key in this.postForm){
                this.postForm[key] = ''
              }
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
    strReplace(v){
      return v.replace(/<sp><\/sp>/ig, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
    },
  },
  filters: {
    initTime(v) {
      return moment(v).format('YYYY-MM-DD HH:hh:ss');
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
  textarea{
    line-height: 2 !important;
  }
 .reader-con {
    position: relative;
    background: #ecf8f2;
    height: 100%;
    transition: padding-top 0.2s;
    max-height:990px;
    overflow: hidden;
    overflow-y:auto;
    
  }
  .reader-con .reader-con-box {
      padding: 20px 15px 30px 15px;
      font-size: 20px;
      line-height: 2;
      color: #333333;
      
    }
    .reader-con .reader-con-box .reader-con-title {
        text-align: center;
      }
</style>

