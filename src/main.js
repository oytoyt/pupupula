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
import wxconfig from './assets/js/wxconfig';
// css
import 'animate.css';
import 'weui';

Vue.use(VueRouter);
Vue.config.productionTip = false;

function wxConfig(config, jsApiList = []){
  let defaultJsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'showOptionMenu'];
  jsApiList = util.concat(jsApiList, defaultJsApiList);

	wx.config({
  	// debug: true,
	  appId: config.appId,
	  timestamp: config.timestamp || 0,
	  nonceStr: config.nonceStr,
	  signature: config.signature,
	  jsApiList: jsApiList
	});
}

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
    that._wxConfig();
    wxconfig.initWxShare();
  },
  methods: {
    _wxConfig() {
      let url = encodeURIComponent(location.href.split('#')[0]);
      axios.get(`/Baide/wxconfig?signUrl=${url}`)
      .then(resp => {
        resp = resp.data;
        const SUCCESS = 0, FAIL = 1;

        resp.status == FAIL ? 
        console.log("errMsg: ", resp.msg) : 
        wxConfig(resp.data, ['openLocation', 'getLocation', 'scanQRCode', 'chooseWXPay', 'closeWindow', 'hideAllNonBaseMenuItem']);
      })
    }
  },
  render: fn => fn(App)
}).$mount("#app")
