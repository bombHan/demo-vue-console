<template>
    <el-menu :default-active="innerActive"
             :mode="mode"
             :collapse="collapse"
             :background-color="backgroundColor"
             :text-color="textColor"
             :active-text-color="activeTextColor"
             :unique-opened="uniqueOpened"
             :menu-trigger="menuTrigger"
             :router="router"
             @open="openMenu"
             @close="closeMenu"
             @select="selectMenu">
        <sub-menu v-for="(menuItem, index) in innerMenus" :key="index" :menu-item="menuItem"></sub-menu>
    </el-menu>
</template>
<script>
/**
 * Created by fuzl on 2017-11-1.
 */
import subMenu from "./sub-menu.vue"
import util from "../util"

export default {
	name: "menu",
	components: {
		subMenu
	},
	data(){
		return {
			innerActive: this.defaultActive,
			innerMenus : [],
			_indexMap: {}
		}
	},
	props: {
		menus: Array,
		mode: String,
		defaultActive: [String, Number],
		collapse: Boolean,
		backgroundColor: String,
		textColor: String,
		activeTextColor: String,
		uniqueOpened: Boolean,
		menuTrigger: String,
		router: Boolean
	},
	created(){
	    this._presetMenus()
	},
	methods: {
		/**
         * @description 数据检查一遍，查看index是否存在重复的情况，没有则设置index
         * */
    	_presetMenus(){
    		this._indexMap = Object.create(null)
    		this.innerMenus = this.menus.map((menu, index)=>{
    			return this._checkIndex(menu, index + "")
    		})
	    },
		/**
         * @description 检查菜单索引是否设置正确
		 * @param {Object} menu - 菜单项
		 * @param {String} genIndex - 自动生成的index
		 * */
		_checkIndex(menu, genIndex){
			// copy menu
			menu = Object.assign({}, menu)
			if (menu.index) {
				let index = menu.index
				if (util.asserts.noExistPropertyInMap(index, this._indexMap)) {
					this._indexMap[index] = menu
				}
			} else {
				menu.index = genIndex
				this._indexMap[genIndex] = menu
			}
			// 检查子菜单和分组情况
			if (menu.submenus) {
				menu.submenus = menu.submenus.map((menu, index)=>{
					return this._checkIndex(menu, genIndex + "-" + index)
				})
			}
			if (menu.group) {
				menu.group = menu.group.map((menu, index)=>{
					return this._checkIndex(menu, genIndex + "-" + index)
				})
			}
			return menu
		},
		openMenu(index){
			this.$emit("open", index, this.getMenuItemByIndex(index))
		},
		closeMenu(index){
			this.$emit("close", index, this.getMenuItemByIndex(index))
		},
		selectMenu(index){
			let menuItem = this.getMenuItemByIndex(index)
			this.$emit("select", index, menuItem)
		},
        /**
         * @description 根据index获取当前的menuItem对象
         * @param {String} index
         * @return {Object}
         * */
		getMenuItemByIndex(index){
			return this._indexMap[index]
		},
        /**
         * @description 取得一个菜单项中的子菜单列表
         * @param {Object} menuItem
         * @return Array|Null
         * */
		getSubItems(menuItem){
			if (util.isEmptyArray(menuItem.submenus) === false) {
				return menuItem.submenus
			} else if (util.isEmptyArray(menuItem.group) === false) {
				return menuItem.group
			} else {
				return null
			}
		}
	},
	watch: {
		menus(){
			this._presetMenus()
		},
		$route(){
			this.innerActive = this.$route.path
		}
	}
}
</script>
<style></style>