<template>
  <div>

    <div v-for="(item,index) in orders" :key="index">
      <van-card
          :num="item.setMeal.num"
          :price="item.money+'.00'"
          :desc="item.time"
          :title="item.setMeal.sname"
          :thumb="getIndexImage(item.setMeal)"
      >
        <template #footer>
          <van-button size="mini" @click="intoOrder(item.id)">查看详情</van-button>
          <van-button color="red" v-if="!item.state" size="mini" >已退款</van-button>
          <van-button v-if="item.state" size="mini" @click="delOrder(item)">退款</van-button>
        </template>
      </van-card>
    </div>
  </div>
</template>

<script>
import {Dialog} from 'vant';
import {Toast} from 'vant'

export default {
  name: "MyOrder",
  data() {
    return {
      orders: []
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "我的订单");
    this.$store.commit("setRouterPathNew", "/myOrder");
    this.$store.commit("setRouterPath", "/mine");
    this.getOrder()
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
    getOrder() {
      this.$api.post("order/getAllById").then(res => {
        let data = res;
        for (let i = 0; i < data.length; i++) {
          data[i].setMeal = JSON.parse(data[i].setMeal);
        }
        this.orders = data;
        console.log(this.orders)
      })
    },
    delOrder(item) {
      Dialog.confirm({
        title: '确认执行此操作？',
        message: '是否取消订单？',
      }).then(() => {
        // on confirm
        this.$api.post("order/remove", {id: item.id}).then(res => {
          if (res){
            Toast("取消订单")
            item.state = false
          }
        })
      }).catch(() => {
        // on cancel
        return;
      });

    },
    intoOrder(id){
      this.$store.commit("setOrderId",id);
      this.$router.push("/order")
    }
  }
}
</script>

<style scoped>

</style>