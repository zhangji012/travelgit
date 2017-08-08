<template>
  <div class="title">
    <i class="icon iconfont icon-left" @click="goBack()"></i>
    <h3>{{title}}</h3>
  </div>
</template>
<script type="text/ecmascript-6">
  import VueRouter from 'vue-router';
  import App from '../../App.vue';

  export default {
    props: {
      title: {
        type: String
      }
    },
    methods: {
      goBack: function () {
        // 子组件中触发父组件方法ee并传值cc12345,ee相当于一个中间传输通道,取什么值都一样
//        this.$emit('ee', 'cc12345');
//        window.history.back();
        let routes = [
          {path: '/', name: 'index', component: App}
        ];
        let router = new VueRouter({
          // 'linkActiveClass': 'active',
          routes // （缩写）相当于 routes: routes
        });
        router.push('/');

      }
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  @import "../../common/stylus/mixin.styl";
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
</style>
