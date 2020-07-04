<template>
  <div class="details-container">
    <!--头部-->
    <el-row class="details-top">
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <el-input class="input-size"
            placeholder="任务名称"
            v-model="input1">
          </el-input>
          <el-input class="input-size"
            placeholder="分组名称"
            v-model="input2">
          </el-input>
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content add-button-light">
          <el-button type="primary" icon="el-icon-edit">
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
        prop="id"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        prop="taskName"
        label="任务名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="groupName"
        label="分组名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="taskDesc"
        label="任务描述"
        width="150">
      </el-table-column>
      <el-table-column
        prop="cornRule"
        label="CRON表达式"
        width="150">
      </el-table-column>
      <el-table-column
        prop="sendType"
        label="请求方式"
        width="100">
      </el-table-column>
      <el-table-column
        prop="sendUrl"
        label="请求地址"
        width="200">
      </el-table-column>
      <el-table-column
        prop="sendParam"
        label="请求参数"
        width="200">
      </el-table-column>
      <el-table-column
          label="任务状态"
          width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                      :type="scope.row.status == 0 ? 'danger' : 'success'">
                {{scope.row.status == 0 ? "已停用" : "已启用" }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="下次执行时间"
        width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.nextExecuteTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-switch
            class="switch-btn"
            v-model="scope.row.status == 0 ? false : true"
            active-color="#13ce66"
            inactive-color="#ff4949"
          @click="changeStatus(scope.$index, scope.row.id)">
          </el-switch>
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block details-foot">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="4">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      currentPage: 1,
      value1: true,
      tableData: [{
        id:'1',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '1',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'2',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '0',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'3',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '0',
        nextExecuteTime: '2020-07-02 17:15:00'
      }, {
        id:'4',
        taskName: 'local-test',
        groupName: 'task-manage',
        taskDesc: '获取定时任务信息',
        cornRule: '0 0/5 * * * ? ',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get/2',
        sendParam: '',
        status: '1',
        nextExecuteTime: '2020-07-02 17:15:00'
      }]
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeStatus(index, row) {
      console.log(index, row);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
.details-foot{

}
.input-size{
  width: auto;
  margin-right: 20px;
}
</style>
