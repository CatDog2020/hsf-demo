<template>
  <div id="app">
    <Header />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";


export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<style scoped>
.container{
  margin: 30px auto;
}
</style>
