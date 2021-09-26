<template>
  <div>
    <form action="/">
      <van-search
          v-model="value"
          show-action
          placeholder="请输入搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>

    <van-grid v-for="(item,index) in setMeals" :key="index" :border="true" :column-num="2">
      <van-grid-item v-if="index%2===0">
        <div>
          <van-image style="height: 200px;width: 100%" :src="getIndexImage(item)"/>
          <div>
            <span>{{ item.sname }}</span>
            <div style="color: red">
              <span style="float: left;display:inline-block;height:20px;font-size:20px;">￥{{ item.price }}</span>
              <van-icon @click="addCart(item)" style="float: right" name="shopping-cart-o" size="22"/>
            </div>
          </div>
        </div>
      </van-grid-item>
      <van-grid-item v-if="index%2===0">
        <div v-if="index<setMeals.length-1">
          <van-image style="height: 200px;width: 100%" :src="getIndexImage(setMeals[index+1])"/>
          <div>
            <span>{{ setMeals[index + 1].sname }}</span>
            <div style="color: red">
              <span
                  style="float: left;display:inline-block;height:20px;font-size:20px;">￥{{
                  setMeals[index + 1].price
                }}</span>
              <van-icon @click="addCart(setMeals[index+1])" style="float: right" name="shopping-cart-o" size="22"/>
            </div>
          </div>
        </div>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import {Toast} from "vant"

export default {
  name: "Search",
  data() {
    return {
      value: '',
      setMeals: []
    };
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "搜索");
    this.$store.commit("setRouterPath", "/search");
    this.$store.commit("setRouterPathNew", "/search");
  },
  methods: {
    getIndexImage(item){
      if (item.imgs===null){
        return ""
      }
      let box=item.imgs.split(";");
      // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
      if (box.length===0){
        return ""
        // 如果没有图片，那么返回空，不渲染图片
      }else {
        let img=''
        for (let i = 0; i < box.length; i++) {
          if (box[i]!==""){
            // 返回第一个图片
            img="http://localhost:8080/file/image/"+box[i];
            return img;
          }
        }
        return ""
      }
    },
    addCart: function (setMeals) {
      if (!this.$store.getters.isLogin){
        Toast('请先登录');
        this.$store.commit("setRouterPath","/");
        this.$router.push("/login");
        return ;
      }
      this.$api.post("cart/add",{gid:setMeals.id,num:1}).then(res =>{
        console.log(res)
        Toast('添加成功');
      }).catch(reason => {
        Toast(reason.data.msg)
      })
    },
    onSearch(val) {
      this.$api.get("setMeal/getByType", {type: val}).then(res => {
        this.setMeals = res;
      }).catch(reason => {
        Toast(reason.data.msg)
      })
    },
    onCancel() {
      this.setMeals=[];
      Toast('取消');
    },
  },
}
</script>

<style scoped>

</style>