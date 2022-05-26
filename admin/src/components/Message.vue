<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand" label="回复" width="280">
        <template slot-scope="props">
          <div v-show="props.row.reply.length !== 0 ? true : false">
            <el-table :data="props.row.reply"
             :row-style="{'background-color':'#e0e7dd'}"
             :header-row-style="{'background-color':' #e0e7dd'}">
              <el-table-column label="nick" >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.nick }}</span>
                </template>
              </el-table-column>
              <el-table-column label="回复" >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.content }}</span>
                </template>
              </el-table-column>
              <el-table-column label="时间" >
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.time }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    @click="deleteReply(scope.row)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="nick" label="昵称" width="180"> </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="content" label="留言" width="180">
      </el-table-column>
      <el-table-column prop="time" label="时间" width="180"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="reply(scope.row)">回复</el-button>
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
  name: "Message",
  props: ["tableData"],
  methods: {
    handleDelete(id) {
      this.$emit("deleteData", id);
    },
    reply(item) {
      this.$emit("reply", item);
    },
    deleteReply(row){
      this.$emit('deleteReply',row)
    }
  },
};
</script>
<style lang="scss" scoped>
.el-table .success-row {
    background: #e0e7dd;
  }
</style>