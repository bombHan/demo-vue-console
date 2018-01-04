<template>
    <div>
        <div>
            <h4>Line-Chart</h4>
            <echart ref="lineChart" style="width: 100%; height: 400px;" :option="lineData"></echart>
        </div>
        <div>
            <h4>Bar-Chart</h4>
            <echart style="width: 100%; height: 400px;" :option="barData"></echart>
        </div>
        <div>
            <h4>Pie-Chart</h4>
            <echart style="width: 100%; height: 500px;" :option="pieData"></echart>
        </div>
    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-11-2.
 */
import echart from "../components/echart.vue"

export default {
	components: {
		echart
	},
	props: [],
	data(){
		let pieData = this.genData(24)
		return {
			lineData: {
				title: {
					text: "一天用电量分布",
					subtext: "副标题"
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
					data: ["00:00", "01:15", "02:30", "03:45", "05:00", "06:15", "07:30", "08:45", "10:00", "11:15", "12:30", "13:45", "15:00", "16:15", "17:30", "18:45", "20:00", "21:15", "22:30", "23:45"]
				},
				yAxis: {
					type: "value",
					axisLabel: {
						formatter: "{value} W"
					},
					axisPointer: {
						snap: true
					}
				},
				visualMap: {
					show: false,
					dimension: 0,
					pieces: [{
						lte: 6,
						color: "green"
					}, {
						gt: 6,
						lte: 8,
						color: "red"
					}, {
						gt: 8,
						lte: 14,
						color: "green"
					}, {
						gt: 14,
						lte: 17,
						color: "red"
					}, {
						gt: 17,
						color: "green"
					}]
				},
				series: [
					{
						name:"用电量",
						type:"line",
						smooth: false,
						data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
						markArea: {
							data: [ [{
								name: "早高峰",
								xAxis: "07:30"
							}, {
								xAxis: "10:00"
							}], [{
								name: "晚高峰",
								xAxis: "17:30"
							}, {
								xAxis: "21:15"
							}] ]
						}
					}
				]
			},
			barData: {
				title : {
					text: "某地区蒸发量和降水量",
					subtext: "纯属虚构"
				},
				tooltip : {
					trigger: "axis"
				},
				legend: {
					data:["蒸发量","降水量"]
				},
				toolbox: {
					show : true,
					feature : {
						dataView : {show: true, readOnly: false},
						magicType : {show: true, type: ["line", "bar"]},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				calculable : true,
				xAxis : [
					{
						type : "category",
						data : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
					}
				],
				yAxis : [
					{
						type : "value"
					}
				],
				series : [
					{
						name:"蒸发量",
						type:"bar",
						data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
						markPoint : {
							data : [
                                {type : "max", name: "最大值"},
                                {type : "min", name: "最小值"}
							]
						},
						markLine : {
							data : [
                                {type : "average", name: "平均值"}
							]
						}
					},
					{
						name:"降水量",
						type:"bar",
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
						markPoint : {
							data : [
                                {name : "年最高", value : 182.2, xAxis: 7, yAxis: 183},
                                {name : "年最低", value : 2.3, xAxis: 11, yAxis: 3}
							]
						},
						markLine : {
							data : [
                                {type : "average", name : "平均值"}
							]
						}
					}
				]
			},
			pieData: {
				title : {
					text: "同名数量统计",
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
			}
		}
	},
	methods: {
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
	},
	mounted(){

	}
}
</script>
<style></style>