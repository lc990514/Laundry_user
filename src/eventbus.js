import Vue from 'vue'

// 创建一个局部的实例
const eventbus=new Vue();

// 把实例给Vue的原型
Vue.prototype.$eventbus=eventbus;

export default eventbus ;