<template>
    <div>
        <div>
        <h3>导入图片:</h3>
            <el-upload
                    class="upload-demo"
                    drag
                    action="https://jsonplaceholder.typicode.com/posts/"
                    multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <div>
            <h3>导入文件：</h3>
            <input type="file"  id="test" multiple/>
        </div>
    </div>
</template>

<script>
export default {
	name: "input",
	data(){
		return {

		}
	},
	methods:{

	},
	mounted(){

	}
}
</script>

<style scoped>

</style>