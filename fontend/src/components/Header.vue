<template>
  <header>
    <div @click="ReturnIndex" id="blogName">YRsong丶博客</div>
    <div id="model">
      <i
        @click="TurnModel"
        class="iconfont"
        :class="
          turnModel ? 'icon-Daytimemode-fill' : 'icon-icon-nighttime-fill'
        "
      ></i>
    </div>
    <div id="header-right">
      <div id="search">
        <div id="searchIconUp"></div>
        <input
          type="text"
          v-model="searchValue"
          @input="Search(searchValue)"
          placeholder="请输入搜索"
        />
        <div id="searchIconDown"></div>
        <ul id="resultBox" :style="IsShowBox" @click="CheckArticle">
          <li v-for="item in searchList" :key="item._id">{{ item.title }}</li>
        </ul>
      </div>
      <router-link to="/message" tag="div" id="message"
        ><i class="iconfont icon-xiaoxi2-m"></i
      ></router-link>
    </div>
  </header>
</template>
<script>
export default {
  data() {
    return {
      turnModel: true,
      nodeList: null,
      searchValue: "",
      searchList: [],
      timer: null,
    };
  },
  mounted() {
    this.nodeList = document.querySelectorAll(".relatedColors");
    this;
  },
  computed:{
    IsShowBox(){
      return this.searchList.length ? 'display:block;' : 'display:none;'
    }
  },
  methods: {
    TurnModel() {
      console.log("class", this.nodeList);
      this.turnModel = !this.turnModel;
      for (let i = 0; i < this.nodeList.length; i++) {
        this.nodeList[i].classList.toggle("nightMode");
      }
    },
    ReturnIndex() {
      // 更文章title状态
      this.$store.dispatch("bulletin", "博客");
      if (this.$route.path !== "/index") {
        this.$router.push({ name: "index" });
      }
    },
    // Debounce(fn, delay = 500) {
    //   let timer = null;
    //   return function (...rest) {
    //     clearTimeout(timer);
    //     timer = setTimeout(() => {
    //       fn.apply(this, rest);
    //     }, delay);
    //   };
    // },
    SearchResult(value) {
      let articleList = this.$store.state.articleList;
      if (value !== "") {
        this.searchList = articleList.filter((item) => {
          return item.title.includes(value);
        });
      }else{
        this.searchList = []
      }
    },
    Search(value) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.SearchResult(value);
        console.log(11);
      }, 500);
    },
    CheckArticle($event){
      if($event.target.nodeName === 'LI'){
        let tittle = ''
      }
    }
  },
};
</script>
<style lang="scss" scoped>
header {
  cursor: "url('../assets/cursor.ico'),pointer";
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: block;
  background-color: var(--blue2);
  flex-shrink: 0;
  position: relative;
  #model > i {
    font-size: 30px;
    cursor: pointer;
  }
  & > div {
    margin: 0 20px;
  }
  #model {
    width: 50px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  #blogName {
    cursor: pointer;
    float: left;
    font-size: 20px;
    font-weight: 600;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  #header-right {
    float: right;
    display: flex;
    height: 100%;
    align-items: center;

    #message {
      width: 50px;
      height: 100%;
      line-height: 7vh;
      cursor: pointer;
      text-align: center;
      & > i {
        font-size: 18px;
      }
      &:hover {
        background-color: var(--blue1);
      }
    }
    #search {
      width: 150px;
      height: 100%;
      position: relative;
      z-index: 999;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      input {
        width: 100px;
        height: 25px;
        border: 0;
        font-size: 12px;
        &:focus {
          outline: none;
          //   border: 0.5px solid rgb(177, 177, 177);
        }
      }
      #noneBox{
        display: none;
      }
      #resultBox {
        width: 300px;
        position: absolute;
        top: 50px;
        background-color: var(--blue3);
        display: block;
        box-shadow: var(--shadow2);
        padding: 10px;
        cursor: pointer;

        & > li{
          text-align: center;
          margin: 5px 0;
        box-shadow: var(--shadow2);

        }
        & > li:hover {
          background-color: var(--blue1);
        }
      }
      #searchIconDown {
        width: 25px;
        height: 25px;
        border-radius: 0 50% 50% 0;
        background-color: white;
      }
      #searchIconUp {
        width: 20px;
        height: 25px;
        border-radius: 50% 0 0 50%;
        background-color: white;
      }
    }
  }
}
</style>