<template>
  <div>
    <BannerDemo />
    <!-- <Banner :imgList="banners" :duration="1500" /> -->
    <Channels @change="handleChange" />
    <Loading v-show="isLoading" />
    <NewsList v-show="!isLoading" :news="news" />

  </div>
</template>

<script>
// import Banner from "../components/Banner.vue";
import Channels from "../components/news/Channels.vue";
import NewsList from "../components/news/NewsList.vue";
import Loading from "../components/Loading.vue";
import Center from "../components/Center.vue";
import NotFound from "./NotFound.vue";

import { getNews } from "@/services/newsService.js";

import BannerDemo from '../components/BannerDemo'


export default {
  components: {
    // Banner,
    Channels,
    NewsList,
    Loading,
    Center,
    NotFound,
    BannerDemo
  },
  data() {
    return {
      // banners: [
      //   {
      //     link: "https://www.baidu.com",
      //     url: require("../assets/img/banner1.jpeg")
      //   },
      //   {
      //     link: "https://www.baidu.com",
      //     url: require("../assets/img/banner2.jpeg")
      //   },
      //   {
      //     link: "https://www.baidu.com",
      //     url: require("../assets/img/banner3.jpeg")
      //   }
      // ],
      news: [],
      isLoading: true
    };
  },
  methods: {
    handleChange(channelId) {
      this.isLoading = true;
      getNews(channelId, 1, 10).then(resp => {
        this.news = resp.contentlist;
      });
      this.isLoading = false;
    }
  }
};
</script>

<style scoped>
</style>