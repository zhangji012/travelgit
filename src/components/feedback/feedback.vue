<template>
    <div>
      <div class="title-top"></div>
      <header-title :title="title"></header-title>
      <noData :noDataMessage="noDataMessage"></noData>
    </div>
</template>
<script type="text/ecmascript-6">
  import headerTitle from '../headerTitle/headerTitle.vue';
  import noData from '../noData/noData.vue';
  export default {
    props: [],
    data() {
      return {
        title: '意见反馈',
        noDataShow: true,
        noDataMessage: '功能暂未开放'
      };
    },
    methods: {

    },
    components: {
      headerTitle,
      noData
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .ios-device .title-top{
    height 20px;
    background-color #363d64
  }

</style>
