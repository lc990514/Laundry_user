<template>
  <div>
    <div v-if="order.length!==0">
      <div style="margin-top: 30px">
        <van-card
            :num="order.setMeal.num"
            :price="order.money+'.00'"
            :desc="order.time"
            :title="order.setMeal.sname"
            :thumb="getIndexImage(order.setMeal)"
        >
          <template v-if="!order.state" #tags>
            <van-tag plain type="danger">已退款</van-tag>
          </template>
        </van-card>
      </div>
      <div style="margin: 30px 15px auto;">
        <van-steps :active="order.states-1">
          <van-step>用户下单</van-step>
          <van-step>商家取件</van-step>
          <van-step>洗涤衣物</van-step>
          <van-step>商家送件</van-step>
          <van-step>订单完成</van-step>
        </van-steps>
      </div>
      <div style="margin-top: 30px" v-if="this.show">
        <van-field name="rate" label="评分">
          <template #input>
            <van-rate v-model="rate"/>
          </template>
        </van-field>
        <van-field
            v-model="message"
            rows="6"
            label="评论"
            type="textarea"
            maxlength="100"
            placeholder="请输入留言"
            show-word-limit
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit" @click="comments(order)">提交</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  name: "Order",
  data() {
    return {
      order: [],
      rate: 1,
      message: "",
      show:false
    }
  },
  async mounted() {
    this.$eventbus.$emit("changeTitle", "订单详情");
    this.$store.commit("setRouterPathNew", "/order");
    this.$store.commit("setRouterPath", "/myOrder");
    this.order = await this.$api.post("order/getById", {id: this.$store.getters.getOrderId});
    this.order.setMeal = JSON.parse(this.order.setMeal)
    if (this.order.states===5 && this.order.state){
      this.show = true
    }
    console.log(this.order.states)
  },
  methods: {
    getIndexImage(item) {
      if (item.imgs === null || item.imgs === '') {
        return ""
      }
      let box = item.imgs.split(";");
      if (box.length === 0) {
        return ""
      } else {
        let img = ''
        for (let i = 0; i < box.length; i++) {
          if (box[i] !== "") {
            img = "http://localhost:8080/file/image/" + box[i];
            return img;
          }
        }
        return ""
      }
    },
    comments(item){
      this.$api.post("comments/add",{userId:item.userId,suserId:item.suserId,messages:this.message,grade:this.rate}).then(res =>{
        if (res){
          Toast("评论成功")
          this.show = false
        }
      })
    },
  }
}
</script>

<style scoped>

</style>