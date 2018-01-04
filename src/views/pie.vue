<template>
    <div id="piePic">
        <h1>饼状图</h1>
        <h4>饼状图类型一：</h4>
            <echart style="width: 100%; height: 500px;" :option="pieData1"></echart>
        <h4>饼状图类型二：</h4>
            <echart style="width: 100%; height: 500px;" :option="pieData2"></echart>
		<h4>饼状图类型三：</h4>
            <echart style="width: 100%; height: 500px;" :option="pieData3"></echart>

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
		let pieData = this.genData(24)      
		return{
			pieData1: {
				title : {
					text: "销售员销售额统计图",
					subtext: "纯属虚构",
					x:"center"
				},
				tooltip : {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				toolbox: {
					show: true,
					feature: {
						restore: {show: true}
					}
				},
				legend: {
					type: "scroll",
					orient: "vertical",
					right: 10,
					top: 20,
					bottom: 20,
					data: pieData.legendData
				},
				series : [
					{
						name: "姓名",
						type: "pie",
						radius : "55%",
						center: ["40%", "50%"],
						data: pieData.seriesData,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						}
					}
				]
			},
			pieData2: {
				backgroundColor: "#2c343c",

				title: {
					text: "某公司分公司年销售额分布统计",
					left: "center",
					top: 20,
					textStyle: {
						color: "#ccc"
					}
				},

				tooltip : {
					trigger: "item",
					formatter: "{a} <br/>{b} : {c} ({d}%)"
				},

				visualMap: {
					show: false,
					min: 80,
					max: 600,
					inRange: {
						colorLightness: [0, 1]
					}
				},
				series : [
					{
						name:"公司销售额",
						type:"pie",
						radius : "55%",
						center: ["50%", "50%"],
						data:[
							{value:335, name:"河北分公司"},
							{value:310, name:"新疆分公司"},
							{value:274, name:"深圳分公司"},
							{value:235, name:"广州分公司"},
							{value:400, name:"湖南分公司"}
						].sort(function (a, b) { return a.value - b.value }),
						roseType: "radius",
						label: {
							normal: {
								textStyle: {
									color: "rgba(255, 255, 255, 0.3)"
								}
							}
						},
						labelLine: {
							normal: {
								lineStyle: {
									color: "rgba(255, 255, 255, 0.3)"
								},
								smooth: 0.2,
								length: 10,
								length2: 20
							}
						},
						itemStyle: {
							normal: {
								color: "#c23531",
								shadowBlur: 200,
								shadowColor: "rgba(0, 0, 0, 0.5)"
							}
						},

						animationType: "scale",
						animationEasing: "elasticOut",
						animationDelay: function () {
							return Math.random() * 200
						}
					}
				]
			},
			pieData3 : {
				title: {
					text: "某公司分公司年销售额分布统计",
					left: "center",
					top: 20
				},
				tooltip: {
					trigger: "item",
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				legend: {
					orient: "vertical",
					x: "left",
					data:["河北分公司","新疆分公司","深圳分公司","广州分公司","湖南分公司"]
				},
				series: [
					{
						name:"访问来源",
						type:"pie",
						radius: ["50%", "70%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: "center"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: "30",
									fontWeight: "bold"
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data:[
							{value:335, name:"河北分公司"},
							{value:310, name:"新疆分公司"},
							{value:274, name:"深圳分公司"},
							{value:235, name:"广州分公司"},
							{value:400, name:"湖南分公司"}
						]
					}
				]
			}


		}
	},
	methods:{
		genData: function genData(count) {
			let nameList = [
				"赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "屈", "项", "祝", "董", "梁", "杜", "阮", "蓝", "闵", "席", "季", "麻", "强", "贾", "路", "娄", "危"
			]
			let legendData = []
			let seriesData = []
			for (let i = 0; i < count; i++) {
				let name = Math.random() > 0.65
                    ? makeWord(4, 1) + "·" + makeWord(3, 0)
                    : makeWord(2, 1)
				legendData.push(name)
				seriesData.push({
					name: name,
					value: Math.round(Math.random() * 100000)
				})
			}

			return {
				legendData: legendData,
				seriesData: seriesData
			}

			function makeWord(max, min) {
				let nameLen = Math.ceil(Math.random() * max + min)
				let name = []
				for (let i = 0; i < nameLen; i++) {
					name.push(nameList[Math.round(Math.random() * nameList.length - 1)])
				}
				return name.join("")
			}
		}
	}
}
</script>
<style></style>

