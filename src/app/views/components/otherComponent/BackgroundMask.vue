<template>
  <div class="k-mask" @click="$emit('kclick', $event)">
    <slot></slot>
  </div>
</template>

<script>
  export default{
    data () {
      return { }
    }
  }
</script>

<style lang="sass">
  // 遮罩样式
  .k-mask {
    position: absolute;top: -50px;left: 0;right: 0;bottom: 0;
    z-index: 108;
    background: rgba(#000, .3);
  }
</style>
