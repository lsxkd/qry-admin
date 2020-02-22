<template>
  <div class="app-container">
    <el-dialog title="详情信息" v-el-drag-dialog :visible.sync="dialogVisibleGroup" width="60%">
      <el-form label-position="left" inline class="demo-table-expand">
        <el-form-item label="appStore连接:" style="display:block;">
          <span>{{ detailsData.appStoreUrl }}</span>
        </el-form-item>
        <el-form-item label="android文件包大小,单位M:" style="display:block;">
          <span>{{ detailsData.androidFileSize }}</span>
        </el-form-item>
        <el-form-item label="android文件包上传时名称:" style="display:block;">
          <span>{{ detailsData.androidFileName }}</span>
        </el-form-item>
        <el-form-item label="IOS文件包上传时名称:" style="display:block;">
          <span>{{ detailsData.iosFileName }}</span>
        </el-form-item>
        <el-form-item label="IOS文件包大小,单位M:" style="display:block;">
          <span>{{ detailsData.iosFileSize }}</span>
        </el-form-item>
        <el-form-item label="下载二维码url:" style="display:block;">
          <span>{{ detailsData.aqrCodeUrl }}</span>
        </el-form-item>
        <el-form-item label="android文件包下载地址:" style="display:block;">
          <span>{{ detailsData.androidFileUrl }}</span>
        </el-form-item>
        <el-form-item label="IOS文件包下载地址:" style="display:block;">
          <span>{{ detailsData.iosFileUrl }}</span>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-form :inline="true" :model="pageInfo" class="demo-form-inline">
      <el-form-item label="版本号">
        <el-input v-model="pageInfo.appVersion" placeholder="版本号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchBtn">查询</el-button>
      </el-form-item>
      <el-button type="primary" style="margin-bottom:10px;float:right;margin-left:10px;" @click="getNewVersion">{{getNV ?'获取版本列表': '获取最新版本信息'}}</el-button>
      <el-button type="primary" style="margin-bottom:10px;float:right;" @click="add('','add')">添加版本信息</el-button>
      
    </el-form>

    <el-dialog title="添加版本更新" v-el-drag-dialog :visible.sync="dialogVisible" width="70%">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="200px"
        class="demo-ruleForm"
      >
        <el-form-item label="版本号" prop="appVersion">
          <el-input v-model="ruleForm.appVersion"></el-input>
        </el-form-item>
        <el-form-item label="版本更新内容" prop="appUpdateContent">
          <el-input type='textarea' v-model="ruleForm.appUpdateContent"></el-input>
        </el-form-item>
        <el-form-item label="IOS文件包下载地址" prop="iosFileUrl">
          <el-input v-model="ruleForm.iosFileUrl"></el-input>
        </el-form-item>
        <el-form-item label="IOS文件包大小,单位M" prop="iosFileSize">
          <el-input v-model="ruleForm.iosFileSize"></el-input>
        </el-form-item>
        <el-form-item label="IOS文件包上传时名称" prop="iosFileName">
          <el-input v-model="ruleForm.iosFileName"></el-input>
        </el-form-item>
        <el-form-item label="android文件包下载地址" prop="androidFileUrl">
          <el-input v-model="ruleForm.androidFileUrl"></el-input>
        </el-form-item>
        <el-form-item label="android文件包大小,单位M" prop="androidFileSize">
          <el-input v-model="ruleForm.androidFileSize"></el-input>
        </el-form-item>
        <el-form-item label="android文件包上传时名称" prop="androidFileName">
          <el-input v-model="ruleForm.androidFileName"></el-input>
        </el-form-item>
        <el-form-item label="下载二维码url" prop="qrCodeUrl">
          <el-input v-model="ruleForm.qrCodeUrl"></el-input>
        </el-form-item>
        <el-form-item label="更新类型" prop="updateForce">
          <!-- <el-select v-model="ruleForm.updateForce" placeholder="请选择更新类型">
            <el-option label="不提示更新" :value="0"></el-option>
            <el-option label="提示更新" :value="1"></el-option>
            <el-option label="强制更新" :value="2"></el-option>
          </el-select> -->
          <el-select v-model="ruleForm.updateForce" placeholder="请选择更新类型">
            <el-option
              v-for="item in updateForceOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否最新版本" prop="latestVersion">
          <el-select v-model="ruleForm.latestVersion" placeholder="请选择是否最新版本">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="appStore连接" prop="appStoreUrl">
          <el-input v-model="ruleForm.appStoreUrl"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    

    <el-table :data="tableData" border fit highlight-current-row :header-cell-style="{background:'#eef1f6',color:'#606266'}" style="width: 100%">
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="appStore连接">
              <span>{{ props.row.appStoreUrl }}</span>
            </el-form-item>
            <el-form-item label="android文件包大小,单位M">
              <span>{{ props.row.androidFileSize }}</span>
            </el-form-item>
            <el-form-item label="android文件包上传时名称">
              <span>{{ props.row.androidFileName }}</span>
            </el-form-item>
            <el-form-item label="IOS文件包上传时名称">
              <span>{{ props.row.iosFileName }}</span>
            </el-form-item>
            <el-form-item label="IOS文件包大小,单位M">
              <span>{{ props.row.iosFileSize }}</span>
            </el-form-item>
            <el-form-item label="下载二维码url">
              <span>{{ props.row.aqrCodeUrl }}</span>
            </el-form-item>
            <el-form-item label="android文件包下载地址">
              <span>{{ props.row.androidFileUrl }}</span>
            </el-form-item>
            <el-form-item label="IOS文件包下载地址">
              <span>{{ props.row.iosFileUrl }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column> -->
      <el-table-column prop="appVersion" label="版本号"></el-table-column>
      <el-table-column prop="updateForce" label="更新类型">
        <template slot-scope="scope">
          <span>{{scope.row.updateForce === 0 ? '不提示更新':scope.row.updateForce === 1 ?'提示更新':'强制更新'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间"></el-table-column>
      <el-table-column prop="latestVersion" label="是否最新版本">
        <template slot-scope="scope">
          <span>{{scope.row.latestVersion === 0?'否':'是'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="appUpdateContent" label="版本更新内容"></el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="add(scope.row,'edit')"
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            @click.native.prevent="openDetails(scope.row)"
            type="text"
            size="small"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @current-change="pageChange" layout="prev, pager, next" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
import {
  getVersionInfoList,
  saveOrUpdateVersionInfo,
  getLatestVersion
} from '@/api/user'
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
export default {
  name:'appManagement',
    directives: { elDragDialog },
  data () {
    return {
      dialogVisibleGroup:false,
      detailsData:{},
      dialogVisible: false,
      tableData: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 10,
        appVersion: ''
      },
      getNV:false,
      total: 0,
      ruleForm: {
        updateForce:'',
        latestVersion:'',
      },
      rules: {
        appVersion: [
          { required: true, message: '请填写app版本', trigger: 'blur' }
        ],
        appUpdateContent: [
          { required: true, message: '请填写版本更新内容', trigger: 'blur' }
        ],
        iosFileUrl: [
          {
            required: true,
            message: '请填写IOS文件包下载地址',
            trigger: 'blur'
          }
        ],
        iosFileSize: [
          {
            required: true,
            message: '请填写IOS文件包大小,单位M',
            trigger: 'blur'
          }
        ],
        iosFileName: [
          {
            required: true,
            message: '请填写IOS文件包上传时名称',
            trigger: 'blur'
          }
        ],
        androidFileUrl: [
          {
            required: true,
            message: '请填写android文件包下载地址',
            trigger: 'blur'
          }
        ],
        androidFileSize: [
          {
            required: true,
            message: '请填写android文件包大小,单位M',
            trigger: 'blur'
          }
        ],
        androidFileName: [
          {
            required: true,
            message: '请填写android文件包上传时名称',
            trigger: 'blur'
          }
        ],
        qrCodeUrl: [
          { required: true, message: '请填写下载二维码url', trigger: 'blur' }
        ],
        updateForce: [
          { required: true, message: '请填写更新类型', trigger: 'change' }
        ],
        latestVersion: [
          { required: true, message: '请填写是否最新版本', trigger: 'change' }
        ],
        appStoreUrl: [
          { required: true, message: '请填写appStore连接', trigger: 'blur' }
        ]
      },
      updateForceOptions:[
        {
          value:0,
          label:'不提示更新',
        },
        {
          value:1,
          label:'提示更新',
        },
        {
          value:2,
          label:'强制更新',
        },
      ],
    }
  },

  created () {
    this.getlist()
  },
  methods: {
    searchBtn(){
      this.pageInfo.pageNum  = 1
      this.getlist()
    },
    openDetails(data){
      this.dialogVisibleGroup = true
      this.detailsData = data
    },
    getNewVersion () {
      if (this.getNV) {
        this.getlist()
        this.getNV = false
        return
      }
      getLatestVersion()
      .then(res => {
        // this.$msgbox({ title: '最新版本信息', message: res.data, dangerouslyUseHTMLString: true })
        this.tableData = [res.data]
        this.total = 1
        this.getNV = true
      })
    },
    add (i,flag) {
      console.log(i)
      console.log(flag)
      if (i.id && flag == 'edit') {
        this.ruleForm = i
      }else{
        //   this.ruleForm = {}
      }
      this.dialogVisible = true
      // this.$refs['ruleForm'].resetFields()
    },
    submitForm (f) {
      this.$refs[f].validate(valid => {
        if (valid) {
          saveOrUpdateVersionInfo(this.ruleForm).then(res => {
            this.getlist()
            this.$message({ type: 'success', message: '操作成功' })
            this.dialogVisible = false
          })
        }
      })
    },
    pageChange (p) {
      this.pageInfo.pageNum = p
      this.getlist()
    },
    deleteRow (index, rows) {
      rows.splice(index, 1)
    },
    getlist () {
      getVersionInfoList(this.pageInfo).then(res => {
        this.tableData = res.data.list
        this.total = res.data.total
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.block{
  margin-top:10px;
  text-align: center;
}
</style>
