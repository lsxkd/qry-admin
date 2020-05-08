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
        <el-form-item style="margin-bottom: 20px;" label-width="160px" label="VIP套餐名称:" prop="vipComposeName">
          <el-input class="article-textarea" placeholder="请输入VIP套餐名称" style="width:215px;" maxlength="20" v-model.trim="dialogData.vipComposeName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="160px" label="原价:" prop="orgAmount">
          <el-input class="article-textarea"  placeholder="请输入原价" style="width:215px;" maxlength="9" @blur="changeMonthNum(dialogData.orgAmount)" @input.native="changeMonthNum(dialogData.orgAmount)" v-model.trim="dialogData.orgAmount"></el-input>
        </el-form-item>
        <el-form-item label="是否优惠:" label-width="160px" prop="discount">
          <el-select v-model="dialogData.discount" placeholder="请选择" clearable>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
      </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="160px" label="优惠价:" prop="disAmount" v-if="dialogData.discount == 1">
          <el-input class="article-textarea" placeholder="请输入优惠价" style="width:215px;" maxlength="9" @blur="changeMonthNumTwo(dialogData.disAmount)" @input.native="changeMonthNumTwo(dialogData.disAmount)"  v-model.trim="dialogData.disAmount"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="160px" label="有效期时长(单位月):" prop="monthNum">
          <el-input class="article-textarea"  placeholder="请输入有效期时长" style="width:215px;" maxlength="4" @blur="handleInput(dialogData.monthNum)" @input.native="handleInput(dialogData.monthNum)"  v-model.trim="dialogData.monthNum"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="160px" label="排序:" prop="orderNum">
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
      </el-form-item>
      
      <el-form-item label="注册时间">
        <el-date-picker
          v-model="registrationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="searchBtn"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
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
      </el-form-item> -->
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" @click="openEditOrAdd('add')" >添加</el-button>
      </el-form-item>
    </el-form>
    
    <el-table :data="userList" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
      <el-table-column align="center" label='#' :min-width="60">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="排序" prop='orderNum' align="center" :min-width="60"></el-table-column>
      <el-table-column label='创建时间' align="center" :min-width="160">
        <template slot-scope="scope">
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="VIP套餐名称" align="center" prop='vipComposeName' :min-width="150"></el-table-column>
      <el-table-column label="原价" prop='orgAmount' :min-width="110"></el-table-column>
      <el-table-column label="是否优惠" align="center" :min-width="80">
        <template slot-scope="scope">
          <span v-if="scope.row.discount == 0">否</span>
          <span v-if="scope.row.discount == 1">是</span>
        </template>
      </el-table-column>
      <el-table-column label="优惠价" prop='disAmount' align="center" :min-width="110"></el-table-column>
      <el-table-column label="有效期时长(单位月)" align="center" prop='monthNum' :min-width="100"></el-table-column>
      
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
import { vipComposeList,addVipCompose,delVipCompose } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { validatorOrderNum,validatorColumnName } from '@/utils/validator'
export default {
  name: 'vipComposeList',
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
        vipComposeName:'',
        orgAmount:'',
        discount:'',
        disAmount:'',
        monthNum:'',
        orderNum:''
      },
      dialogRules: {
        vipComposeName: [{ required: true, trigger: 'blur',validator: validatorColumnName }],
        orgAmount: [{ required: true, trigger: 'blur',message:'请输入原价'  }],
        discount: [{ required: true, trigger: 'blur',message:'请选择是否优惠' }],
        disAmount: [{ required: true, trigger: 'blur',message:'请输入优惠价格' }],
        monthNum: [{ required: true, trigger: 'blur',message:'请输入有效期时长' }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum }],
      },
      dialogTitle:'添加'
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleInput(e) {
      this.dialogData.monthNum = e.replace(/[^\d]/g,'');
    },
    changeMonthNumTwo(val) {
        val = val.replace(/(^\s*)|(\s*$)/g, "")
        if(!val) {
            this.a = "";
            return
        }
        let reg = /[^\d.]/g

        // 只能是数字和小数点，不能是其他输入
        val = val.replace(reg, "")

        // 保证第一位只能是数字，不能是点
        val = val.replace(/^\./g, "");
        // 小数只能出现1位
        val = val.replace(".", "$#$").replace(/\./g, "0").replace("$#$", ".");
        // 小数点后面保留2位
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        this.dialogData.disAmount = val;
    },
    changeMonthNum(val) {
        val = val.replace(/(^\s*)|(\s*$)/g, "")
        if(!val) {
            this.a = "";
            return
        }
        let reg = /[^\d.]/g

        // 只能是数字和小数点，不能是其他输入
        val = val.replace(reg, "")

        // 保证第一位只能是数字，不能是点
        val = val.replace(/^\./g, "");
        // 小数只能出现1位
        val = val.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        // 小数点后面保留2位
        val = val.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        this.dialogData.orgAmount = val;
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      if(flag == 'edit'){
        this.dialogTitle = "编辑"
        this.dialogData.id = row.id
        this.dialogData.vipComposeName = row.vipComposeName
        this.dialogData.disAmount = row.disAmount
        this.dialogData.orgAmount = row.orgAmount
        this.dialogData.discount = String(row.discount)
        this.dialogData.orderNum = row.orderNum
        this.dialogData.monthNum = row.monthNum
      }else{
        this.dialogTitle = "添加"
        delete this.dialogData.id 
        this.dialogData.vipComposeName = ''
        this.dialogData.disAmount = ''
        this.dialogData.orgAmount = ''
        this.dialogData.discount = ''
        this.dialogData.orderNum = ''
        this.dialogData.monthNum = ''
      }
    },
    searchBtn(){
      this.getUserList()
    },
    pageChange (p) {
      this.userListPage.pageNum = p
      this.getUserList()
    },
    getUserList() {
      this.listLoading = true
      if(!this.userListPage.name){
        delete this.userListPage.name
      }
      vipComposeList(this.userListPage).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
      })
    },
    addManagerBtn(){
      if(this.dialogData.discount != 1){
        delete this.dialogData.disAmount
      }
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          addVipCompose(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.getUserList()
              this.$message({
                  type: 'success',
                  message: this.dialogTitle + '成功!'
              });
              this.dialogData = {
                vipComposeName:'',
                orgAmount:'',
                discount:'',
                disAmount:'',
                monthNum:'',
                orderNum:''
              }
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
      delVipCompose(data).then(res => {
        if(res.code == 200){
              this.getUserList()
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


