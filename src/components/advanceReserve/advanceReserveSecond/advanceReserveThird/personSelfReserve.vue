<template>
    <div>
      <!--这边跳转路径为变量用vue还不会，会了之后，这块和前面的合并, 这个两个给跳转到首页-->
      <div class="title-top"></div>
      <div class="title">
          <router-link v-bind:to="'/advanceReserve/advanceReserveSecond'">
            <i class="icon iconfont icon-left"></i>
          </router-link>
          <h3>事前预定申请</h3>
        </div>
      <div class="content-wrapper">
        <div class="avatar">
          <img src="./xieCheng.png" width="67" height="67">
        </div>
        <div class="content" @click="goToXC()">
          <p>携程</p>
          <p>携程在手说走就走</p>
          <p class="ellipsis">优惠信息,优惠信息机票 5.3 折 VIP专享</p>
            <i class="icon iconfont icon-right" ></i>
        </div>
      </div>
      <a v-bind:href="src" v-show="android">
        <div class="content-wrapper">
          <div class="avatar">
            <img src="./youXing.png" width="67" height="67">
          </div>
          <div class="content">
            <p>优行</p>
            <p>差旅解决方案提供商</p>
            <p class="ellipsis">优惠信息,优惠信息机票 5.3 折 VIP专享</p>
              <i class="icon iconfont icon-right" @click=""></i>
          </div>
        </div>
      </a>

      <router-link v-bind:to="'/advanceReserve/advanceReserveSecond/advanceReserveThird/youXingIframe'" v-show="!android">
        <div class="content-wrapper">
          <div class="avatar">
            <img src="./youXing.png" width="67" height="67">
          </div>
          <div class="content">
            <p>优行</p>
            <p>差旅解决方案提供商</p>
            <p class="ellipsis">优惠信息,优惠信息机票 5.3 折 VIP专享</p>
            <i class="icon iconfont icon-right" @click=""></i>
          </div>
        </div>
      </router-link>

      <!--这边用form提交跳转 @submit.prevent="submit" -->
      <form ref="authForm1" id="authForm1" action="https://ct.ctrip.com/m/SingleSignOn/H5SignInfo?opentype=iframe" method="post" target="_self">
        <input type="hidden" name="accessuserid" value="obk_deppon1"/>
        <!--<input type="hidden" id="employeeid" name="employeeid" value="W00000"/><br/>-->
        <input type="hidden" id="employeeid" name="employeeid" v-bind:value="user.userId"/><!--提供的老用户名W00000-->
        <input type="hidden" id="token" name="token" v-bind:value="user.tokenSend"/>
        <input type="hidden" name="appid" value="deppon1"/>
        <input type="hidden" id="endorsementID" name="endorsementID" v-bind:value="user.endorsementID"/>
        <!--这个是酒店还是飞机什么的参数-->
        <input type="hidden" id="initpage" name="initpage" v-bind:value="user.XCflag"/>
        <!-- 携程左上角返回按钮跳转链接 -->
        <!-- http://ct.ctrip.com/m/ 这边返回时为什么是到首页-->
        <input type="hidden" name="CallBack" value="javascript:window.history.go(-2);" />
      </form>
    </div>
</template>
<script type="text/ecmascript-6">
  import headerTitle from '../../../headerTitle/headerTitle.vue';
  import MD5 from 'js-md5';

  export default {
    props: [],
    data() {
      return {
//        title: '事前预定申请',
        android: false,
        src: '',
        user: {
          empName: '',
          apiPath: '',
          token: '',
          email: '',
          phone: '',
          tokenSend: '',
          userId: '',
          endorsementID: '',
          XCflag: 'Home',   // 初始化跳转到那个页面
          YXflag: 'home'   // 初始化跳转到那个页面
        }
      };
    },
    created() {
      if(window.androidApi == undefined){
        this.android = false;
      } else {
        this.android = true;
      }
      this.user.empName = localStorage.getItem('travel-empName');
      this.user.apiPath = localStorage.getItem('travel-apiPath');
      this.user.email = localStorage.getItem('travel-email');
      this.user.phone = localStorage.getItem('travel-phone');
      this.user.userId = localStorage.getItem('travel-userId');
      this.user.token = localStorage.getItem('travel-token');
      this.user.XCflag = localStorage.getItem('travel-XC-flag');
      this.user.YXflag = localStorage.getItem('travel-YX-flag');
      setTimeout(() => {
        let empnameMD5 = MD5(this.user.empName);
//      019094
        //let signMD5 = MD5(this.user.userId + MD5(this.user.empName) + '6E26F0CA');
        let signMD5 = MD5(this.user.userId + MD5(this.user.empName) + '667@Dafq');
        // 测试秘钥 6E26F0CA； 企业corpcode  SS201706210001   SS201707260003
        //this.src = 'http://h5.ubtrip.com.cn:8101/#login-single-page?user=' + this.user.userId +
          //'&name=' + empnameMD5 + '&sign=' + signMD5  + '&type=' + this.user.YXflag + '&corpcode=SS201706210001';
        this.src = 'http://h5.ubtrip.com.cn:8110/#login-single-page?user=' + this.user.userId +
          '&name=' + empnameMD5 + '&sign=' + signMD5  + '&type=' + this.user.YXflag + '&corpcode=SS201707260003';
      });

    },
    methods: {
      goToXC: function () {
        let _this = this;
        this.$http.post(_this.user.apiPath + '/dpm/dpm/sso_queryTravelAdvanceApply.action?' + _this.user.token, {}).then(function(res) {
          let data = res.data;
//          console.log(data.Token);
          _this.user.tokenSend = data.Token;
          _this.$nextTick(() => {
            _this.$refs.authForm1.submit();
          });

        }, function() {
          console.log('请求失败处理');
        });
      }
    },
    components: {
//      headerTitle
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  // 这个地方路径查询webpack中是可以配置的，配置完后不需要自己搞
  @import "../../../../common/stylus/mixin.styl";
  .content-wrapper{
    padding 16px
    margin-bottom 10px
    position relative
    background-color #ffffff
    .avatar{
      display inline-block
      vertical-align top
    }
    .content{
      display inline-block
      margin-left 20px
      >p{
        margin-bottom 10px
        font-size 12px
        fontColor()
      }
      p:nth-child(1){
        debangBlue()
        font-size 16px
      }
      p:nth-child(3){
        margin-bottom 0
//        ellipsis()
      }
      .icon-right{
        v-center()
        right 15px
        color #dbdbdb
        padding 30px 0
      }
    }
  }
  .title{
    height 46px
    line-height 46px
    text-align center
    position relative
    background-color #363d64
    color #ffffff
    h3{
      font-size 18px
      line-height 46px
      font-weight bold
    }
    .iconfont {
      v-center()
      left 0
      font-size 24px
      color #ffffff
      padding 0 20px 0 10px;
    }
  }
  .ios-device .title-top{
    height 20px;
    background-color #363d64
  }
  @media screen and (max-width:340px) {
    .content-wrapper{
      .content{
        p:nth-child(3){
          max-width 170px
          word-wrap: break-word;
          word-break: normal;
        }

      }
    }
  }
  @media screen and (min-width:340px){
    .content-wrapper{
      .content{
        p:nth-child(3){
          max-width 220px
          word-wrap: break-word;
          word-break: normal;
        }

      }
    }
  }
</style>
