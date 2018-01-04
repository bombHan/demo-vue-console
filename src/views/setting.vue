<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="价格">
                <el-input v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="月度付费">
                <el-switch v-model="form.monthly"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-11-1.
 */
export default {
	data(){
		return {
			form: {
				price: "0",
				monthly: true
			}
		}
	},
	methods: {
		onSubmit(){
			this.$alert("保存成功", "提示")
		}
	}
}
</script>
<style></style>