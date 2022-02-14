<template>
  <div id="container">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-button @click="AllArticle">所有文章</el-button>

          <el-button
            v-for="item in cateData"
            :key="item._id"
            @click="SelectData(item.cateName)"
            >{{ item.cateName }}</el-button
          >
        </el-row>
      </el-header>
      <el-row>
        <el-col>
          <div id="articleContainer">
            <div id="article" v-for="item in articleData" :key="item._id">
              <div id="picture">
                <img :src="item.coverPicture" alt="" />
              </div>
              <div id="main">
                <div id="deleteButton">
                  <a
                    style="color: green"
                    href="javascript:;"
                    @click="EditorArticle(item)"
                    >修改</a
                  >
                  <a href="javascript:;" @click="DeleteArticle(item)">删除</a>
                </div>
                <div id="main_content">
                  <div id="content_title">
                    <b>{{ item.title }}</b>
                  </div>
                  <div id="content" v-html="item.contents"></div>
                  <div id="main_content_foot">
                    <span
                      ><i class="el-icon-user"></i> {{ item.userName }}
                    </span>
                    <span
                      ><i class="el-icon-help"></i> {{ item.cateName }}
                    </span>
                    <!-- <span><i class="el-icon-price-tag"></i> {{ item.tags[0] }} </span>  -->
                    <span><i class="el-icon-time"></i> {{ item.time }} </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-empty
            v-if="articleData.length == 0"
            description="暂时还没有文章，快去添加文章吧。"
          ></el-empty>
        </el-col>
      </el-row>
      <!-- tag抽屉 -->
      <div :class="drawerClass ? tagContainer : tagContainer2">
        <div id="drawerHandel" @click="Drawer">标签</div>
        <div id="tagMain">
          <div class="label" v-for="item in tagData" :key="item._id">
            <span
              class="label"
              style="padding: 4px"
              :style="{
                'background-color': colorStyle[Math.floor(Math.random() * 8)],
              }"
              @click="SelectTag(item.tagName)"
              >{{ item.tagName }}</span
            >
          </div>
        </div>
      </div>
      <!-- </el-container> -->
    </el-container>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  data() {
    return {
      articleData: [],
      originArticleData: [],
      cateData: [],
      tagData: [],
      drawerClass: true,
      tagContainer: "tagContainer",
      tagContainer2: "tagContainer2",
      colorStyle: [
        "#66CCCC",
        "##99CC66",
        "#FF99CC",
        "#FF6666",
        "#666699",
        "#FFCC00",
        "#0099CC",
        "#009999",
      ],
    };
  },
  methods: {
    //修改文章
    EditorArticle(item) {
      this.$router.push({ name: "editorArticle", params: item });
    },
    //删除文章
    async DeleteArticle(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$http.delete("/article", { params: { _id: item._id } });
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.reload();
          //删除文章的时候同时删除标签
          for (let index = 0; index < item.tags.length; index++) {
            let result = await this.$http.get("/tag", {
              params: { tagName: item.tags[index] },
            });
            //如果该标签下只有一篇文章与之关联，则可以将该标签删掉
            if (
              JSON.stringify(result.data) !== "[]" &&
              result.data[0].items.length <= 1
            ) {
              await this.$http.delete("/tag", {
                params: { tagName: item.tags[index] },
              });
            } else {
              await this.$http.delete("/tag", {
                params: { tagName: item.tags[index] },
              });
            }
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取文章
    async GetArticleData() {
      let result = await this.$http.get("/article");
      this.originArticleData = result.data;
      this.articleData = this.originArticleData;
      console.log(result.data.reverse())
    },
    AllArticle() {
      this.articleData = this.originArticleData;
    },
    //获取分类
    async GetCateData() {
      let result = await this.$http.get("/category");
      this.cateData = result.data.reverse();
    },
    //选择分类
    async SelectData(cateName) {
      let result = await this.$http.get("/category", { params: { cateName } });
      this.articleData = result.data[0].items.reverse();
    },
    //获取标签
    async GetTag() {
      let result = await this.$http.get("/tag");
      this.tagData = result.data;
    },
    async SelectTag(tagName) {
      let result = await this.$http.get("/tag", { params: { tagName } });
      this.articleData = result.data[0].items.reverse();
    },
    Drawer() {
      this.drawerClass = !this.drawerClass;
    },
  },

  created() {
    this.GetArticleData();
    this.GetCateData();
    this.GetTag();
  },
};
</script>

<style lang="scss" scoped>
#articleContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: hidden;
}
.tagContainer2 {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  transition: 0.7s;
  #drawerHandel {
    cursor: pointer;
    width: 50px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 5px 0 0 5px;
    color: white;
    padding: 4px;
    padding-top: 0;
    background-color: #6699cc;
  }
  #tagMain {
    width: 140px;
    // height: 200px;
    background-color: #99ccff;
  }
}
.tagContainer {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  transform: translateX(80%);
  display: flex;
  align-items: center;
  transition: 0.7s;
  #drawerHandel {
    cursor: pointer;
    width: 50px;
    height: 80px;
    text-align: center;
    line-height: 80px;
    border-radius: 5px 0 0 5px;
    color: white;
    padding: 4px;
    padding-top: 0;
    background-color: #6699cc;
  }
  #tagMain {
    width: 140px;
    background-color: #99ccff;
  }
}
.label {
  display: inline-block;
  cursor: pointer;
  color: white;
  margin: 4px;
  border-radius: 4px;
  text-align: center;
}
#article {
  cursor: pointer;
  width: 600px;
  height: 230px;
  margin: 10px;
  margin-bottom: 30px;
  margin-left: 0;
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
        text-align: center;
        font-size: 16px;
        height: 30px;
        line-height: 30px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        // background-color: tomato;
      }
      #content {
        height: 130px;
        font-size: 14px;
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