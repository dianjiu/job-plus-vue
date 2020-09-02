<template>
  <div class="details-container" v-loading="loading">
    <!--头部-->
    <el-row class="details-top">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-input class="input-size"
            placeholder="任务名称"
            v-model="searchForm.taskName">
          </el-input>
          <el-input class="input-size"
            placeholder="分组名称"
            v-model="searchForm.groupName">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content add-button-light">
          <el-button type="primary" icon="el-icon-edit" @click="dialogFlag = true">
            新增任务
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--表单-->
    <el-table
      class="details-body"
      :data="tableData"
      border>
      <el-table-column
        v-for="kk in tableColumn"
        :key="kk.id"
        :prop="kk.props"
        :width="kk.width"
        :label="kk.label"
        :fixed="kk.fixed"
        align="center"
        style="cursor: pointer;"
      >
        <template slot-scope="scope">
          <div v-if="kk.option">
            <span>{{ kk.option[scope.row[kk.props]] ? kk.option[scope.row[kk.props]].label : '--' }}
            </span>
          </div>
          <span v-else>{{ !isNumber(scope.row[kk.props]) && !scope.row[kk.props] ? '暂无数据' :  scope.row[kk.props]}} </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="180px" fixed="right">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="修改状态" placement="bottom">
            <el-switch
              class="switch-btn"
              v-model="scope.row.status == 0 ? false : true"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(scope.$index, scope.row.id)">
            </el-switch>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="立即执行" placement="bottom">
            <el-button @click="handleRun(scope.$index, scope.row.id)" size="mini" type="warning" icon="el-icon-caret-right" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
            <el-button @click="handleEdit(scope.$index, scope.row.id)" size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
            <el-button @click="handleDelete(scope.$index, scope.row.id)" size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block common-footer-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paginationParams.page"
        :page-size="paginationParams.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFlag" width="600px" :before-close='beforeClose'>
      <div slot="title" style="text-align:center">
        <span v-if="edit">编辑任务</span>
        <span v-else>新增任务</span>
      </div>
      <el-form :model="submitForm" ref="submitForm" label-width="105px">
        <el-form-item v-for="(item,index) in submitFormItem" :key="index" :label="item.label" :prop="item.props" :rules="[{required: item.props == 'sendParam' ? false : true,message:item.type == 'radio' ? '请选择' :'请填写',trigger:['blur','change']}]">
          <el-radio-group v-model="submitForm[item.props]" v-if="item.type == 'radio'">
            <el-radio :label="i.value" v-for="i in item.option" :key="i.value">{{ i.label }}</el-radio>
          </el-radio-group>
          <el-input v-model="submitForm[item.props]" v-else></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <el-button @click="beforeClose" style="margin-right:20px">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  getTaskList,
  optionTask,
  deleteTask,
  runTask,
  getTaskInfo,
  updateTask,
  insertTask
} from "@/api/taskDetailsController.js"
import {
  taskStatus
} from '@/utils/global.config.js'
import {
  isNumber
} from "lodash"
export default {
  data() {
    return {
      isNumber,
      taskStatus,
      dialogFlag:false,
      loading:false,
      tableData:[],
      tableColumn:[
        {props:'id',label:'ID',width:120},
        {props:'taskName',label:'任务名称'},
        {props:'groupName',label:'分组名称',},
        {props:'taskDesc',label:'任务描述'},
        {props:'cornRule',label:'CRON表达式',width:120},
        {props:'sendType',label:'请求方式'},
        {props:'sendUrl',label:'请求地址',width:200},
        {props:'sendParam',label:'请求参数'},
        {props:'status',label:'任务状态',option:taskStatus},
        {props:'nextExecuteTime',label:'下次执行时间',width:140},
      ],
      searchForm:{
        taskName:"",
        groupName:""
      },
      paginationParams:{
        page:1,
        pageSize:10
      },
      submitForm:{
        taskName:"",
        groupName:"",
        taskDesc:"",
        cornRule:"",
        sendType:"",
        sendUrl:"",
        sendParam:"",
        status:""
      },
      submitFormItem:[
        {props:'taskName',label:'任务名称'},
        {props:'groupName',label:'分组名称',},
        {props:'taskDesc',label:'任务描述'},
        {props:'cornRule',label:'CRON表达式'},
        {props:'sendType',label:'请求方式',type:'radio',option:[{label:'POST_JSON',value:'POST_JSON'},{label:'POST_FORM',value:'POST_FORM'},{label:'GET',value:'GET'}]},
        {props:'sendUrl',label:'请求地址'},
        {props:'sendParam',label:'请求参数'},
        {props:'status',label:'任务状态',type:'radio',option:[{label:'启用',value:"1"},{label:'禁用',value:"0"}]},
      ],
      total:0,
      edit:false
    }
  },
  created(){
    this.handleSearch()
  },
  methods: {
    handleSearch(){
      this.loading = true
      let params = {
        ...this.paginationParams
      }
      Object.keys(this.searchForm).forEach(key => {
        if(this.searchForm[key]){
          params[key] = this.searchForm[key]
        }
      })
      getTaskList(params).then(res => {
        this.loading = false
        // this.tableData = res.list
        this.tableData = res
        // this.total = res.total

      }).catch(err => {
        console.log(err)
        this.loading = false
        this.tableData = []
        this.total = 0
      })
    },
    handleCurrentChange(page) {
      this.paginationParams.page = page
      this.handleSearch()
    },
    handleSizeChange(pageSize) {
      this.paginationParams.page = 1
      this.paginationParams.pageSize = pageSize
      this.handleSearch()
    },
    changeStatus(index, id) {
      // console.log(index,id)
      // return
      this.loading = true
      optionTask({id}).then(res => {
        this.$success('修改成功')
        this.loading = false
        this.handleSearch()
      }).catch(err => {
        this.loading = false
      })
    },
    handleEdit(index, id) {
      this.loading = true
      getTaskInfo(id).then(res => {
        this.loading = false
        this.dialogFlag = true
        this.edit = true
        Object.keys(this.submitForm).forEach(key => {
          this.submitForm[key] = res[key]
        })
        this.submitForm.id = res.id
      }).catch(err => {
        this.loading = false
      })
    },
    handleDelete(index, id) {
      this.$quickConfirm("确定删除吗？",()=>{
        this.loading = true
        deleteTask(id).then(res => {
          this.tableData.splice(index,1)
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },()=>{},{})
    },
    handleRun(index,id){
      this.$quickConfirm("确定立即执行吗？",()=>{
        this.loading = true
        runTask({id}).then(res => {
          this.$success('执行成功')
          this.loading = false
        }).catch(err => {
          this.loading = false
        })
      },()=>{},{})
    },
    beforeClose(){
      this.dialogFlag = false
      this.edit = false
      this.$refs.submitForm.resetFields()
    },
    submit(){
      this.$refs.submitForm.validate(valid => {
        console.log(this.submitForm)
        if(valid){
          let api = this.edit ? updateTask : insertTask
          this.loading = true
          api(this.submitForm).then(res => {
            this.loading = false
            this.$refs.submitForm.resetFields()
            this.dialogFlag = false
            this.handleSizeChange(10)
          }).catch(err => {
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.details-container{
  margin: 25px;
}
.details-top{
  .add-button-light{
    float: right;
  }
}
.details-body{
  width: 100%;
  margin: 20px 0;
  .switch-btn{
    margin-right: 10px;
  }
}
.input-size{
  width: auto;
  margin-right: 20px;
}
</style>
