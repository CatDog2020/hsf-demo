import Vue from 'vue';
import App from './App.vue';
import './assets/style/reset.css';
import './assets/style/global.css';
import router from './routes/index.js';
import store from './store/index.js';

import { Carousel,CarouselItem } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Carousel);
Vue.use(CarouselItem);

// 频道数据一开始就需要获取
store.dispatch('channels/fetchDatas');
store.dispatch('loginUser/whoAmI');

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
