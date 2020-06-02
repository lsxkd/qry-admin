<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
      v-el-drag-dialog
      :title="dialogTitle"
      :visible.sync="dialogTableVisible"
      v-if="dialogTableVisible"
      width="500px"
    >
      <el-form class="form-container" :model="dialogData" :rules="dialogRules" ref="dialogData">
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="权重:" prop="ruleWeight" >
          <el-input class="article-textarea" placeholder="请输入权重" maxlength="30" style="width:215px;" v-model.trim="dialogData.ruleWeight" ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="100px" label="标签:" prop="dictCode">
          <!-- <el-input class="article-textarea"  placeholder="请选择标签"  maxlength="20" style="width:215px;" v-model.trim="dialogData.dictCode" ></el-input> -->
          <el-select
                v-model="tagValue"
                multiple
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="remoteMethod"
                :loading="loading" style="width:215px;"
                @change="changeTag">
                <el-option
                v-for="item in tagListData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <!-- <el-form-item style="margin-bottom: 20px;" label-width="100px" label="是否启用:">
          <el-radio v-model="dialogData.enable" :label="1" border>启用</el-radio>
          <el-radio v-model="dialogData.enable" :label="0" border>停用</el-radio>
        </el-form-item>-->
        <div style="text-align:center;">
          <el-button type="cancle" @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="saveBtns">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <div class="tableBoxs">
      <div class="tableBoxs-left" style="width:48%;">
        <div class="tableBoxs-left-header">已选({{activityConfigPageData.length}})</div>
        <!-- <div>
          <el-form size="small" inline>
            <el-form-item style="margin-bottom:-2px;float:right;">
              <el-button size="mini" type="cancle" @click="activityConfigPage()">取消</el-button>
              <el-button size="mini" type="primary" @click="saveBtns">保存</el-button>
            </el-form-item>
          </el-form>
          <div class="clear"></div>
        </div> -->
        <!-- <p class="tableBoxs-tips">提示：表格可拖动进行排序且所有操作只有在点击保存后才会生效。</p> -->

        <div style="height: 1150px;overflow: hidden;overflow-y: auto;">
          <el-scrollbar style="height: 100%;overflow-x: hidden;max-height:1060px;width:100%;">
            <el-table
                :data="activityConfigPageData"
                element-loading-text="拼命加载中"
                border
                fit
                stripe
                highlight-current-row
                >
              <el-table-column align="center" label="#" :min-width="60">
                <template slot-scope="scope">{{scope.$index + 1}}</template>
              </el-table-column>
              
              <el-table-column label="活动名称" prop="activityName" align="center" :min-width="150"></el-table-column>
              <el-table-column label="活动标题" prop="activityDetail" align="center" :min-width="150"></el-table-column>
              <el-table-column label="显示权重" prop="ruleWeight" align="center" :min-width="150"></el-table-column>
              <el-table-column label="活动封面" :min-width="120" align="center">
                <template slot-scope="scope">
                  <el-popover placement="right" title width="300" trigger="hover">
                    <img :src="hostPath + scope.row.coverImgUrl" style="width:100%;height:auto;" />
                    <img :src="hostPath + scope.row.coverImgUrl" slot="reference" style="max-width:100px;max-height:80px;display:block;margin:0 auto;" />
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="是否生效" :min-width="110" align="center">
                    <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.effectiveState == 0">未生效</el-tag>
                    <el-tag type="success" v-if="scope.row.effectiveState == 1">已生效</el-tag>     
                    </template>
                </el-table-column>
              <el-table-column label="创建时间" align="center" :min-width="160">
                <template slot-scope="scope">{{scope.row.createTime}}</template>
              </el-table-column>
              <!-- <el-table-column label="简介" prop="introduce" align="center" :min-width="150"></el-table-column> -->
              <!-- <el-table-column label="排序" prop='orderNum' :min-width="60"></el-table-column> -->
              <el-table-column align="center" fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <!-- <el-button type="primary" size="small" @click="addSelects(scope.row)">添加</el-button> -->
                  <el-button type="danger" size="small" @click="delConfirm(scope.row.activityConfigId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              @current-change="pageChange"
              style="text-align:center;margin-top:3px"
              background
              layout="prev, pager, next"
              :page-size="activityConfigPageObj.pageSize"
              :current-page="activityConfigPageObj.pageNum"
              :total="total"
            ></el-pagination>
          </el-scrollbar>
        </div>
      </div>
      <el-divider direction="vertical" style="height:100%;"></el-divider>
      <div class="tableBoxs-right" style="width:48%;">
        <div class="tableBoxs-left-header">待选</div>
        <el-form size="small" inline :model="activityPageObj">
          <el-form-item label="名称:">
            <el-input
              placeholder="名称"
              v-model.trim="activityPageObj.activityName"
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
          
          <el-table-column label="活动名称" prop="activityName" align="center" :min-width="150"></el-table-column>
          <el-table-column label="活动标题" prop="activityDetail" align="center" :min-width="150"></el-table-column>
          <el-table-column label="活动封面" :min-width="120" align="center">
            <template slot-scope="scope">
              <el-popover placement="right" title width="300" trigger="hover">
                <img :src="scope.row.coverImgUrlAll" style="width:100%;height:auto;" />
                <img
                  :src="scope.row.coverImgUrlAll"
                  slot="reference"
                  style="max-width:100px;max-height:80px;display:block;margin:0 auto;"
                />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="是否过期" :min-width="110" align="center">
                <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.expireState == 1">未过期</el-tag>
                <el-tag type="danger" v-if="scope.row.expireState == 0">已过期</el-tag>     
                </template>
            </el-table-column>
          <el-table-column label="创建时间" align="center" :min-width="160">
            <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <!-- <el-table-column label="简介" prop="introduce" align="center" :min-width="150"></el-table-column> -->
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
          :current-page="activityPageObj.pageNum"
          :total="totalTwo"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  activityPage,
  activityConfigPage,
  activityConfigSaveOrUpdate,
  activityConfigDelete,
  tagList
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
  props: {
    showPosition: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialogTitle: "添加",
      dialogData: {
        showPosition: 2,
        activityId: "",
        ruleWeight: "",
        targets: ""
      },
      dialogTableVisible:false,
      dialogRules: {
        ruleWeight: [
          { required: true, trigger: "blur", validator: validatorColumnName }
        ],
        targets: [
          { required: true, trigger: "blur", validator: validatorEncoded }
        ]
      },
      categoryPage: [],
      total: 1,

      classifiedsList: [],
      fishListPageLimit: 10,
      totalTwo: 1,
      activityPageObj: {
        pageNum: 1,
        pageSize: 10
      },
        total:1,
      activityConfigPageObj: {
        pageNum: 1,
        pageSize: 10,
        showPosition: "2"
      },
      activityConfigPageData: [],
      totalThree: 1,
      saveBacthPage: {
        showPosition: 2,
        activityId: "",
        ruleWeight: "",
        targets: ""
      },
      tagListPage:{
          pageNum: 1,
        pageSize: 100,
      },
      tagListData:[],
      tagValue:[],
      loading: false,
      hostPath:'',
    };
  },
  computed: {
    tokenData() {
      return getToken();
    }
  },
  watch: {
    classificationId(val) {
      this.activityConfigPageObj.showPosition = val;
      this.activityConfigPage();
    },
    topicBookPageData(val) {
      console.log(val);
    }
  },
  created() {
    this.activityPage();
    this.activityConfigPage();
    this.tagList()
    this.hostPath = localStorage.getItem("hostPath");
  },
  methods: {
    changeTag(){
        console.log(this.tagValue)
    },
    remoteMethod(query) {
        console.log(query)
        if (query !== '') {
            this.loading = true;
            this.tagListPage.pageNum = 1
            this.tagList(query)
        } else {
            this.tagListData = [];
        }
    },
    pageChangeTagList (p) {
      this.tagListPage.pageNum = p
      this.tagList()
    },
    tagList(query) {
      this.listLoading = true
      this.tagListPage.tag = query
      if(!this.tagListPage.tag){
        delete this.tagListPage.tag
      }
      tagList(this.tagListPage).then(res => {
        // console.log(res.data)
        this.loading = false;
        this.tagListData = res.data.list
        this.totalTagList = res.data.total
        this.tagListData.map(item => {
            item.value = item.id
            item.label = item.tag
        });
        
      })
    },
    saveBtns() {
      this.activityConfigSaveOrUpdate();
    },
    activityConfigSaveOrUpdate() {
        this.dialogData.targets = this.tagValue.toString()
        // console.log(this.tagValue.toString())
      activityConfigSaveOrUpdate(this.dialogData).then(res => {
        if (res.code == 200) {
          this.activityConfigPage()
          this.dialogTableVisible = false
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    delConfirm(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.activityConfigDelete(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    activityConfigDelete(ids){
        const data= {
            id:ids
        }
        activityConfigDelete(data).then(res => {
            if (res.code == 200) {
                this.activityConfigPage()
                this.$message({
                    type: "success",
                    message: "删除成功!"
                });
            } else {
                this.$message.error(res.msg);
            }
        });
    },
    addSelects(row) {
      this.dialogTableVisible = true
      this.dialogData.showPosition = this.showPosition
      this.dialogData.activityId = row.id
    },
    unique(arr, id) {
      //对象数组的去重
      const res = new Map();
      return arr.filter(arrs => !res.has(arrs[id]) && res.set(arrs[id], 1));
    },
    pageChange(p) {
      this.activityConfigPageObj.pageNum = p;
      this.activityConfigPage();
    },
    activityConfigPage() {
      this.activityConfigPageObj.showPosition = this.showPosition;
      activityConfigPage(this.activityConfigPageObj).then(res => {
        this.activityConfigPageData = res.data.list;
        this.total = res.data.total;
      });
    },
    searchBtnClass() {
      this.activityPageObj.pageNum = 1;
      this.activityPage();
    },
    pageChangeTwo(p) {
      this.activityPageObj.pageNum = p;
      this.activityPage();
    },
    activityPage() {
      if (!this.activityPageObj.name) {
        delete this.activityPageObj.name;
      }
      activityPage(this.activityPageObj).then(res => {
        this.classifiedsList = res.data.list;
        this.totalTwo = res.data.total;
      });
    }
  },
  filters: {
    initTime(v) {
      return moment(v).format("YYYY-MM-DD HH:hh:ss");
    }
  }
};
</script>


<style>
.el-select-dropdown__list{
    padding:6px 0 20px 0;
}
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
