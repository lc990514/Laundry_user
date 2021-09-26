<template>
  <div>
    <div style="margin: 20px auto;width: 5rem;height: 5rem;">
      <van-uploader v-model="fileList" multiple :max-count="1" :after-read="afterRead"/>
    </div>
    <div style="margin-top: 40px;">
      <van-form @submit="onSubmit">
        <van-field
            readonly
            v-model="user.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="user.uname"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="[{ required: true, message: '请填写昵称' }]"
        />
        <van-field
            v-model="user.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"

        />
        <van-field
            v-model="user.address"
            name="地址"
            label="地址"
            placeholder="地址"
            :rules="[{ required: true, message: '请填写地址' }]"
        />
        <van-field
            v-model="user.introduce"
            rows="2"
            autosize
            label="简介"
            type="textarea"
            maxlength="50"
            placeholder="请输入简介"
            show-word-limit
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">确认修改</van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMsg",
  data() {
    return {
      user: [],
      fileList: []
    }
  },
  mounted() {
    this.$eventbus.$emit("changeTitle", "我的信息");
    this.$store.commit("setRouterPathNew", "/myMsg");
    this.getUserMessage()
  },
  methods: {
    getUserMessage() {
      this.$api.get("user/getUserById", {id: this.$store.getters.currentUser.id}).then(res => {
        console.log(res)
        this.user = res;
        this.user.password = ""
        this.fileList = [
          {url: this.getIndexImage(this.user.portrait), isImage: true}
        ]

        console.log(this.fileList)
      })
    },
    getIndexImage(item) {
      if (item === null) {
        return require('../assets/cat.jpg')
      }
      let box = item.split(";");
      // 字符串转数组，比如1;2;3;4;5;就转化为[1,2,3,4,5]
      if (box.length === 0) {
        return require('../assets/cat.jpg')
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
        return require('../assets/cat.jpg')
      }
    },
    afterRead() {
      this.$api.post("file/upload/image/base64", {file: this.fileList[0].content}).then(res => {
        console.log(res)
        this.user.portrait = res;
      })
    },
    onSubmit(){
        console.log(this.user)
      this.$api.post("user/update",this.user).then(res =>{
        if (res){
          sessionStorage.setItem("uname",this.user.uname);
          sessionStorage.setItem("portrait",this.user.portrait+"");
          this.$store.commit('setUser', this.user);
          this.$router.push(this.$store.getters.getRouterPath);
        }
      })
    },
  },
}
</script>

<style scoped>

</style>