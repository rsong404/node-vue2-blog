<template>
  <div>
    <el-button type="primary" @click="AddCategory">新增分类</el-button>
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
      <el-table-column label="分类" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.cateName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row._id,scope.row.cateName)"
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
  name: "CateList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    async GetDate() {
      const result = await this.$http.get("/category");
      this.tableData = result.data.reverse();
    },
    //新增分类
    AddCategory() {
      this.$prompt("新增分类名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern:
          /[\u4e00-\u9fa5-a-zA-Z0-9]{2,4}/,
        inputErrorMessage: "只能包含中文或英文或数字，长度大于2小于10",
      })
        .then(({ value }) => {
          this.$http.post('/category',{cateName:value,time:''})
          this.$message({
            type: "success",
            message: "你的新分类是: " + value,
          });
          this.reload()
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //修改分类
    async handleEdit(_id,cateName) {
      this.$prompt("修改分类名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: cateName,
        inputPattern:
          /[\u4e00-\u9fa5-a-zA-Z0-9]{2,4}/,
        inputErrorMessage: "只能包含中文或英文或数字，长度大于2小于10",
      })
        .then(({ value }) => {
          this.$http.put('/category',{cateName:value},{params:{_id}})
          this.reload()
          this.$message({
            type: "success",
            message: "你的新分类是: " + value,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
    //删除分类
    async handleDelete(_id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete("/category", { params: { _id } });
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