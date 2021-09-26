<template>
  <div>
    <van-image
        width="100%"
        height="200px"
        :src=getIndexImageA(Merchant)
    />

    <div style="margin-left: 5px" class="van-multi-ellipsis--l2">
      套餐简介：{{ Merchant.introduce }}
    </div>
    <div style="height: 24px;margin-left: 5px">
      <span style="float: left">等级：</span>
      <van-rate style="float: left;" readonly v-model="Merchant.grade" icon="gem" void-icon="gem-o"/>
    </div>
    <div style="height: 5%">
      <button @click="showSetMeal()">套餐</button>
      <button @click="showComments()">评论</button>
    </div>

    <!--套餐-->
    <div v-if="showSoc">
      <van-grid v-for="(item,index) in setMeals" :key="index" :border="true" :column-num="2">
        <van-grid-item v-if="index%2===0">
          <div>
            <van-image @click="intoSetMeal(item)" style="height: 200px;width: 100%" :src="getIndexImage(item)"/>
            <div>
              <span>{{ item.sname }}</span>
              <div style="color: red">
                <span style="float: left;display:inline-block;height:20px;font-size:20px;">￥{{ item.price }}</span>
                <van-icon @click="addCart(item)" style="float: right" name="shopping-cart-o" size="22"/>
              </div>
            </div>
          </div>
        </van-grid-item>
        <van-grid-item v-if="index%2===0">
          <div v-if="index<setMeals.length-1">
            <van-image @click="intoSetMeal(setMeals[index+1])" style="height: 200px;width: 100%"
                       :src="getIndexImage(setMeals[index+1])"/>
            <div>
              <span>{{ setMeals[index + 1].sname }}</span>
              <div style="color: red">
                <span
                    style="float: left;display:inline-block;height:20px;font-size:20px;">￥{{
                    setMeals[index + 1].price
                  }}</span>
                <van-icon @click="addCart(setMeals[index+1])" style="float: right" name="shopping-cart-o" size="22"/>
              </div>
            </div>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
    <!--    评论-->
    <div v-if="!showSoc">
      <div style="margin-top: 5px;margin-left: 5px" v-for="(item,index) in comments" :key="index">
        <div>
          <span>匿名评论：</span>
          <span>星级：</span>
          <van-rate v-model="item.grade" readonly/>
        </div>
        <div>评论内容：{{ item.messages }}</div>
      </div>
    </div>
  </div>
</template>

<script>

import {Toast} from "vant";

export default {
  name: "Merchant",
  data() {
    return {
      Merchant: [],
      setMeals: [],
      comments: [],
      portrait: {
        portrait: "",
      },
      showSoc: true,
    }
  },
  created() {
    this.$api.post("me/get/ById", {id: this.$store.getters.getMerchant.id}).then(res => {
      this.Merchant = res;
    });
    this.$api.post("setMeal/get/BySId", {userId: this.$store.getters.getMerchant.id}).then(res => {
      this.setMeals = res;
    });
    this.$api.post("comments/get/BySId", {suserId: this.$store.getters.getMerchant.id}).then(res => {
      this.comments = res;
    })
  },
  mounted() {
    //触发事件，载入此页面的时候，Header下的changeTitle监听，改变标题栏
    this.$eventbus.$emit("changeTitle", "店铺");
    this.$store.commit("setRouterPathNew", "/merchant");
    this.$store.commit("setRouterPath", "/shop");
  },
  methods: {
    getIndexImageA(item) {
      if (item.portrait === null || item.portrait === undefined) {
        return ""
      }
      let box = item.portrait.split(";");
      // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
      if (box.length === 0) {
        return ""
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
        return ""
      }
    },
    getIndexImage(item) {
      if (item.imgs === null) {
        return ""
      }
      let box = item.imgs.split(";");
      // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
      if (box.length === 0) {
        return ""
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
        return ""
      }
    },
    addCart: function (setMeals) {
      if (!this.$store.getters.isLogin) {
        Toast('请先登录');
        this.$store.commit("setRouterPathNew", "/login");
        this.$router.push("/login");
        return;
      }
      this.$api.post("cart/add", {gid: setMeals.id, num: 1}).then(res => {
        console.log(res)
        Toast('添加成功');
      })
    },
    showSetMeal() {
      this.showSoc = true;
    },
    showComments() {
      this.showSoc = false;
    },
    intoSetMeal(item) {
      this.$store.commit("setSetMeal", item);
      this.$router.push("/setMeal");
    }
  },
}
</script>

<style scoped>
button {
  height: 100%;
  width: 50%;
  background: #cbcaca;
  border: none;
}
</style>