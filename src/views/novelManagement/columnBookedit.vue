<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <div class="tableBoxs">
      <div class="tableBoxs-left">
        <div class="tableBoxs-left-header">
          已选({{topicBookPageData.length}})
        </div>
        <div>
          <el-form  size="small" inline >
            <!-- <el-form-item style="margin-bottom:-2px;">
              <el-button size="mini" type="danger" >批量删除</el-button>
            </el-form-item> -->
            <el-form-item style="margin-bottom:-2px;float:right;">
              <el-button size="mini" type="cancle" @click="topicBookPage()">取消</el-button>
              <el-button size="mini" type="primary" @click="topicBookSaveBacth">保存</el-button>
            </el-form-item>
          </el-form>
          <div class="clear"></div>
        </div>
        <p class="tableBoxs-tips">提示：表格可拖动进行排序且所有操作只有在点击保存后才会生效。</p>
        <table class="table_detail table_detail_title" border="0" cellspacing="0" cellpadding="0" style="width:445px;"> 
          <thead>
            <tr >
              <!-- <th colspan="1" rowspan="2">
                <div class="tabbox" style="min-width:55px;">
                  <el-checkbox :indeterminate="isIndeterminate"  v-model='checkAll' @change="handleCheckAllChange"></el-checkbox>
                </div>
              </th> -->
              <th colspan="1" rowspan="2"><div class="tabbox" style="min-width:55px;">#</div></th>
              <th colspan="1" rowspan="1"><div class="tabbox" style="min-width:100px;">书名</div></th>
              <th colspan="1" rowspan="1"><div class="tabbox" style="min-width:110px;">封面图片</div></th>
              <th colspan="1" rowspan="1"><div class="tabbox" style="min-width:100px;">作者</div></th>
              <th colspan="1" rowspan="1"><div class="tabbox" style="min-width:80px;">操作</div></th>
            </tr>
          </thead>
        </table>
        <div style="height: 1150px;overflow: hidden;overflow-y: auto;">
          <el-scrollbar style="height: 100%;overflow-x: hidden;">
            <table class="table_detail" border="0" cellspacing="0" cellpadding="0" style="width:415px;"> 
              <draggable v-model="topicBookPageData" :move="getdata" @update="datadragEnd">
                <tbody style="width:100%;" v-for="(item,indexs) in topicBookPageData" :key="indexs">
                  <tr style="width:100%;">
                    <!-- <td><div class="tabbox" :SS="item.selects" style="min-width:55px;"><el-checkbox v-model="item.selects"  @change="checkBoxChange"></el-checkbox></div></td> -->
                    <td><div class="tabbox" style="min-width:55px;">{{indexs + 1}}</div></td>
                    <td><div class="tabbox" style="min-width:100px;">{{item.name}}</div></td>
                    <td>
                      <div class="tabbox" style="min-width:110px;">
                        <el-popover
                          placement="right"
                          title=""
                          width="300"
                          trigger="hover" style="height:100%;display:inline-block;">
                          <img :src="item.coverImgUrlAll" style="width:100%;height:auto;">
                          <img :src="item.coverImgUrlAll" slot="reference" style="width:auto;height:80px;">
                        </el-popover>
                      </div>
                    </td>
                    <td><div class="tabbox" style="min-width:100px;">{{item.author}}</div></td>
                    <td><div class="tabbox" style="min-width:80px;"><el-button type="danger" size="small" @click="delSelects(item)">删除</el-button></div></td>
                  </tr>
                  
                </tbody>
              </draggable>
            </table>
          </el-scrollbar>
        </div>
      </div>
      <el-divider direction="vertical" style="height:100%;"></el-divider>
      <div class="tableBoxs-right">
        <div class="tableBoxs-left-header">
          待选
        </div>
        <el-form  size="small" inline :model="userListPage">
          <el-form-item label="书名:">
            <el-input size="mini" placeholder="书名" v-model.trim="userListPage.name" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable />
          </el-form-item>
          <el-form-item label="分类:">
            <!-- <el-input placeholder="分类ID" v-model.trim="userListPage.categoryId" @keyup.enter.native="searchBtn" :style="{ width: '150px' }" clearable /> -->
            <el-select v-model="userListPage.categoryId" size="mini" filterable  clearable placeholder="请选择" style="width:150px;">
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
              style="font-size: 12px"
              @click="searchBtn()"
            />
          </el-form-item>
          <!-- <el-form-item style="margin-bottom:-2px;float:right;">
            <el-button size="mini" type="primary" >添加</el-button>
          </el-form-item> -->
        </el-form>
        <el-table :data="managerBookPageData" ref="multipleTable" tooltip-effect="dark"  element-loading-text="拼命加载中" border fit stripe highlight-current-row>
          <!-- @selection-change="handleSelectionChange" -->
          <!-- <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column> -->
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
          <el-table-column align="center" fixed="right" label="操作" width="80">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="addSelects(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
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
    </div>
    
    
    
    
  </div>
</template>

<script>
import { managerBookPage,categoryList,topicBookPage,topicBookSaveBacth, } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import draggable from 'vuedraggable'
export default {
  name: 'columnBookedit',
  directives: { elDragDialog },
  components: {
    draggable
  },
  props:{
    columnIds: {
      type: Number,
      default: ''
    },
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

      topicBookPagePage:{
        topicId:'',
      },
      topicBookPageData:[],
      checkAll:false,
      isIndeterminate:false,

      topicBookSaveBacthPage:[],
    }
  },
  computed: {

  },
  watch: {
    columnIds(val){
      console.log(val)
      this.topicBookPagePage.topicId = val
      this.topicBookPage();
    },
    topicBookPageData(val){
      console.log(1222222222222222222222222222)
      console.log(val)
    }
  },
  created() {
    this.managerBookPage();
    this.categoryList()
    this.topicBookPagePage.topicId = this.columnIds
    this.topicBookPage()
  },
  methods: {
    checkBoxChange(val,index){
      console.log(val)
      console.log(index)
      let numbers = 0
      this.topicBookPageData.map((item,index) => {
        if(item.selects){
          numbers++
        }
      })
      console.log(numbers)
      if(numbers == 0){
        this.isIndeterminate = false
        this.checkAll = false
      }else if(numbers>0&&numbers<this.topicBookPageData.length){
        this.isIndeterminate = true
        this.checkAll = false
      }else if(numbers == this.topicBookPageData.length){
        this.isIndeterminate = false
        this.checkAll = true
      }
      console.log(this.topicBookPageData) 
    },
    handleCheckAllChange(){
      console.log(1111)
      let numbers = 0
      this.topicBookPageData.map((item,index) => {
        if(item.selects){
          numbers++
        }
      })
      if(numbers<this.topicBookPageData.length){
        this.topicBookPageData.map((item,index) => {
          item.selects = true
        })
        this.isIndeterminate = false
        this.checkAll = true
      }else{
        this.topicBookPageData.map((item,index) => {
          item.selects = false
        })
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    topicBookSaveBacth(){
      // this.topicBookSaveBacthPage = this.topicBookPageData
      this.topicBookPageData.map((item,index) => {
        let newArr = {}
        newArr.bookId = item.id
        newArr.orderNum = index
        newArr.topicId = this.columnIds
        this.topicBookSaveBacthPage.push(newArr)
      })
      this.topicBookSaveBacthPage = this.unique(this.topicBookSaveBacthPage,'bookId')
      console.log(this.topicBookSaveBacthPage)
      topicBookSaveBacth(this.topicBookSaveBacthPage).then(res => {
        if(res.code == 200){
          this.topicBookPage()
          this.$message({
              type: 'success',
              message: '添加成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    unique(arr,id) {//对象数组的去重
      const res = new Map();
      return arr.filter((arrs) => !res.has(arrs[id]) && res.set(arrs[id], 1))
    },
    addSelects(row){
      let lengthOld = this.topicBookPageData.length
      // console.log(lengthOld)
      this.topicBookPageData.push(row)
      this.topicBookPageData = this.unique(this.topicBookPageData,'id')
      // console.log(this.topicBookPageData.length)
      if(this.topicBookPageData.length == lengthOld){
        this.$message({
          message: '已存在！',
          type: 'warning'
        });
      }
    },
    delSelectsBatch(){

    },
    delSelects(val){
      console.log(val)
      this.topicBookPageData.map((item,index) => {
        if(item.id == val.id){
          this.topicBookPageData.splice(index, 1)
        }
      })
    },
    
    topicBookPage() {

      topicBookPage(this.topicBookPagePage).then(res => {
        this.topicBookPageData = res.data
        this.topicBookPageData.map((item,index) => {
          item.selects = false
        })
      })
    },


    getdata (evt) {
      // console.log(evt.draggedContext.element.id)
    },
    datadragEnd (evt) {
      // console.log('拖动前的索引 :' + evt.oldIndex)
      // console.log('拖动后的索引 :' + evt.newIndex)
      this.topicBookSaveBacthPage = []
      this.topicBookPageData.map((item,index) => {
        // console.log(item.id)
        let newArr = {}
        newArr.bookId = item.id
        newArr.orderNum = index
        newArr.topicId = this.columnIds
        this.topicBookSaveBacthPage.push(newArr)
      })
      // console.log(this.topicBookPageData)
      // console.log(this.topicBookSaveBacthPage)

    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
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
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-divider--vertical{
  height:auto;
}
.tableBoxs{
  display: flex;
  justify-content: space-between;
  width:100%;
  
}
.clear{
  clear: both;
}
.tableBoxs-left{
  width:455px;
}
.tableBoxs-right{
  width:calc(100% - 470px);
}
.tableBoxs-left-header{
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  background:#ebf8f2;
  color: #fff;
  border-radius: 3px 3px 0 0;
  color: #42b983;
  font-weight: 600;
  margin-bottom:20px;
}
.tableBoxs-tips{
  font-size: 12px;
  color: #5e6d82;
  margin-bottom:10px;
  margin-top:10px;
}
.table_detail{
  border:0;
  border-spacing:0;
}
.table_detail thead{
  border:0;
  /* background:#F5F7FA; */
  padding:0 20px;
}
.table_detail thead tr{
  border-left: 1px solid #EBEEF5;
}
.table_detail thead th{
  border:0;
  height:50px;
  text-align: left;
  border-top: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  vertical-align: middle;
}
.table_detail tbody tr{
  cursor: pointer;
  border-left: 1px solid #EBEEF5;
}
.table_detail tbody td{
  border:0;
  height:50px;
  text-align: left;
  /* border-top: 1px solid #EBEEF5; */
  border-right: 1px solid #EBEEF5;
  border-bottom: 1px solid #EBEEF5;
  vertical-align: middle;
}
.table_detail_title .tabbox{
  height:35px;
  padding:10px 5px;
}
.tabbox{
  color: #6F7374;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  /* min-width: 110px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height:106px;
  line-height: 22px;
  padding:10px 5px;
  
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

