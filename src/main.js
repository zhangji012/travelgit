// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
// import ElementUI from 'element-ui';
import personSelfReserve from './components/personSelfReserve/personSelfReserve';
import advanceReserve from './components/advanceReserve/advanceReserve';
import advanceReserveSecond from './components/advanceReserve/advanceReserveSecond/advanceReserveSecond';
import advanceReserveThird from './components/advanceReserve/advanceReserveSecond/advanceReserveThird/personSelfReserve';
import orderCenter from './components/orderCenter/orderCenter';
import useHelp from './components/useHelp/useHelp';
import feedback from './components/feedback/feedback';
import youXingIframe from './components/youXingIframe/youXingIframe';
import xieChengIframe from './components/xieChengIframe/xieChengIframe';
import './common/stylus/index.styl';

// 安装 "VueRouter"这个插件
/* eslint-disable no-new */
Vue.use(VueRouter);
Vue.use(VueResource);
// Vue.use(ElementUI);
let routes = [
  {path: '/personSelfReserve', name: 'personSelfReserve', component: personSelfReserve},
  {path: '/advanceReserve', name: 'advanceReserve', component: advanceReserve},
  {path: '/advanceReserve/advanceReserveSecond', name: 'advanceReserveSecond', component: advanceReserveSecond},
  {path: '/advanceReserve/advanceReserveSecond/advanceReserveThird', name: 'advanceReserveThird', component: advanceReserveThird},
  {path: '/advanceReserve/advanceReserveSecond/advanceReserveThird/youXingIframe', name: 'advanceReserveThirdToyouXingIframe', component: youXingIframe},
  {path: '/advanceReserve/advanceReserveSecond/advanceReserveThird/xieChengIframe', name: 'advanceReserveThirdToxieChengIframe', component: xieChengIframe},
  {path: '/orderCenter', name: 'orderCenter', component: orderCenter},
  {path: '/useHelp', name: 'useHelp', component: useHelp},
  {path: '/feedback', name: 'feedback', component: feedback},
  {path: '/personSelfReserve/youXingIframe', name: 'personSelfReserveToyouXingIframe', component: youXingIframe},
  {path: '/personSelfReserve/xieChengIframe', name: 'personSelfReserveToyouxieChengIframe', component: xieChengIframe},
  {path: '/', name: 'index', component: App}
];
// , children: [{path: '/xieCheng', component: xieCheng}]
let router = new VueRouter({
  // 'linkActiveClass': 'active',
  routes // （缩写）相当于 routes: routes
});
// Vue.prototype.GLOBAL = {
//   empName: '',
//   apiPath: 'http://10.224.196.19:8080',
//   token: '',
//   email: '',
//   phone: '',
//   tokenSend: '',
//   userId: '',
//   endorsementID: '',
//   initpage: 'FlightSearch'   // 初始化跳转到那个页面
// };
let app = new Vue({
  el: '#app',
  data() {
    return {
      transitionName: 'slide'
    };
  },
  router,
  watch: {
    // 监视路由，参数为要目标路由和当前页面的路由
    // '$route' (to, from) {
    //   const toDepth = to.path.split('/').length;
    //   // 官方给出的例子为 const toDepth = to.path.split('/').length 由于现在只有两个路由路径'/'和'/detail'
    //   // 按照官方给的例子，这两个路由路径深度都为 2 ，所以，这里稍作调整，不知道有什么不妥
    //   // 但目前在这个demo中能正常运行，如果知道更好的方法，欢迎留言赐教
    //   const fromDepth = from.path.substring(0, from.path.length - 2).split('/').length;
    //   this.transitionName = toDepth <= fromDepth ? 'slide_back' : 'slide';
    //   // 根据路由深度，来判断是该从右侧进入还是该从左侧进入
    // }
  }
});
router.push('/');

let hasClass = function (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
};
let addClass = function (obj, cls) {
  if (!hasClass(obj, cls)) obj.className += " " + cls;
};

if(window.androidApi == undefined){
  window.onload = function(){
    addClass(document.body, 'ios-device');
  }
}


export default app;

