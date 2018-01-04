<template>
    <div>
        <div class="site__head">
            <div class="site__head-content">
                <div class="site__head--right">
                <span class="site__head-profile">
                    <i class="fa fa-user"></i>
                    用户名
                </span>
                    <span>
                    <a href="javascript:/**/" @click="signOut">
                        <i class="fa fa-sign-out"></i>
                        退出
                    </a>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-31.
 */
import menus from "../components/menu.vue"
export default {
	props: [],
	components: {
		menus
	},
	data(){
	    return {
		    menus: [
			{
                	title: "系统一"
			},
			    {
				    title: "系统二"
			    },
			    {
				    title: "系统三"
			    }
		]
	}
	},
	methods: {
		signOut(){
            // 清除登录痕迹
			this.$router.push({name: "login"})
		}
	}
}
</script>
<style></style>