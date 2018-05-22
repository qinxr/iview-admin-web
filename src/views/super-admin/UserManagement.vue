<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				用户管理
				<Button type="info" style="margin-left: 20px;"><router-link to="/super-admin/userAdd" class="user-add"><Icon type="plus-round"></Icon>&nbsp;&nbsp;用户新增</router-link></Button>
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
					<!--<can-edit-table  :data="editInlineData" v-model="editInlineData" :columns-list="editInlineColumns"></can-edit-table>-->
					<Table  border :data="editInlineData" v-model="editInlineData" :columns="editInlineColumns"></Table>
					<Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
					
					<Modal v-model="modal2" width="360">
						<p slot="header" style="color:#f60;text-align:center">
							<Icon type="information-circled"></Icon>
							<span>删除确认</span>
						</p>
						<div style="text-align:center">
							<p>
								<h1>确定删除?</h1></p>
						</div>
						<div slot="footer">
							<Button type="error" size="large" long @click="del()">删除</Button>
						</div>
					</Modal>
					<div style="margin: 10px;overflow: hidden">
						<div style="float: right;">
							<Page :total="dataCount" :current="1" @on-change="changePage"></Page>
						</div>
					</div>
				</Card>
			</div>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	import axios from 'axios'
	export default {
		name: 'userManagement',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				modal2: false,
				searchConName1: "",
				editInlineData: [],
				editInlineColumns: [{
						title: 'ID',
						key: 'id',
						align: 'center',
						width:"10%",
						sortable: true
					},
					{
						title: '用户名称',
						align: 'center',
						key: 'name',
						editable: true,
						sortable: true
					},
					{
						title: '用户中文名称',
						align: 'center',
						key: 'chinese_name',
						editable: true,
						sortable: true
					},
					{
						title: '用户邮箱',
						align: 'center',
						key: 'email',
						sortable: true
					},
					{
						title: '用户权限',
						align: 'center',
						key: 'hxbr_flag',
						render: (h, params) => {
							const row = params.row;
							const text = row.hxbr_flag == 0 ? '超级管理员' : row.hxbr_flag == 1 ? '管理员' : row.hxbr_flag == 2 ? '用户': row.hxbr_flag == 3 ? '客户' : row.hxbr_flag == 4 ? '同事' : "-";

							return h('span', {}, text);
						},
						sortable: true
					},
					{
						title: '用户地址',
						align: 'center',
						key: 'address',
						editable: true,
						sortable: true
					},
					{
						title: '用户电话',
						align: 'center',
						key: 'phone',
						editable: true,
						sortable: true
					},
					{
						title: '操作',
						align: 'center',
						width:"15%",
						render: (e, params) => {
							return e('div', [
								e('Button', {
									props: {
										type: 'info',
										size: 'small'
									},
									on: {
										click: () => {
											let argu = {
												id: params.row.id
											};
											this.$router.push({
												name: 'userEdit',
												params: argu
											});
										}
									}
								}, '编辑'),
								e('span', {

								}, "   "),
								e('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									on: {
										click: () => {
											this.modal2 = true;
											sessionStorage.setItem("delete_id", params.row.id)
										}
									}
								}, '删除')
							]);

						}
					}
				]
			}
		},
		mounted() {
			const copy = this;
			this.$http.get(Api.url + 'sems/apiUser/getUsers', {
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
					copy.editInlineData = copy.historyData;
				} else {
					copy.editInlineData = copy.historyData.slice(0, copy.pageSize);
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
					filename: '用户表'
				});

			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '用户表');
			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1==""){
					this.editInlineData = this.historyData.slice(0, this.pageSize);
				}else{
					
					this.editInlineData = this.historyData;
					this.editInlineData = this.search(this.editInlineData, {
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
			//分页
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.editInlineData = this.historyData.slice(_start, _end);
			},
			del() {
				var copy = this;
				var id = sessionStorage.delete_id;
				axios.post(Api.url + "sems/apiUser/deleteUser", {
					userId: id
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.editInlineData = copy.historyData;
					} else {
						copy.editInlineData = copy.historyData.slice(0, copy.pageSize);
					}
					sessionStorage.delete_id = '';
					if(response.data.head == 200) {
						copy.modal2 = false;
						copy.$Message.success(response.data.message);
					}
				})
				.catch(function(error) {
					console.log(error);
				});
			}
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