import Vue from "vue";
import VueRouter from "vue-router";
import config from "./config.js";
import store from "../store/index.js"
// 1 安装
Vue.use(VueRouter);
// 2 创建路由对象
let router  = new VueRouter(config);

router.beforeEach(function(to,from,next){
    if(to.meta.auth){
        // 需要登陆才能访问
        if(store.state.loginUser.isLoading){
            next({name: 'Auth',query: {returnurl: to.fullPath}});
        }else if(store.state.loginUser.data){
            next();  // 允许进入
        }else {
            next({name: 'Login'})
        }
    } else{
        // 都可以进入
        next();
    }
});

export default router;