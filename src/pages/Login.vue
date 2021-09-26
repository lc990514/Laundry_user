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
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.$store.getters.isLogin) {
        vm.$store.commit("removeUser");
      }
    })
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "登录");
    this.$store.commit("setRouterPathNew",'/login')
    sessionStorage.removeItem("uname")
    sessionStorage.removeItem("portrait")
  },
  methods: {
    onSubmit() {
      this.$api.post("user/login",{username: this.username, password: this.password}).then(res =>{
        const user = res;
        sessionStorage.setItem("uname",user.uname);
        sessionStorage.setItem("portrait",user.portrait);
        this.$store.commit('setUser', user);
        this.$router.push(this.$store.getters.getRouterPath);
      })
    },
  },
}
</script>

<style scoped>

</style>