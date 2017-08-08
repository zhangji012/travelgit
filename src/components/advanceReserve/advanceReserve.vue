<template>
  <div>
    <div class="title-top"></div>
    <div class="title">
      <router-link v-bind:to="'/'">
        <i class="icon iconfont icon-left"></i>
      </router-link>
      <h3>事前申请</h3>
    </div>
    <div class="content">
      <div class="empty" v-show="empty">
        <img src="../../common/img/deppon-car.png" width="267px" height="274px">
        <div>没有申请数据</div>
      </div>
      <article class="travel-list" v-show="!empty"  v-for="item in passed_items" track-by="$index" @click="localTo(item.claimNo)">
        <router-link v-bind:to="'/advanceReserve/advanceReserveSecond'">
        <p>您的申请审批<span style="color: #ffb266">通过啦</span></p>
        <p>{{item.startDate}}-{{item.endDate}}</p>
        <p>目的地：<span >{{item.destination}}</span></p>
        <p class="last-p">{{item.claimNo}}</p>
          <i class="icon iconfont icon-right" ></i>
        </router-link>
      </article>
      <p class="scheduled-text" v-show="!empty">已结束的申请单</p>
      <article class="travel-list" v-show="!empty" v-for="item in scheduled_items" @click="localTo(item.claimNo)">
        <router-link v-bind:to="'/advanceReserve/advanceReserveSecond'">
        <p>您已预定</p>
        <p>{{item.startDate}} - {{item.endDate}}</p>
        <p>目的地：<span >{{item.destination}}</span></p>
        <p class="last-p">{{item.claimNo}}</p>
          <i class="icon iconfont icon-right" ></i>
        </router-link>
      </article>
    </div>
    <loading v-show="loadingShow"></loading>
    <!--<noData v-show="noDataShow"  :noDataMessage="noDataMessage"></noData>-->
  </div>

</template>
<script type="text/ecmascript-6">
  import loading from '../loading/loading.vue';
//  import noData from '../noData/noData.vue';
  export default {
    props: [],
    data() {
      return {
        empty: true,
        loadingShow: true,
//        noDataShow: false,
//        noDataMessage: '暂无事前申请数据',
        passed_items: [],
        scheduled_items: [],
        user: {
          empName: '',
          apiPath: '',
          token: '',
          email: '',
          phone: '',
          tokenSend: '',
          userId: '',
          endorsementID: '',
          XCflag: '',   // 初始化跳转到那个页面
          YXflag: ''   // 初始化跳转到那个页面
        }
      };
    },
    created() {
      let _this = this;
      this.loadingShow = true;
//      this.user.empName = localStorage.getItem('travel-empName');
      this.user.apiPath = localStorage.getItem('travel-apiPath');
//      this.user.phone = localStorage.getItem('travel-phone');
      this.user.userId = localStorage.getItem('travel-userId');
      this.user.token = localStorage.getItem('travel-token');
//      this.user.tokenSend = localStorage.getItem('travel-tokenSend');
//      this.user.endorsementID = localStorage.getItem('travel-endorsementID');
//      + '&token=' + this.user.token
//      alert(_this.user.apiPath + '/dpm/dpm/fssc_getPriorApplication.action?applyEmpNo=' + _this.user.userId + '&' + _this.user.token);
      this.$http.get(_this.user.apiPath + '/dpm/dpm/fssc_getPriorApplication.action?applyEmpNo=' + _this.user.userId + '&' + _this.user.token).then(function(res) {
//      this.$http.get(this.user.apiPath + '/dpm/dpm/fssc_getPriorApplication.action?applyEmpNo=152116').then(function(res) {
//        console.log(res);
        let data = res.body;
        if (data !== null && data.length > 0) {
          _this.empty = false;
          _this.loadingShow = false;
          for (let i = 0, num = data.length; i < num; i++) {
            // data[i].orderState == 0, 2 ,3表示全部预定
            if (data[i].orderState === '0' || data[i].orderState === '2' || data[i].orderState === '3') {
              _this.scheduled_items.push(data[i]);
            } else if (data[i].orderState === '1' || data[i].orderState === '4') {
              _this.passed_items.push(data[i]);
            }
          }
        } else {
          _this.empty = true;
          _this.loadingShow = false;
        }
      }, function() {
        _this.empty = true;
        _this.loadingShow = false;
        console.log('请求失败处理');
      });
    },
    methods: {
      localTo: function (claimNo) {
        localStorage.setItem("travel-endorsementID", claimNo);
      }
    },
    components: {
      loading
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl";
  .content{
    position absolute
    left 0
    top 46px
    right 0px
    bottom 0px
    overflow-x hidden
    overflow-y auto
    .empty{
      center()
      >div{
        text-align center
        margin-top: 30px
        font-size: 20px
        color: #999;
      }
    }
    .scheduled-text { font-size: 12px; color: #999; padding: 0 3%; margin: 20px 0 11px 0; }
    .travel-list{
      margin 8px 8px 0 8px
      padding 12px
      background-color #ffffff
      border-radius 5px
      color #3d3d3d
      position relative
      p{
        margin-bottom 16px
      }
//        这边last-child 没有效果？？？
      .last-p{
        margin-bottom 0px
      }
      .icon-right{
        v-center()
        right 8px
        font-size 24px
        color #c8c8c8
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
  .ios-device .content{
    top 66px!important
  }

</style>
