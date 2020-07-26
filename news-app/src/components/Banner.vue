<template>
  <div class="banner-container" @mouseenter="autoStop" @mouseleave="autoStart">
    <ul
      class="images"
      :style="{
        width: imgList.length * 100 + '%',
        marginLeft: -index * 100 + '%'
        }"
    >
      <li v-for="(img,i) in imgList" :key="i">
        <a :href="img.link" target="_blank">
          <img :src="img.url" />
        </a>
      </li>
    </ul>
    <ul class="dots">
      <li
        class="dot"
        v-for="(dot,i) in imgList.length"
        :key="i"
        :class="{active : index === i}"
        @click="index = i"
      ></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    imgList: {
      type: Array,
      required: true
    },
    // myImgList: {
    //   type: Array,
    //   required: true
    // },
    duration: {
      type: Number,
      default: 2000
    }
  },
  computed: {
    myImgList (){
      return [...this.imgList,this.imgList[0]]
    }
  },
  data() {
    return {
      index: 0,
      timer: null,
    };
  },
  methods: {
    autoStart() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.index = (this.index + 1) % this.imgList.length;
      }, this.duration);
      
    },
    autoStop() {
      clearInterval(this.timer);
      this.timer = null;
    }
  },
  created() {
    this.autoStart();
  },
  destroyed() {
    this.autoStop();
  }
};
</script>

<style scoped>
.banner-container {
  height: 350px;
  position: relative;
  overflow: hidden;
}
.banner-container li {
  display: block;
  width: 1080px;
  height: 100%;
  float: left;
}
.images {
  height: 100%;
  transition: 0.5s;
}
.banner-container img{
    width: 1080px;
    height: 100%;
}
.dots {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: flex;
}
.dots li {
  width: 10px;
  cursor: pointer;
  height: 10px;
  margin: 0 3px;
  border-radius: 50%;
  border: 1px solid;
  color: #fff;
}
.dots li.active {
  background: #fff;
}
</style>