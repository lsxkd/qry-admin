<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <div class="tableBoxs">
      <div class="tableBoxs-left">
        <div class="tableBoxs-left-header">已选({{classificationCategoryData.length}})</div>
        <div>
          <el-form size="small" inline>
            <!-- <el-form-item style="margin-bottom:-2px;">
                              <el-button size="mini" type="danger" >批量删除</el-button>
            </el-form-item>-->
            <el-form-item style="margin-bottom:-2px;float:right;">
              <el-button size="mini" type="cancle" @click="classificationCategoryPage()">取消</el-button>
              <el-button size="mini" type="primary" @click="saveBtns">保存</el-button>
            </el-form-item>
          </el-form>
          <div class="clear"></div>
        </div>
        <p class="tableBoxs-tips">提示：表格可拖动进行排序且所有操作只有在点击保存后才会生效。</p>
        <table
          class="table_detail table_detail_title"
          border="0"
          cellspacing="0"
          cellpadding="0"
          style="width:445px;"
        >
          <thead>
            <tr>
              <!-- <th colspan="1" rowspan="2">
                                <div class="tabbox" style="min-width:55px;">
                                  <el-checkbox :indeterminate="isIndeterminate"  v-model='checkAll' @change="handleCheckAllChange"></el-checkbox>
                                </div>
              </th>-->
              <th colspan="1" rowspan="2">
                <div class="tabbox" style="min-width:55px;">#</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="tabbox" style="min-width:100px;">名称</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="tabbox" style="min-width:110px;">图片</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="tabbox" style="min-width:100px;">简介</div>
              </th>
              <th colspan="1" rowspan="1">
                <div class="tabbox" style="min-width:80px;">操作</div>
              </th>
            </tr>
          </thead>
        </table>
        <div style="height: 1150px;overflow: hidden;overflow-y: auto;">
          <el-scrollbar style="height: 100%;overflow-x: hidden;max-height:1060px;">
            <table
              class="table_detail"
              border="0"
              cellspacing="0"
              cellpadding="0"
              style="width:415px;"
            >
              <draggable v-model="classificationCategoryData" :move="getdata" @update="datadragEnd">
                <tbody
                  style="width:100%;"
                  v-for="(item,indexs) in classificationCategoryData"
                  :key="indexs"
                >
                  <tr style="width:100%;">
                    <!-- <td><div class="tabbox" :SS="item.selects" style="min-width:55px;"><el-checkbox v-model="item.selects"  @change="checkBoxChange"></el-checkbox></div></td> -->
                    <td>
                      <div class="tabbox" style="min-width:55px;">{{indexs + 1}}</div>
                    </td>
                    <td>
                      <div class="tabbox" style="min-width:100px;">{{item.name}}</div>
                    </td>
                    <td>
                      <div class="tabbox" style="min-width:110px;">
                        <el-popover
                          placement="right"
                          title
                          width="300"
                          trigger="hover"
                          style="height:100%;display:inline-block;"
                        >
                          <img :src="item.iconUrl" style="width:100%;height:auto;" />
                          <img :src="item.iconUrl" slot="reference" style="width:auto;height:80px;" />
                        </el-popover>
                      </div>
                    </td>
                    <td>
                      <div class="tabbox" style="min-width:100px;">{{item.introduce}}</div>
                    </td>
                    <td>
                      <div class="tabbox" style="min-width:80px;">
                        <el-button type="danger" size="small" @click="delSelects(item)">删除</el-button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </draggable>
            </table>
          </el-scrollbar>
        </div>
      </div>
      <el-divider direction="vertical" style="height:100%;"></el-divider>

      <div class="tableBoxs-right">
        <div class="tableBoxs-left-header">待选</div>
        <el-form size="small" inline :model="classifiedsListPage">
          <el-form-item label="名称:">
            <el-input
              placeholder="名称"
              v-model.trim="classifiedsListPage.name"
              @keyup.enter.native="searchBtn"
              :style="{ width: '150px' }"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              icon="el-icon-search"
              size="mini"
              title="搜索"
              style="font-size: 16px"
              @click="searchBtnClass()"
            />
          </el-form-item>
        </el-form>
        <el-table
          :data="classifiedsList"
          element-loading-text="拼命加载中"
          border
          fit
          stripe
          highlight-current-row
        >
          <el-table-column align="center" label="#" :min-width="60">
            <template slot-scope="scope">{{scope.$index + 1}}</template>
          </el-table-column>
          <el-table-column label='创建时间' align="center" :min-width="160">
                          <template slot-scope="scope">
                            {{scope.row.createTime}}
                          </template>
          </el-table-column>
          <el-table-column label="名称" prop="name" align="center" :min-width="150"></el-table-column>
          <el-table-column label="图片" :min-width="110" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" title width="300" trigger="hover">
                <img :src="scope.row.iconUrlAll" style="width:100%;height:auto;" />
                <img :src="scope.row.iconUrlAll" slot="reference" style="width:auto;height:80px;" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="简介" prop="introduce" align="center" :min-width="150"></el-table-column>
          <!-- <el-table-column label="排序" prop='orderNum' :min-width="60"></el-table-column> -->
          <el-table-column align="center" fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="addSelects(scope.row)">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="pageChangeTwo"
          style="text-align:center;margin-top:3px"
          background
          layout="prev, pager, next"
          :page-size="fishListPageLimit"
          :current-page="classifiedsListPage.pageNum"
          :total="totalTwo"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  categoryList,
  classificationCategoryPage,
  classificationCategoryBatchSave
} from "@/api/category.js";
import moment from "moment";
import { mapState } from "vuex";
import elDragDialog from "@/directive/el-dragDialog"; // base on element-ui
import draggable from "vuedraggable";
import { getToken } from "@/utils/auth";
import {
  validatorColumnName,
  validatorOrderNum,
  validatorEncoded
} from "@/utils/validator";
export default {
  name: "classificationPageManEdit",
  directives: { elDragDialog },
  components: {
    draggable
  },
  props:{
    classificationId: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      categoryPage: [],
      total: 1,   

      classifiedsList: [],
      fishListPageLimit: 10,
      totalTwo: 1,
      classifiedsListPage: {
        pageNum: 1,
        pageSize: 10
      },

      classificationCategoryObj: {
        pageNum: 1,
        pageSize: 10,
        classificationId: "2"
      },
      classificationCategoryData: [],
      totalThree: 1,
      saveBacthPage:{
        categoryFks:[],
        classificationId:2
      },
    };
  },
  computed: {
    tokenData() {
      return getToken();
    }
  },
  watch: {
    classificationId(val){
      console.log(val)
      this.classificationCategoryObj.classificationId = val
      this.classificationCategoryPage();
    },
    topicBookPageData(val){
      console.log(val)
    }
  },
  created() {
    this.getclassifiedsList();
    this.classificationCategoryPage();
  },
  methods: {
    getdata(evt) {
      // console.log(evt.draggedContext.element.id)
    },
    datadragEnd(evt) {
      // console.log('拖动前的索引 :' + evt.oldIndex)
      // console.log('拖动后的索引 :' + evt.newIndex)
      this.saveBacthPage.categoryFks = []
      this.classificationCategoryData.map((item,index) => {
        let newArr = {}
        newArr.categoryId = item.id
        newArr.orderNum = index
        this.saveBacthPage.categoryFks.push(newArr)
      })
    },
    saveBtns() {
      this.classificationCategoryBatchSave()
    },
    classificationCategoryBatchSave(){
      this.saveBacthPage.categoryFks = []
      this.classificationCategoryData.map((item,index) => {
        let newArr = {}
        newArr.categoryId = item.id
        newArr.orderNum = index
        this.saveBacthPage.categoryFks.push(newArr)
      })
      this.saveBacthPage.classificationId = this.classificationId
      this.saveBacthPage.categoryFks = this.unique(this.saveBacthPage.categoryFks,'categoryId')
      console.log(this.saveBacthPage)
      classificationCategoryBatchSave(this.saveBacthPage).then(res => {
        if(res.code == 200){
          // this.classificationCategoryPage()
          this.$message({
              type: 'success',
              message: '操作成功!'
          });
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    delSelects(val){
      console.log(val)
      this.classificationCategoryData.map((item,index) => {
        if(item.id == val.id){
          console.log(val.id)
          this.classificationCategoryData.splice(index, 1)
        }
      })
    },
    addSelects(row){
      let lengthOld = this.classificationCategoryData.length
      // console.log(lengthOld)
      this.classificationCategoryData.push(row)
      this.classificationCategoryData = this.unique(this.classificationCategoryData,'id')
      // console.log(this.topicBookPageData.length)
      if(this.classificationCategoryData.length == lengthOld){
        this.$message({
          message: '已存在！',
          type: 'warning'
        });
      }
    },
    unique(arr,id) {//对象数组的去重
      const res = new Map();
      return arr.filter((arrs) => !res.has(arrs[id]) && res.set(arrs[id], 1))
    },
    classificationCategoryPage() {

      this.classificationCategoryObj.classificationId = this.classificationId
      classificationCategoryPage(this.classificationCategoryObj).then(res => {
        this.flagTime = true
        // console.log(res.data)
        this.classificationCategoryData = res.data.list;
        this.totalThree = res.data.total;
      });
    },
    searchBtnClass() {
      this.classifiedsListPage.pageNum = 1;
      this.getclassifiedsList();
    },
    pageChangeTwo(p) {
      this.classifiedsListPage.pageNum = p;
      this.getclassifiedsList();
    },
    getclassifiedsList() {
      if (!this.classifiedsListPage.name) {
        delete this.classifiedsListPage.name;
      }
      categoryList(this.classifiedsListPage).then(res => {
        // console.log(res.data)
        this.classifiedsList = res.data.list;
        this.totalTwo = res.data.total;
      });
    },
  },
  filters: {
    initTime(v) {
      return moment(v).format("YYYY-MM-DD HH:hh:ss");
    }
  }
};
</script>


<style>
.el-scrollbar__wrap {
  overflow-x: hidden;
}
.el-divider--vertical {
  height: auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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
.app-container {
  display: flex;
  flex-direction: column;
}
.classification-left-title {
  /* padding:20px 0; */
}
.classification-box-btn {
  text-align: right;
  margin: 10px auto 20px auto;
}


.tableBoxs {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.clear {
  clear: both;
}
.tableBoxs-left {
  width: 455px;
}
.tableBoxs-right {
  width: calc(100% - 470px);
}
.tableBoxs-left-header {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  padding: 0 20px;
  text-align: center;
  background: #ebf8f2;
  color: #fff;
  border-radius: 3px 3px 0 0;
  color: #42b983;
  font-weight: 600;
  margin-bottom: 20px;
}
.tableBoxs-tips {
  font-size: 12px;
  color: #5e6d82;
  margin-bottom: 10px;
  margin-top: 10px;
}
.table_detail {
  border: 0;
  border-spacing: 0;
}
.table_detail thead {
  border: 0;
  /* background:#F5F7FA; */
  padding: 0 20px;
}
.table_detail thead tr {
  border-left: 1px solid #ebeef5;
}
.table_detail thead th {
  border: 0;
  height: 50px;
  text-align: left;
  border-top: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  vertical-align: middle;
}
.table_detail tbody tr {
  cursor: pointer;
  border-left: 1px solid #ebeef5;
}
.table_detail tbody td {
  border: 0;
  height: 50px;
  text-align: left;
  /* border-top: 1px solid #EBEEF5; */
  border-right: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
  vertical-align: middle;
}
.table_detail_title .tabbox {
  height: 35px;
  padding: 10px 5px;
}
.tabbox {
  color: #6f7374;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  /* min-width: 110px; */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 106px;
  line-height: 22px;
  padding: 10px 5px;
}
</style>
