//引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'

Vue.use(Vuex);

//创建仓库
const store = new Vuex.Store({
    //存储数据的容器
    state: {
        currentUser: {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            name: localStorage.getItem("uname"),
            portrait: localStorage.getItem("portrait")
        },
        isLogin: false,
        setMealsList: [],
        setMealsCart: [],
        enterOrder: [],
        merchant: [],
        setMeal: [],
        router_path: "/",
        router_path_new: "",
        addressId: 0,
        couponId:0,
        orderId:0
    },
    //对数据操作的方法
    mutations: {
        setUser(state, user) {
            state.currentUser = user;
            state.isLogin = true;

            localStorage.setItem("id", user.id);
            localStorage.setItem("token", user.token);
            localStorage.setItem("uname", user.uname);
            localStorage.setItem("portrait", user.portrait);
            console.log({
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                uname: localStorage.getItem("uname"),
                portrait: localStorage.getItem("portrait")
            })
        },
        removeUser(state) {
            state.isLogin = false;
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            localStorage.removeItem("uname");
            localStorage.removeItem("portrait");
            state.currentUser = {
                id: localStorage.getItem("id"),
                token: localStorage.getItem("token"),
                uname: localStorage.getItem("uname"),
                portrait: localStorage.getItem("portrait")
            }
        },
        setSetMealsList(state, list) {
            state.setMealsList = list;
        },
        setEnterOrder(state, orderList) {
            state.enterOrder = orderList;
        },
        setRouterPath(state, path) {
            state.router_path = path;
        },
        setMerchant(state, merchantList) {
            state.merchant = merchantList;
        },
        setSetMeal(state, setMealList) {
            state.setMeal = setMealList;
        },
        setRouterPathNew(state, newPath) {
            state.router_path_new = newPath;
        },
        setAddressId(state, id) {
            state.addressId = id;
        },
        setCouponId(state, id){
            state.couponId = id;
        },
        setOrderId(state,id){
            state.orderId = id;
        }

    },
    //读取容器中的数据
    getters: {
        getSetMeals(state) {
            return state.setMealsCarts;
        },
        isLogin(state) {
            return state.isLogin;
        },
        currentUser(state) {
            return state.currentUser;
        },
        getSetMealsList(state) {
            return state.setMealsList;
        },
        getHeader(state) {
            if (state.isLogin) {
                return {
                    id: state.currentUser.id,
                    token: state.currentUser.token,
                    identity: "user"
                }
            }
            return {
                id: 0,
                token: "",
                identity: "user"
            }
        },
        getEnterOrder(state) {
            const list = state.enterOrder;
            state.enterOrder = [];
            return list;
        },
        getRouterPath(state) {
            return state.router_path;
        },
        getMerchant(state) {
            return state.merchant;
        },
        getSetMeal(state) {
            return state.setMeal;
        },
        getRouterPathNew(state) {
            return state.router_path_new;
        },
        getAddressId(state) {
            return state.addressId;
        },
        getCouponId(state){
            return state.couponId;
        },
        getOrderId(state){
            return state.orderId;
        }
    },
    actions: {}
});

//导出store
export default store;