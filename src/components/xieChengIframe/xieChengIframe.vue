<template>
  <!--这个页面不需要，后面删除掉，测试其他方法用的-->
  <div class="iframe-content">
    <!--这边用form提交跳转 @submit.prevent="submit" -->
    <form ref="authForm" id="authForm" action="https://ct.ctrip.com/m/SingleSignOn/H5SignInfo?opentype=iframe" method="post" target="_self">
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
  export default {
    props: [],
    data() {
      return {
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
      this.user.empName = localStorage.getItem('travel-empName');
      this.user.apiPath = localStorage.getItem('travel-apiPath');
      this.user.email = localStorage.getItem('travel-email');
      this.user.phone = localStorage.getItem('travel-phone');
      this.user.userId = localStorage.getItem('travel-userId');
      this.user.token = localStorage.getItem('travel-token');
      this.user.tokenSend = localStorage.getItem('travel-tokenSend');
      this.user.endorsementID = localStorage.getItem('travel-endorsementID');
      this.user.XCflag = localStorage.getItem('travel-XC-flag');
//      console.log(this.user);
      //  $nextTick 获取更新后的DOM
      this.$nextTick(() => {
        this.$refs.authForm.submit();
//        console.log('111');
      });
    }
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
