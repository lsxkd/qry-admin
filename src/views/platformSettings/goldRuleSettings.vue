<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    <el-dialog
        v-el-drag-dialog
        title="编辑"
        :visible.sync="dialogTableVisible"
        v-if="dialogTableVisible"
        width='800px'
      >
      <el-form class="form-container" inline :model="dialogData" :rules="dialogRules" size="mini" label-position="right"  ref="dialogData">
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="签到金币基数:" prop="signBaseCoin">
          <el-input class="article-textarea"  placeholder="请输入签到金币基数" style="width:215px;" maxlength="20" v-model.trim="dialogData.signBaseCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="每隔多少天增长:" prop="signIncDay">
          <el-input class="article-textarea" placeholder="请输入每隔多少天增长" style="width:215px;" maxlength="20" v-model.trim="dialogData.signIncDay"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="增长金币数:" prop="signIncCoinPercent">
          <el-input class="article-textarea" placeholder="请输入增长金币数" style="width:215px;" maxlength="20" v-model.trim="dialogData.signIncCoinPercent"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="300px" label="每天领取最大金币百分比(基于基数)单位%:" prop="signMaxCoinPercent">
          <el-input class="article-textarea" placeholder="请输入每天领取最大金币百分比(基于基数)单位%" style="width:215px;" maxlength="20" v-model.trim="dialogData.signMaxCoinPercent"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="每看多少小时获取金币:" prop="readBookTime">
          <el-input class="article-textarea" placeholder="请输入每看多少小时获取金币" style="width:215px;" maxlength="20" v-model.trim="dialogData.readBookTime"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="看书每次获取金币数量:" prop="readBookCoin">
          <el-input class="article-textarea" placeholder="请输入看书每次获取金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.readBookCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="看书每天封顶金币数量:" prop="readBookDayMaxCoin">
          <el-input class="article-textarea" placeholder="请输入看书每天封顶金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.readBookDayMaxCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="注册送金币数量:" prop="registerCoin">
          <el-input class="article-textarea" placeholder="请输入注册送金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.registerCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="邀请注册送金币数量:" prop="registerInvitedCoin">
          <el-input class="article-textarea" placeholder="请输入邀请注册送金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.registerInvitedCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="被邀申请注册送金币数量:" prop="registerBeInvitedCoin">
          <el-input class="article-textarea" placeholder="请输入被邀申请注册送金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.registerBeInvitedCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="申请书本消费金币数量:" prop="applyBookCoin">
          <el-input class="article-textarea" placeholder="请输入申请书本消费金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.applyBookCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="体验VIP消费金币数量:" prop="experienceVipCoin">
          <el-input class="article-textarea" placeholder="请输入体验VIP消费金币数量" style="width:215px;" maxlength="20" v-model.trim="dialogData.experienceVipCoin"></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 22px;" label-width="120px" label="体验VIP天数:" prop="experienceVipDays">
          <el-input class="article-textarea" placeholder="请输入体验VIP天数" style="width:215px;" maxlength="20" v-model.trim="dialogData.experienceVipDays"></el-input>
        </el-form-item>
        

        <div style="text-align:center;">
          <el-button type="cancle"  @click="dialogTableVisible = false">取消</el-button>
          <el-button type="success" @click="addManagerBtn">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-form  size="small" inline :model="coinConfigureGetObj">
      <el-form-item style="margin-bottom:15px;float:right;">
        <el-button type="primary" icon="el-icon-edit" @click="editFn()" v-show="!editFlag">编辑</el-button>
        <el-button class='cancel-btn'  icon="el-icon-refresh" type="warning" @click="cancelFn" v-show="editFlag">取消</el-button>
        <el-button type="success" icon="el-icon-circle-check" @click="saveFn()" v-show="editFlag">保存</el-button>
      </el-form-item>
    </el-form>
    
    <el-form class="form-container" :model="dialogData" :rules="dialogRules" size="mini" :inline-message='true'  ref="dialogData">
        <el-table :data="coinConfigureGetObjData" element-loading-text="拼命加载中" border fit stripe highlight-current-row>
        <el-table-column align="center" label='#' :min-width="60">
            <template slot-scope="scope">
            {{scope.$index + 1}}
            </template>
        </el-table-column>
        <!-- <el-table-column label='创建时间' :min-width="160">
            <template slot-scope="scope">
            {{scope.row.createTime}}
            </template>
        </el-table-column> -->
        <el-table-column label="名称" prop='title' :width="300"></el-table-column>
        <el-table-column label="值" prop='value' :min-width="300">
            <template slot-scope="scope">
            <!-- {{scope.row.value}} -->
            <template v-if="editFlag">
                <el-form-item style="margin-top:0px;margin-bottom:0px;" label-width="0px" label="" :prop="scope.row.name">
                    <el-input class="article-textarea" :placeholder="'请输入' + scope.row.title" style="width:200px;"  maxlength="9" v-model.trim="dialogData[scope.row.name]"></el-input>
                </el-form-item>
            </template>
            <div style="height:28px;line-height:28px;" v-else>{{ scope.row.value }}</div>
            </template>
        </el-table-column>
        <!-- <el-table-column label="体验VIP天数" prop='experienceVipDays' :min-width="150"></el-table-column> -->

        <!-- <el-table-column label="申请书本消费金币数量" prop='applyBookCoin' :min-width="150"></el-table-column>
        <el-table-column label="体验VIP消费金币数量" prop='experienceVipCoin' :min-width="150"></el-table-column>
        <el-table-column label="体验VIP天数" prop='experienceVipDays' :min-width="150"></el-table-column>
        <el-table-column label="看书每次获取金币数量" prop='readBookCoin' :min-width="150"></el-table-column>
        <el-table-column label="看书每天封顶金币数量" prop='readBookDayMaxCoin' :min-width="150"></el-table-column>
        <el-table-column label="每看多少小时获取金币" prop='readBookTime' :min-width="150"></el-table-column>
        <el-table-column label="被邀申请注册送金币数量" prop='registerBeInvitedCoin' :min-width="150"></el-table-column>
        <el-table-column label="注册送金币数量" prop='registerCoin' :min-width="150"></el-table-column>
        <el-table-column label="邀请注册送金币数量" prop='registerInvitedCoin' :min-width="150"></el-table-column>
        <el-table-column label="签到金币基数" prop='signBaseCoin' :min-width="150"></el-table-column>
        <el-table-column label="增长金币数" prop='signIncCoin' :min-width="150"></el-table-column>
        <el-table-column label="每隔多少天增长" prop='signIncDay' :min-width="150"></el-table-column>
        <el-table-column label="每天领取最大金币百分比(基于基数)单位%" prop='signMaxCoinPercent' :min-width="150"></el-table-column> -->
        <!-- <el-table-column label="账户状态" :min-width="150">
            <template slot-scope="scope">
            <span v-if="scope.row.status == 0">正常</span>
            <span v-if="scope.row.status == 1">禁用</span>
            </template>
        </el-table-column> -->
        <!-- <el-table-column align="center" fixed="right" label="操作" width="250">
            <template slot-scope="scope">
            <el-button type="primary" size="small" icon="el-icon-edit" @click="openEditOrAdd('edit',scope.row)">编辑</el-button>
            <el-button type="danger" size="small" icon="el-icon-edit" @click="delConfirm(scope.row.id)">删除</el-button>
            </template>
        </el-table-column> -->
        </el-table>
    </el-form>
  </div>
</template>

<script>
import { coinConfigureGet,coinConfigureUpdate,addTag,delTag } from '@/api/category.js';
import moment from 'moment';
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name: 'goldRuleSettings',
  directives: { elDragDialog },
  data() {
    const reg = /^[0-9]+$/
    const validatorNumber = (rule, value, callback) => {
        if (!value) {
            callback(new Error('请输入对应的值'))
        } else if (!reg.test(value)) {
            callback(new Error('只能输入大于等于0的数字！'))
        } else {
            callback()
        }
    }
    return {
      coinConfigureGetObjData: [],
      fishListPageLimit:10,
      total: 1,
      coinConfigureGetObj: {},
      registrationTime:[],
      dialogTableVisible:false,
      dialogData:{
        applyBookCoin:'',
        experienceVipCoin:'',
        experienceVipDays:'',
        readBookDayMaxCoin:'',
        readBookTime:'',
        registerBeInvitedCoin:'',
        registerCoin:'',
        registerInvitedCoin:'',
        signBaseCoin:'',
        signIncCoinPercent:'',
        signIncDay:'',
        signMaxCoinPercent:'',
        signVipBaseCoinPercent:'',
      },
      dialogRules: {
        applyBookCoin: [{ required: true, trigger: 'blur',validator: validatorNumber }],
        experienceVipCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        experienceVipDays:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        readBookDayMaxCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        readBookTime:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        registerBeInvitedCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        registerCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        registerInvitedCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        signBaseCoin:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        signIncCoinPercent:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        signIncDay:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        signMaxCoinPercent:[{ required: true, trigger: 'blur',validator: validatorNumber }],
        signVipBaseCoinPercent:[{ required: true, trigger: 'blur',validator: validatorNumber }],
      },
      dialogTitle:'添加',
      editFlag:false,
    }
  },
  created() {
    this.coinConfigureGet();
  },
  methods: {
    editFn(){
        this.editFlag = true
    },
    cancelFn(){
        this.editFlag = false
        this.coinConfigureGet();
    },
    saveFn(){
        
        this.coinConfigureUpdate()
    },
    coinConfigureUpdate(){
        for(let key in this.dialogData){
            this.dialogData[key] = Number(this.dialogData[key])
        }
        this.$refs.dialogData.validate(valid => {
        if (valid) {
          coinConfigureUpdate(this.dialogData).then(res => {
            if(res.code == 200){
              this.coinConfigureGet()
              this.editFlag = false
              this.$message({
                  type: 'success',
                  message: '成功!'
              });
            }else{
              this.$message.error(res.msg);
            }
          })
        }
      })
    },
    openEditOrAdd(flag,row){
      this.dialogTableVisible = true
      if(flag == 'edit'){
        this.dialogTitle = '编辑'
        this.dialogData.id = row.id
        this.dialogData.tag = row.tag
      }else{
        this.dialogTitle = '添加'
        delete this.dialogData.id
        this.dialogData.tag = ''
      }
    },
    searchBtn(){
      this.coinConfigureGet()
    },
    coinConfigureGet() {
        this.coinConfigureGetObjData = []
      coinConfigureGet(this.coinConfigureGetObj).then(res => {
        // console.log(res.data)
        this.dialogData = res.data
        let objs = res.data
        for(let key in objs){
            // console.log(key)
            // console.log(objs[key])
            let newObj = {}
            newObj.name = key
            newObj.value = objs[key]
            switch(key){
                case 'applyBookCoin':
                    newObj.title = '申请书本消费金币数量'
                    break;
                case 'experienceVipCoin':
                    newObj.title = '体验VIP消费金币数量'
                    break;
                case 'experienceVipDays':
                    newObj.title = '体验VIP天数'
                    break;
                case 'readBookCoin':
                    newObj.title = '看书每次获取金币数量'
                    break;
                case 'readBookDayMaxCoin':
                    newObj.title = '看书每天封顶金币数量'
                    break;
                case 'readBookTime':
                    newObj.title = '每看多少小时获取金币'
                    break;
                case 'registerBeInvitedCoin':
                    newObj.title = '被邀请注册送金币数量'
                    break;
                case 'registerCoin':
                    newObj.title = '注册送金币数量'
                    break;
                case 'registerInvitedCoin':
                    newObj.title = '邀请注册送金币数量'
                    break;
                case 'signBaseCoin':
                    newObj.title = '签到金币基数'
                    break;
                case 'signIncCoinPercent':
                    newObj.title = '增长金币百分比,单位%'
                    newObj.value = newObj.value + '%'
                    break;
                case 'signIncDay':
                    newObj.title = '每隔多少天增长'
                    break;
                case 'signMaxCoinPercent':
                    newObj.title = '每天领取最大金币百分比(基于基数)单位%'
                    newObj.value = newObj.value + '%'
                    break;
                case 'signVipBaseCoinPercent':
                    newObj.title = 'VIP每天领取金币的基数是签到金币基数百分比 单位%'
                    newObj.value = newObj.value + '%'
                    break;
            }
            // console.log(newObj)
            this.coinConfigureGetObjData.push(newObj) 
            
        }
        // this.coinConfigureGetObjData.push(res.data) 
        
      })
    },
    addManagerBtn(){
      this.$refs.dialogData.validate(valid => {
        if (valid) {
          addTag(this.dialogData).then(res => {
            if(res.code == 200){
              this.dialogTableVisible = false
              this.dialogData.username = ''
              this.dialogData.password = ''
              this.coinConfigureGet()
              this.$message({
                  type: 'success',
                  message: '成功!'
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
      delTag(data).then(res => {
        if(res.code == 200){
              this.coinConfigureGet()
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


