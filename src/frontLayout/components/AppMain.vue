<template>
  <section class="app-main">
    <el-row>
      <el-col :span="4"><div class="grid-content" /></el-col>
      <el-col :span="16">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </el-col>
      <el-col :span="4"><div class="grid-content" /></el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 60px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 60px;
}
.grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
