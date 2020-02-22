<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
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
      <!-- <el-form-item label="是否完结:">
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
      </el-form-item> -->
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
    <draggable v-model="managerBookPageData" :move="getdata" @update="datadragEnd">
        
    <el-table :data="managerBookPageData" ref="multipleTable" tooltip-effect="dark" @selection-change="handleSelectionChange" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column align="center" label='#' :min-width="55">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="分类" prop='categoryName' align="center" :min-width="100"></el-table-column>
      <el-table-column label="书名" prop='name' align="center" :min-width="100"></el-table-column>
      <el-table-column label='封面图片' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <img :src="scope.row.coverImgUrlAll" style="width:100%;height:auto;">
            <img :src="scope.row.coverImgUrlAll" slot="reference" style="width:auto;height:80px;">
          </el-popover>
          
        </template>
      </el-table-column>
      <el-table-column label="作者" prop='author' :min-width="100"></el-table-column>
      <!-- <el-table-column label='简介' :min-width="110" align="center">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            title=""
            width="300"
            trigger="hover">
            <div >{{scope.row.introduction}}</div>
            <div slot="reference" style="width:90px;height:81px;line-height:27px;overflow: hidden;">{{scope.row.introduction}}</div>
          </el-popover>
          
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="字数" prop='typeNum' align="center" :min-width="110"></el-table-column> -->

      <!-- <el-table-column align="center" fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)" style="margin-left:10px;">编辑</el-button>
          <el-button type="danger" size="mini" @click="delConfirm(scope.row.id)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
</draggable>
    <el-pagination
        @current-change="pageChange"
        style="text-align:center;margin-top:3px"
        background
        layout="prev, pager, next"
        :page-size="userListPage.pageSize"
        :current-page="userListPage.pageNum"
        :total="total"
      ></el-pagination>
  </div>
</template>

<script>
import { managerBookPage,categoryList } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import draggable from 'vuedraggable'
export default {
  name: 'columnBookedit',
  directives: { elDragDialog },
  components: {
    draggable
  },
  data() {
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
      },
      categoryListPage:{
        pageNum: 1,
        pageSize: 100,
      },
      categoryListData:[],

      multipleSelection:[],
      
    }
  },
  computed: {

  },
  created() {
    this.managerBookPage();
    this.categoryList()
  },
  methods: {
    getdata (evt) {
      console.log(evt.draggedContext.element.id)
    },
    datadragEnd (evt) {
      console.log('拖动前的索引 :' + evt.oldIndex)
      console.log('拖动后的索引 :' + evt.newIndex)
      console.log(this.managerBookPageData)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    selectChange(val){
      this.$forceUpdate();
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

