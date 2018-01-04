<template>
    <div>
        <h3>编辑器</h3>
        <ueditor ref="editor"></ueditor>
        <button @click="submit">保存</button>
        <button @click="xie">写入</button>
        <button @click="output()">导出文本内容</button>
    </div>
</template>

<script>
import ueditor from "../components/ueditor.vue"
export default {
    // name: "editor",
	components: {
		ueditor
	},
	data(){
		return{
			value:""
		}
	},
	computed:{
	},
	methods:{
		submit(){
			this.$refs.editor.submits()
		},
		xie(){
                //console.log(this.$refs);
			this.$refs.editor.xieru()
		},
		output(){
			this.value=this.$refs.editor.getContent()
			//console.log(this.$refs.editor.getContent())
			var blob=new Blob([this.value],{type:"text/plain;charset=utf-8"})
            // eslint-disable-next-line
			saveAs(blob,"my.txt")
		}
	},
	created(){
	}
}
</script>

<style scoped>

</style>

