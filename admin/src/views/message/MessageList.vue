<template>
  <div>
    <button id="button" @click="AddMessage">发留言</button>
    <message
      :tableData="tableData"
      @deleteData="handleDelete"
      @reply="ReplayHandle"
      @deleteReply="DeleteReply"
    ></message>
  </div>
</template>

<script>
import Message from "../../components/Message.vue";
export default {
  name: "CateList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    Message,
  },
  methods: {
    async GetDate() {
      const result = await this.$http.get("/message");
      this.tableData = result.data.reverse();
    },
    //删除留言
    async handleDelete(_id) {
      this.$confirm("确定删除该站点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await this.$http.delete("/message", { params: { _id } });
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
    //添加留言
    AddMessage() {
      this.$router.push({ name: "createMessage" });
    },
    //回复留言
    ReplayHandle(itemData) {
      this.$router.push({ name: "createMessage", params: { itemData } });
    },
    // 删除回复
    async DeleteReply(row) {
      let result = await this.$http.get("/message", {
        params: { _id: row.parentId },
      });
      let data = result.data[0].reply.filter((item) => {
        return item._id !== row._id;
      });
      this.$http.put(
        "/message",
        { reply: data.reverse() },
        { params: { _id: row.parentId } }
      );
      this.reload();
      this.$message.success("修改成功！");
    },
  },
  created() {
    this.GetDate();
  },
};
</script>