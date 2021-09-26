<template>
  <div>
    <div v-for="(item,index) in Shop" :key="index">
    <van-card
        :desc="item.address"
        :title="item.uname"
        :thumb="getIndexImage(item)"
    >
      <template #footer>
        <van-button @click="intoMerchant(item)" size="mini">进入店铺</van-button>
      </template>
    </van-card>
  </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {
      Shop: []
    }
  },
  created() {
    this.$api.get("me/get/all").then(res =>{
      console.log(res)
      this.Shop = res;
    })
  },
  mounted() {
    //触发事件，载入此页面的时候，Header下的changeTitle监听，改变标题栏
    this.$eventbus.$emit("changeTitle", "店铺");
    this.$store.commit("setRouterPathNew","/shop");
    this.$store.commit("setRouterPath","/shop");
  },
  methods:{
    getIndexImage(item) {
      if (item.portrait === null) {
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
    intoMerchant(item){
      console.log(item);
      this.$store.commit("setMerchant",item);
      this.$router.push("/merchant");
    },
  },
}
</script>

<style scoped>

</style>