<template>
<div>
  <van-address-list
      :switchable = false
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
  />
</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: "Address",
  data(){
    return{
      list: [],
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "地址");
    this.$store.commit("setRouterPathNew", "/address");
    this.$store.commit("setRouterPath", "/mine");
    if (!this.$store.getters.isLogin) {
      this.$store.commit("setRouterPath", "/mine");
      this.$router.push("/login");
      return;
    }
    this.getAddress()
  },
  methods: {
    onAdd() {
      Toast('新增地址');
      this.$store.commit("setAddressId",0);
      this.$router.push("/addressEdit");
    },
    onEdit(item) {
      this.$store.commit("setAddressId",item.id);
      this.$router.push("/addressEdit");
    },
    getAddress(){
      this.$api.get("address/my").then(res=>{
        console.log(res)
        for (let i = 0;i<res.length;i++){
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
    },
  },
}
</script>

<style scoped>

</style>