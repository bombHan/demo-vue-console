<template>
    <div ref="chart"></div>
</template>
<script>
/**
 * Created by fuzl on 2017-11-2.
 * @description 对echarts封装
 */
import echarts from "echarts"

export default {
	props: {
		option: Object,
		theme: String
	},
	data(){
		return {}
	},
	methods: {
        /**
         * @method renderEChart
         * @description 渲染echart
         * @param {Object} [option] - 配置选项，可选
         * */
		renderEChart(option){
			this.echartsInstance.setOption(option || this.option)
		}
	},
	mounted(){
		this.echartsInstance = echarts.init(this.$refs.chart, null, {})
		this.renderEChart()
	},
	beforeUpdate(){
		this.renderEChart()
	},
	watch: {
		option: {
			handler(val){
				this.renderEChart(val)
			},
			deep: true
		}
	}
}
</script>
<style></style>