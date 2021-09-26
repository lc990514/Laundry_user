<template>
  <div>
    <div style="margin-top: 15%">
      <van-divider
          :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
      >
        下单成功
      </van-divider>
    </div>
    <div style="margin: 20% 20px auto;vertical-align: middle;text-align: center;">
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>1点经验</van-button>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>1元优惠券</van-button>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>1点经验</van-button><br>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>谢谢参与</van-button>
      <van-button style="margin: 10px 10px" color="red" @click="intoWinning()">点击抽奖</van-button>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>2元优惠券</van-button><br>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>5点经验</van-button>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>1点经验</van-button>
      <van-button class="button" style="margin: 10px 10px;width: 90px" color="#7232dd" plain>谢谢参与</van-button>
    </div>
  </div>
</template>

<script>
import {Toast} from 'vant'
export default {
  name: "Winning",
  data() {
    return {
      state:true
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "抽奖");
    this.$store.commit("setRouterPathNew", "/winning");
    this.$store.commit("setRouterPath", "/mine");
  },
  methods:{
    async intoWinning(){
      if (!this.state){
        Toast("已经没有抽奖次数")
        return;
      }
      this.state = false;
      const value = ["1点经验","1元优惠券","1点经验","谢谢参与","2元优惠券","5点经验","1点经验","谢谢参与"]
      let elementNodeListOf = document.querySelectorAll(".button");
      let num = await this.$api.post("winning/intoWinning");

      for (let i = 0;i<=num;i++){
        await this.AsyncTimeout(i,elementNodeListOf);
      }
      Toast(value[num%8])
    },
    async AsyncTimeout(i,elementNodeListOf){
      // eslint-disable-next-line no-unused-vars
      return new Promise(((resolve, reject) => {
        setTimeout(function (){
          if (i%8===0){
            elementNodeListOf[i%8].style.borderColor = "red"
            elementNodeListOf[i%8].style.color = "red"
            elementNodeListOf[7].style.borderColor = "#7232dd"
            elementNodeListOf[7].style.color = "#7232dd"
          }else {
            elementNodeListOf[i%8].style.borderColor = "red"
            elementNodeListOf[i%8].style.color = "red"
            elementNodeListOf[i%8-1].style.borderColor = "#7232dd"
            elementNodeListOf[i%8-1].style.color = "#7232dd"
          }
          resolve(0)
        },500)
      }))
    }

  }
}
</script>

<style scoped>

</style>