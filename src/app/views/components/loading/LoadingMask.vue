<template>
  <div class="kloading-mask" v-if="loading">
    <i class="spiner icon-spinner2"></i>
  </div>
</template>

<script>
  import eventBus from '../eventBus'

    export default{
        data () {
            return {loading: 0}
        },
        created () {
            eventBus.$on('AJAX_REQUEST', () => {
                this.loading++;
            });
            eventBus.$on('AJAX_RESPONSE', () => {
                if(this.loading >0){
                    this.loading--;
                }
            });
        }
    }
</script>

<style lang="sass">
  @import "../../../../style/bootstrap";

  @keyframes rotate {
    from {
      -ms-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    to {
      -ms-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg)
    }
  }

  .kloading-mask {
    position: absolute;top: 0;left: 0px;right: 0;bottom: 0;
    z-index: 1000000;
    background: rgba(nth($grays, 3), .3);

    .spiner {
      animation: rotate linear 1.5s infinite;
      margin-top: -16px;margin-left: -16px;
      font-size: 40px;
      @include center-translate();
      position: fixed;
    }
  }
</style>
