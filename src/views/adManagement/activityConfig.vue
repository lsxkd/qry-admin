<template>
  <!-- $t is vue-i18n global function to translate lang -->
  <div class="app-container">
    
    <div class="classification">
      <el-tabs type="border-card" v-model="activeNameMan" @tab-click="handleClickMan" >
        <el-tab-pane label="首页banner" name="1">
          <activityConfigEdit :showPosition="activeNameMan" v-if="activeNameMan == 1"></activityConfigEdit>
          <p class="noDatas" v-else>暂无内容！</p>
        </el-tab-pane>
        <el-tab-pane label="书籍内部" name="2">
          <activityConfigEdit :showPosition="activeNameMan" v-if="activeNameMan == 2"></activityConfigEdit>
          <p class="noDatas" v-else>暂无内容！</p>
        </el-tab-pane>
        <el-tab-pane label="消息推送" name="3">
          <activityConfigEdit :showPosition="activeNameMan" v-if="activeNameMan == 3"></activityConfigEdit>
          <p class="noDatas" v-else>暂无内容！</p>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from "vuex";
import elDragDialog from '@/directive/el-dragDialog' // base on element-ui
import draggable from 'vuedraggable'
import { getToken } from '@/utils/auth'

import activityConfigEdit from './activityConfigEdit'
export default {
  name: 'activityConfig',
  directives: { elDragDialog },
  components: {
    draggable,activityConfigEdit
  },
  data() {
    return {
      activeNameMan:'1',      
    }
  },
  computed: {
    tokenData(){
      return getToken()
    }
  },
  created() {
    
  },
  methods: {
    
    handleClickMan(tab){
      console.log(tab.name);
      this.activeNameMan = tab.name
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
.classification .el-tabs__item{
    padding:0px 40px !important;
}
.is-left .el-tabs__item{
    padding:0px 40px !important;
    height:60px;
    line-height: 60px;
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
<style scoped>
  .app-container{
    display:flex;
    flex-direction:column;
  }
  .classification-left-title{
    /* padding:20px 0; */
  }
  .classification-box-btn{
    text-align: right;
    margin:10px auto 20px auto;
  }
  .noDatas{
    font-size:14px;
    color:#999;
    text-align: center;
    margin:50px auto;
  }

 
</style>
