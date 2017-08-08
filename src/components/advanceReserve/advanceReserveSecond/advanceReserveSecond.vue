<template>
    <div>
      <div class="title-top"></div>
      <div class="title">
        <router-link v-bind:to="'/advanceReserve'">
          <i class="icon iconfont icon-left"></i>
        </router-link>
        <h3>事前申请</h3>
      </div>
      <div class="content">
        <div class="plane-detail" v-if="planeList" v-for="item in planeList" >
          <p class="trip">
            <span>{{item.flightOrderInfo.startCity}}</span>
            <span class="time-detail">{{item.flightOrderInfo.bizStartTime}}-{{item.flightOrderInfo.bizEndTime.substr((item.flightOrderInfo.bizEndTime).indexOf('.')+1)}}</span>
            <span>{{item.flightOrderInfo.endCity}}</span>
          </p>
          <p class="line"></p>
          <p class="applicant">
              <span>出差申请人: {{item.flightOrderInfo.empName}}({{item.flightOrderInfo.empNo}})</span>
          </p>
          <router-link v-bind:to="'/advanceReserve/advanceReserveSecond/advanceReserveThird'">
            <span class="btn"
                  @click="toBook(item.flightOrderInfo.orderState,item.claimLineId,'FlightSearch', 'flight')"
                  v-show="item.flightOrderInfo.orderState===1 || item.flightOrderInfo.orderState===4">去预定</span>
          </router-link>
        </div>
        <!--ng-repeat="item in hotelList"-->
        <div class="hotel-detail" v-if="hotelList" v-for="item in hotelList">
          <div class="time-address">
            <span >{{item.hotelOrderInfo.bizStartTime}}-{{item.hotelOrderInfo.bizEndTime.substr((item.hotelOrderInfo.bizEndTime).indexOf('.')+1)}}</span>
            <span>入住</span>
          </div>
          <p class="check-city" >{{item.hotelOrderInfo.stayCity}}</p>
          <p class="applicant">
            <span>出差申请人:  {{item.hotelOrderInfo.empName}}({{item.hotelOrderInfo.empNo}})</span>
          </p>
          <router-link v-bind:to="'/advanceReserve/advanceReserveSecond/advanceReserveThird'">
            <span class="btn"
                  @click="toBook(item.hotelOrderInfo.orderState,item.claimLineId,'HotelSearch','hotel')"
                  v-show="item.hotelOrderInfo.orderState===1 || item.hotelOrderInfo.orderState===4">去预定</span>
          </router-link>
        </div>
        <div class="total">
          <div class="total-wrap">
            <div class="days">
              <p>{{totalDays}}天</p>
              <p>预计总天数</p>
            </div>
            <div class="">
              <p>{{totalFee}}元</p>
              <p>预计总费用</p>
            </div>
          </div>
          <div class="draft-time">起草日期：<span >{{applyDate}}</span></div>
        </div>
      </div>
      <loading v-show="loadingShow"></loading>
      <noData v-show="noDataShow"  :noDataMessage="noDataMessage"></noData>
    </div>
</template>
<script type="text/ecmascript-6">
  import loading from '../../loading/loading.vue';
  import noData from '../../noData/noData.vue';
  export default {
    props: [],
    data() {
      return {
        loadingShow: true,
        noDataShow: false,
        noDataMessage: '暂无数据',
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
        },
        applyDate: '',
        startDate: [],
        endDate: [],
        planeList: [],  // 飞机
        hotelList: [],  // 酒店
        totalFee: '',
        totalDays: ''
      };
    },
    created() {
      let _this = this;
      this.user.empName = localStorage.getItem('travel-empName');
      this.user.apiPath = localStorage.getItem('travel-apiPath');
      this.user.email = localStorage.getItem('travel-email');
      this.user.phone = localStorage.getItem('travel-phone');
      this.user.userId = localStorage.getItem('travel-userId');
      this.user.token = localStorage.getItem('travel-token');
      this.user.tokenSend = localStorage.getItem('travel-tokenSend');
      setTimeout(() => {
        this.user.endorsementID = localStorage.getItem('travel-endorsementID'); // 订单信息
//        alert(_this.user.apiPath + '/dpm/dpm/fssc_getAllInfo.action?claimNo=' + _this.user.endorsementID +'&' + _this.user.token );
//
        _this.$http.get(_this.user.apiPath + '/dpm/dpm/fssc_getAllInfo.action?claimNo=' + _this.user.endorsementID +'&' + _this.user.token ).then(function(res) {
//          console.log(res);
//      this.$http.get('http://10.224.196.19:8080/dpm/dpm/fssc_getAllInfo.action?claimNo=' + this.user.endorsementID + '&' + this.user.token).then(function(res) {
          let data = res.data;
          if (data !== null && data.detailInfoList !== null && data.detailInfoList !== undefined && data.detailInfoList.length > 0) {
            _this.loadingShow = false;
            _this.totalFee = data.totalCost;
            _this.applyDate = data.applyDateStr;
            for (let i = 0, num = data.detailInfoList.length; i < num; i++) {
              if (data.detailInfoList[i].scName !== undefined && data.detailInfoList[i].scName !== null && data.detailInfoList[i].scNo === '104002003') {
                _this.planeList.push(data.detailInfoList[i]);
                if (_this.startDate.indexOf( data.detailInfoList[i].flightOrderInfo.bizStartTime ) === -1) {
                  _this.startDate.push(data.detailInfoList[i].flightOrderInfo.bizStartTime);
                }
                if (_this.endDate.indexOf(data.detailInfoList[i].flightOrderInfo.bizEndTime) === -1) {
                  _this.endDate.push(data.detailInfoList[i].flightOrderInfo.bizEndTime);
                }
              } else if (data.detailInfoList[i].scName !== undefined && data.detailInfoList[i].scName !== null && data.detailInfoList[i].scNo === '104002002') {
                _this.hotelList.push(data.detailInfoList[i]);
                if (_this.startDate.indexOf(data.detailInfoList[i].hotelOrderInfo.bizStartTime)) {
                  _this.startDate.push(data.detailInfoList[i].hotelOrderInfo.bizStartTime);
                }
                if (_this.endDate.indexOf(data.detailInfoList[i].hotelOrderInfo.bizEndTime) === -1) {
                  _this.endDate.push(data.detailInfoList[i].hotelOrderInfo.bizEndTime);
                }
              }
            }

            let min_temp, max_temp, temp, min_array = [], max_array = [];
            for (let i = 0, num = _this.startDate.length; i < num; i++) {
              if (i === 0) {
                min_temp = _this.startDate[i];
                continue;
              }
              if ((_this.startDate[i] + '').indexOf('.') !== -1 && (min_temp + '').indexOf('.') !== -1) {
                temp = _this.startDate[i].split(".");
                if (temp.length < 3) continue;
                min_array = min_temp.split(".");
                if (min_array.length < 3) continue;
                if (new Date(min_array[0], min_array[1], min_array[2]).getTime() > new Date(temp[0], temp[1], temp[2]).getTime()) {
                  min_temp = _this.startDate[i];
                  continue;
                }
              }
            }
            for (let i = 0, num = _this.endDate.length; i < num; i++) {
              if (i === 0) {
                max_temp = _this.endDate[i];
                continue;
              }
              if ((_this.endDate[i] + '').indexOf('.') !== -1 && (max_array + '').indexOf('.') !== -1) {
                temp = _this.endDate[i].split(".");
                if (temp.length < 3) continue;
                max_array = max_temp.split(".");
                if (max_array.length < 3) continue;
                if (new Date(max_array[0], max_array[1], max_array[2]).getTime() < new Date(temp[0], temp[1], temp[2]).getTime()) {
                  max_temp = _this.endDate[i];
                  continue;
                }
              }
            }
            if ((min_temp + '').indexOf('.') !== -1 && (max_temp + '').indexOf('.') !== -1) {
              min_array = min_temp.split(".");
              max_array = max_temp.split(".");
              _this.totalDays = Math.ceil((new Date(max_array[0], max_array[1], max_array[2]).getTime() - new Date(min_array[0], min_array[1], min_array[2]).getTime()) / (24 * 60 * 60 * 1000));
            }
            if (_this.totalDays === 0) {
              _this.totalDays = 1;
            }
          }
          else {
            _this.loadingShow = false;
            _this.noDataShow = true;
          }
        }, function() {
          _this.loadingShow = false;
          _this.noDataShow = true;
          console.log('请求失败处理');
        });
        console.log(_this.planeList);

      });

    },
    methods: {
      toBook: function (status, claimLineId, type1, type2) {
        if (status === 1 || status === 4) {
          localStorage.setItem("endorsementID", claimLineId);
          localStorage.setItem("travel-XC-flag", type1);
          localStorage.setItem("travel-YX-flag", type2);
          localStorage.setItem("toBook", "toBook");
        }
      }
    },
    components: {
      loading,
      noData
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../../common/stylus/index.styl";
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

  .content {
    position absolute
    left 0
    top 46px
    right 0px
    bottom 0px
    overflow-x hidden
    overflow-y auto
    color #3d3d3d
    font-size 14px
    >div{
      margin 20px 10px 0 10px
      background-color #ffffff
      border-radius 5px
      padding 12px 15px 16px 15px
      position relative
      .btn{
        padding 9px 24px
        background-color #fec60a
        color #ffffff
        font-weight bold
        border-radius 5px
        position absolute
        bottom 5px
        right 15px
      }

    }
    .plane-detail{
      .trip{
        height 70px
        width 100%
        display table
        position relative
        background url(./arrow.png) no-repeat center 30px/143px auto, url(./11.png) no-repeat center 13px/20px auto
        span:first-of-type, span:last-of-type{
          font-size 1.4rem
          font-weight bold
          display table-cell
          width 28%
          vertical-align middle
          text-align center
        }
        .time-detail{
          position absolute
          width 143px
          height 14px
          line-height 14px
          font-size 0.8rem
          text-align center
          h-center()
          top 40px
        }
      }
      .line{
        border-1px(#d5d5d5)
      }
      .applicant{
        margin-top 15px

      }
    }
    .hotel-detail{
      .time-address{
        height 20px
        line-height 20px
        background url("44.png") no-repeat
        background-size 20px 19px
        padding-left 30px
      }
      .check-city{
        font-size 1.4rem
        font-weight bold
        padding 17px 0
      }
      .applicant{

      }
    }
    .total{
      .total-wrap{
        width 100%
        height 80px
        display flex
        >div{
          flex 1
          position relative
          >p{
            text-align center
            width 100%
          }
          p:first-of-type{
            font-size 2rem
            font-weight bold
            h-center()
            top 20%
          }
          p:last-of-type{
            h-center()
            bottom 6%
          }
        }
        .days{
          border-right 1px solid #d5d5d5
        }
      }
      .draft-time{
        text-align center
        margin-top 30px
      }
    }
  }
  .ios-device .content{
    top 66px!important
  }
  @media screen and (max-width:340px) {
    .btn{
      padding 9px 18px!important
    }
  }

</style>
