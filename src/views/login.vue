<template>
    <div class="login__form">
        <el-form labelWidth="100px" :model="form" ref="form">
            <el-form-item label="用户名：">
                <el-input placeholder="用户名" type="text" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码：">
                <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-30.
 */
import "../style/login.less"

export default {
	props: [],
	data(){
		return {
			form: {
				username: "",
				password: ""
			}
		}
	},
	created(){

	},
	beforeMount(){

	},
	methods: {
		login(){
			this.$router.push({name: "shell"})
		}
	}
}
</script>
<style></style>