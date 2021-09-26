<template>
  <div>
    <div v-for="(item,index) in CartList" :key="index">
      <van-swipe-cell>
        <van-card
            :num="item.num"
            :price="item.price"
            desc="洗衣套餐"
            :title="item.sname"
            class="goods-card"
            :thumb="getIndexImage(item)"
        />
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="remove(item)"/>
        </template>
      </van-swipe-cell>
    </div>
    <div>
      <div style="position: fixed;bottom: 37px;width: 100%">
        <van-coupon-cell
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            @click="showList = true"
        />
      </div>
      <!-- 优惠券列表 -->
      <van-popup
          v-model="showList"
          round
          position="bottom"
          style="height: 90%; padding-top: 4px;"
      >
        <van-coupon-list
            :coupons="coupons"
            :chosen-coupon="chosenCoupon"
            :disabled-coupons="disabledCoupons"
            @change="onChange"
            @exchange="onExchange"
        />
      </van-popup>
    </div>
    <div>
      <van-submit-bar :price="prices-cutNum*100" button-text="提交订单" @submit="pushOrder()"/>
    </div>
  </div>
</template>

<script>
import {Toast} from "vant"
//   startAt: 1489104000+2592000,
export default {
  name: "Cart",
  data() {
    return {
      CartList: [],
      prices: 0,
      chosenCoupon: -1,
      coupons: [],
      disabledCoupons: [],
      showList: false,
      cutNum: 0,
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "购物车");
    this.$store.commit("setRouterPath", "/");
    this.$store.commit("setRouterPathNew", "/cart");
    if (!this.$store.getters.isLogin) {
      this.$store.commit("setRouterPath", "/");
      this.$router.push("/login");
      return;
    }
    this.getCart();
    this.getCoupon();
  },
  methods: {
    getCoupon() {
      this.coupons = [];
      this.disabledCoupons = [];
      this.$api.get("coupon/getCouponByUserId").then(res => {
        for (let i = 0; i < res.length; i++) {
          const coupon = {
            id:res[i].id,
            available: i + 1,
            condition: '无使用门槛',
            reason: '',
            value: res[i].money * 100,
            name: '优惠券名称',
            startAt: res[i].startAt,
            endAt: res[i].endAt,
            valueDesc: res[i].money,
            unitDesc: '元',
          };
          if (res[i].state) {
            this.coupons.push(coupon)
          } else {
            coupon.reason = "优惠劵已过期"
            this.disabledCoupons.push(coupon)
          }

        }

      })
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
      this.cutNum = this.coupons[index].valueDesc
    },
    onExchange(code) {
      console.log(code)
      this.$api.post("coupon/exchange",{str:code}).then(res =>{
        console.log(res)
        if (res){
          Toast("兑换成功");
          this.getCoupon();
        }else{
          Toast("兑换码不可用!")
        }
      })
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
    getCart() {
      this.$api.get("cart/my").then(res => {
        const cart = res;
        const cartList = [];
        console.log(cart);
        for (let i = 0; i < cart.length; i++) {
          let setMeal = this.getSetMeal(cart[i].gid);
          setMeal.num = cart[i].num;
          setMeal.id = cart[i].id;
          cartList.push(setMeal)
        }
        this.CartList = cartList;
        this.$eventbus.$emit("changeTitle", "购物车（共" + cartList.length + "件宝贝）");
        console.log(this.CartList)
        this.prices = this.getAllPrice() * 100;
      });
    },
    getSetMeal(gid) {
      const setMeals = this.$store.getters.getSetMealsList;
      console.log(setMeals)
      for (let i = 0; i < setMeals.length; i++) {
        if (setMeals[i].id === gid) {
          const setMeal = {
            gid: gid,
            sname: setMeals[i].sname,
            price: setMeals[i].price,
            imgs: setMeals[i].imgs,
          }
          return setMeal;
        }
      }
      return {
        gid: gid,
        sname: "该商品已下架",
        price: 0,
        imgs: "",
      }
    },
    remove(item) {
      this.$api.post("cart/remove", {id: item.id}).then(res => {
        console.log(res)
        this.getCart();
      })
    },
    getAllPrice() {
      let price = 0;
      for (let i = 0; i < this.CartList.length; i++) {
        price += (this.CartList[i].price * this.CartList[i].num);
      }
      return price;
    },


    pushOrder() {
      const list = [];
      for (let i = 0; i < this.CartList.length; i++) {
        list.push(this.CartList[i])
      }
      if (list.length === 0) {
        Toast("购物车里没有宝贝");
        return;
      }
      console.log(list)
      this.$store.commit("setEnterOrder", list);
      if(this.chosenCoupon!==-1){
        this.$store.commit("setCouponId",this.coupons[this.chosenCoupon].id)

      }
      this.$router.push("/enableOrder")

    }
  },
}
</script>

<style scoped>
.goods-card {
  margin: 0;
  background-color: @white;
}

.delete-button {
  height: 100%;
}
</style>