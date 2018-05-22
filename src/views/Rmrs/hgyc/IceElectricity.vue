<style lang="less" scoped>
	@import '../../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<h4 slot="title">
                    <Icon type="android-contact"></Icon>
                    {{data.page_title}}
                </h4>
				<Row class="margin-top-10">
					<Col :lg='3'> 安装位置：
					</Col>
					<Col :lg='9'> {{data.result.position}}
					</Col>
				</Row>
				<Row class="margin-top-10">
					<Col :lg='3'> 客户名称：
					</Col>
					<Col :lg='9'>
					<a @click="toCustomer(data.result.login_id)">
						{{data.result.user_name}}
					</a>
					</Col>
					<Col :lg='3'> 倍率：
					</Col>
					<Col :lg='9'> {{data.result.transformer_ratio}}
					</Col>
				</Row>

			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<div class="ivu-card-head" style="padding: 0; border-bottom:0px"></div>
				<Tabs>
					<TabPane label="表格数据">

						<h4 slot="title">
                    <Icon type="ios-bolt"></Icon>
                    冻结电量
                </h4>
						<Row>
							<Col :lg='12'>
							<div class="">
								<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据（Csv格式）</Button></span>
								<span style="margin-right: 16px;"><a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a><Button type="primary" size="large" @click="exportExcel()"><Icon type="ios-download-outline"></Icon> 导出数据（Excel格式）</Button></span>
							</div>

							</Col>
							<Col :lg='8'>&nbsp;</Col>
							<Col :lg="4" style="text-align: right;">
							<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入抄读时间搜索..." style="width: 200px" />
							</Col>
						</Row>

						<Row class="margin-top-10 searchable-table-con1">
							<!--<Table :columns="columns1" :data="data1"></Table>-->
							<Table border :data="customerData" v-model="customerData" :columns="editInlineColumns"></Table>
							<Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
						</Row>
						<!--<Table refs="table" :data="customerData" v-model="customerData" :columns="editInlineColumns"></Table>-->

						<div style="margin: 10px;overflow: hidden">
							<div style="float: right;">
								<Page :total="dataCount" :current="1" @on-change="changePage"></Page>
							</div>
						</div>
					</TabPane>
					<TabPane label="图表数据">
						<div id="myChart" :style="{width: '100%', height: '600px'}"></div>
					</TabPane>
				</Tabs>

			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import axios from 'axios'
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	export default {
		name: 'iceElectricity',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				searchConName1: "",
				customerData: [],
				data: {
					result: {
						position: "",
					}
				},
				editInlineColumns: [{
						title: '冻结时间',
						align: 'center',
						key: 'measuretime',
						sortable: true
					},
					{
						title: '表底数',
						align: 'center',
						key: 'transformer_ratio',
						sortable: true
					},
					{
						title: '冻结电量',
						align: 'center',
						key: 'rea_pp',
						sortable: true
					},
					{
						title: '抄读时间',
						align: 'center',
						key: 'dt_edit',
						sortable: true
					}

				]
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			toCustomer(customer_id) {
				this.$router.push({
					name: 'customer',
					params: {
						id: customer_id
					}
				});
			},
			init() {
				//获取信息
				console.log(this.$route.params.id);
				var copy = this;
				let index = copy.$route.params.id;
				let myChart = this.$echarts.init(document.getElementById('myChart'))
				axios.get(Api.url + "hems/meter/getPeriodenergy/" + index, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.data = response.data.data;
						copy.historyData = response.data.data.period_energys;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.customerData = copy.historyData;
						} else {
							copy.customerData = copy.historyData.slice(0, copy.pageSize);
						}
						//处理图表数据
						myChart.setOption({
							title: {
								text: response.data.data.charts_title
							},
							tooltip: {
								trigger: 'axis'
							},
							legend: {
								data: response.data.data.charts_legend
							},
							color: ["#23B8BC", "#005059", "#EE7449", "#AAD1DA"],
							grid: {
								left: '3%',
								right: '4%',
								bottom: '3%',
								containLabel: true
							},
							toolbox: {
								feature: {
									saveAsImage: {}
								}
							},
							xAxis: {
								type: response.data.data.charts_xAxis_type,
								boundaryGap: false,
								data: response.data.data.charts_xAxis_data,
								axisLabel: {
									interval: 0, //横轴信息全部显示  
									rotate: 50, //-30度角倾斜显示  
								}
							},
							yAxis: {
								type: response.data.data.charts_yAxis_type,

							},
							series: [{
									name: response.data.data.charts_legend,
									type: response.data.data.charts_y1_type,
									stack: response.data.data.charts_y1_stack,
									data: response.data.data.charts_y1_data,
									symbol: 'circle',
									symbolSize: 5, //拐点大小
									itemStyle: {
										normal: {
											label: {
												show: true
											}
										}
									},
								}

							]
						});
						window.addEventListener("resize", function() {
							myChart.resize();

						});

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '冻结电量数据表'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '冻结电量数据表');
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.customerData = this.historyData.slice(0, this.pageSize);
				} else {
				this.customerData = this.historyData;
				this.customerData = this.search(this.customerData, {
					dt_edit: this.searchConName1
				});
				}
			},
			//搜索功能函数
			search(data, argumentObj) {
				let res = data;
				let dataClone = data;
				for(let argu in argumentObj) {
					if(argumentObj[argu].length > 0) {
						res = dataClone.filter(d => {
							return d[argu].indexOf(argumentObj[argu]) > -1;
						});
						dataClone = res;
					}
				}
				return res;
			},
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.customerData = this.historyData.slice(_start, _end);
			},

		}
	}
</script>

<style lang="less" scoped>
	.user-add {
		color: #fff;
	}
	
	.ivu-icon-android-people {
		font-size: 24px;
	}
	
	.ivu-card-head p {
		height: 32px;
		font-size: 22px;
		font-family: "微软雅黑";
		font-weight: 500;
	}
</style>