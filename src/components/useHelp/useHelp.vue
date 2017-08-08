<template>
    <div>
      <div class="title-top"></div>
      <header-title :title="title"></header-title>
      <div class="main-wrap">
        <article class="container">
          <section class="row faq">
            <h2>申请<i class="title-ico step1"></i></h2>
            <div class="apply">
              <p>员工通过OA - 报账平台 - 事前申请单 – 差旅费 进行事前申请</p>
              <p>日常差旅—其他：用于差旅费中除机票、酒店之外的其他费用，如出租、公交、大巴、火车、差旅补贴等申请</p>
              <p>日常差旅—国内机票：用于差旅中预订国内机票申请</p>
              <p>日常差旅—国内酒店：用于差旅中预订国内酒店申请</p>
            </div>
            <h2>预订<i class="title-ico step2"></i></h2>
            <div class="reservation">
              <p>申请审批完成后</p>
              <p>通过移动办公 - 差旅助手 - 差旅申请-事前申请预订机票和酒店</p>
            </div>
            <h2>注意事项<i class="title-ico tips"></i></h2>
            <ul class="attention">
              <li>①出差全部通过差旅平台预订机票、酒店，建议提前3-4日预订</li>
              <li>②酒店预订全部选择“预付”房型，公司结算，员工无需付款</li>
              <li>③退改签：在APP/PC端进行操作，且按照携程订单信息要求进行退改，超时无法退订</li>
              <li>④严格按照差旅管理规定执行</li>
              <li>⑤订票等相关咨询请致电携程客服电话：4008206699</li>
              <li>其他疑问请联系总务小组021-39288670</li>
            </ul>
          </section>
          <aside>
            <i class="triangle tg1"></i>
            <i class="triangle tg2"></i>
            <i class="triangle tg3"></i>
          </aside>
        </article>
      </div>
    </div>
</template>
<script type="text/ecmascript-6">
  import headerTitle from '../headerTitle/headerTitle.vue';
  export default {
    props: [],
    data() {
      return {
        title: '使用帮助'
      };
    },
    methods: {

    },
    components: {
      headerTitle
    }
  };
</script>
<style scoped rel="stylesheet/stylus" lang="stylus">
  .main-wrap{
    position absolute
    left 0px
    right 0px
    top 46px
    bottom 0px
    overflow-y auto
    overflow-x hidden
  }
  .ios-device .main-wrap{
    top 66px!important
  }
  .container { position: relative; }
  .row { padding: 20px 20px 20px 8px; }
  .faq { color: #999; }
  h2 { position: relative; margin-bottom: 10px; padding-left: 80px; line-height: 70px; color: #000; font-size: 30px; font-weight: 500; }
  i { display: inline-block; }
  .title-ico { position: absolute; left: -8px; width: 70px; height: 70px; background: url(../../common/img/steps.png) no-repeat; -webkit-background-size: 70px auto; background-size: 70px auto;  }
  .title-ico.step2 { background-position: 0 -70px; }
  .title-ico.tips { background-position: 0 -140px; }
  .apply p { text-indent: 2em; }
  .apply p:first-child { text-indent: 0; }
  p, li { line-height: 1.8em; }
  .faq > div, .faq > ul { padding-left: 80px; background-repeat: no-repeat; background-position: left center; -webkit-background-size: 63px; background-size: 63px;  }
  .apply { background-image: url(../../common/img/icon01.png); }
  .reservation { margin: 20px 0; background-image: url(../../common/img/icon02.png); }
  .attention { background-image: url(../../common/img/icon03.png); }
  aside { display: block; position: relative; height: 140px; width: 100%; overflow: hidden;  margin-top: 20px; }
  .triangle { position: absolute; z-index: 9; border-style: solid; border-color: transparent; }
  .tg1 { border-width: 75px 40px 80px 100px; left: -15%; bottom: 0; border-bottom-color: rgba(53,156,215,.22); }
  .tg2 { border-width: 80px 78px 140px 140px; left: 15%; bottom: 0; border-bottom-color: rgba(53,156,215,.22); }
  .tg3 { border-width: 80px 50px 80px 125px; left: 60%; bottom: 0; border-bottom-color: rgba(53,156,215,.61); }
</style>
