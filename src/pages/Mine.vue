<template>
  <div>
    <!--    头部-->
    <div style="margin-top: 15%">
      <van-grid center :border="false" :column-num="1">
        <van-grid-item>
          <van-image
              round
              width="5rem"
              height="5rem"
              :src="getIndexImage(portrait)"
          />
          <p v-show="!isLogin">
            <router-link to="/login">登录</router-link>
            /
            <router-link to="/register">注册</router-link>
          </p>
          <p v-if="isLogin">
            {{ uname }}
            <router-link to="/login">退出</router-link>
          </p>
        </van-grid-item>
      </van-grid>
    </div>
    <div style="margin-top: 15%">
      <div class="list">
        <router-link to="/myMsg">我的信息</router-link>
      </div>
      <div class="list">
        <p>
          <router-link to="/address">我的地址</router-link>
        </p>
      </div>
      <div class="list">
        <p>
          <router-link to="/myOrder">我的订单</router-link>
        </p>
      </div>
      <div class="list">
        <p>
          <router-link to="/myWinning">中奖记录</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Mine",
  data() {
    return {
      uname: this.$store.getters.currentUser.uname,
      portrait: this.$store.getters.currentUser.portrait + "",
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "我的");
    this.$store.commit("setRouterPathNew", "/mine");
    this.$store.commit("setRouterPath", "/mine");
    let uname = sessionStorage.getItem("uname");
    let portrait = sessionStorage.getItem("portrait");
    if (uname === null || uname === "" || portrait === null || portrait === "") {
      this.uname = this.$store.getters.currentUser.uname;
      this.portrait = this.$store.getters.currentUser.portrait;
    } else {
      this.uname = uname;
      this.portrait = portrait + "";
      const user = {
        id: this.$store.getters.currentUser.id,
        token: this.$store.getters.currentUser.token,
        uname: uname,
        portrait: portrait
      }
      this.$store.commit("setUser", user)
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    },
    currentUser() {
      return this.$store.getters.currentUser;
    }
  },
  methods: {
    getIndexImage(item) {
      if (item === null || item === undefined || item === "" || item==="null") {
        return require('../assets/cat.jpg')
      }
      let box = item.split(";");
      // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
      if (box.length === 0) {
        return require('../assets/cat.jpg')
        // 如果没有图片，那么返回空，不渲染图片
      } else {
        let img = ''
        for (let i = 0; i < box.length; i++) {
          if (box[i] !== "") {
            // 返回第一个图片
            img = "http://localhost:8080/file/image/" + box[i];
            return img;
          }
        }
        return require('../assets/cat.jpg')
      }
    },
  }
}
</script>

<style scoped>
.list {
  background-color: #e3e1e1;
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
  margin-top: 15px;
}
</style>