import config from '../../config';

export default {
  asyncRootPx() {
    let oHtml = document.querySelector('html')
    oHtml.style.fontSize = `${oHtml.offsetWidth / 23.4375}px`
  },
  routeTo(name) {
    location.href = `#/${name}`;
  },
  setTitle(title){
    let oTitle = document.querySelector("title");
    oTitle.innerHTML = title;
  },
  setSessionStorage(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val));
  },
  getSeesionStorage(key) {
    let params = sessionStorage.getItem(key);
    return params ? JSON.parse(params) : null;
  },
  removeSessionStorage(key) {
    sessionStorage.removeItem(key);
  },
  assign(target) {
    'use strict';
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  },
  concat(target){
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    for(let i = 1, len = arguments.length;i < len; i++) {
      target = target.concat(arguments[i]);
    }
    target = Array.from(new Set(target));

    return target;
  },
  gaSendPageView(hash) {
    let sourcePreffix = "/mwordcup/";
    let source = sourcePreffix + (hash ? hash : "");
    if(config.debug){ return false; }

    try {
      ga('set', 'page', source);
      ga('send', 'pageview');
    } catch (error) {
      console.log("ga is undefined");
    }
  },
  trim(str) {
    return str ? str.replace(/^\s*/, '').replace(/\s*$/, '') : str;
  },
  search() {
    let search = location.search.slice(1);
    if(!search){ return false; }
    search = search.split('&');
    let temp = {}
    search.forEach((v) => {
      v = v.split('=') 
      temp[v[0]] = decodeURIComponent(this.trim( v[1]).replace('/', '') );
    })
    return temp
  },
}