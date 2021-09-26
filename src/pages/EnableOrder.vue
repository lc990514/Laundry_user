<template>
  <div>
    <van-cell center>
      <!-- 使用 title 插槽来自定义标题 地址-->
      <template #title>
        <span class="custom-title">{{ address.name }}&nbsp;{{ address.tel }}</span>
        <van-tag v-if="address.chief" color="#ffe1e1" text-color="#ad0000" round type="primary">默认</van-tag>
      </template>
      <template #right-icon>
        <van-icon size="20px" name="arrow" class="search-icon" @click="isShow()"/>
      </template>
      <template #label>
        <span class="custom-title">{{ address.address }}</span>
      </template>
    </van-cell>
    <!--    地址列表-->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-address-list
              v-model="chosenAddressId"
              :list="list"
              default-tag-text="默认"
              @select="selectAddress"
          />
        </div>
      </div>
    </van-overlay>

    <div v-for="(item,index) in order" :key="index">
      <van-card
          :num="item.num"
          :price="item.price"
          desc="洗衣套餐"
          :title="item.sname"
          :thumb="getIndexImage(item)"
      />
    </div>

    <div>
      <van-submit-bar :price="prices" button-text="确认订单" @submit="pushOrder()"/>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'

export default {
  name: "EnableOrder",
  data() {
    return {
      order: [],
      address: {},
      show: false,
      selectA: [],
      prices: 0,
      NumPrice: 0,
      couponsId: 0,
      chosenAddressId: '1',
      list: [],
    }
  },
  async mounted() {
    this.$eventbus.$emit("changeTitle", "确认订单");
    this.$store.commit("setRouterPathNew", "/enableOrder");
    this.$store.commit("setRouterPath", "/cart");
    const cartList = this.$store.getters.getEnterOrder;
    console.log(cartList)
    for (let i = 0; i < cartList.length; i++) {
      let setMeal = this.getSetMeal(cartList[i].gid);
      setMeal.num = cartList[i].num;
      setMeal.id = cartList[i].id;
      this.order.push(setMeal);
    }
    if (this.$store.getters.getCouponId) {
      let res = await this.$api.post("coupon/getById", {id: this.$store.getters.getCouponId})
      this.NumPrice = res.money;
      this.couponsId = this.$store.getters.getCouponId;
      this.$store.commit("setCouponId", 0);
    }
    this.prices = this.getAllPrice() - this.NumPrice * 100;
    this.getChiefAddress();
    this.getAddress();
  },
  methods: {
    selectAddress(item) {
      this.address = {
        name: item.name,
        tel: item.tel,
        address: item.address,
        chief: item.isDefault,
        isState: true
      }
    },
    getChiefAddress() {
      this.$api.get("address/getAddressByUId").then(res => {
        if (res === null) {
          this.address = {
            name: "xxx",
            tel: "1xxxxxxxxxx",
            address: "您还没有创建地址",
            chief: false,
            isState: false
          }
        } else {
          this.chosenAddressId = res.id;
          this.address = {
            name: res.name,
            tel: res.tel,
            address: res.address,
            chief: res.chief,
            isState: true
          }
        }
      });
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
    getSetMeal(gid) {
      const setMeals = this.$store.getters.getSetMealsList;
      // console.log(setMeals)
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
    getAllPrice() {
      let price = 0;
      for (let i = 0; i < this.order.length; i++) {
        price += (this.order[i].price * this.order[i].num);
      }
      return price * 100;
    },

    pushOrder() {
      if (!this.address.isState) {
        Toast("请添加地址")
        return;
      }
      let order = {
        address: this.address.name+" "+this.address.tel+" "+this.address.address,
        setMeal: JSON.stringify(this.order),
      }
      console.log(order)
      if (this.couponsId){
        this.$api.post("coupon/del",{id:this.couponsId}).then(res =>{
          if (res){
            console.log("优惠劵删除")
          }
        })
      }
      this.$api.post("order/push",order).then(res=>{
        console.log(res)
        Toast("下单成功");
        this.$router.push("/winning");
      });
    },
    isShow() {
      this.show = true
    },
    getAddress() {
      this.$api.get("address/my").then(res => {
        console.log(res)
        for (let i = 0; i < res.length; i++) {
          const address = {
            id: res[i].id,
            name: res[i].name,
            tel: res[i].tel,
            address: res[i].address,
            isDefault: res[i].chief,
          }
          this.list.push(address)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>