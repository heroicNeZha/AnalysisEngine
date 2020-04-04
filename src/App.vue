<template>
  <div id="app">
    <div v-if="this.$store.state.token==0">
      <Login />
    </div>
    <div v-else>
      <Main />
    </div>
  </div>
</template>
<script>
import Main from "@/components/Main.vue";
import Login from "@/views/user/login.vue";
export default {
  data: function() {
    return {
      show: true,
    };
  },
  components: {
    Main,
    Login
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
