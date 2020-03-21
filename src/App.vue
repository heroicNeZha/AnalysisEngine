<template>
  <div id="app">
    <Main />
    <transition name="el-fade-in-linear">
      <div v-show="show" class="transition-box">
        <router-view />
      </div>
    </transition>
  </div>
</template>
<script>
import Main from '@/components/Main.vue';
export default {
  data: function() {
    return {
      show: true
    };
  },
  components:{
    Main,
  }
};
</script>
<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
}
#app {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
  .transition-box {
    height: 100%;
  }
}
</style>
