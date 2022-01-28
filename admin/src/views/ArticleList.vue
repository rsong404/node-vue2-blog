<template>
  <div id="container">
    <div id="article" v-for="item in articleData" :key="item._id">
      <div id="picture">
        <img :src="item.coverPicture" alt="" />
      </div>
      <div id="main">
        <div id="deleteButton"><a href="javascript:;">删除</a></div>
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
  data() {
    return {
      articleData: [],
    };
  },
  methods: {
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