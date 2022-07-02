<template>
  <div v-if="TotalPage > 1" id="paginationBox">
    <button v-if="TotalPage >= 2" id="lastPage" @click="JumpPage(-1)">
      上一页
    </button>
    <button class="page">1</button>
    <div v-if="TotalPage >= 2" class="ellipsis">...</div>
    <!-- 中间 -->
    <div id="pageList" @click="ClickPage">
      <button
        class="page"
        :id="clickNum === item ? 'active' : ''"
        v-for="item in Page"
        :key="item"
      >
        {{ item }}
      </button>
    </div>
    <!-- 下半部分 -->
    <div v-if="TotalPage >= 2" class="ellipsis">...</div>
    <button class="page">{{ TotalPage }}</button>
    <button v-if="TotalPage >= 2" id="nextPage" @click="JumpPage(1)">
      下一页
    </button>
    <div id="totalNum">总共 {{ totalNumber }} 篇</div>
  </div>
</template>
<script>
export default {
  name: "Pagination",
  props: ["totalNumber", "pageSize", "continuePage"],
  data() {
    return {
      clickNum: 1,
      currenPage: 0,
      totalPages: 0,
      TotalPage: 0,
    };
  },
  computed: {
    //   计算分页数
    Page() {
      let { TotalPage, continuePage, pageSize } = this;
      TotalPage = Math.ceil(this.totalNumber / pageSize);
      let list = [];
      console.log(typeof continuePage);
      let pageBoundary = Math.ceil(continuePage / 2);
      console.log(pageBoundary);
      if (continuePage < TotalPage) {
        for (
          let i = this.clickNum;
          i < this.clickNum + continuePage;
          i++
        ) {
          list.push(i);
        }
        console.log(list);
      }
      return list.length ? list : TotalPage;
    },
  },
  methods: {
    //   点击分页
    ClickPage($event) {
      const target = $event.target;
      if (target.style.cursor === "not-allowed") return;
      if (target.tagName === "BUTTON") {
        this.clickNum = parseInt(target.innerHTML);
        target.style.cursor = "not-allowed";
      }

      this.$emit("ClickPage", this.clickNum);
    },
    // 点击上下一页
    JumpPage(num) {
      this.clickNum += num;
      if (this.clickNum > TotalPage) {
        this.clickNum = 1;
      }
      if (this.clickNum < 1) {
        this.clickNum = TotalPage;
      }
      this.$emit("ClickPage", this.clickNum);
    },
    HoverButton($event) {
      let target = $event.target;
      if (target.tagName === "BUTTON") {
        if (this.clickNum === parseInt(target.innerHTML)) {
          target.style.cursor = "not-allowed";
        } else {
          target.style.cursor = "pointer";
        }
      }
    },
  },
  mounted() {
    let pageList = document.querySelector("#pageList");
    // console.log(pageList);
    if (pageList) pageList.addEventListener("mouseover", this.HoverButton);
  },
};
</script>
<style lang="scss" scoped>
#paginationBox {
  width: 100%;
  background: rgb(130, 156, 146);
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  .page {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    margin: 0 5px;
    border-radius: 5px;
  }
  .ellipsis {
    display: inline-block;
    width: 30px;
    height: 30px;
    text-align: center;
  }
  button {
    border-radius: 5px;
    margin: 0 5px;
    background-color: rgb(161, 191, 252);
    cursor: pointer;
  }
  #active {
    background: rgb(88, 141, 240);
  }
  #totalNum {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
    background: rgb(161, 191, 252);
  }
  #pageList {
    display: inline-block;
    padding: 5px;
    border-radius: 5px;
  }
}
</style>