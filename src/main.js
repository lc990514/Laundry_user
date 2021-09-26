import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element);

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

import './eventbus'


//引入MintUI
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
//使用MintUI
Vue.use(MintUI);

import store from './store'
import router from './router.js'
import api from './api'
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
