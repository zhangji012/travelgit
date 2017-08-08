<template>
  <div class="iframe-content">
    <iframe v-bind:src="src" ref="authForm"></iframe>
  </div>
</template>
<script type="text/ecmascript-6">
  import MD5 from 'js-md5';
  import VueRouter from 'vue-router';
  import personSelfReserve from '../../components/personSelfReserve/personSelfReserve';
  import advanceReserveThird from '../../components/advanceReserve/advanceReserveSecond/advanceReserveThird/personSelfReserve';
  export default {
    data() {
      return {
        src: '',
//          026659/019094   aaaaaa1!
        user: {
          empName: '杨森',
          apiPath: '',
          token: '',
          email: '',
          phone: '17721030677',
          tokenSend: '',
          userId: '019094',
          endorsementID: '',
          YXflag: ''   // 初始化跳转到那个页面
        }
      };
    },
    created() {
      let routes = [
        {path: '/personSelfReserve', name: 'personSelfReserve', component: personSelfReserve},
//        {path: '/youXingIframe2', name: 'youXingIframe2', component: youXingIframe2},
        {path: '/advanceReserve/advanceReserveSecond/advanceReserveThird', name: 'advanceReserveThird', component: advanceReserveThird}
      ];
      let router = new VueRouter({
        // 'linkActiveClass': 'active',
        routes // （缩写）相当于 routes: routes
      });
      let _this = this;
      this.user.empName = localStorage.getItem('travel-empName');
      this.user.apiPath = localStorage.getItem('travel-apiPath');
      this.user.email = localStorage.getItem('travel-email');
      this.user.phone = localStorage.getItem('travel-phone');
      this.user.userId = localStorage.getItem('travel-userId');
      this.user.token = localStorage.getItem('travel-token');
      this.user.tokenSend = localStorage.getItem('travel-tokenSend');
      this.user.endorsementID = localStorage.getItem('travel-endorsementID');
      this.user.YXflag = localStorage.getItem('travel-YX-flag');
      let empnameMD5 = MD5(this.user.empName);
//      019094
      //let signMD5 = MD5(this.user.userId + MD5(this.user.empName) + '6E26F0CA');
      let signMD5 = MD5(this.user.userId + MD5(this.user.empName) + '667@Dafq');
      // 测试秘钥 6E26F0CA；667@Dafq    企业corpcode  SS201706210001  SS201707260003
      this.src = 'http://h5.ubtrip.com.cn:8110/#login-single-page?user=' + this.user.userId +
        '&name=' + empnameMD5 + '&sign=' + signMD5  + '&type=' + this.user.YXflag + '&corpcode=SS201707260003';

      this.$nextTick(() => {
        window.addEventListener('message',function(e){
          if(e.data === 'back_sfapp') {
            if(_this.user.endorsementID === '') {
              router.push('/personSelfReserve');
            } else {
              router.push('/advanceReserve/advanceReserveSecond/advanceReserveThird');
            }
          }
        },false);
      });
    },
    props: []
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .iframe-content{
    position absolute
    top 0%
    left 0%
    right 0%
    bottom 0%
    iframe{
      height 100%
      width 100%
    }
  }
</style>
