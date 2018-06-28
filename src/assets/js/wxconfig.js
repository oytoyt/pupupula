import wx from 'weixin-js-sdk';
import util from './util';
// // import zgio from './zgio';
import store from './store';
import constant from './constant';
import request from './request';

function redirectToWxAuth(){
	let target = '/Baide/auth';
  let from = `${location.search.slice(1)}&origin=${encodeURIComponent(location.origin + location.pathname)}`;
  let hash = `hash=${encodeURIComponent(location.hash.replace(/#\/?/, ''))}`;
  let url = `${target}?${from}&${hash}`;
  location.href = url;
}

function clearUrlParams() {
  location.href = `${location.pathname}${location.hash}`;
}

export default {
  initUserInfo(callback) {
    let isDev = false;
    if(isDev) {
      let uinfo = store.userInfo.get();
      callback && callback(uinfo);
      return false;
    }

    request.get("/Baide/userinfo")
    .then(resp => {
      if(resp.msg == constant.INFO_IS_NULL){
        redirectToWxAuth();
      }
      let uinfo = resp.data;
      store.userInfo.set(uinfo);
      callback && callback(uinfo);
    })
    .catch(err => {
      console.log(err);
    });
  },
  initWxShare(sender = {}) {
    let shareData = {
      title: '比银行卡还牛逼',
      desc: '集齐百得杯全明星球队卡，大把奖品等你换',
      link: location.origin + location.pathname + location.hash,
      imgUrl: "http://cdns.jige.fun/o_1cff5efh61a7qh30ju81b02tbf7.jpeg",  
      success: function (res) {
        // zgio.track("分享成功");
      },
      cancel: function (res) { 
        // zgio.track("取消分享");
      }
    };

    shareData = util.assign(shareData, sender);
    
    wx.ready(function(){
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
      wx.onMenuShareQZone(shareData);
      wx.showOptionMenu();
    });
  }
};