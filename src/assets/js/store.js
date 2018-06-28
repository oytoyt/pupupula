import util from './util';

const prefix = 'wordcup';
const userInfoKey = `${prefix}_userinfo`;
const tempUserInfoKey = `${prefix}_tempinfo`;
const priceInfoKey = `${prefix}_priceinfo`;
const paramsInfoKey = `${prefix}_paramsinfo`;

function _sessionStorage(key) {
  return {
    set(data) { util.setSessionStorage(key, data); },
    get() { return util.getSeesionStorage(key); },
    remove() {
      util.removeSessionStorage(key);
    }
  }
}

export default {
  params:  _sessionStorage(paramsInfoKey),
  price:  _sessionStorage(priceInfoKey),
  userInfo:  _sessionStorage(userInfoKey),
  tempInfo:  _sessionStorage(tempUserInfoKey)
}