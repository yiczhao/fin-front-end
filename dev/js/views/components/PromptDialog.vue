<template>
  <div class="kdialog-mask" v-if="show">
    <background-mask :class="!mask && 'kno-mask'">
      <div class="kdialog-mask-shadow">
        <div class="kprompt-dialog" :class="'kprompt-dialog--' + type">
          <div class="kprompt-dialog__icon-wrap">
            <div class="kprompt-dialog__icon-rounds">
              <div class="kprompt-dialog__icon-entity iconfont"
                   :class="typeMap[type].icon"
              ></div>
            </div>
          </div>
          <div class="kprompt-dialog__content">
            <h4 class="title" v-text="title">标题</h4>
            <p class="content" v-text="content">提示内容</p>
          </div>
          <div class="kprompt-dialog__btnwrap">
            <k-button type="dark" :ghost="true" v-if="cancel"
                      size="xl" style="width: 90px;display: inline-block"
                      @kclick="show = false"
            >取消</k-button>
            <k-button :type="typeMap[type].btn" size="xl"
                      style="width: 90px;display: inline-block"
                      @kclick="eventBridge"
            >确定</k-button>
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
      return {
        typeMap: {
          success: {icon: 'icon-chenggongtubiao', btn: 'success'},
          error: {icon: 'icon-cuowutubiao', btn: 'danger'},
          warn: {icon: 'icon-cuowutubiao', btn: 'warning'},
          info: {icon: 'icon-.xinxitubiao', btn: 'primary'}
        }
      }
    },
    props: {
      cancel: {type: Boolean, default: false},
      show: {type: Boolean, default: false},
      type: {type: String, default: 'success'},
      mask: {type: Boolean, default: false},
      content: {type: String, default: 'this is content!'},
      title: {type: String, default: 'title'}
    },
    methods: {
      /**
       * @description 配置提示框
       * @param cancel 是否有取消按钮
       * @param type 提示框类型 四种 success error warn info
       * @param mask 是否开启背景遮罩
       * @param content 提示内容
       * @param title 提示标题
       */
      config ({
        cancel,
        type,
        mask,
        content,
        title
      }) {
        this.cancel = cancel
        this.type = type
        this.mask = mask
        this.content = content
        this.title = title
      },
      /**
       * @description 事件桥接器
       */
      eventBridge () { this.okCallback(arguments) },
      /**
       * @description 显示提示框
       * @param okCb 确定按钮回调
       */
      dialogShow (okCb) {
        this.okCallback = okCb
        this.show = true
      },
      /**
       * @description 关闭提示框
       */
      dialogClose () { this.show = false }
    },
    components: {
      KButton,
      BackgroundMask
    }
  }
</script>

<style lang="sass">
  @import "../../../style/bootstrap";

  $kdialog-height: 240px;
  $kdialog-width: 480px;

  $kdialog-icon-size: 98px;

  $kdialog-type: (
    success: #66BB6A,
    error: #E53935,
    warn: #F4511E,
    info: #42A5F5,
  );

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

  // 生成不同对话框
  @each $type, $colors in $kdialog-type {
    .kprompt-dialog--#{$type} {
      // 圆框颜色
      .kprompt-dialog__icon-rounds {
        border: 4px solid $colors;
      }
      // 图标颜色
      .kprompt-dialog__icon-entity {
        color: $colors;
      }
    }
  }

  @include b(kprompt-dialog) {
    margin: -#{$kdialog-height} auto 0;overflow: hidden;
    border-radius: 2px;padding: 15px;
    box-shadow: 1px 1px 6px #AEAEAE;
    width: $kdialog-width;
    background: #FFF;

    // 图标区域
    @include e(icon-wrap) {
      padding: 15px;text-align: center;
    }
    // 边框样式
    @include e(icon-rounds) {
      border-radius: 50%;
      text-align: center;line-height: $kdialog-icon-size;

      @include inline-block();
      @include size($kdialog-icon-size);
    }
    // 图标样式
    @include e(icon-entity) {
      line-height: $kdialog-icon-size / 1.5;
      font-size: 36px;

      @include inline-block();
      @include  size($kdialog-icon-size / 1.5)
    }

    // 文字内容区域
    @include e(content) {
      text-align: center;

      .title {font-size: 20px;font-weight: normal;margin: 9px 30px 20px}
      .content {font-size: 14px;margin: 0;padding: 0 15px 20px;}
    }

    // 按钮区包裹体
    @include e(btnwrap) {
      text-align: center;
    }
  }
  .kno-mask { background: transparent!important }
</style>
