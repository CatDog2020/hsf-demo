<template>
  <div class="news-types" v-if="data.length > 0">
    <div
      class="item"
      v-for="item in showChannels"
      :class="{active: chooseId === item.channelId}"
      @click="switchTo(item.channelId)"
      :key="item.channelId"
    >
      <span class="name">{{ item.name }}</span>
    </div>
    <a href="" @click.prevent="isCollapse = !isCollapse">{{ isCollapse ? '展开' : '收起' }}</a>
  </div>
</template>

<script>

import { mapState } from "vuex";

export default {
  data() {
    return {
      isCollapse: true, //当前是否为折叠状态
      chooseId: null
    };
  },
  computed: {
    ...mapState('channels',['data']),
    // 需要显示的频道
    showChannels() {
      if (this.isCollapse) {
        return this.data.slice(0, 8); // 折叠状态只取八个数据
      } else {
        return this.data;
      }
    }
  },
  watch: {
    data: {
      immediate: true,
      handler() {
        if(this.data.length > 0){
          this.switchTo(this.data[0].channelId);
        }
      },
    },
  },
  methods: {
    switchTo(id){
      this.chooseId = id;
      this.$emit('change',id)
    }
  }
};
</script>

<style scoped>
.news-types {
  margin: 30px 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  padding-bottom: 15px;
}
.item {
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-right: 15px;
  margin: 7px 15px 7px 0;
  cursor: pointer;
  position: relative;
}
.item:hover {
  background-color: #ccc;
}
.item.active {
  background-color: #000;
  color: #fff;
}
.news-types a {
  align-self: flex-end;
  margin-bottom: 20px;
  color: #409eff;
}
</style>