<template>
  <div>
    <van-image
        width="100%"
        height="200px"
        :src=getIndexImage(setMeal)
    />
    <div style="margin-top: 5px">
      <span>套餐名称：{{ setMeal.sname }}</span><br><br>
      <span>价格：<a style="color: red">￥{{ setMeal.price }}</a></span><br><br>
    </div>
    <div style="width: 100%;height: 24px">
      <span style="float: left">类型：</span>
      <div style="float: left" v-for="(item,index) in type" :key="index">
        <van-button round style="float: left" v-if="index<type.length-1" type="primary" size="mini">{{ item }}
        </van-button>
        <van-icon color="red" size="24" v-if="index<type.length-2" style="float: left" name="flower-o"/>
      </div>
    </div><br>
    <div style="height: 50px" class="van-multi-ellipsis--l2">
      套餐简介：{{setMeal.tests}}
    </div>
    <van-share-sheet
        v-model="showShare"
        title="立即分享给好友"
        :options="options"
    />
    <van-goods-action>
      <van-goods-action-icon icon="share-o" text="分享" @click="onClickIcon"/>
      <van-goods-action-icon icon="cart-o" text="购物车" @click="addCart(setMeal)"/>
      <van-goods-action-icon icon="shop-o" text="店铺" @click="intoMerchant(Merchant)"/>
      <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="onClickButton"
      />
    </van-goods-action>
  </div>
</template>

<script>
import {Toast} from "vant"

export default {
  name: "SetMeal",
  data() {
    return {
      setMeal: this.$store.getters.getSetMeal,
      type: [],
      Merchant:[],
      showShare: false,
      options: [
        [
          { name: '微信', icon: 'wechat' },
          { name: '朋友圈', icon: 'wechat-moments' },
          { name: '微博', icon: 'weibo' },
          { name: 'QQ', icon: 'qq' },
        ],
        [
          { name: '复制链接', icon: 'link' },
          { name: '分享海报', icon: 'poster' },
          { name: '二维码', icon: 'qrcode' },
          { name: '小程序码', icon: 'weapp-qrcode' },
        ],
      ],
    }
  },
  created() {
    this.$api.post("me/get/ById",{id:this.$store.getters.getSetMeal.userId}).then(res =>{
      this.Merchant = res;
    })
    if (this.$store.getters.getSetMeal.type === null) {
      return ""
    }
    this.type = this.$store.getters.getSetMeal.type.split(";");
  },
  mounted() {
    //触发事件，载入此页面的时候，Header下的changeTitle监听，改变标题栏
    this.$eventbus.$emit("changeTitle", "套餐详情");
    this.$store.commit("setRouterPathNew", "/setMeal");
    if (this.$store.getters.getRouterPath==="/"){
      this.$store.commit("setRouterPath", "/");
    }
    if (this.$store.getters.getRouterPath==="/shop"){
      this.$store.commit("setRouterPath", "/merchant");
    }
  },
  methods: {
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
    onClickIcon() {
      this.showShare = true
    },
    onClickButton() {
      console.log(this.setMeal)
      let list =[]
      let cartList = {
        gid:this.setMeal.id,
        sname:this.setMeal.sname,
        price:this.setMeal.price,
        imgs:this.setMeal.ings,
        num:1,
      }
      list.push(cartList)
      this.$store.commit("setEnterOrder", list);
      this.$router.push("/enableOrder")
    },
    intoMerchant(item){
      console.log(item)
      this.$store.commit("setMerchant",item);
      this.$router.push('/merchant');
    }
  },
}
</script>

<style scoped>

</style>