<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="时间" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内容" width="180">
        <template slot-scope="scope">
            <div style="margin-left: 10px;background-color: #B3C0D1" v-html="scope.row.content"></div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id, scope.row.content)"
            >编辑</el-button
          >
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
  name: "CommentList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async GetDate() {
      const result = await this.$http.get("/comment");
      this.tableData = result.data.reverse();
    },

    //修改说说
    async handleEdit(_id, content) {
      this.$router.push({ name: "editorComment", params:  {'content':content} });
    },
    //删除说说
    async handleDelete(_id) {
      this.$confirm("此操作将永久删除该说说, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete("/comment", { params: { _id } });
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