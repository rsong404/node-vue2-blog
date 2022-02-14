<template>
  <div>
    <el-button type="primary" @click="AddWebsite">新增站点</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="类型" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.type }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网站名称" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.websiteName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="网址" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.website }}</span>
        </template>
        
      </el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CateList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async GetDate() {
      const result = await this.$http.get("/website");
      this.tableData = result.data.reverse();
    },
    //新增站点
    AddWebsite() {
      this.$router.push({name:"createWebsite"})
    },
    
    //删除分类
    async handleDelete(_id) {
      this.$confirm("确定删除该站点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete("/website", { params: { _id } });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  created() {
    this.GetDate();
  },
};
</script>