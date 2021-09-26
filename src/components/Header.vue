<template>
  <div style="height:47px">
    <van-nav-bar
        :title="title"
        fixed
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    />
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {title: '首页'};
  },
  mounted() {// 创建监听事件，changeTitle，该事件会传入一个字符串，
    // 用于更改页面最上方的title
    // 调用的时候由其他触发调用
    this.$eventbus.$on('changeTitle', (str) => {
      this.title = str
    })
  },
  methods: {
    onClickLeft() {
      if (this.$store.getters.getRouterPath===this.$store.getters.getRouterPathNew){
        return ;
      }
      this.$router.push(this.$store.getters.getRouterPath);
    },
  },
}
</script>

<style scoped>

</style>