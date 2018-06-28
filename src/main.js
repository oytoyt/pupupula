// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import router from './router';

import axios from 'axios';
import wx from 'weixin-js-sdk';

import util from "./assets/js/util";
import store from "./assets/js/store";
// css
import 'animate.css';
import 'weui';

Vue.use(VueRouter);
Vue.config.productionTip = false;


new Vue({
  router,
  components: { App },
  template: "<App/>",
  beforeCreate() {
    util.asyncRootPx();
    let params;

    util.asyncRootPx();
    params = util.search();
    // console.log(params);
    if(params) {
      store.params.set(params);
    }
  },
  created() {
    const that = this;
  },
  methods: {
  },
  render: fn => fn(App)
}).$mount("#app")
