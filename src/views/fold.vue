<template>
    <div id="foldPic">
        <h1>折线图</h1>
        <h4>折线图种类一：</h4>
        <echart ref="lineChart" style="width: 100%; height: 400px;" :option="lineData1"></echart>
		<h4>折线图种类二：</h4>
		<echart ref="lineChart" style="width: 100%; height: 400px;" :option="lineData2"></echart>
		<h4>折线图种类三：</h4>
		<echart ref="lineChart" style="width: 100%; height: 400px;" :option="lineData3"></echart>
    </div>
</template>
<script>
import echart from "../components/echart.vue"

export default {
	components: {
		echart
	},
	props: [],
	data(){
		return {
			lineData1: {
				title: {
					text: "一年销售额分布",
					subtext: "纯属虚构"
				},
				tooltip: {
					trigger: "axis",
					axisPointer: {
						type: "cross"
					}
				},
				toolbox: {
					show: true,
					feature: {
						saveAsImage: {}
					}
				},
				xAxis:  {
					type: "category",
					boundaryGap: false,
					data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "12月"]
				},
				yAxis: {
					type: "value",
					axisLabel: {
						formatter: "{value} 万元"
					},
					axisPointer: {
						snap: true
					}
				},
				visualMap: {
					show: false,
					dimension: 0,
					pieces: [{
						lte: 5,
						color: "green"
					}, {
						gt: 5,
						lte: 6,
						color: "red"
					}, {
						gt: 6,
						lte: 12,
						color: "green"
					}]
				},
				series: [
					{
						name:"销售额",
						type:"line",
						smooth: false,
						data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380],
						markArea: {
							data: [ [{
								name: "销售额增长旺季",
								xAxis: "6月"
							}, {
								xAxis: "7月"
							}]  ]
						}
					}
				]
			},
			lineData2:{
				title: {
					text: "一周销售额分布",
					subtext: "纯属虚构"
				},
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data:["深圳销售额","广州销售额"]
				},
				toolbox: {
					show: true,
					feature: {
						dataZoom: {
							yAxisIndex: "none"
						},
						dataView: {readOnly: false},
						magicType: {type: ["line", "bar"]},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis:  {
					type: "category",
					boundaryGap: false,
					data: ["周一","周二","周三","周四","周五","周六","周日"]
				},
				yAxis: {
					type: "value",
					axisLabel: {
						formatter: "{value} 万元"
					}
				},
				series: [
					{
						name:"深圳销售额",
						type:"line",
						data:[15, 11, 15, 13, 12, 13, 10],
						markPoint: {
							data: [
								{type: "max", name: "最大值"},
								{type: "min", name: "最小值"}
							]
						},
						markLine: {
							data: [
								{type: "average", name: "平均值"}
							]
						}
					},
					{
						name:"广州销售额",
						type:"line",
						data:[3, 8, 5, 4, 6, 3, 5],
						markPoint: {
							data: [
								{name: "周最低", value: -2, xAxis: 1, yAxis: -1.5}
							]
						},
						markLine: {
							data: [
								{type: "average", name: "平均值"},
								[{
									symbol: "none",
									x: "90%",
									yAxis: "max"
								}, {
									symbol: "circle",
									label: {
										normal: {
											position: "start",
											formatter: "最大值"
										}
									},
									type: "max",
									name: "最高点"
								}]
							]
						}
					}
				]
			},
			lineData3 :{
				title: {
					text: "一周销售额分布"
				},
				tooltip: {
					trigger: "axis"
				},
				legend: {
					data:["深圳销售额", "广州销售额"]
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				toolbox: {
					feature: {
						saveAsImage: {}
					}
				},
				xAxis: {
					type: "category",
					data: ["周一","周二","周三","周四","周五","周六","周日"]
				},
				yAxis: {
					type: "value"
				},
				series: [
					{
						name:"深圳销售额",
						type:"line",
						step: "start",
						data:[15, 11, 15, 13, 12, 13, 10]
					},
					{
						name:"广州销售额",
						type:"line",
						step: "middle",
						data:[3, 8, 5, 4, 6, 3, 5]
					}
				]
			}


		}
	},
	methods: {

	},
	mounted(){

	}
}
</script>
<style></style>
