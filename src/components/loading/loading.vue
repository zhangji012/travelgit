<template>
    <div class="loading">
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: []
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .loading{
    position absolute
    left 0px
    right 0px
    top 46px
    bottom 0px
    background url("./loading.gif") no-repeat center
    background-color #ffffff
    z-index 100
  }
  .ios-device .loading{
    top 66px!important
  }
</style>
