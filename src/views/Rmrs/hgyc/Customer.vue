<style lang="less" scoped>
	@import '../../../styles/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<h4 slot="title">
                    <Icon type="android-contact"></Icon>
                    客户信息
                </h4>
				<Row class="margin-top-10">
					<Col :lg='3'> 客户名称：
					</Col>
					<Col :lg='9'> {{data.name}}
					</Col>
					<Col :lg='3'> 邮箱：
					</Col>
					<Col :lg='9'> {{data.email}}
					</Col>
				</Row>
				<Row class="margin-top-10">
					<Col :lg='3'> 联系人：
					</Col>
					<Col :lg='9'> {{data.contact?data.contact:"暂无"}}
					</Col>
					<Col :lg='3'> 联系电话：
					</Col>
					<Col :lg='9'> {{data.phone?data.phone:"暂无"}}
					</Col>
				</Row>
				<Row class="margin-top-10">
					<Col :lg='3'> 电表数量：
					</Col>
					<Col :lg='9'> {{data.countPm}}
					</Col>
					<Col :lg='3'> 账户余额：
					</Col>
					<Col :lg='9'> {{data.avl}}
					</Col>
				</Row>
			</Card>
		</Row>
		<Row class="margin-top-10">
			<Card>
				<h4 slot="title">
                    <Icon type="ios-calculator"></Icon>
                    电表信息
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
					<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入表号搜索..." style="width: 200px" />
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
		name: 'customer',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				searchConName1: "",
				customerData: [],
				data: {
					result:{
						position:"",
					}
				},
				editInlineColumns: [{
						title: '表号',
						width: "15%",
						key: 'commadd',
						align: 'center',
						sortable: true
					},
					{
						title: '冻结时间',
						align: 'center',
						key: 'measuretime',
						sortable: true
					},
					{
						title: '表底数',
						width: "15%",
						align: 'center',
						key: 'transformer_ratio',
						sortable: true
					},
					{
						title: '冻结电量',
						width: "15%",
						align: 'center',
						key: 'rea_pp',
						sortable: true
					},
					{
						title: '抄读时间',
						width: "15%",
						align: 'center',
						key: 'dt_edit',
						sortable: true
					}, {
						title: '冻结电量',
						width: "10%",
						align: 'center',
						sortable: true,
						render: (e, params) => {
							return e('a', {
								on: {
									click: () => {
										let argu = {
											id: params.row.meterid
										};
										console.log(argu);
										this.$router.push({
											name: 'iceElectricity',
											params: argu
										});
									}
								}
							},"冻结电量");
						}
					},
					{
						title: '用电量',
						align: 'center',
						width: "10%",
						sortable: true,
						render: (e, params) => {
							let text=params.row.name;
							return e('a', {
								on: {
									click: () => {
										let argu = {
											id: params.row.meterid
										};
										console.log(argu);
										this.$router.push({
											name: 'electricity',
											params: argu
										});
									}
								}
							},'用电量');
						}
					},

				]
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				//获取信息
				console.log(this.$route.params.id);
				var copy = this;
				let index = copy.$route.params.id;
				axios.get(Api.url + "hems/customers/getCustomer/" + index, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.data = response.data.data.customer;
						copy.historyData = response.data.data.period_energy;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.customerData = copy.historyData;
						} else {
							copy.customerData = copy.historyData.slice(0, copy.pageSize);
						}
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '客户电表信息表'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '客户电表信息表');
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1 == "") {
					this.customerData = this.historyData.slice(0, this.pageSize);
				} else {
				this.customerData = this.historyData;
				this.customerData = this.search(this.customerData, {
					commadd: this.searchConName1
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