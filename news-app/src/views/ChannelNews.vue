<template>
  <div>
    <div class="type-title">
      {{ channelName }}
    </div>
    <Loading v-if="isLoading" />
    <NewsList v-else :news="news" />
    <Pager :page="page" :total="total" :limit="limit" :panelNumber="panelNumber" @pageChange="handleChange" />
  </div>
</template>

<script>
import Pager from "../components/Pager.vue";
import NewsList from "../components/news/NewsList.vue";
import {getNewsChannels,getNews} from "../services/newsService";
import Loading from "../components/Loading.vue";

export default {
  components: {
    Pager,
    NewsList,
    Loading,
  },
  data(){
    return {
      limit: 15,
      total: 0,
      panelNumber: 9,
      news: [],
      isLoading: true,
    }
  },
  computed:{
    page(){
      return +this.$route.query.page || 1;
    },
    channelName() {
      let channels = this.$store.state.channels.data;
      if(channels.length > 0){
        let channel = channels.find(item => item.channelId === this.$route.params.id)
        return channel.name;
      }
      return '';
    },
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler(){
        this.setDates();    
      }
    }
  },
  methods:{
    handleChange(newPage){
      this.$router.push({
        query: {
          page: newPage
        }
      });
      this.setDates();
    },
    // 设置频道名称
    // async setChannelName(){
    //   let channels = await getNewsChannels();
    //   let channel = channels.find(item => item.channelId === this.$route.params.id)
    //   this.channelName = channel.name;
    // },
    //  设置所有新闻相关数据
    async setDates(){
      this.isLoading = true;
      let resp = await getNews(this.$route.params.id, this.page, this.limit);
      this.news = resp.contentlist;
      this.total = resp.allNum;
      this.isLoading = false;
    }
  },
}
</script>

<style scoped>
.type-title{
  font-size: 2em;
  color: #888;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>