<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-button type="primary" @click="add()">click</el-button>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: "About",
  methods: {
    add() {
      store.commit('increase');
    }
  }
};
</script>
<style scoped>
</style>