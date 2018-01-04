<template>
    <div>
        <span>文本导出:</span><br/>
        <textarea cols=50 rows=10 v-model="value"></textarea>
        <button @click="output()">导出</button>
        <!--<a :href="url" :download="name" path="D:/" >下载vueJS</a>-->
    </div>
</template>

<script>

export default {
	name: "output",
   // props: ["url", "name"],
	data(){
		return {
			value:""
		}
	},
	methods:{
		output(){
			var blob=new Blob([this.value],{type:"text/plain;charset=utf-8"})
            // eslint-disable-next-line
			saveAs(blob,"my.txt")
		}
	}
}
</script>

<style scoped>

</style>