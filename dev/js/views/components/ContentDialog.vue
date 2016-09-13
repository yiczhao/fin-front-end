<template>
  <div class="kdialog-mask" v-if="show">
    <background-mask :class="!mask && 'kno-mask'">
      <div class="kdialog-mask-shadow">
        <div class="kdialog">
        <div :class="'kdialog__header kdialog__header--' + type" v-show="title!=''">
          <h3 class="title" v-text="title">标题</h3>
          <div class="kdialog__close icon-cross2"
               @click="show = false"
          ></div>
        </div>
        <p class="kdialog__content">
          <slot></slot>
        </p>
        <div class="kdialog__btnwrap">
          <k-button class="r" :type="type" size="xl"
                    style="width: 90px;margin-left: 5px;"
                    @kclick="$emit('kok')"
          >确定</k-button>
          <k-button class="r" type="dark" :ghost="true"
                    size="xl" style="width: 90px;"
                    @kclick="$emit('kcancel')" v-if="isCancel"
          >取消</k-button>
        </div>
      </div>
      </div>
    </background-mask>
  </div>
</template>

<script>
  import KButton from './KButton.vue'
  import BackgroundMask from './BackgroundMask.vue'

  export default{
    data () {
      return { }
    },
    props: {
      isCancel: {type: Boolean, default: true},
      show: {type: Boolean, default: true, twoWay: true},
      type: {type: String, default: 'primary', twoWay: true},
      mask: {type: Boolean, default: false, twoWay: true},
      title: {type: String, default: 'title', twoWay: true}
    },
    methods: { },
    components: {
      KButton,
      BackgroundMask
    }
  }
</script>

<style lang="sass">
  @import "../../../style/bootstrap";

  $kdialog-width: 560px;
  $kdialog-close-size: 32px;

  // 垂直居中
  .kdialog-mask {
    writing-mode: vertical-lr;
    text-align: center;
  }
  .kdialog-mask-shadow {
    writing-mode: horizontal-tb;
    display: inline-block;
    text-align: left;
    width: 100%;
  }

  @include b(kdialog) {
    margin-top: 10px;
    border-radius: 2px;
    box-shadow: 1px 1px 6px #AEAEAE;
    width: $kdialog-width;
    background: #FFF;

    @include center-translate();

    // 头部样式
    @include e(header) {
      position: relative;padding: 20px;
      border-radius: 2px 2px 0 0;
      color: #FFF;font-size: 16px;

      // 产生不同颜色的 header
      @each $type, $colors in $global-colors {
        @include m($type) {
          background: nth($colors, 3);
      }
    }

      // 标题样式
      .title {
        margin: 0;

        @include inline-block();
    }
  }

    // 关闭按钮样式
    @include e(close) {
      position: absolute;right: 20px;top: 50%;
      margin-top: -#{$kdialog-close-size /2};
      border-radius: 50%;
      line-height: $kdialog-close-size;
      text-align: center;color: rgba(255, 255, 255, .8);
      cursor: pointer;

      // 模拟按钮 hover active effect
      &:hover {background: #F13F3B;color: #FFF}
      &:active {background: #E33439;color: #FFF}

      @include inline-block();
      @include size($kdialog-close-size);
  }

    // 内容区样式
    @include e(content) {
      padding: 20px 20px 0 20px;margin: 0;
      color: $global-text-light;font-size: 17px;
  }

    // button 区域
    @include e(btnwrap) {
      height: 80px;width: 100%;
      padding: 20px;
      box-sizing: border-box;
  }
  }
  .kno-mask { background: transparent }
</style>
