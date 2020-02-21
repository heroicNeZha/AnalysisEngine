<template>
  <div class="home">
    {{msg}}
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import store from "@/store";
export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: store.state.count
    };
  }
};
</script>

<style scoped>
.home {
  text-align: center;
}
</style>
