<template>
  <div class="login">
    <div class="login-box">
      <el-form label-width="100px" :model="form">
        <el-form-item label="账号：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="活动形式：">
          <el-button @click="saveLogin"> 登陆 </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "18059857757",
        password: "18059857757",
      },
    };
  },
  methods: {
    saveLogin() {
      this.$store.dispatch("user/login");
    },
  },
};
</script>
<style lang='scss' scoped>
.login {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  .login-box {
    width: 400px;
    padding: 20px;
    border: 1px dashed red;
    border-radius: 3px;
  }
}
</style>