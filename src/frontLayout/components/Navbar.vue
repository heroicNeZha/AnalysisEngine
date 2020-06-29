<template>
  <div class="navbar">
    <div class="title-container">
      <a href="/">
        <img src="/favicon.ico" class="nav-img">
        <div class="nav-title">物联网组网智能分析引擎</div>
      </a>
    </div>

    <div class="left-menu">
      <el-menu
        default-active="this.$router.path"
        router
        class="el-menu-demo"
        mode="horizontal"
        text-color="#5a5e66"
      >
        <el-submenu v-for="(navItem,i) in navList" :key="i" :index="navItem.name">
          <template slot="title">
            <i :class="navItem.icon" />
            <span>{{ navItem.name }}</span>
          </template>
          <el-menu-item v-for="(item,j) in navItem.navGroup" :key="j" :index="item.path">
            <i :class="item.icon" />
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/PanJiaChen/vue-admin-template/">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  components: {
  },
  data: function() {
    return {
      navList: [
        {
          name: '查询组件',
          icon: 'el-icon-search',
          navGroup: [
            {
              path: '/front/searchProgram',
              name: '网关查询',
              icon: 'el-icon-s-opportunity'
            },
            {
              path: '/front/searchProgram',
              name: '传感器查询',
              icon: 'el-icon-s-opportunity'
            },
            {
              path: '/front/search',
              name: '组网方案查询',
              icon: 'el-icon-s-cooperation'
            }
          ]
        },
        {
          name: '项目中心',
          icon: 'el-icon-s-cooperation',
          navGroup: [
            {
              path: '/front/addProgram',
              name: '发布项目',
              icon: 'el-icon-plus'
            },
            {
              path: '/front/manageProgram',
              name: '项目管理',
              icon: 'el-icon-s-tools'
            }
          ]
        },
        {
          name: '用户中心',
          icon: 'el-icon-user-solid',
          navGroup: [
            { path: '/user/manage', name: '用户管理', icon: 'el-icon-s-tools' },
            {
              path: '/user/manage',
              name: '信息中心',
              icon: 'el-icon-s-comment'
            }
          ]
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .title-container {
    line-height: 56px;
    height: 100%;
    width: 300px;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
    .nav-img{
      float: left;
      width:56px;
      margin-top: 5px;
      padding-left:8px;
    }
    .nav-title {
      display: block;
      float: left;
      font-size: 1.2em;
      margin-block-start: 1.67em;
      margin-block-end: 1.67em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      margin-top: 0%;
      color: #5a5e66;
    }
  }

  .left-menu {
    float: left;
    color: #5a5e66;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
