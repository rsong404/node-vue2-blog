<template>
  <div id="container">
    <div id="article" v-for="item in articleData" :key="item._id">
      <div id="picture">
        <img :src="item.coverPicture" alt="" />
      </div>
      <div id="main">
        <div id="deleteButton">
          <a style="color:green" href="javascript:;" @click="EditorArticle(item)" >修改</a>
          <a href="javascript:;" @click="DeleteArticle(item._id)">删除</a>
        </div>
        <div id="main_content">
          <div id="content_title">
            <strong>{{ item.title }}</strong>
          </div>
          <div id="content" v-html="item.contents"></div>
          <div id="main_content_foot">
            <span><i class="el-icon-user"></i> {{ item.userName }} </span>
            <span><i class="el-icon-help"></i> {{ item.cateName }} </span>
            <!-- <span><i class="el-icon-price-tag"></i> {{ item.tags[0] }} </span>  -->
            <span><i class="el-icon-time"></i> {{ item.time }} </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    inject:['reload'],
  data() {
    return {
      articleData: [],
    };
  },
  methods: {
      //修改文章
      EditorArticle(item){
          this.$router.push({name:'editorArticle',params:item})
      },
      //删除文章
    async DeleteArticle(_id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete("/article", { params: { _id } });
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
    async GetArticleData() {
      let result = await this.$http.get("/article");
      this.articleData = result.data;
    },
  },
  created() {
    this.GetArticleData();
  },
};
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
}
#article {
  cursor: pointer;
  width: 600px;
  height: 230px;
  margin: 10px;
  margin-bottom: 30px;
  border-radius: 8px 0 0 8px;
  display: flex;
  background-color: whitesmoke;
  #picture {
    width: 40%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    background-color: grey;
    img {
      height: 100%;
    }
  }
  #main {
    width: 60%;
    height: 220px;
    padding: 5px;

    background-color: rgb(238, 238, 238);
    #deleteButton {
      overflow: hidden;
      display: flex;
      justify-content: space-between;
      a {
        display: block;
        text-decoration: none;
        width: 50px;
        height: 30px;
        line-height: 30px;
        color: rgb(255, 4, 4);
        float: right;
      }
    }
    #main_content {
      height: 190px;
      background-color: tan;
      div {
        margin: 0 8px;
      }
      #content_title {
        height: 30px;
        line-height: 30px;
        // background-color: tomato;
      }
      #content {
        height: 130px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        // background-color: skyblue;
      }
      #main_content_foot {
        height: 30px;
        line-height: 30px;
        // background-color: red;
      }
    }
  }
}
</style>