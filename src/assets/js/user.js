import request from "./request";
import constant from "./constant";
import store from "./store";
import wxconfig from "./wxconfig";
import helper from "./helper";

function saveTemplateUserMsg(cb) {
  const uinfo = store.userInfo.get();
  let params = {
    templateId: constant.templateId.dail,
    openId: uinfo.openId,
    nickname: uinfo.nickname,
    headimg: uinfo.headImgUrl
  };
  request.post("/Wordcup/saveUser", params)
    .then(resp => {
      store.tempInfo.set(resp.data);
      cb && cb(resp.data);      
    })
    .catch(err => {
      console.log(err);
      helper.toastErr(err.msg || "保存数据失败");
    });
}

export default {
  initTempInfo(cb) {
    const info = store.userInfo.get();
    let params = {
      openId: info.openId,
      templateId: constant.templateId.dail
    };
    request.get("/Wordcup/getUser", params)
    .then(resp => {
      if (resp.status == constant.OK && !resp.data) {
        saveTemplateUserMsg(cb);
        return;
      }
      store.tempInfo.set(resp.data);
      cb && cb(resp.data);
    })
    .catch(err => {
      console.log(err);
      helper.toastErr(err.msg);
    });
  }
}