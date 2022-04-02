<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {

    }
  },
  watch: {
    '$route' (to, form) {

    }
  }
}
</script>

<style lang="scss">
  @import './scss/global.scss';
</style>
