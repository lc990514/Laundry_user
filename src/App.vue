<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer v-if=
                "!['/setMeal','/merchant','/login','/cart','/address','/addressEdit','/myMsg','/enableOrder','/myOrder','/order','/winning','/myWinning','/register']
                .includes(this.$store.getters.getRouterPathNew)"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  async mounted() {
    const user = {
      id: this.$store.getters.currentUser.id, token: this.$store.getters.currentUser.token
    };
    console.log(user);
    if (user.id != null && user.id !== 0) {
      this.$api.get("user/token", user).then(res => {
        this.$store.commit("setUser", res);
      })
    }
    this.$api.get("setMeal/get/all").then(res => {
      this.$store.commit("setSetMealsList", res)
    }).catch(reason => {
      console.log(reason)
    })
  }
}
</script>

<style>

</style>
