import axios from "axios";
import qs from "qs";

export default {
  get(url, data) {
    return new Promise((resolve, reject) => {
      let params = qs.stringify(data);
      axios.get(url + "?" + params)
      .then(resp => {
        let res = resp.data;
        resolve(res);
      })
      .catch(err => {
        console.log("未知错误", err);
        resolve(err);
      });
    });
  },
  post(url, data) {
    return new Promise((resolve, reject) => {
      let params = qs.stringify(data);
      axios.post(url, params)
      .then(resp => {
        let res = resp.data;
        resolve(res);
      })
      .catch(err => {
        console.log("未知错误", err);
        resolve(err);
      });
    });
  },
  put(url, data) {
    return new Promise((resolve, reject) => {
      let params = qs.stringify(data);
      axios.put(url, params)
      .then(resp => {
        let res = resp.data;
        resolve(res);
      })
      .catch(err => {
        console.log("未知错误", err);
        resolve(err);
      });
    });
  }
}