/**
 * Created by fuzl on 2017-10-30.
 */
// eslint-disable-next-line no-unused-vars
import Vue from "vue"
import Vuex from "vuex"
import VueRouter from "vue-router"
import routeConfig from "./router"
import storeConfig from "./store"

let router = new VueRouter({
	routes: routeConfig
})

let store = new Vuex.Store(storeConfig)

new Vue({
	el: "#mount",
	router,
	store,
	// 没有页面模板的时候，直接创建一个<router-view></router-view>组件，显示匹配的路由组件
	render: (h) => h("router-view")
})
