<template>
  <div>
    <div v-for="(item,index) in winning" :key="index">
      <van-cell-group>
        <van-cell :title="item.message" :label="item.time" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyWinning",
  data() {
    return {
      winning:[]
    }
  },
  async mounted() {
    this.$eventbus.$emit("changeTitle", "中奖记录");
    this.$store.commit("setRouterPathNew", "/myWinning");
    this.$store.commit("setRouterPath", "/mine");
    this.winning = await this.$api.post("winning/getAll")
    console.log(this.winning)
  },
  methods:{

  }
}
</script>

<style scoped>

</style>