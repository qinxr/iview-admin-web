<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="android-contacts"></Icon>
				客户一览
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
						<Table border :data="customerForm" v-model="customerForm" :columns="editInlineColumns"></Table>

						<Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
					</Row>
				</Card>
				<!--<Table refs="table" :data="customerForm" v-model="customerForm" :columns="editInlineColumns"></Table>-->

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
		name: 'customerList_index',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				searchConName1: "",
				customerForm: [],
				editInlineColumns: [{
						title: 'ID',
						width: "10%",
						key: 'id',
						align: 'center',
						sortable: true
					},
					{
						title: '客户名称',
						width: "20%",
						align: 'center',
						key: 'name',
						sortable: true,
						render: (e, params) => {
							let text = params.row.name;
							return e('a', {
								on: {
									click: () => {
										let argu = {
											id: params.row.id
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
						title: '联系人',
						width: "10%",
						align: 'center',
						key: 'contact',
						sortable: true
					},
					{
						title: '联系电话',
						width: "10%",
						align: 'center',
						key: 'phone',
						sortable: true
					},
					{
						title: '地址',
						width: "10%",
						align: 'center',
						key: 'address',
						sortable: true
					}, {
						title: '邮箱',
						width: "20%",
						align: 'center',
						key: 'email',
						sortable: true
					},
					{
						title: '客户状态',
						align: 'center',
						width: "10%",
						key: 'state',
						sortable: true,
						render: (e, params) => {
							const row = params.row;
							const text = row.state == 1 ? "启用" : row.state == 2 ? "停用" : "错误状态码";

							return e('span', {}, text);

						}
					},
					{
						title: '客户余额',
						align: 'center',
						key: 'avl',
						sortable: true
					},

				]
			}
		},
		mounted() {
			const copy = this;
			this.$http.get(Api.url + 'hems/customers/getCustomerAsUserProject/' + Api.rmId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					console.log(response.data.data);

					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.customerForm = copy.historyData;
					} else {
						copy.customerForm = copy.historyData.slice(0, copy.pageSize);
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
					filename: '客户一览表'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '客户一览表');
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.customerForm = this.historyData.slice(0, this.pageSize);
				} else {
					this.customerForm = this.historyData;
					this.customerForm = this.search(this.customerForm, {
						name: this.searchConName1
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
				this.customerForm = this.historyData.slice(_start, _end);
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