<template>
    <el-submenu v-if="isSubMenu" :index="menuItem.index">
        <template slot="title"><i :class="menuItem.icon"></i><span slot="title">{{menuItem.title}}</span></template>
        <sub-menu v-for="(subMenuItem, index) in menuItem.submenus" :key="index" :menu-item="subMenuItem"></sub-menu>
    </el-submenu>
    <el-menu-item-group v-else-if="isGroup">
        <template slot="title"><span slot="title">{{menuItem.title}}</span></template>
        <sub-menu v-for="(groupItem, index) in menuItem.group" :key="index" :menu-item="groupItem"></sub-menu>
    </el-menu-item-group>
    <el-menu-item v-else-if="menuItem" :index="menuItem.index" @click.native="handleClickMenuItem">
        <template slot="title">
            <i v-if="menuItem.icon" :class="menuItem.icon"></i>
            <span slot="title">{{menuItem.title}}</span>
        </template>
    </el-menu-item>
</template>
<script>
/**
 * Created by fuzl on 2017-11-2.
 */
import util from "../util"

export default {
	name: "sub-menu",
	props: ["menuItem"],
	data(){
		return {}
	},
	created(){

	},
	methods: {
		handleClickMenuItem(){
            // this.menuItem 肯定是menuItem
			if (this.menuItem.path) {
				this.$router.push(this.menuItem.path)
			}
		}
	},
	computed: {
		isItem(){
			return util.isEmptyArray(this.menuItem.submenus) && util.isEmptyArray(this.menuItem.group)
		},
		isGroup(){
			return this.menuItem.group && this.menuItem.group.length > 0
		},
		isSubMenu(){
			return this.menuItem.submenus && this.menuItem.submenus.length > 0
		}
	}
}
</script>
<style></style>