import weui from "weui.js";

const _toast = (option, isSuccess) => {
  if(isSuccess){
    weui.toast(option || "操作成功");
  }else{
    weui.dialog({
      content: option || "操作失败"
    });
  }
};

export default {
  toastErr(option) {
    const isSuccess = false;
    _toast(option, isSuccess);
  },
  toastSuc(option) {
    const isSuccess = true;
    _toast(option, isSuccess);
  },
  breakSignal({isError, data = null}) {
    return Promise.reject({ isError, data });
  }
}