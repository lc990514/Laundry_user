<template>
  <div style="margin-top: 30%">
    <van-address-edit
        :show-area="false"
        :address-info="list"
        show-delete
        show-set-default
        @save="onSave"
        @delete="onDelete"
    />
  </div>
</template>

<script>
import {Toast} from 'vant'
import areaList from "../common/area.js"

export default {
  name: "AddressEdit",
  data() {
    return {
      list: {},
      areaList,
      type:true
    }
  },
  mounted() {
    this.$store.commit("setRouterPathNew", "/addressEdit");
    this.$store.commit("setRouterPath", "/address");
    if (!this.$store.getters.isLogin) {
      this.$store.commit("setRouterPath", "/mine");
      this.$router.push("/login");
      return;
    }
    if (this.$store.getters.getAddressId) {
      this.$eventbus.$emit("changeTitle", "编辑地址");
      this.type = true;
      this.getAddress();
    } else {
      this.$eventbus.$emit("changeTitle", "添加地址");
      this.type = false;
    }

  },
  methods: {
    getAddress() {
      this.$api.post("address/getAddressById", {id: this.$store.getters.getAddressId}).then(res => {
        console.log(res)
        this.list = {
          id:res.id,
          uid:res.uid,
          name:res.name,
          tel:res.tel,
          addressDetail:res.address,
          isDefault:res.chief
        }
      })
    },
    onSave(val) {
      if (this.type){
        const data ={
          id:val.id,
          name:val.name,
          uid:val.uid,
          tel:val.tel,
          address:val.addressDetail,
          chief:val.isDefault
        }
        this.$api.post("address/update",data).then(res =>{
          if (res){
            Toast('修改成功');
            this.$router.push("/address");
          }
        });
      }else {
        const data = {
          name:val.name,
          tel:val.tel,
          address:val.addressDetail,
          chief:val.isDefault
        }
        this.$api.post("address/add",data).then(res =>{
          if (res){
            Toast('添加成功');
            this.$router.push("/address");
          }
        });
      }
    },
    onDelete() {
      if (this.type){
        const data = {
          id:this.list.id,
          name:this.list.name,
          uid:this.list.uid,
          tel:this.list.tel,
          address:this.list.addressDetail,
          chief:this.list.isDefault
        }
        console.log(data)
        this.$api.post("address/del",data).then(res =>{
          if (res){
            Toast('删除成功');
            this.$router.push("/address");
          }
        })
      }else {
        this.list = {}
      }
    },
  }
}
</script>

<style scoped>

</style>