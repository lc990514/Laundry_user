<template>
  <div style="margin-top: 50%">
    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="uname"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          :rules="[{ required: true, message: '请填写昵称' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      uname: ""
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "注册");
    this.$store.commit("setRouterPathNew", "/register");
    this.$store.commit("setRouterPath", "/mine");
  },
  methods: {
    onSubmit() {
      this.$api.post("user/register", {
        username: this.username,
        uname: this.uname,
        password: this.password
      }).then(res => {
        console.log(res)
        Toast("注册成功");
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>

</style>