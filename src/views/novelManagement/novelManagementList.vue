<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="添加/编辑小说"
        :visible.sync="dialogTableVisible"
        v-if="dialogTableVisible"
        width='70%'
      >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules"  ref="dialogData">
        <el-row>
          <el-col :sm="24" :md="12">
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="书名:" prop="name">
              <el-input class="article-textarea" placeholder="请输入书名" maxlength="20" style="width:215px;" v-model.trim="dialogData.name"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="简介:" prop="introduction">
              <el-input type="textarea"  :rows="2"  placeholder="请输入简介" maxlength="1000" style="width:215px;"  v-model.trim="dialogData.introduction"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="作者:" prop="author">
              <el-input class="article-textarea" placeholder="请输入作者" maxlength="30" style="width:215px;"  v-model.trim="dialogData.author"></el-input>
            </el-form-item>
            
            <el-form-item style="margin-bottom: 10px;" label-width="120px" label="封面图片:" prop="coverImgUrl">
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
            <el-form-item style="margin-bottom: 20px;margin-top:20px;" label-width="120px" label="字数:"  prop="typeNum">
              <el-input class="article-textarea" placeholder="请输入字数" maxlength="9" style="width:215px;" @blur="handleInput(dialogData.typeNum)" @input.native="handleInput(dialogData.typeNum)"  v-model.trim="dialogData.typeNum"></el-input>
            </el-form-item>
            
          </el-col>
          <el-col :sm="24" :md="12">
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="分类:" prop="categoryId">
              <el-select v-model="dialogData.categoryId" filterable remote reserve-keyword :remote-method="remoteMethod"  placeholder="请选择" style="width:215px;">
                <el-option
                  v-for="item in categoryListData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="是否完结:" prop="complete">
              <el-select v-model="dialogData.complete" clearable placeholder="请选择" style="width:215px;">
                <el-option label="否" :value="0"> </el-option>
                <el-option label="是" :value="1"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="是否免费:" prop="free">
              <el-select v-model="dialogData.free" clearable placeholder="请选择" style="width:215px;">
                <el-option label="否" :value="0"> </el-option>
                <el-option label="是" :value="1"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="标签:" prop="tagsData">
              
              <el-select v-model="dialogData.tagsData" @change="selectChange" multiple filterable remote reserve-keyword :remote-method="remoteMethod"  placeholder="请选择" style="width:215px;">
                <el-option
                  v-for="item in tagListData"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="评分:"  prop="score">
              <el-input class="article-textarea" placeholder="请输入评分" maxlength="3" style="width:215px;" @blur="changeScore(dialogData.score)"  @input.native="changeScore(dialogData.score)"  v-model.trim="dialogData.score"></el-input>
            </el-form-item>
            
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="收藏数量:" prop="collectionNum">
              <el-input class="article-textarea" placeholder="请输入收藏数量" maxlength="9" style="width:215px;" @blur="handleInputColloge(dialogData.collectionNum)" @input.native="handleInputColloge(dialogData.collectionNum)"  v-model.trim="dialogData.collectionNum"></el-input>
            </el-form-item>
            <el-form-item style="margin-bottom: 20px;" label-width="120px" label="评论数:" prop="commentNum">
              <el-input class="article-textarea" placeholder="请输入评论数" maxlength="9" style="width:215px;" @blur="handleInputCommentNum(dialogData.commentNum)" @input.native="handleInputCommentNum(dialogData.commentNum)" v-model.trim="dialogData.commentNum"></el-input>
            </el-form-item>
            
            <el-form-item style="margin-bottom: 20px;" label-width="120px"  label="总推荐(点击量):" prop="readNum">
              <el-input class="article-textarea" placeholder="请输入总推荐(点击量)" maxlength="9" style="width:215px;" @blur="handleInputClickNum(dialogData.clickNum)"  @input.native="handleInputClickNum(dialogData.clickNum)"  v-model.trim="dialogData.clickNum"></el-input>
            </el-form-item>
            <!-- <el-form-item style="margin-bottom: 20px;" label-width="120px" label="创建日期:" prop="createTime">
              <el-date-picker
                v-model="dialogData.createTime"
                type="date"
                placeholder="选择日期" style="width:215px;">
              </el-date-picker>
            </el-form-item> -->
          </el-col>
        </el-row>
        
        
        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="managerBookSave">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div>
      <el-form  size="small" inline style="margin-bottom:15px;float:right;">        
        <el-form-item label="app是否展示会员书籍:" >
          <el-switch
            v-model="vipEnable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value='0'
            active-text="开启"
            inactive-text="关闭"
            @change="managerBookVipEnable">
          </el-switch>
        </el-form-item>
        <el-form-item >
          <el-button type="success" @click="managerBookPage" >刷新当前列表</el-button>
          <el-button type="primary" @click="openEditOrAdd('add')" >添加小说</el-button>
        </el-form-item>
      </el-form>
      <div class="clear" style="clear:both;"></div>
    </div>
    <div>
      <el-form  size="small" inline :model="userListPage">
        <el-form-item label="书名:">
          <el-input placeholder="书名" v-model.trim="userListPage.name" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
        </el-form-item>
        <el-form-item label="分类:">
          <!-- <el-input placeholder="分类ID" v-model.trim="userListPage.categoryId" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable /> -->
          <el-select v-model="userListPage.categoryId" filterable  clearable placeholder="请选择" style="width:150px;">
            <el-option
              v-for="item in categoryListData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否完结:">
          <el-select v-model="userListPage.complete" clearable placeholder="请选择">
            <el-option label="否" value="0"> </el-option>
            <el-option label="是" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否免费:">
          <el-select v-model="userListPage.free" clearable placeholder="请选择">
            <el-option label="否" value="0"> </el-option>
            <el-option label="是" value="1"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否是VIP可看:">
          <el-select v-model="userListPage.vip" clearable placeholder="请选择">
            <el-option label="否" value="0"> </el-option>
            <el-option label="是" value="1"> </el-option>
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
    </div>
    

    
    <el-table :data="managerBookPageData" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop='categoryName' align="center" :min-width="110"></el-table-column>
      <el-table-column label="书名" prop='name' align="center" :min-width="150"></el-table-column>
      <el-table-column label='封面图片' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <img :src="scope.row.coverImgUrlAll" @error="show_default_image" style="width:100%;height:auto;">
            <img :src="scope.row.coverImgUrlAll" @error="show_default_image" slot="reference" style="width:auto;height:80px;">
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label="作者" prop='author' :min-width="110"></el-table-column>
      
      <!-- <el-table-column label="简介" prop='introduction' :min-width="150"></el-table-column> -->
      <el-table-column label='简介' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <div >
              <!-- {{scope.row.introduction}} -->
              <p v-html="scope.row.introduction"></p>
            </div>
            <div slot="reference" style="width:90px;height:81px;line-height:27px;overflow: hidden;">
              <!-- {{scope.row.introduction}} -->
              <p v-html="scope.row.introduction"></p></div>
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label="字数" prop='typeNum' align="center" :min-width="110"></el-table-column>
      <el-table-column label="收藏数量" prop='collectionNum' align="center" :min-width="110"></el-table-column>
      <el-table-column label="评论数" prop='commentNum' align="center" :min-width="110"></el-table-column>
      <el-table-column label="总推荐(点击量)" prop='clickNum' align="center" :min-width="110"></el-table-column>
      <el-table-column label="评分" prop='score' align="center" :min-width="110"></el-table-column>
      <el-table-column label="标签" prop='tags' align="center" :min-width="110">
        <template slot-scope="scope" v-if="scope.row.tagList">
          <span  v-for="(em,indexEms) in scope.row.tagList" :key='indexEms'>
            {{em.tag}}
          </span>
          
        </template>
      </el-table-column>
      <el-table-column label="是否是Vip可看" align="center" :min-width="120">
        <template slot-scope="scope">
          <span v-if="scope.row.vip == 0">否</span>
          <span v-if="scope.row.vip == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否完结" align="center" :min-width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.complete == 0">否</span>
          <span v-if="scope.row.complete == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="是否免费" align="center" :min-width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.free == 0">否</span>
          <span v-if="scope.row.free == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label='创建时间' align="center" :min-width="160">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" label="操作" width="360">
        <template slot-scope="scope">
          <!-- <el-button type="success" size="small" @click="openRecharge(scope.row)">充值</el-button> -->
          <!-- <el-button type="primary" size="small">发行记录</el-button>managerBookVipSetting -->
          <el-button type="danger" size="mini" @click="managerBookClearCoverImg(scope.row.id)" style="margin-right:5px;">删除封面</el-button>
          <router-link class="link-type" :to="'/novelManagement/novelChapterList/'+scope.row.id+'?bookName=' + scope.row.name">
            <el-button type="success" size="mini" >章节列表</el-button>
          </router-link>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)" style="margin-left:5px;">编辑</el-button>
          <el-button type="danger" size="mini" @click="delConfirm(scope.row.id)"  style="margin-left:5px;">删除</el-button>
          <el-button type="warning" size="mini" v-show="scope.row.vip==0" @click="managerBookVipSetting(scope.row.id,1)" style="margin-left:5px;margin-top:5px;">设置为VIP可看</el-button>
          <el-button type="info" size="mini" v-show="scope.row.vip==1" @click="managerBookVipSetting(scope.row.id,0)"  style="margin-left:5px;margin-top:5px;">移除VIP可看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @current-change="pageChange"
        @size-change="handleSizeChange"
        style="text-align:center;margin-top:3px"
        background
        layout="sizes,prev, pager, next, jumper"
        :page-size="userListPage.pageSize"
        :page-sizes="[5, 6, 7, 8,9,10]"
        :current-page="userListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { managerBookPage,managerBookSave,managerBookDelete,fileUpload,categoryList,tagList,managerBookClearCoverImg,managerBookVipSetting,managerBookVipGet ,managerBookVipEnable} from '@/api/category.js';
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { getToken } from '@/utils/auth'
import { validatorColumnName,validatorOrderNum } from '@/utils/validator'
export default {
  name: 'novelManagementList',
  directives: { elDragDialog },
  data() {
    const validatorTagsData = (rule, value, callback) => {
      console.log(value)
      if (!value&&value.length <= 0) {
        callback(new Error('请选择标签'))
      } else {
        callback()
      }
    }
    return {
      managerBookPageData: [],
      total: 1,
      userListPage: {
        pageNum: 1,
        pageSize: 10,
        categoryId:'',
        complete:'',//是否完结:0否,1是
        free:'',//是否免费:0否,1是
        name:'',//书名
        vip:'',//是否是Vip
      },
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        name:'',
        author:'',
        categoryId:'',
        collectionNum:'',
        commentNum:'',
        complete:'',
        coverImgUrl:'',
        createTime:'',
        free:'',
        introduction:'',
        clickNum:'',
        score:'',
        tags:'',
        typeNum:'',
        tagsData:[],
        vip:"0",
      },
      
      dialogRules: {
        name: [{ required: true, trigger: 'blur',validator: validatorColumnName}],
        introduction: [{ required: true, trigger: 'blur',message:'请输入简介'  }],
        author: [{ required: true, trigger: 'blur',message:'请输入作者'  }],
        categoryId: [{ required: true, trigger: 'blur',message:'请选择分类'  }],
        free: [{ required: true, trigger: 'blur',message:'请选择是否免费'  }],
        complete: [{ required: true, trigger: 'blur',message:'请选择是否完结'  }],
        tags: [{ required: true, trigger: 'blur',message:'请选择标签'  }],
        tagsData:[{ required: true, trigger: 'blur',validator: validatorTagsData  }],
        coverImgUrl: [{ required: true, trigger: 'blur',message:'请上传封面'  }]
        
      },
      imgUploadSrc:'',
      categoryListPage:{
        pageNum: 1,
        pageSize: 100,
      },
      categoryListData:[],
      tagListPage:{
        pageNum: 1,
        pageSize: 100,
      },
      tagListData:[],
      // defaultImg:"../../assets/images/default_img_bg.png",
      defaultImg:'http://47.112.147.92:8080/novelImg/79ed79ef4fd.png',
      vipEnable:"1",//是否开启VIP:0否,1是
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    this.managerBookPage();
    this.categoryList()
    this.tagList()
    this.managerBookVipGet()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.userListPage.pageSize = val
      this.managerBookPage();
    },
    managerBookVipGet(){
      managerBookVipGet().then(res => {
        if(res.code == 200){   
          this.vipEnable = String(res.data)
        }else{
          this.$message.error(res.msg);
        }
        
      })
    },
    managerBookVipEnable(){
      const data = {
        vipEnable:this.vipEnable
      }
      managerBookVipEnable(data).then(res => {
        if(res.code == 200){   
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
        
      })
    },
    managerBookVipSetting(ids,vips){
      const data = {
        id:ids,
        vip:vips
      }
      managerBookVipSetting(data).then(res => {
        if(res.code == 200){  
          this.managerBookPage()    
          this.$message({
            type: 'success',
            message: '设置成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
        
      })
    },
    managerBookClearCoverImg(ids) {
      const data = {
        id:ids
      }
      managerBookClearCoverImg(data).then(res => {
        if(res.code == 200){      
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
        
      })
    },
    handleInputClickNum(e){
      this.dialogData.clickNum = e.replace(/[^\d]/g,'');
    },
    handleInputCommentNum(e){
      this.dialogData.commentNum = e.replace(/[^\d]/g,'');
    },
    handleInputColloge(e) {
      this.dialogData.collectionNum = e.replace(/[^\d]/g,'');
    },
    handleInput(e) {
      this.dialogData.typeNum = e.replace(/[^\d]/g,'');
    },
    changeScore(val) {
        val = val.replace(/(^\s*)|(\s*$)/g, "")
        if(!val) {
            this.a = "";
            return
        }
        var reg = /[^\d.]/g

        // 只能是数字和小数点，不能是其他输入
        val = val.replace(reg, "")

        // 保证第一位只能是数字，不能是点
        val = val.replace(/^\./g, "");
        // 小数只能出现1位
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        // 小数点后面保留2位
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        if(val>10){
          val = 10
        }
        this.dialogData.score = val;
    },
    show_default_image: function(event) {
      event.target.src = require("../../assets/images/default_img_bg.png")
    },
    selectChange(val){
      this.$forceUpdate();
    },
    tagList() {
      this.listLoading = true
      if(!this.tagListPage.tag){
        delete this.userListPage.tag
      }
      tagList(this.tagListPage).then(res => {
        // console.log(res.data)
        this.tagListData = res.data.list
        this.tagListData.map(item=>{
          item.label = item.tag
          item.value = item.id
        })
      })
    },
    remoteMethod(query){
      if (query !== '') {
        this.categoryListPage.name = query
        this.categoryList()
        
      }else{
        delete this.categoryListPage.name
        this.categoryList()
      }
      
    },
    categoryList() {  //分类
      this.listLoading = true
      if(!this.categoryListPage.name){
        delete this.categoryListPage.name
      }
      categoryList(this.categoryListPage).then(res => {
        // console.log(res.data)
        this.categoryListData = res.data.list
        this.categoryListData.map(item=>{
          item.label = item.name
          item.value = item.id
        })
        
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
      
      // delete this.dialogData.createTime
      if(flag == 'edit'){
        let rowData = JSON.parse(JSON.stringify(row))
        this.dialogData = rowData
        
        for(let key in this.dialogData){
          if(this.dialogData[key] == null){
            this.dialogData[key] = ''
          }
        }
        // let nArrs = []
        // if(this.dialogData.tagList&&this.dialogData.tagList.length>0){
        //   this.dialogData.tagList.map((item) => {
        //     nArrs.push(item.value)
        //   })
        // }
        this.dialogData.tagsData = []
        let newsArra = this.dialogData.tags
        if(newsArra&&newsArra.length>0){
          newsArra = newsArra.split(',')
          newsArra.map(item=>{
            this.dialogData.tagsData.push(Number(item))
          })
          // this.dialogData.tagsData = JSON.parse(JSON.stringify(this.dialogData.tagsData))
        }else{
          this.dialogData.tagsData = []
        }
        
        console.log(this.tagListData)
        console.log(this.dialogData.tagsData)
        this.imgUploadSrc = this.dialogData.coverImgUrlAll
      }else{
        
        delete this.dialogData.id
        for(let key in this.dialogData){
          this.dialogData[key] = ''
        }
        this.dialogData.tagsData = []
        this.imgUploadSrc = ''
        this.dialogData.vip = 0
      }
      
      this.dialogTableVisible = true
    },
    searchBtn(){
      this.userListPage.pageNum = 1
      this.managerBookPage()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.managerBookPage()
    },
    managerBookPage() {
      this.listLoading = true
      if(!this.userListPage.name){
        delete this.userListPage.name
      }
      managerBookPage(this.userListPage).then(res => {
        this.managerBookPageData = res.data.list
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
          let arrs = this.dialogData.tagsData
          this.dialogData.tags = arrs.join(",")
          // return 
          managerBookSave(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              
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
      managerBookDelete(data).then(res => {
        if(res.code == 200){
              this.managerBookPage()
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

