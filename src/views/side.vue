<template>
    <div class="site__side">
        <menus :menus="menus" @open="open" @close="close" @select="select" class="example" :router="false"></menus>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-31.
 */
import menus from "../components/menu.vue"

export default {
	components: {
		menus
	},
	methods: {
		open: function(name, menu){
            // eslint-disable-next-line
            console.log(name, menu)
		},
		close: function(name, menu){
            // eslint-disable-next-line
            console.log(name, menu)
		},
		select: function(index, menuItem){
            // eslint-disable-next-line
            console.log(index, menuItem)
            // 如果是链接则跳转，否则不跳转
			if (index.indexOf("/") === 0) {
	            this.$router.push(index)
			}
		}
	},
	data(){
		return {
			menus: [
				{
					icon: "el-icon-message",
					title: "导航一",
					submenus: [
						{
							title: "分组一",
							group: [
								{
									title: "选项1",
									index: "/shell/path1"
								},
								{
									title: "选项2",
									index: "/shell/path2"
								}
							]
						},
						{
							title: "分组二",
							group: [
								{
									title: "选项3",
									index: "/shell/path3"
								},
								{
									title: "选项4",
									index: "/shell/path4"
								}
							]
						},
						{
							title: "子菜单",
							submenus: [
								{
									title: "选项5",
									index: "/shell/path5"
								},
								{
									title: "选项6",
									index: "/shell/path6"
								}
							]
						}
					]
				},
				{
					icon: "el-icon-menu",
					title: "表格",
					index: "/shell/table"
				},
				{
					icon: "el-icon-setting",
					title: "设置",
					index: "/shell/setting"
				},
				{
					icon: "fa fa-bar-chart",
					title: " 图表",
					submenus: [
						{
							icon:"fa fa-line-chart",
							title: "折线图",
							index: "/shell/fold"
						},
						{
							icon:"fa fa-bar-chart",
							title: "柱状图",
							index: "/shell/bar"
						},
						{
							icon:"fa fa-pie-chart",
							title:"饼状图",
							index: "/shell/pie"
						}
					]
				},
				{
					icon:"fa fa-wpforms",
					title:"表格",
					index:"/shell/form"
				},
				{
					icon: "fa fa-bar-chart",
					title: "编辑器",
					index: "/shell/editor"
				},
				{
					icon: "fa fa-bar-chart",
					title: "图标",
					submenus: [
						{
							title: "elementUI",
							index: "/shell/elementUI"
						},
						{
							title: "Font Awesome",
							index: "/shell/awesome"
						}
					]
				},
				{
					icon: "fa fa-bar-chart",
					title: "导入导出",
					submenus: [
						{
							title: "导入",
							index: "/shell/input"
						},
						{
							title: "导出",
							index: "/shell/output"
						}
					]
				},
			]
		}
	}
}
</script>
<style></style>