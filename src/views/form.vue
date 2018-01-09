<template>
    <div id="form">

<!-- 表格查询部分-->
        <div class="formFind"> 
           <el-tooltip class="item" effect="dark" 
              placement="bottom-end">
              <el-button icon="el-icon-question" class="tip"></el-button>
              <div slot="content">
                <p>注意：</p>
                <p>未开票订单集中交付流程为：生成物料清单>开票>打印发票>打印面单</p>                
                <p>订单处理范围：（以下条件是且的关系）</p>
                <p>1、订单未开票且开票给单位用户；</p>
                <p>2、发票预约交付方式为快递；</p>
                <p>3、开票类型=增值税普票或增值税专票；</p>
                <p>4、不包含非集中交付订单、集中交付地址确认订单、团购订单；</p>
                <p>已开票订单集中交付流程为：生成物料清单>打印面单</p>
                <p>订单处理范围：（以下条件是且的关系）</p>
                <p>1、订单已开票且开票给单位用户；</p>
                <p>2、发票交付状态为已交付或者无需交付；</p>
                <p>3、订单存在交付状态为未交付且交付方式为快递的交付项；</p>
                <p>4、不包含非集中交付订单、集中交付地址确认订单、团购订单；</p>
                <br>
                <p>说明：</p>
                <p>1、"包含未设置配送单位的订单"项勾选后，每个机构按照配置的默认值进行交付；</p>
                <p>2、交付清单一旦生成则无法更改； </p>  
              </div>
            </el-tooltip>

            <div class="FindTxt"><p class="title">清单生成日期：</p><el-date-picker
            v-model="value6"
            type="daterange"
            start-placeholder="日期范围"
            end-placeholder="日期范围"
            class="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
			:clearable='false'>
            </el-date-picker></div>
            <div class="FindTxt"><p class="title">清单所属网点：</p><el-select v-model="siteValue" placeholder="请选择">
                <el-option
                v-for="item in sites"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select></div>
            <div class="FindTxt"><p class="title">清单生成条件：</p><el-select v-model="handleValue" placeholder="请选择">
                <el-option
                v-for="item in handle"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select></div>
            <div class="FindTxt">
                <p class="title">添加人：</p><el-input
                placeholder="请输入添加人"
                v-model="adder"
                clearable >
                </el-input>
            </div>
            <div class="FindTxt"><p class="title">开票类型：</p><el-select v-model="typeValue" placeholder="请选择">
                <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select></div>
            <div class="big">
				<div class="searchReset">
					<el-button type="primary" @click="find">查询</el-button>
					<el-button @click="reset">重置</el-button>
            	</div> 
			</div>          
        </div>
<!-- 表格查询部分结束-->

<!-- 表格信息添加部分 -->
        <div class="formAdd">
            <el-button type="primary" @click="dialogFormVisibleTrue('未开票')">生成未开票订单物料清单</el-button>
            <el-button type="primary" @click="dialogFormVisibleTrue('已开票')">生成已开票订单物料清单</el-button>
            <el-button type="primary" @click="formSum">清单物料汇总</el-button>
						<el-dialog title="物料清单汇总" :visible.sync="dialogSum" center id="sum">
							<el-table border :data="sumData">
								<el-table-column property="name" label="物料编号" ></el-table-column>
								<el-table-column property="num" label="订单数" ></el-table-column>
							</el-table>
							<el-button plain slot="footer" class="dialog-footer" @click="sumPrint">打印</el-button>
						</el-dialog>
            <el-dialog title="生成物料清单" :visible.sync="dialogFormVisible" center>
              <el-form :model="form">
                <el-form-item label="用户所属网点：" :label-width="formLabelWidth">
                  <el-select v-model="form.siteValue" placeholder="请选择">
                      <el-option
                      v-for="item in form.sites"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="订单收款日期：" :label-width="formLabelWidth"> 
                    <el-date-picker
                    v-model="form.dateValue"
                    type="daterange"
                    start-placeholder="日期范围"
                    end-placeholder="日期范围"
                    class="date"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
					:clearable="false">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="开票类型：" :label-width="formLabelWidth">
                  <el-select v-model="form.kaiType" placeholder="请选择">
                    <el-option label="增值税专票" value="增值税专票"></el-option>
                    <el-option label="增值税普票" value="增值税普票"></el-option>
                    <el-option label="增值税普票（电子版）" value="增值税普票（电子版）"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="收款方式：" :label-width="formLabelWidth">
                  <el-select v-model="form.getType"  placeholder="请选择" >
                      <el-option
                      v-for="item in form.getTypes"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="销售渠道：" :label-width="formLabelWidth">
                  <el-select v-model="form.sale"   placeholder="请选择">
                      <el-option
                      v-for="item in form.sales"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                      </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="订单对账状态：" :label-width="formLabelWidth">
                  <el-select v-model="form.dingStatus"  placeholder="请选择">
                    <el-option label="已对账" value="已对账"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="establish1" v-if="changeData<0">生成交付清单</el-button>
                <el-button type="primary" @click="change" v-else>完成编辑</el-button>
              </div>
            </el-dialog>
        </div>
<!-- 表格信息添加部分结束 -->

<!-- 表格显示部分 -->
        <div class="formList">
            <el-table
              :data="pageList"
              height="400"
              border
              style="width: 100%;margin-top:10px"
			  :span-method="objectSpanMethod"
			  @selection-change="handleSelectionChange"> 
			<!-- 选中列表中数据的函数 -->
				<el-table-column
					type="selection"
					width="55"
					fixed
					>
				</el-table-column>
				<!-- 订单详细信息 -->
			    <el-table-column label="订单详情" type="expand" width="80" fixed > 
					<template slot-scope="props">
						<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="物料单号">
							<span>{{ props.row.num }}</span>
						</el-form-item>
						<el-form-item label="收款日期">
							<span>{{ props.row.date[0] }} 至 {{ props.row.date[1] }}</span>
						</el-form-item>
						<el-form-item label="所属网点">
							<span>{{ props.row.site }}</span>
						</el-form-item>
						<el-form-item label="开票类型">
							<span>{{ props.row.kaiNum }}</span>
						</el-form-item>
						<el-form-item label="货物数量">
							<span>{{ props.row.dingNum }}</span>
						</el-form-item>
						<el-form-item label="收款方式">
							<span>{{ props.row.sale }}</span>
						</el-form-item>
						<el-form-item label="生成条件">
							<span>{{ props.row.remark }}</span>
						</el-form-item>
						<el-form-item label="收款方式">
							<span>{{ props.row.getType }}</span>
						</el-form-item>
						<el-form-item label="添加人">
							<span>{{ props.row.adder }}</span>
						</el-form-item>
						<el-form-item label="对账状态">
							<span>{{ props.row.dingStatus }}</span>
						</el-form-item>
						</el-form>
					</template>
				</el-table-column>
              <el-table-column
                prop="num"
                label="物料清单编号"
                width=""
				>
              </el-table-column>
              <el-table-column
                prop="date[0]"
                label="生成日期"
                width="">
              </el-table-column>
              <el-table-column
                prop="site"
                label="清单所属网点">
              </el-table-column>
			<el-table-column label="订单开票信息">  
              <el-table-column
                prop="kaiNum"
                label="开票类型">
              </el-table-column>
              <el-table-column
                prop="dingNum"
                label="订单数">
              </el-table-column>
              <el-table-column
                prop="remark"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="adder"
                label="添加人">
              </el-table-column>
			  </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="130px"
				>
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, formList)"
                    type="text"
                    size="small">
                    移除
                  </el-button>
                  <el-button
                    @click.native.prevent="changeRow(scope.$index, formList)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                </template>
              </el-table-column>
			  
            </el-table>
			<el-pagination
				:current-page.sync="currentPage"
				:page-sizes="[10, 20, 30]"
				:page-size="pageSize"
				:total="finalTotal"
				@size-change="handleSizeChange"
				layout="total, sizes, prev, pager, next"

				>
			</el-pagination>
        </div>
<!-- 表格显示部分结束 -->

    </div>
</template>
<script>
/**
 * Created by fuzl on 2017-10-31.
 */
import "../style/form.less"
export default {
	data() {
		return {  
			randomNum:"00000",//每两单生成的5位随机的物料单号
			findFormList:[],//查询出的结果
			sumData:[], //物料清单汇总的数据
			dialogSum:false, //物料清单汇总弹框显示与否
			multipleSelection:[],//清单物料汇总一开始为一个空数组
			currentPage:1, //当前页数
			pageSize: 10, //初始时一页的条数
			changeData:-1, //当前表单中第几个数据在进行编辑
			value6: "", //清单生成日期值
			siteValue: "", //查询的清单所属网点的值
			sites: [{   //站点中清单网点的选项
				value: "全部",
				label: "全部"
			}, {
				value: "石家庄",
				label: "石家庄"
			}, {
				value: "保定",
				label: "保定"
			}, {
				value: "邢台",
				label: "邢台"
			}, {
				value: "廊坊",
				label: "廊坊"
			},{
				value: "邯郸",
				label: "邯郸"
			},{
				value: "承德",
				label: "承德"
			},{
				value: "衡水",
				label: "衡水"
			},{
				value: "沧州",
				label: "沧州"
			},{
				value: "秦皇岛",
				label: "秦皇岛"
			},{
				value: "张家口",
				label: "张家口"
			},{
				value: "唐山",
				label: "唐山"
			},{
				value: "税友河北分公司",
				label: "税友河北分公司"
			}],
			handleValue:"",  //查询的是否已开票的值
			handle: [{  //查询的是否已开票选项
				value: "已开票",
				label: "已开票"
			}, {
				value: "未开票",
				label: "未开票"
			}],
			adder:"", //查询的添加人
			typeValue:"",   //查询的开票类型值
			type:[{         //查询的开票类型选项
				value: "增值税专票",
				label: "增值税专票"
			}, {
				value: "增值税普票",
				label: "增值税普票"
			},{
				value: "增值税普票（电子）",
				label: "增值税普票（电子）"
			},{
				value: "其他",
				label: "其他"
			}],
			dialogFormVisible: false, //添加清单弹框是否显示可见
			addIndex:"", //储存dialogFormVisibleTrue函数中index参数的变量用来判断是否已经开票
			form: {   //添加清单中需要用到的数据
				siteValue:"",
				sites: [{
					value: "全部",
					label: "全部"
				}, {
					value: "石家庄",
					label: "石家庄"
				}, {
					value: "保定",
					label: "保定"
				}, {
					value: "邢台",
					label: "邢台"
				}, {
					value: "廊坊",
					label: "廊坊"
				},{
					value: "邯郸",
					label: "邯郸"
				},{
					value: "承德",
					label: "承德"
				},{
					value: "衡水",
					label: "衡水"
				},{
					value: "沧州",
					label: "沧州"
				},{
					value: "秦皇岛",
					label: "秦皇岛"
				},{
					value: "张家口",
					label: "张家口"
				},{
					value: "唐山",
					label: "唐山"
				},{
					value: "税友河北分公司",
					label: "税友河北分公司"
				}],
				dateValue:"",
				kaiType: "",
				getType:"",
				getTypes:[{
					value:"支票",
					label:"支票"
				},{
					value:"汇款转账",
					label:"汇款转账"
				},{
					value:"POS机刷卡",
					label:"POS机刷卡"
				},{
					value:"支付宝支付",
					label:"支付宝支付"
				},{
					value:"银行托收",
					label:"银行托收"
				},{
					value:"工行",
					label:"工行"
				},{
					value:"通联",
					label:"通联"
				},{
					value:"其他",
					label:"其他"
				}],
				sale:"",
				sales:[{
					value:"用户网购",
					label:"用户网购"
				},{
					value:"电话销售",
					label:"电话销售"
				},{
					value:"培训销售",
					label:"培训销售"
				},{
					value:"网点销售",
					label:"网点销售"
				},{
					value:"驻点销售",
					label:"驻点销售"
				},{
					value:"代理商销售",
					label:"代理商销售"
				},{
					value:"用户自主汇款",
					label:"用户自主汇款"
				}],
				dingStatus:"",
				delivery: false,
				type: [],
				resource: "",
				desc: ""
			},
			formLabelWidth: "120px", //添加部分弹框宽度
			formList:[{  //表格显示部分表格的数据
				num:"12345",date:["2017-12-26","2017-12-27"], site:"保定", kaiNum:"增值税专票",dingNum:58,sale:"用户自主汇款", remark:"已开票",adder:"han",getType:"支票",dingStatus:"其他"
			},{  
				num:"12345",date:["2017-12-22","2017-12-23"], site:"廊坊", kaiNum:"增值税普票",dingNum:58,sale:"用户自主汇款", remark:"已开票",adder:"han",getType:"支票",dingStatus:"其他"
			}]

		}
	},
	computed: {
		pageList(){  //分页功能
			let index = (this.currentPage - 1) * this.pageSize
			return this.finalList.slice(index, index + this.pageSize)
		},
		finalList(){  //表格中判断是显示查询的结果还是列表菜单
			return this.findFormList.length==0 ? this.formList : this.findFormList
		},
		finalTotal(){ //表格中判断是显示查询的结果总数还是列表菜单总数
			return this.findFormList.length==0 ?this.formList.length : this.findFormList.length
		}
	},
	methods: {
		//单元格合并
		objectSpanMethod({row, rowIndex, columnIndex }) {			
			if(columnIndex === 2){
				if(rowIndex<this.pageList.length-1){
					if(row.num===this.pageList[rowIndex+1].num){
						return{
							rowspan: 2,
							colspan: 1
						}
					}
				}
				if(rowIndex>0){
					if(this.pageList[rowIndex-1].num==row.num){
						return{
							rowspan: 0,
							colspan: 0
						}
					}
				}	
						
			}
			// if (columnIndex === 2 ) {
			// 	if (rowIndex % 2 === 0) {
			// 		return {
			// 			rowspan: 2,
			// 			colspan: 1
			// 		}
			// 	} else {
			// 		return {
			// 			rowspan: 0,
			// 			colspan: 0
			// 		}
			// 	}
			// }
		},
		handleSizeChange(pageSize){ //pageSize改变时即每页条目数改变时会触发，把这个数传到data的自己定义的pageSize中便于分页判断
			this.pageSize = pageSize
		},
		handleSelectionChange(val) {  //表格选项勾选
			this.multipleSelection = val
		},
		reset(){  //重置按钮
		  this.findFormList=[]//使查询表达清空
			this.value6=this.typeValue=this.adder=this.handleValue=this.siteValue=""
		},

		dialogFormVisibleTrue(index){ //添加表格的弹框显示函数
			this.findFormList=[]//使查询表达清空
			this.dialogFormVisible = true
			this.addIndex=index
		},

		establish1(){ //生成清单即在表格中添加数据
			this.dialogFormVisible = false
			// if(this.form.siteValue==""|| this.form.dateValue=="" ||this.form.kaiType==""||this.form.getType==""||this.form.sale==""||this.form.dingStatus==""){
			// 	this.$alert("请填写完整您的数据再生成清单，谢谢！", "温馨提示", {
			// 		confirmButtonText: "确定"                           
			// 	})
			// }else{
			let obj={}
			//只要新生产的清单上两条清单清单号相同则生产一条新的订单号否则生产一个跟上一个清单号相同的清单号
			if(this.formList.length<2){ 
				//生成5位随机清单编号
				obj.num=parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())
				this.randomNum=obj.num
			}else{
				if(this.formList[this.formList.length-1].num==this.formList[this.formList.length-2].num){
					//生成5位随机清单编号
					obj.num=parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())+""+parseInt(10*Math.random())
					this.randomNum=obj.num
				}else{
					obj.num=this.randomNum
				}  
			}		       
			obj.date=this.form.dateValue
			obj.site=this.form.siteValue    
			obj.kaiNum=this.form.kaiType
			obj.dingNum=parseInt(101*Math.random())
			obj.sale=this.form.sale
			obj.remark=this.addIndex
			obj.adder="han"
			obj.getType=this.form.getType
			obj.dingStatus=this.form.dingStatus
			// console.log(obj.num+" "+obj.date[0]+" "+obj.site+" "+obj.kaiNum+" "+obj.dingNum+" "+obj.remark)
			this.formList.push(obj)
			this.form.siteValue= this.form.dateValue=this.form.kaiType=this.form.getType=this.form.sale=this.form.dingStatus=""
			// }
		},
		deleteRow(index, rows) { //表格中选中数据删除
			rows.splice(index, 1)
		},
		changeRow(index,rows){ //编辑表格中的内容
			this.changeData=index
			this.dialogFormVisibleTrue(rows[index].remark)
			this.form.dateValue=rows[index].date
			this.form.siteValue=rows[index].site
			this.form.kaiType=rows[index].kaiNum
			this.form.sale=rows[index].sale
			this.form.getType=rows[index].getType
			this.form.dingStatus=rows[index].dingStatus
		},
		change(){  //点击完成编辑对表格中的内容进行改变
			this.formList[this.changeData].date=this.form.dateValue
			this.formList[this.changeData].site=this.form.siteValue
			this.formList[this.changeData].kaiNum=this.form.kaiType
			this.formList[this.changeData].sale=this.form.sale
			this.changeData= -1
			this.dialogFormVisible = false
			this.form.siteValue= this.form.dateValue=this.form.kaiType=this.form.getType=this.form.sale=this.form.dingStatus=""
		},
		formSum(){ //选中的清单物料汇总
			// console.log(this.multipleSelection.length);
			if(this.multipleSelection.length==0){
				this.$alert("请至少选择一个清单！，谢谢！", "提示", {
					confirmButtonText: "确定"                           
				})
			}else{
				this.dialogSum=true
				this.sumData=[]
				// console.log(this.multipleSelection);
				for(let i=0;i<this.multipleSelection.length;i++){
					let obj={}
					obj.name=this.multipleSelection[i].num
					obj.num=this.multipleSelection[i].dingNum
					this.sumData.push(obj)
				}
			}
		},
		sumPrint(){ //物料单清单打印		
		  this.dialogSum=false
			window.print()
		},
		find(){	  //查询出相应的结果
			if(this.value6==""&&this.siteValue==""&&this.handleValue==""&&this.adder==""&&this.typeValue==""){
				this.$alert("请输入搜索信息再查询!","提示",{
					confirmButtonText:"确定"
				})
			}else{
				this.findFormList=this.formList
				const _this=this
				this.findFormList=this.findFormList.filter(function(arr){ //匹配清单网点
					if(_this.siteValue){
						if(_this.siteValue=="全部"){
							return true
						}else{
							return arr.site == _this.siteValue
						}
					}else{
						return true
					}
				})
				this.findFormList=this.findFormList.filter(function(arr){ //匹配是否开票
					if(_this.handleValue){
						return arr.remark == _this.handleValue
					}else{
						return true
					}
				})
				this.findFormList=this.findFormList.filter(function(arr){ //匹配添加人
					if(_this.adder){
						return arr.adder == _this.adder
					}else{
						return true
					}
				})
				this.findFormList=this.findFormList.filter(function(arr){ //匹配开票类型
					if(_this.typeValue){
						return arr.kaiNum == _this.typeValue
					}else{
						return true
					}
				})
				this.findFormList=this.findFormList.filter(function(arr){ //匹配日期
					if(_this.value6){
						// console.log(_this.value6[0].split('-'))
						//先计算出搜索的时间上下两个范围的总天数是多少
						let rangeSmall=parseInt(_this.value6[0].split("-")[0]*365)+parseInt(_this.value6[0].split("-")[1]*30)+parseInt(_this.value6[0].split("-")[2])
						let rangeBig=parseInt(_this.value6[1].split("-")[0]*365)+parseInt(_this.value6[1].split("-")[1]*30)+parseInt(_this.value6[1].split("-")[2])
						// console.log(rangeSmall)
						// console.log(rangeBig)
						//再计算列表中生成时间的总天数并去判断是否在上面的区间中
						let date=parseInt(arr.date[0].split("-")[0]*365)+parseInt(arr.date[0].split("-")[1]*30)+parseInt(arr.date[0].split("-")[2])
						// console.log(date)
						if(date>=rangeSmall&&date<=rangeBig){
							return true
						}else{
							return false
						}
					}else{
						return true
					}
				})
				
				if(this.findFormList.length==0){
					this.$alert("未找到匹配的信息！","提示",{
						confirmButtonText:"确定"
					})
				}else{
					this.$alert("已找到匹配信息如下！","成功",{
						confirmButtonText:"确定"
					})
				}
			}			
		}


	}
}
</script>
<style></style>
