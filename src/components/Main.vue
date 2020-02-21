<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="'logo-width'">
        <a href="/">
          <img src="../assets/logo.png" style="padding-left:8px;" />
          <div class="nav-title">物联网组网智能分析引擎</div>
        </a>
      </el-col>
      <el-col :span="4"></el-col>
      <el-col :span="10" class="userinfo">
        <el-dropdown>
          <span class="el-dropdown-link userinfo-inner">
            你好：管理员
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <a >首页</a>
            </el-dropdown-item>
            <el-dropdown-item>
              <a @click="handleSelect">修改密码</a>
            </el-dropdown-item>
            <el-dropdown-item @click="handleSelect">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <el-col :span="24">
      <el-col :span="6">
        <el-menu
          default-active="this.$router.path"
          router
          class="el-menu-vertical-demo"
          @click="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            <i class="el-icon-search"></i>
            <span slot="title">{{item.navItem}}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="18">
        <div class="center">
          <router-view />
        </div>
      </el-col>
    </el-col>
  </el-row>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.center {
  text-align: center;
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .header {
    height: 60px;
    line-height: 60px;
    background: #545c64;
    color: #fff;
    .userinfo {
      text-align: right;
      padding-right: 35px;
      float: right;
      .userinfo-inner {
        cursor: pointer;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0 10px 10px;
          float: right;
        }
      }
    }
    .logo {
      height: 60px;
      font-size: 22px;
      padding-left: 10px;
      padding-right: 10px;
      border-color: rgba(238, 241, 146, 0.3);
      border-bottom-width: 1px;
      border-bottom-style: solid;
      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }
      .txt {
        color: #fff;
      }
    }
    .logo-width {
      width: 330px;
    }
    a {
      text-decoration: none;
    }
    .nav-title {
      display: block;
      font-size: 0.83em;
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      margin-top: 0%;
      color: #ffffff;
    }
  }
}
</style>

<script>
export default {
  data: function() {
    return {
      navList: [
        { name: "/", navItem: "Home" },
        { name: "/about", navItem: "About" }
      ]
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      alert(key, keyPath);
    }
  }
};
</script>