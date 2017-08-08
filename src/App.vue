<template>
  <div>
    <div class="title-top"></div>
    <header class="header">
      <div class="title">
        <i class="icon iconfont icon-left" @click="goBack()"></i>
        <h3>{{title}}</h3>
      </div>
      <div class="content">
          <router-link v-bind:to="'personSelfReserve'">
            <figure>
              <img src="./common/img/header1.png">
              <figcaption>个人自费预订</figcaption>
            </figure>
          </router-link>
          <router-link v-bind:to="'advanceReserve'">
            <figure>
              <img src="./common/img/header2.png">
              <figcaption>事前申请单预订</figcaption>
            </figure>
          </router-link>
          <router-link v-bind:to="'/orderCenter'">
            <figure>
              <img src="./common/img/header3.png">
              <figcaption>订单中心</figcaption>
            </figure>
          </router-link>
      </div>
    </header>
    <div v-show="true" class="mainContent" :class="backgroundImg ? 'backgroundImgNo' : 'backgroundImgHas' ">
      <div v-show="false" class="swiper-container1">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width: 100%">
            <div class="air-wrapper">
              <div class="title">
                <div class="title-left">
                  <div>
                    <p><span>上海海</span> -</p>
                    <p style="padding-right: 18px">虹桥T2</p>
                  </div>
                  <div>
                    <p>北京京</p>
                    <p>虹桥T2</p>
                  </div>
                </div>
                <div class="title-detail">
                  查看订单详情
                </div>
                <div class="price">
                  ¥ 768
                </div>
              </div>
              <div class="timer">
                <i class="iconfont icon-weibiaoti6-copy"></i>
                <span>17-05-03</span>
                <span>20:00 出发</span>
              </div>
              <div class="tool">
                <i class="iconfont icon-weibiaoti6-copy"></i>
                <span>海航 HU7680 经济舱 (波音747)</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">slider2</div>
        </div>
      </div>
      <div v-show="false" class="swiper-container2">
        <div class="swiper-wrapper">
          <div class="swiper-slide" style="width: 100%">
            <div class="air-wrapper">
              <div class="title">
                <div class="title-left">
                  <div>
                    <p>就在酒店</p>
                    <p style="text-align: left">上海虹口区东大路1191号</p>
                  </div>
                </div>
                <div class="title-detail">
                  查看订单详情
                </div>
                <div class="price">
                  ¥ 768
                </div>
              </div>
              <div class="timer">
                <i class="iconfont icon-weibiaoti6-copy"></i>
                <span>17-05-03</span>
                <span>20:00 出发</span>
              </div>
              <div class="tool">
                <i class="iconfont icon-weibiaoti6-copy"></i>
                <span>标准单人间</span>
              </div>
            </div>
          </div>
          <div class="swiper-slide">slider2</div>
        </div>
      </div>
    </div>
    <footer class="footer">
      <span>
        <router-link v-bind:to="'useHelp'">
          使用帮助
        </router-link>
      </span>
      <span>|</span>
      <span>
        <router-link v-bind:to="'feedback'">
          意见反馈
        </router-link>
      </span>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  import Swiper from 'swiper';
  export default {
    data() {
      return {
        title: '差旅助手',
        backgroundImg: true,
        user: {
          empName: '张骥',
//          测试： http://192.168.68.117:8080/         田勇：http://10.224.196.114:8080/    生产： https://dpm.deppon.com:8881
//           var dp_oa_urlIp = "http://192.168.68.117:8080";
//          apiPath: 'http://192.168.68.117:8080/',
          apiPath: 'https://dpm.deppon.com:8881',
          token: '',
          email: '',
          phone: '17717079121',
          tokenSend: '',
          userId: '152116',
          endorsementID: '',
          XCflag: 'Home',   // 初始化跳转到那个页面
          YXflag: 'home'   // 初始化跳转到那个页面
        }
      };
    },
    created() {
      let _this = this;
      let Request = function () {
        let url = window.location.search.substr(1); // 获取url中"?"符后的字串
        let theRequest = {};
        let strs = url.split('&');
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1]);
        }
        return theRequest;
      };
      let content = Request();
      this.user.empName = decodeURIComponent(content.empName);
      let str = content.mobileNo;
      // 有可能有多个电话号码，默认取第一个
      if(str) this.user.phone = str.substr(0,10);
      this.user.userId = content.userId;
      this.user.token = window.location.search.substr(1);
      localStorage.setItem('travel-empName', _this.user.empName);
      localStorage.setItem('travel-apiPath', _this.user.apiPath);
      localStorage.setItem('travel-email', _this.user.email);
      localStorage.setItem('travel-phone', _this.user.phone);
      localStorage.setItem('travel-userId', _this.user.userId);
      localStorage.setItem('travel-token', _this.user.token);

      this.$nextTick(() => {
        this._initSwiper();
      });
    },
    methods: {
      _initSwiper: function () {
//       这边为什么用this
        this.mySwiper = new Swiper('.swiper-container1', {
           // 可选选项，自动滑动
          autoplay: false
        });
        this.mySwiper = new Swiper('.swiper-container2', {
           // 可选选项，自动滑动
          autoplay: false
        });
      },
      generateKey: function (minKey, maxKey) {
        return Math.floor(Math.random() * (maxKey - minKey)) + minKey;
      },
      goBack: function () {
        let deviceType = '';
        if (window.deviceType !== null && window.deviceType !== undefined && window.deviceType !== "undefined") {
          deviceType = window.deviceType;
          localStorage.setItem("deviceType", deviceType);
        } else {
          deviceType = localStorage.getItem("deviceType");
        }
        if (deviceType === "IOS") {
          window.location.href = "js-call://IOS/NavCallBack";
        } else {
          window.androidApi.backCalls();
        }
      }
    },
    components: {}
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixin.styl";
  @import "../static/swiper/swiper.min.css";
  .header{
    height 200px
    background-color #363d64
    color #ffffff
    .content {
      display flex
      text-align center
      font-size 12px
      a{
        flex 1
        color #ffffff
        img {
          padding  30px 0 18px 0
        }
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
      padding 0 20px 0 10px;
    }
  }
  .ios-device .title-top{
    height 20px;
    background-color #363d64
  }
  .mainContent{
    position absolute
    top 200px
    left 0px
    right 0px
    bottom 45px
    color #666666
    font-size 14px
    overflow-x hidden
    overflow-y auto
    &.backgroundImgNo{
    //  ../../
      background url("./common/img/mainBackground.png") no-repeat center
    }
    &.backgroundImgHas{
      background none
    }
    .air-wrapper{
      margin 10px 15px 0 15px
      padding 30px 16px
      background-color #ffffff
      border-radius 5px
      .title{
        position relative
        .title-left{
          >div{
            display inline-block
            p:nth-child(1){
              /*font-size 24px*/
              font-weight bold
              color #363e65
              span{
                /*font-size 24px*/
                font-weight bold
                color #363e65
              }
            }
            p:nth-child(2){
              text-align center
              margin-top 14px
            }
          }
        }

        .title-detail{
          position absolute
          top 0px
          right 0px
          border 1px solid #666666
          border-radius 3px
          padding 5px 10px
        }
        .price{
          position absolute
          bottom  0px
          right 0px
          color #fc625f
        }
      }
      .timer{
        margin-top 40px
      }
      .tool{
        margin-top 12px
      }
    }
  }
  .footer{
    height 45px
    width 100%
    line-height 45px
    font-size 15px
    text-align center
    color #8c91a0
    position absolute
    left 0
    bottom 0

  }
  @media screen and (max-width:340px) {
    .air-wrapper {
      font-size 12px
      .title {
        .title-left {
          > div {
            p:nth-child(1) {
              font-size 18px
              span {
                font-size 18px
              }
            }
          }
        }
      }
    }
  }
  @media screen and (min-width:340px){
    .air-wrapper {
      font-size 14px
      .title {
        .title-left {
          > div {
            p:nth-child(1) {
              font-size 24px
              span {
                font-size 24px
              }
            }
          }
        }
      }
    }
  }

</style>
