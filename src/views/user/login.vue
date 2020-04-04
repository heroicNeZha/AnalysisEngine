<template>
  <div class="login-container">
    <div class="title">
      <img src="../../assets/logo.png" class="title-login" />
      <div class="title-text">物联网组网智能分析引擎</div>
    </div>

    <div id="canvasContainer" ref="can"></div>
    <div style="padding-bottom:9%">
      <el-card class="box-card">
        <el-form ref="loginForm" autocomplete="on" :model="loginForm" :rules="loginRules">
          <el-form-item label="邮箱" prop="email">
            <el-input type="text" v-model="loginForm.email" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: "admin@ustc.com",
        password: ""
      },
      loginRules: {
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("登录成功 ");
          this.$store.commit('setToken',this.loginForm.email);
        } else {
          alert("登录失败");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped lang="scss">
.login-container {
  background: #f2f6fc;
}
.title {
  margin: auto;
  width: 800px;
  padding-top: 7%;
  text-align: center;
  .title-login {
    width: 25%;
  }
  .title-text {
    width: 80%;
    font-size: 3em;
    text-align: center;
    font-weight: bolder;
    margin: 10px auto 10px auto;
  }
}
.box-card {
  margin: auto;
  margin-top: 0;
  width: 480px;
}
</style>