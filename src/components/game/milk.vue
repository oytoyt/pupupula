<template>
  <div id="milk" class="route">
    <canvas class="top" @touchstart="start" @touchmove.prevent="move" @touchend="end"></canvas>
    <div class="bottom">
      <ul class="type">
        <li v-for="item in typeList" :key="item.id" v-text="item.name" @touchstart="changeType(item.id)"></li>
      </ul>
      <ul class="selList clearfix">
        <li v-for="item in activeList"><img :src="item" @click="setImg"></li>
      </ul>
    </div>
    <button @click="clearAllCanvas">清除</button>
    <button @click="saveCanvas">保存</button>
  </div>
</template>

<script>
import weui from "weui.js";
import util from "../../assets/js/util";
import user from "../../assets/js/user";
import helper from "../../assets/js/helper";
import request from "../../assets/js/request";
import wxconfig from "../../assets/js/wxconfig";
import constant from "../../assets/js/constant";

export default {
  name: "milk",
  data() {
    return {
      uinfo: {},
      tinfo: {},

      typeList: [
        { name: "表情", id: 0 }, 
        { name: "文字", id: 1 }
      ],
      
      materialList: [
        ["http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_up/14.50de1.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/01.304a9.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/06.2775e.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/01.304a9.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/face/06.2775e.png"],
        ["http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/02.a48bb.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/04.65973.png", "http://pupupula.net/spring/res/raw-assets/resources/PNG/Male/body_low/03.b5daa.png"],
        ["http://cdns.jige.fun/o_1ceo8c6ai9pf1ldoerj205g4q1f.png"]
      ],
      activeList: [],
      // 保存图片路径
      imgList: [],
      // 保存图片实例
      imgListArr: [],

      // 保存canvas元素
      canElList: [],
      // 活动的canvas元素
      active: {},
      // 删除元素
      delEl: {},

      canvas: null,
      ctx: null
    };
  },
  beforeCreate() {
    util.setTitle("激情百得杯");
    util.gaSendPageView("milk");
  },
  created() {
    const that = this;
    wxconfig.initUserInfo(uinfo => {
      that.uinfo = uinfo;
      user.initTempInfo(info => {
        that.tinfo = info || {};
        that.changeType();
      });
    });
    that.preLoadImg();
    that.checkEl();
  },
  methods: {
    setImg(ev) {
      let index = this.imgListArr.indexOf(ev.target.src);
      let oImg = this.imgList[index];
      this.canElList.push({ e: oImg, x: 100, y: 100, w: 100, h: 100 });
      this.setCanvas();
    },
    start(ev) {
      console.log("start", ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      var x = ev.changedTouches[0].clientX;
      var y = ev.changedTouches[0].clientY;
      // 循环，寻找符合的元素
      let t = this.delEl;
      if(t.x && x >= t.x && x <= t.x + t.w && y >= t.y && y <= t.y + t.h){
        this.canElList.splice(t.i, 1);
        this.setCanvas();
        return;
      }
      for(let i = this.canElList.length - 1 , len = this.canElList.length ; i >= 0 ; i--){
        let temp = this.canElList[i];
        if(x < temp.x || x > temp.x + temp.w || y < temp.y || y > temp.y + temp.h){ continue; }
        this.active = { i: this.canElList.length - 1, x, y, e: temp.e };
        let _temp = this.canElList.splice(i, 1);
        this.canElList.push(_temp[0]);
        return;
      }
      this.setCanvas();
    },
    move(ev) {
      console.log("move", ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      let a = this.active;
      if(!a.e){ return; }
      let x = ev.changedTouches[0].clientX;
      let y = ev.changedTouches[0].clientY;
      let now = this.canElList[a.i];
      let dX = now.x + (a.x - x) * -1;
      let dY = now.y + (a.y - y) * -1;
      this.canElList[a.i] = Object.assign({}, now, { x: dX, y: dY });
      this.active.x = x;
      this.active.y = y;
      this.setCanvas(true);
    },
    end(ev) {
      let a = this.active;
      if(!a.e){ return; }
      console.log("end", ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);
      let x = ev.changedTouches[0].clientX;
      let y = ev.changedTouches[0].clientY;
      let now = this.canElList[a.i];
      let dX = now.x + a.x - x;
      let dY = now.y + a.y - y;
      this.canElList[a.i] = Object.assign({}, now, { x: dX, y: dY });
      this.setCanvas(true);
      this.active = {};
      // this.setCanvas();
    },
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    saveCanvas() {
      let imgSrc = this.canvas.toDataURL("image/jpeg", 1);
      console.log(imgSrc);
    },
    setCanvas(flag) {
      this.clearCanvas();
      let a = this.active;
      let arr = this.canElList;
      for(let i = 0 , len = arr.length ; i < len ; i++){
        let temp = arr[i];
        this.ctx.drawImage(temp.e, temp.x, temp.y, temp.w, temp.h);
      }
      if(flag && a && a.e){
        let el = this.canElList[a.i];
        let t = this.delEl = {
          t: this.imgList[this.imgList.length - 1],
          i: a.i,
          x: el.x - 20,
          y: el.y + el.h,
          w: 20,
          h: 20
        };
        this.ctx.lineWidth = 3;
        this.ctx.fillStyle = "blue";
        this.ctx.strokeRect(el.x - 10, el.y - 10, 120, 120);
        this.ctx.drawImage(t.t, t.x, t.y, t.w, t.h);
      }
    },
    getCanvas() {
      const that = this;
      let _context = that.canvas = document.querySelector("canvas");
      _context.width = _context.clientWidth;
      _context.height = _context.clientHeight;
      let _ctx = that.ctx = _context.getContext("2d");
      that.ctx.save();
    },
    changeType(id = 0) {
      console.log(id);
      this.activeList = this.materialList[id];
    },
    preLoadImg() {
      let arr = this.materialList;
      let _arr = [];
      let __arr = [];
      let index = 0;
      let length = 0;
      for(let i = 0 , len = arr.length ; i < len ; i++){
        let temp = arr[i];
        for(let j = 0 , _len = temp.length ; j < _len ; j++){
          length++;
          __arr.push(temp[j]);
          _arr.push(new Image());
          // _arr[_arr.length - 1].crossOrigin = "anonymous";
          _arr[_arr.length - 1].src = temp[j];
          _arr[_arr.length - 1].onload = () => { index++; }
          _arr[_arr.length - 1].onerror = () => { index++; }
        }
      }
      this.imgList = _arr;
      this.imgListArr = __arr;
      let time = setInterval(() => {
        if(index == length){
          clearInterval(time);
          console.log("ok");
          return;
        }
      }, 50);
    },
    checkEl() {
      const that = this;
      let time = setInterval(() => {
        let el = document.querySelector("#milk");
        if(el){
          that.getCanvas();
          clearInterval(time);
        }
      }, 100);
    },
    clearAllCanvas() {
      this.clearCanvas();
      this.canElList = [];
    }
  }
};
</script>

<style>
  #app, #app > .route{ background: none; }
</style>
