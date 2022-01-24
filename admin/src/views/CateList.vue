<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row._id }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="分类"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.cateName }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name:'CateList',
    data() {
      return {
        tableData: []
      }
    },
    methods: {
      async GetDate(){
        const result = await this.$http.get('/category')
        this.tableData = result.data
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    created() {
      this.GetDate()
    },
  }
</script>