<template>
    <div>
        <div :id="id" style="height:300px" ></div>
    </div>
</template>

<script>
//引入百度编辑器
import "../ext/utf8-php/ueditor.config.js"
import "../ext/utf8-php/ueditor.all.js"
import "../ext/utf8-php/lang/zh-cn/zh-cn.js"

export default {
	name: "ueditor",
	data(){
		return {
			id: "editor_" + (Date.now()),
			editor:"",
			uedata:[],
			xierudata: []
		}
	},
	methods:{
		submits(){
			this.uedata.push(this.editor.getContent())
			// console.log(this.uedata.join("\n"))
		},
		xieru(){
			this.editor.setContent("欢迎使用ueditor")
		},
		getContent(){
			return this.editor.getContent()
		}
	},
	mounted(){
		//eslint-disable-next-line
		this.editor=UE.getEditor(this.id,{BaseUrl:"",UEDITOR_HOME_URL: "ext/utf8-php/"})
	}
}
</script>

<style scoped>

</style>