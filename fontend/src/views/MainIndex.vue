<template>
  <div id="Container">
    <div id="swiper">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!-- <div class="swiper-slide" v-for="item in pictureList" :key="item._id"><img :src="item.imgsrc" alt=""></div> -->
          <div class="swiper-slide"><img src="../assets/1.jpg" alt="" /></div>
          <div class="swiper-slide"><img src="../assets/2.jpg" alt="" /></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <!-- <div class="swiper-button-prev"></div> -->
        <!-- <div class="swiper-button-next"></div> -->

        <!-- 如果需要滚动条 -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </div>

    <div class="glass box1">
        
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  data() {
    return {
      pictureList: [],
    };
  },
  async created() {
    let result = await this.$http.get("/carousel");
    this.pictureList = result.data;
    console.log(this.pictureList);
  },
  updated() {
    new Swiper(".swiper-container", {
      direction: "horizontal",
      loop: true,
      //   autoplay:true,

      // 如果需要分页器
      pagination: ".swiper-pagination",

      // 如果需要前进后退按钮
      //   nextButton: ".swiper-button-next",
      //   prevButton: ".swiper-button-prev",

      // 如果需要滚动条
      //   scrollbar: ".swiper-scrollbar",
    });
  },
};
</script>
<style lang="scss" scoped>
#Container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  #swiper {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
    }
  }
  .glass {
    position: absolute;
    z-index: 999;
    background-color: rgba($color: #ffffff, $alpha: 0.5);
    backdrop-filter: blur(5px);
  }
  .box1 {
    top: 10%;
    left: 8%;
    width: 430px;
    height: 500px;
    border-radius: 15px;
    box-shadow: 0 0 10px 4px rgba(90, 90, 90, 0.3);
    padding: 10px;
  }
  
  
}
</style>