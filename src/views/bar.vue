<template>
    <div id="barPic">   
        <h1>柱状图</h1>   
        <h4>柱状图类型一：</h4>
        <echart style="width: 100%; height: 400px;" :option="barData1"></echart>
		<h4>柱状图类型二：</h4>
		<echart style="width: 100%; height: 400px;" :option="barData2"></echart>
		<h4>柱状图类型三：</h4>
		<echart style="width: 100%; height: 400px;" :option="barData3"></echart>

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
		return{
			barData1: {
				title : {
					text: "某地区进货量和销售量",
					subtext: "纯属虚构"
				},
				tooltip : {
					trigger: "axis"
				},
				legend: {
					data:["销售量","进货量"]
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
						name:"销售量",
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
						name:"进货量",
						type:"bar",
						data:[2.6, 5.9, 9.0, 26.4, 28.7, 77.7, 175.6, 182.2, 48.7, 28.8, 7.0, 3.3],
						markPoint : {
							data : [
                                {name : "年最高", value : 182.2, xAxis: 7, yAxis: 183},
                                {name : "年最低", value : 2.6, xAxis: 0, yAxis: 3}
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
			barData2 :{
				title : {
					text: "某店支出收入利润",
					subtext: "纯属虚构"
				},
				tooltip : {
					trigger: "axis",
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : "shadow"        // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data:["利润", "支出", "收入"]
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis : [
					{
						type : "value"
					}
				],
				yAxis : [
					{
						type : "category",
						axisTick : {show: false},
						data : ["周一","周二","周三","周四","周五","周六","周日"]
					}					
				],
				series : [
					{
						name:"利润",
						type:"bar",
						label: {
							normal: {
								show: true,
								position: "inside"
							}
						},
						data:[200, 170, 240, 244, 200, 220, 210]
					},
					{
						name:"收入",
						type:"bar",
						stack: "总量",
						label: {
							normal: {
								show: true
							}
						},
						data:[320, 302, 341, 374, 390, 450, 420]
					},
					{
						name:"支出",
						type:"bar",
						stack: "总量",
						label: {
							normal: {
								show: true,
								position: "left"
							}
						},
						data:[-120, -132, -101, -134, -190, -230, -210]
					}
				]
			},
			barData3 : {
				title: {
					text: "某公司一年盈亏状况",
					subtext: "纯属虚构",
				},
				tooltip : {
					trigger: "axis",
					axisPointer : {            // 坐标轴指示器，坐标轴触发有效
						type : "shadow"        // 默认为直线，可选为：'line' | 'shadow'
					},
					formatter: function (params) {
						var tar
						if (params[1].value != "-") {
							tar = params[1]
						}
						else {
							tar = params[0]
						}
						return tar.name + "<br/>" + tar.seriesName + " : " + tar.value
					}
				},
				legend: {
					data:["亏损","盈利"]
				},
				grid: {
					left: "3%",
					right: "4%",
					bottom: "3%",
					containLabel: true
				},
				xAxis: {
					type : "category",
					splitLine: {show:false},
					data :  function (){
						var list = []
						for (var i = 1; i <= 11; i++) {
							list.push(  i + "月")
						}
						return list
					}()
				},
				yAxis: {
					type : "value"
				},
				series: [
					{
						name: "公司年度总盈利",
						type: "bar",
						stack: "总量",
						itemStyle: {
							normal: {
								barBorderColor: "rgba(0,0,0,0)",
								color: "rgba(0,0,0,0)"
							},
							emphasis: {
								barBorderColor: "rgba(0,0,0,0)",
								color: "rgba(0,0,0,0)"
							}
						},
						data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
					},
					{
						name: "盈利",
						type: "bar",
						stack: "总量",
						label: {
							normal: {
								show: true,
								position: "top"
							}
						},
						data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
					},
					{
						name: "亏损",
						type: "bar",
						stack: "总量",
						label: {
							normal: {
								show: true,
								position: "bottom"
							}
						},
						data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
					}
				]
			}


		}
	},
	methods:{
        
	}
}
</script>
<style></style>
