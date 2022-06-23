<template>
  <div id="websiteContainer">
    <div class="websiteContent">
      <div
        class="contentItem"
        v-for="(item, index) in contentItem"
        :key="index"
      >
        <div class="contentTittle">{{ item.type }}</div>
        <div class="websiteList">
          <a
            class="custom-btn btn-14"
            v-for="element in item.itemList"
            :key="element._id"
            :href="element.website"
            target="_blank"
            >{{ element.websiteName }}</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      websiteList: [],
      contentItem: [],
    };
  },
  created() {
    this.GetWebsiteList();
  },
  methods: {
    async GetWebsiteList() {
      let result = await this.$http.get("/website");
      this.websiteList = result.data;
      let typeList = [];
      this.websiteList.forEach((item) => {
        if (!typeList.includes(item.type)) typeList.push(item.type);
      });
      typeList.forEach((item) => {
        let websiteItem = {};
        (websiteItem.type = item), (websiteItem.itemList = []);
        this.websiteList.forEach((element) => {
          if (element.type === websiteItem.type) {
            websiteItem.itemList.push(element);
          }
        });
        this.contentItem.push(websiteItem);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
#websiteContainer {
  width: 100%;
  height: 100%;
  box-shadow: var(--shadow2);
  line-height: 30px;
  letter-spacing: 1px;

  .websiteContent {
    width: 100%;
    min-height: 100%;
    background-color: var(--blue2);
    box-shadow: var(--shadow2);
    padding: 15px;
    line-height: 30px;
    .contentItem {
      width: 100%;
      display: flex;
      flex-direction: column;
      .contentTittle {
        width: 100%;
        margin: 10px 0 5px 0;
      }
      .websiteList {
        width: 100%;
      }
    }
    a {
      margin: 10px;
    }
    .custom-btn {
      box-sizing: content-box;
      color: #fff;
      border-radius: 5px;
      padding: 4px 10px;
      font-family: "Lato", sans-serif;
      font-weight: 500;
      background: transparent;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      display: inline-block;
      box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
      outline: none;
    }
    .btn-14 {
      background: var(--blue3);
      border: none;
      z-index: 1;
    }
    .btn-14:after {
      position: absolute;
      content: "";
      width: 100%;
      height: 0;
      top: 0;
      left: 0;
      z-index: -1;
      border-radius: 5px;
      background-color: #04bdfb;
      background-image: linear-gradient(315deg, #04bdfb 0%, #57bbc1 74%);
      box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
        7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    .btn-14:hover {
      color: #000;
    }
    .btn-14:hover:after {
      top: auto;
      bottom: 0;
      height: 100%;
    }
    .btn-14:active {
      top: 2px;
    }
  }
}
</style>