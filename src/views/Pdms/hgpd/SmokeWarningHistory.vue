<template>
	<div>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<p slot="title">
					<Icon type="social-buffer"></Icon>
					烟感告警历史信息
				</p>
				<Row>
					<Col span="2">
					<span class="time">起始时间：</span>
					</Col>
					<Col span="4" class="start-time">
					<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 200px" v-model="startTime"></DatePicker>
					</Col>
					<Col span="2">
					<span class="time">结束时间：</span>
					</Col>
					<Col span="4">
					<DatePicker type="date" :options="options1" placeholder="选择日期" style="width: 200px" v-model="stopTime"></DatePicker>
					</Col>
					<Button type="info" style="margin-left: 20px;" @click="Refer">查询</Button>
				</Row>
			</Card>
			</Col>
		</Row>
		<Row class="margin-top-10">
			<Col :lg="24">
			<Card>
				<div class="edittable-table-height-con">
					<Row>
						<Col :lg='20'>
						<span style="margin-right: 16px;"><Button type="primary" size="large" @click="exportData()"><Icon type="ios-download-outline"></Icon> 导出数据（Csv格式）</Button></span>
						<span style="margin-right: 16px;"><a id="hrefToExportTable" style="postion: absolute;left: -10px;top: -10px;width: 0px;height: 0px;"></a><Button type="primary" size="large" @click="exportExcel()"><Icon type="ios-download-outline"></Icon> 导出数据（Excel格式）</Button></span>
						</Col>
						<Col :lg="4" style="text-align: right;">
						<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入区域名称搜索..." style="width: 200px" />
						</Col>
					</Row>
					<Row>
						&nbsp;
					</Row>
					<Table border v-model="ammWarningData" :data="ammWarningData" :columns="editInlineColumns"></Table>
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
					<Table ref="table" style="display: none;" :data="historyData" v-model="historyData" :columns="editInlineColumns"></Table>
				</div>
				<div style="padding: 20px;overflow: hidden">
					<div style="float: right;">
						<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage" show-elevator></Page>
					</div>
				</div>
			</Card>
			</Col>
		</Row>
	</div>
</template>

<script>
	import axios from 'axios'
	import { formatDate } from '@/date/date.js'
	import { table2csvData, csvColumns } from './data/table2csv.js';
	import { table2excelData, excelColumns } from './data/table2excel.js';
	import table2excel from '@/libs/table2excel.js';
	export default {
		name: 'hgpdsmokeWarningHistory',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				startTime: '',
				stopTime: '',
				options1: {
					shortcuts: [{
						text: '今天',
						value() {
							return new Date();
						},
					}]
				},
				searchConName1:'',
				modal2:false,
				ammWarningData: [],
				editInlineColumns: [
					{
						title: '区域',
						align: 'center',
						key: 'regionName',
						sortable: true
					},
					{
				        title: '建筑物',
				        align: 'center',
				        key: 'buildingName',
				    },
					{
						title: '配电室',
						align: 'center',
						key: 'roomName',
						sortable: true
					},
					
					{
						title: '设备',
						align: 'center',
						key: 'smokeName',
						sortable: true
					},
					
					{
						title: '状态',
						width: "10%",
						align: 'center',
						key: 'state',
						sortable: true
					},
					{
						title: '告警时间',
						align: 'center',
						key: 'warning_time',
						sortable: true
					},
					{
						title: '描述',
						width: "10%",
						align: 'center',
						key: 'description',
						sortable: true,
						render: (e, params) => {
							const row = params.row;
							const text = row.description ? row.description : "空";

							return e('span', {}, text);

						}
					},

					{
						title: '操作',
						align: 'center',
						width: "11%",
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
												name: 'hgpdSmokeWarningHistoryDetail',
												params: argu
											});
										}
									}
								}, '查看'),
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
			this.Init();
		},
		methods: {
			//删除
			del() {
				var copy = this;
				var id = sessionStorage.delete_id;
				axios.post(Api.url + "pdms/warning/deleteSmokeWarning", {
						id: id
					}, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						sessionStorage.delete_id = '';
						if(response.data.head == 200) {
							copy.modal2 = false;
							copy.$Message.success(response.data.message);
						}else if(response.data.head == 213) {
							copy.modal2 = false;
							copy.$Message.error(response.data.message);
						}
						copy.Init();
					})
					.catch((error) => {
						console.log(error);
					})

			},
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1==""){
					this.ammWarningData = this.historyData.slice(0, this.pageSize);
				}else{
					
					this.ammWarningData = this.historyData;
					this.ammWarningData = this.search(this.ammWarningData, {
						regionName: this.searchConName1
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
			//分页功能
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.ammWarningData = this.historyData.slice(_start, _end);
			},
			//获取信息
			Init() {
				const copy = this;
				this.$http.get(Api.url + 'pdms/warning/getSmokeWarnings/' + Api.pdId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {
						//console.log(response.data.data);
						copy.historyData = response.data.data;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.ammWarningData = copy.historyData;
						} else {
							copy.ammWarningData = copy.historyData.slice(0, copy.pageSize);
						}
					})
					.catch(error => {
						console.log(error);
					})
			},
			//按日期查询
			Refer() {
				const copy = this;
				const start = this.FormatDate(this.startTime);
				const stop = this.FormatDate(this.stopTime);
				this.$http.get(Api.url + 'pdms/warning/getSmokeWarnings/' + Api.pdId + '/' + start + '/' + stop, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {
						copy.historyData = response.data.data;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.ammWarningData = copy.historyData;
						} else {
							copy.ammWarningData = copy.historyData.slice(0, copy.pageSize);
						}
						//console.log(copy.ammWarningData);
					})
					.catch(error => {
						console.log(error);
					})
			},
			//转换日期格式
			FormatDate(time) {
				let date = new Date(time);
				return formatDate(date, 'yyyy-MM-dd');
				//此处formatDate是一个函数，将其封装在common/js/date.js里面，便于全局使用
			},
			//导出数据Csv格式
			exportData() {
				this.$refs.table.exportCsv({
					filename: '电表告警信息'
				});
			},
			//导出数据xls格式
			exportExcel() {
				table2excel.transform(this.$refs.table, 'hrefToExportTable', '电表告警信息');
			},
		}
	}
</script>

<style lang="less" scoped>
	.time {
		font-size: 16px;
		font-weight: 600;
		line-height: 33px;
	}
	
	@media only screen and (max-width: 1366px) {
		.start-time {
			margin-right: 30px;
		}
	}
</style>
