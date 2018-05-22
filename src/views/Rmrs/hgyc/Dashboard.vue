<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="ios-bolt"></Icon>
				近五日冻结电量一览
			</p>
			<div class="edittable-table-height-con">
				<Card>
					<Row>
						<Col :lg='12'>
						<div class="exportable-table-download-con1">
							<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据（Csv格式）</Button></span>
							<span style="margin-right: 16px;"><a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a><Button type="primary" size="large" @click="exportExcel()"><Icon type="ios-download-outline"></Icon> 导出数据（Excel格式）</Button></span>
						</div>

						</Col>
						<Col :lg='8'>&nbsp;</Col>
						<Col :lg="4" style="text-align: right;">
						<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入客户名称搜索..." style="width: 200px" />
						</Col>
					</Row>
					<Row>
						&nbsp;
					</Row>
					<Row class="margin-top-10 searchable-table-con1">
						<!--<Table :columns="columns1" :data="data1"></Table>-->
						<Table border :data="data" v-model="data" :columns="editInlineColumns"></Table>

						<Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
					</Row>
				</Card>
				<!--<Table refs="table" :data="data" v-model="data" :columns="editInlineColumns"></Table>-->

				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page :total="dataCount" :current="1" @on-change="changePage"></Page>
					</div>
				</div>
			</div>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import axios from 'axios'
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	export default {
		name: 'hgychome_index',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [{
					day5_name: "",
					day4_name: "",
					day3_name: "",
					day2_name: "",
					day1_name: "",
				}], //存所有数据
				searchConName1: "",
				data: [{
					day5_name: "",
					day4_name: "",
					day3_name: "",
					day2_name: "",
					day1_name: "",
				}],
				editInlineColumns: [{
						title: '表号',
						width: "10%",
						key: 'commadd',
						align: 'center',
						sortable: true
					},
					{
						title: '客户名称',
						align: 'center',
						key: 'customer',
						sortable: true,
						render: (e, params) => {
							let text = params.row.customer;
							return e('a', {
								on: {
									click: () => {
										let argu = {
											id: params.row.customer_id
										};
										console.log(argu);
										this.$router.push({
											name: 'customer',
											params: argu
										});
									}
								}
							}, text);
						}
					},
					{
						title: '倍率',
						width: "10%",
						align: 'center',
						key: 'transformer_ratio',
						sortable: true
					},
					{
						width: "10%",
						align: 'center',
						key: 'day1',
						sortable: true,
						renderHeader: (column) => {
							column = this.historyData[0].day1_name;
							return column
						}
					},
					{
						width: "10%",
						align: 'center',
						key: 'day2',
						sortable: true,
						renderHeader: (column) => {
							column = this.historyData[0].day2_name;
							return column
						}
					},
					{
						width: "10%",
						align: 'center',
						key: 'day3',
						sortable: true,
						renderHeader: (column) => {
							column = this.historyData[0].day3_name;
							return column
						}
					}, {
						title: '邮箱',
						width: "10%",
						align: 'center',
						key: 'day4',
						sortable: true,
						renderHeader: (column) => {
							column = this.historyData[0].day4_name;
							return column
						}
					},
					{
						align: 'center',
						width: "10%",
						key: 'day5',
						sortable: true,
						renderHeader: (column) => {
							column = this.historyData[0].day5_name;
							return column
						}
					},

				]
			}
		},
		mounted() {
			const copy = this;
			this.$http.get(Api.url + "hems/meter/getFiveDaysPeriodEnergy/" + Api.rmId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					if(response.data.data.pms != "") {
						copy.historyData = response.data.data.pms;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.data = copy.historyData;
						} else {
							copy.data = copy.historyData.slice(0, copy.pageSize);
						}
					}

				})
				.catch(error => {
					console.log(error);
				})
		},
		methods: {
			//导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '近五日冻结电量一览'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '近五日冻结电量一览');
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.data = this.historyData.slice(0, this.pageSize);
				} else {
					this.data = this.historyData;
					this.data = this.search(this.data, {
						customer: this.searchConName1
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
				this.data = this.historyData.slice(_start, _end);
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