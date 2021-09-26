//导入vue
import Vue from 'vue'
//引入路由模块
import VueRouter from 'vue-router'

import Home from "@/pages/Home";
import Search from "@/pages/Search";
import SetMeal from "@/pages/SetMeal";
import Merchant from "@/pages/Merchant";
import Shop from "@/pages/Shop";
import Mine from "@/pages/Mine";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import Address from "@/pages/Address";
import AddressEdit from "@/pages/AddressEdit";
import MyMsg from "@/pages/MyMsg";
import EnableOrder from "@/pages/EnableOrder";
import MyOrder from "@/pages/MyOrder";
import Order from "@/pages/Order";
import Winning from "@/pages/Winning";
import MyWinning from "@/pages/MyWinning";
import Register from "@/pages/Register";


//将模块赋给vue实例.,注册到全局，整个项目都可以使用路由
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/search',
        component: Search
    },
    {
        path: '/setMeal',
        component: SetMeal
    },
    {
        path: '/merchant',
        component: Merchant
    },
    {
        path: '/shop',
        component: Shop
    },
    {
        path: '/mine',
        component: Mine
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/cart',
        component: Cart
    },
    {
        path: '/address',
        component: Address
    },
    {
        path: '/addressEdit',
        component: AddressEdit
    },
    {
        path: '/myMsg',
        component: MyMsg
    },
    {
        path: '/enableOrder',
        component: EnableOrder
    },
    {
        path: '/myOrder',
        component: MyOrder
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/winning',
        component: Winning
    },
    {
        path: '/myWinning',
        component: MyWinning
    },
    {
        path: '/register',
        component: Register
    }
]

//创建路由实例
const router = new VueRouter({
    routes,
});

// 导出 路由模块
export default router;