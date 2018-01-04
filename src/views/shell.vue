<template>
    <div>
        <site-head></site-head>
        <side-menu></side-menu>
        <div class="site__body">
            <transition name="fade">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-31.
 */
import sideMenu from "./side.vue"
import siteHead from "./head.vue"
import "../style/shell.less"

export default {
	components: {
		sideMenu,
		siteHead
	},
	props: [],
	data(){
		return {}
	},
	methods: {

	},
	created(){

	},
	mounted(){

	}
}
</script>
<style></style>