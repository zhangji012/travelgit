<template>
    <div class="noData">
      <div class="wrap">
        <figure>
          <img src="./noData.png" width="120" height="127">
          <figcaption>{{noDataMessage}}</figcaption>
        </figure>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      noDataMessage: {
        type: String
      }
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .noData{
    position absolute
    left 0px
    right 0px
    top 46px
    bottom 0px
    background-color #e8e7ed
    z-index 100
    .wrap{
      position relative
      height 100%
      width 100%
      figure{
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        color #b2b4c3
        text-align center
        figcaption{
          margin-top 18px
        }
      }
    }
  }
  .ios-device .noData{
    top 66px!important
  }
</style>
