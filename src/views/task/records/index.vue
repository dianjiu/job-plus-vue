<template>
  <div class="details-container">
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
        width="300">
      </el-table-column>
      <el-table-column
        prop="returnInfo"
        label="响应信息"
        width="300">
      </el-table-column>
      <el-table-column
        prop="executeTime"
        label="执行时间"
        width="200">
      </el-table-column>
      <el-table-column
          label="执行结果"
          width="100">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium"
                      :type="scope.row.taskStatus == 0 ? 'danger' : 'success'">
                {{scope.row.taskStatus == 0 ? "失败" : "成功" }}
              </el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row.id)">查看</el-button>
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
        :total="2">
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
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get',
        sendParam: '2',
        returnInfo: '{\n' +
          '  "code": "400",\n' +
          '  "msg": "根据id【2】没有查到相关记录！"\n' +
          '}',
        executeTime: '2020-07-02 17:15:00',
        taskStatus: '0'
      }, {
        id:'2',
        taskName: 'local-test',
        groupName: 'task-manage',
        sendType: 'GET',
        sendUrl: 'http://localhost:8080/tTaskDetails/get',
        sendParam: '20200705',
        returnInfo: '{\n' +
          '  "code": "200",\n' +
          '  "data": {\n' +
          '    "cornRule": "0 0/5 * * * ? ",\n' +
          '    "createTime": 1593672622000,\n' +
          '    "groupName": "task-manage",\n' +
          '    "groupNo": "G-2493d162-c845-4768-9f6e-3f1f09d405fb",\n' +
          '    "id": 20200705,\n' +
          '    "nextExecuteTime": 1593929100000,\n' +
          '    "sendParam": "",\n' +
          '    "sendType": "GET",\n' +
          '    "sendUrl": "127.0.0.1:8080/tTaskDetails/get/2",\n' +
          '    "status": "1",\n' +
          '    "taskDesc": "获取定时任务信息",\n' +
          '    "taskName": "local-test",\n' +
          '    "taskNo": "T-9f690d82-6276-43a0-a928-ed9030f10f38",\n' +
          '    "updateTime": 1593928800000\n' +
          '  },\n' +
          '  "msg": "查询成功！"\n' +
          '}',
        executeTime: '2020-07-02 17:15:00',
        taskStatus: '1'
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
