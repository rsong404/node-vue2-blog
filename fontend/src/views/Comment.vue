<template>
  <div id="commentContainer">
    <div
      v-for="(item, index) in commentList"
      :key="item._id"
      style="overflow: hidden"
      id="commentItem"
    >
      <div
        id="comment"
        v-html="item.content"
        :class="computeClass(index)"
      ></div>
      <div id="time">{{ item.time }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commentList: [],
    };
  },
  methods: {
    async GetCommentList() {
      let result = await this.$http.get("/comment");
      this.commentList = result.data;
    },
    computeClass(index) {
      return index % 2 ? "right-commentItem" : "left-commentItem";
    },
  },
  created() {
    this.GetCommentList();
  },
};
</script>
<style lang="scss" scoped>
#commentContainer {
  width: 100%;
  min-height: 100%;
  & > div:nth-child(2n) {
    text-align: right;
  }
  & > div:nth-child(2n - 1) {
    text-align: left;
  }
  #commentItem {
    width: 100%;
    margin: 10px 0;
    #comment {
      display: inline-block;
    }
    #time{
      font-size: 14px;
      color: rgb(75, 75, 75);
    }
    .right-commentItem {
      padding: 5px;
      margin-bottom: 5px;
      background-color: #a2d2ff;
      border-radius: 5px;
      box-shadow: 2px 2px 5px #cecece, 0px 0px 10px #ffffff inset;
    }
    .left-commentItem {
      padding: 5px;
      margin-bottom: 5px;
      background-color: #a2d2ff;
      border-radius: 5px;
      box-shadow: 2px 2px 15px #cecece, 0px 0px 10px #ffffff inset;
    }
  }
}
</style>