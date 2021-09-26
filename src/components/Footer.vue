<template>
  <div style="height: 50px">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">
        <router-link to="/">首页</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="search">
        <router-link to="/search">搜索</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="shop-o">
        <router-link to="/shop">店铺</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="cart-o">
        <router-link to="/cart">购物车</router-link>
      </van-tabbar-item>
      <van-tabbar-item icon="setting-o">
        <router-link to="/mine">我的</router-link>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      active: 0,
    };
  },
}
</script>

<style scoped>

</style>