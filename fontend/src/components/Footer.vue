<template>
  <footer>
    <div id="footContainer">
      <div>
        <i class="iconfont icon-boke fengche"></i>
        <span>{{ blogInf.blogName }}</span>
      </div>
      <div id="heartBeatBox">
        <i class="iconfont icon-heart-rate-full" style="color: red"></i>
        <span>{{ blogInf.startTime }}</span>
      </div>
      <a href="https://beian.miit.gov.cn/" target='_blank'><i class="iconfont icon-beian"></i> {{ blogInf.recordNumber }}</a>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      blogInf: {},
    };
  },
  methods: {
    async GetBlogInf() {
      let result = await this.$http.get("/blog");
      this.blogInf = result.data[0];
    },
  },
  mounted() {
    this.GetBlogInf();
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 780px) {
  #footContainer > div:nth-child(1) {
    display: none;
  }
}
footer {
  height: 100%;
  width: 100%;
  background-color: var(--blue2);
  box-shadow: var(--shadow2);
  text-align: center;
  #footContainer {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > div {
      padding: 5px;
      margin: 5px 5px;
      white-space: nowrap;
      i {
        display: inline-block;
        font-size: 18px;
      }
    }
    #heartBeatBox {
      height: 100%;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        margin: 0 10px;
      }
    }
    .fengche {
      animation: fengche 1s linear infinite;
    }
    .heartBeat {
      animation: heart 0.5s infinite;
    }
    @keyframes fengche {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes heart {
      0% {
        font-size: 18px;
      }
      100% {
        font-size: 20px;
      }
    }
  }
}
</style>