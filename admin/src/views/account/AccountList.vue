<template>
  <div>
    <button id="button" type="primary" @click.prevent="AddAccount">新增账号</button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.userName }}</span>
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
      const result = await this.$http.get("/account");
      this.tableData = result.data.reverse();
    },
    //新增账号
    AddAccount() {
      this.$router.push({ name: "createAccount" });
    },
    //删除账号
    async handleDelete(_id) {
      this.$prompt("输入该账号密码", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\u4e00-\u9fa5-a-zA-Z0-9]{2,4}/,
        inputErrorMessage: "只能包含中文或英文或数字，长度大于2小于10",
      })
        .then(async ({ value }) => {
          const result = await this.$http.delete("/account", {
            params: { _id, password: value },
          });
          if (result.data.result) {
            this.reload();
            this.$message({
              type: "success",
              message: "删除成功",
            });
          }else{
              this.$message.error('密码错误,删除失败！')
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  created() {
    this.GetDate();
  },
};
</script>
<style lang="scss" scoped>
      
</style>