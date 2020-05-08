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
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="名称:" prop="coinComposeName">
          <el-input class="article-textarea" placeholder="请输入名称" style="width:215px;" maxlength="20" v-model.trim="dialogData.coinComposeName"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="金额:" prop="amount">
          <el-input class="article-textarea"  placeholder="请输入金额" style="width:215px;" maxlength="9" @blur="changeMoney(dialogData.amount)" @input.native="changeMoney(dialogData.amount)"  v-model.trim="dialogData.amount"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="金币数量:" prop="coinNum">
          <el-input class="article-textarea" placeholder="请输入金币数量" style="width:215px;" maxlength="9" @blur="handleInput(dialogData.coinNum)" @input.native="handleInput(dialogData.coinNum)"  v-model.trim="dialogData.coinNum"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="赠送金币数量:" >
          <el-input class="article-textarea"  placeholder="请输入赠送金币数量" style="width:215px;" maxlength="9" @blur="handleInputCoinExtNum(dialogData.coinExtNum)" @input.native="handleInputCoinExtNum(dialogData.coinExtNum)"  v-model.trim="dialogData.coinExtNum"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 20px;" label-width="120px" label="排序:" prop="orderNum">
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
      </el-form-item> -->
      
      <!-- <el-form-item label="注册时间">
        <el-date-picker
          v-model="registrationTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          @keyup.enter.native="searchBtn"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </!--> 
      <!-- <el-form-item>
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
      <el-table-column label="排序" prop='orderNum' :min-width="60"></el-table-column>
      <el-table-column label='创建时间' :min-width="160">
        <template slot-scope="scope">
          <!-- {{scope.row.createDate | initTime}} -->
          {{scope.row.createTime}}
        </template>
      </el-table-column>
      <el-table-column label="名称" prop='coinComposeName' :min-width="150"></el-table-column>
      <el-table-column label="金额" prop='amount' :min-width="150"></el-table-column>
      <el-table-column label="金币数量" prop='coinNum' :min-width="150"></el-table-column>
      <el-table-column label="赠送金币数量" prop='coinExtNum' :min-width="150"></el-table-column>
      <!-- <el-table-column label="账户状态" :min-width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.status == 0">正常</span>
          <span v-if="scope.row.status == 1">禁用</span>
        </template>
      </el-table-column> -->
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
import { coincomposeList,addCoincompose,delCoincompose } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import { validatorColumnName,validatorOrderNum } from '@/utils/validator'
export default {
  name: 'rechareList',
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
        coinComposeName:'',
        amount:'',
        coinNum:'',
        coinExtNum:'',
        orderNum:'',
      },
      dialogRules: {
        coinComposeName: [{ required: true, trigger: 'blur',validator: validatorColumnName }],
        amount: [{ required: true, trigger: 'blur',message:'请输入金额'  }],
        coinNum: [{ required: true, trigger: 'blur',message:'请输入金币数量' }],
        orderNum: [{ required: true, trigger: 'blur',validator: validatorOrderNum }]
      },
      dialogTitle:'添加'
    }
  },
  created() {
    this.getUserList();
  },
  methods: {
    handleInputCoinExtNum(e){
      this.dialogData.coinExtNum = e.replace(/[^\d]/g,'');
    },
    handleInput(e) {
      this.dialogData.coinNum = e.replace(/[^\d]/g,'');
    },
    changeMoney(val) {
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
        this.dialogData.amount = val;
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.coinComposeName = row.coinComposeName
        this.dialogData.amount = row.amount
        this.dialogData.orderNum = row.orderNum
        this.dialogData.coinNum = row.coinNum
        this.dialogData.coinExtNum = row.coinExtNum
      }else{
        this.dialogTitle = '添加'
        delete this.dialogData.id
        this.dialogData.coinComposeName = ''
        this.dialogData.amount = ''
        this.dialogData.orderNum = ''
        this.dialogData.coinNum = ''
        this.dialogData.coinExtNum = ''
      }
    },
    searchBtn(){
      this.userListPage.pageNum = 1
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
      coincomposeList(this.userListPage).then(res => {
        // console.log(res.data)
        this.userList = res.data.list
        this.total = res.data.total
        
      })
    },
    addManagerBtn(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          addCoincompose(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData = {
                coinComposeName:'',
                amount:'',
                coinNum:'',
                coinExtNum:'',
                orderNum:'',
              }
              this.getUserList()
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
      delCoincompose(data).then(res => {
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


