<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from) {
      const self = this;
      if(to.name == 'task') {
        self.name = 'slide-next';
      } else if(from.name == 'task') {
        self.name = 'slide-prev';
      } else {
        self.name = '';
      }
    }
  }
}
</script>

<style lang="scss">
  @import "./assets/scss/style";
</style>
