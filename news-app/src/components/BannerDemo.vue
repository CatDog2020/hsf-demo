<template>
  <el-carousel :interval="2000" arrow="always" height="350px">
    <el-carousel-item v-for="(item,i) in banners" :key="i">
      <a :href="item.link" target="_blank">
        <img :src="item.url" />
      </a>
    </el-carousel-item>
  </el-carousel>
</template>
<script>
export default {
  data() {
    return {
      banners: [
        {
          link: "https://www.baidu.com",
          url: require("../assets/img/banner1.jpg")
        },
        {
          link: "https://www.baidu.com",
          url: require("../assets/img/banner2.jpg")
        },
        {
          link: "https://www.baidu.com",
          url: require("../assets/img/banner3.jpg")
        }
      ]
    };
  }
};
</script>
<style>
img {
  height: 100%;
  width: 1080px;
}
</style>