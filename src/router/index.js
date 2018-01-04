/**
 * Created by fuzl on 2017-10-30.
 */
import Vue from "vue"
/**
 * 异步加载的View
 * 使用require.ensure来延迟加载，h为vue-router的回调函数，加载完成之后，调用h方法，并传入组件
 * */
let Login = (h) => require.ensure(["../views/login.vue"], ()=>{
	return h(require("../views/login.vue"))
})
let Shell = (h) => require.ensure(["../views/shell.vue"], ()=>{
	return h(require("../views/shell.vue"))
})
let Table = (h) => require.ensure(["../views/table.vue"], ()=>{
	return h(require("../views/table.vue"))
})
let Setting = (h) => require.ensure(["../views/setting.vue"], ()=>{
	return h(require("../views/setting.vue"))
})
let Chart = (h) => require.ensure(["../views/chart.vue"], ()=>{
	return h(require("../views/chart.vue"))
})
let Fold = (h) => require.ensure(["../views/fold.vue"], ()=>{
	return h(require("../views/fold.vue"))
})
let Pie = (h) => require.ensure(["../views/pie.vue"], ()=>{
	return h(require("../views/pie.vue"))
})
let Bar = (h) => require.ensure(["../views/bar.vue"], ()=>{
	return h(require("../views/bar.vue"))
})
let Form = (h) => require.ensure(["../views/form.vue"], ()=>{
	return h(require("../views/form.vue"))
})
let Editor = (h) => require.ensure(["../views/editor.vue"], ()=>{
	return h(require("../views/editor.vue"))
})
let ElementUI = (h) => require.ensure(["../views/elementUI.vue"], ()=>{
	return h(require("../views/elementUI.vue"))
})
let Awesome = (h) => require.ensure(["../views/awesome.vue"], ()=>{
	return h(require("../views/awesome.vue"))
})
let Input = (h) => require.ensure(["../views/input.vue"], ()=>{
	return h(require("../views/input.vue"))
})
let Output = (h) => require.ensure(["../views/output.vue"], ()=>{
	return h(require("../views/output.vue"))
})
/**
 * 同步的view，会被一起打包进入口的js文件中，同步加载组件
 * */

export default [
	{
		path: "/",
		component: Login,
		name: "index"
	},
	{
		path: "/login",
		component: Login,
		name: "login"
	},
	{
		path: "/shell",
		component: Shell,
		name: "shell",
		children: [
			{
				path: "editor",
				component: Editor,
				name: "editor"
			},
			{
				path: "table",
				component: Table,
				name: "table"
			},
			{
				path: "setting",
				component: Setting,
				name: "setting"
			},
			{
				path:"chart",
				component:Chart,
				name: "chart"
			},
			{
				path: "fold",
				component: Fold,
				name: "fold"
			},
			{
				path:"bar",
				component: Bar,
				name:"bar"
			},
			{
				path:"pie",
				component:Pie,
				name:"pie"
			},
			{
				path:"form",
				component:Form,
				name:"form"
			},
			//图标-elementUI
			{
				path: "elementUI",
				component: ElementUI,
				name: "elementUI"
			},
			//图标-iconFont
			{
				path: "awesome",
				component: Awesome,
				name: "awesome"
			},
			//导入
			{
				path: "input",
				component: Input,
				name: "input"
			},
			//导出
			{
				path: "output",
				component: Output,
				name: "output"
			},
			{
				path: ":name",
				component: h=>h(Vue.extend({
					render(h){
						return h("div", {}, this.$route.params.name)
					}
				})),
				name: "name"
			}
		]
	}
]