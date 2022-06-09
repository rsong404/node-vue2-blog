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
                  <a href="javascript:;" @click.stop="DeleteArticle(item)"
                    >删除</a
                  >
                </div>
                <div id="main_content">
                  <h4 id="content_title">
                    {{ item.title }}
                  </h4>
                  <div id="content" v-html="item.contents.slice(0,150)"></div>
                  <div id="main_content_foot">
                    <span
                      ><i class="el-icon-user-solid"></i> {{ item.userName }}
                    </span>
                    <span
                      ><i class="el-icon-s-help"></i> {{ item.cateName }}
                    </span>
                    <span
                      ><i class="el-icon-s-flag"></i> {{ item.tags[0] }}
                    </span>
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
      <!-- </el-container> -->
    </el-container>
    <div
      v-show="tagData.length != 0 ? true : false"
      :class="drawerClass ? tagContainer : tagContainer2"
    >
      <div id="drawerHandel" @click="Drawer">标 签</div>
      <div id="tagMain">
        <div class="label" v-for="(item, index) in tagData" :key="index">
          <span
            class="label"
            :style="{
              'background-color': colorStyle[Math.floor(Math.random() * 4)],
            }"
            @click.stop="SelectTag(item)"
            >{{ item }}</span
          >
        </div>
      </div>
    </div>
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
      colorStyle: ["#99CCCC", "#FFFFFF", "#99CCFF", "#CCCCFF"],
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
              this.$http.delete("/tag", {
                params: { tagName: item.tags[index] },
              });
            } else {
              this.$http.delete("/tag", {
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
      this.originArticleData = result.data.reverse();
      this.articleData = this.originArticleData;
      this.GetTag(this.originArticleData);
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
      this.articleData = this.originArticleData.filter(
        (item) => item.cateName === cateName
      );
    },
    //获取标签
    async GetTag(arcticleArr) {
      let arr = [];
      arcticleArr.forEach((element) => {
        if (element.tags.length >= 1) {
          arr.push(...element.tags);
        }
      });
      this.tagData.push(...new Set(arr));
      // 获取标签列表
      let articleList = await this.$http.get("/tag");
      // 过滤掉数据库中无用的标签

      let useLess = articleList.data.filter((item) => {
        return !this.tagData.includes(item.tagName) ? item._id : "";
      });
      // 批量删除无用标签
      if (useLess.length >= 1) {
        await this.$http.delete("tag", {
          params: { useLess },
        });
      }
    },
    // 选择标签
    SelectTag(tagName) {
      this.articleData = this.originArticleData.filter((item) => {
        if (item.tags.length >= 1) {
          for (let i = 0; i < item.tags.length; i++) {
            if (item.tags[i] === tagName) {
              return true;
            }
          }
        }
        return false;
      });
    },
    Drawer() {
      this.drawerClass = !this.drawerClass;
    },
  },

  created() {
    this.GetArticleData();
    this.GetCateData();
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
@mixin tagContainer {
  position: fixed;
  top: 50%;
  right: 0%;
  // transform: translateY(-50%);
  display: flex;
  align-items: center;
  transition: 0.7s;
  #drawerHandel {
    cursor: pointer;
    width: 40px;
    height: 80px;
    line-height: 40px;
    text-align: center;
    border-radius: 5px 0 0 5px;
    color: white;
    font-weight: 600;
    background-color: #b3c0d1;
    writing-mode: tb;
  }
}
.tagContainer2 {
  @include tagContainer();
  transform: translate3d(5%, -50%, 0);
}

.tagContainer {
  @include tagContainer();
  transform: translate3d(80%, -50%, 0);
}
#tagMain {
  width: 140px;
  min-height: 140px;
  background-color: #b3c0d1;
}
.label {
  display: inline-block;
  cursor: pointer;
  margin: 4px;
  padding: 4px;
  border-radius: 4px;
  text-align: center;
  color: #868788;
}
#article {
  cursor: pointer;
  width: 600px;
  height: 230px;
  margin: 10px;
  margin-bottom: 30px;
  margin-left: 0;
  border-radius: 0 8px 8px 0;

  display: flex;
  #picture {
    position: relative;
    width: 40%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px 0 0 8px;
    img {
      height: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  #main {
    width: 60%;
    height: 100%;
    padding: 5px;
    border-radius: 0 8px 8px 0;
    background-color: #b3c0d1;
    color: white;
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
        text-align: center;
        color: rgb(255, 4, 4);
      }
    }
    #main_content {
      height: 190px;
      font-weight: 450;

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
      }
      #content {
        height: 140px;
        font-size: 14px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 6;
        overflow: hidden;
      }
      #main_content_foot {
        font-size: 14px;
        margin: 0;
        opacity: 0.7;
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: flex-end;
      }
    }
  }
}
</style>