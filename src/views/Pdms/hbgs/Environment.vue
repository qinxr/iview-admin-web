<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="ivu-icon ivu-icon-ios-world-outline"></Icon>
				环境管理
				<Button type="info" style="margin-left: 20px;"><router-link to="/Pdms/hbgs/projectManagement/environmentAdd" class="user-add"><Icon type="plus-round"></Icon>&nbsp;&nbsp;环境信息新增</router-link></Button>
			</p>
			<div class="edittable-table-height-con">
			    <Row>
					<Col :lg='20'>&nbsp;</Col>
					<Col :lg="4" style="text-align: right;">
					<Input v-model="searchConName1" icon="search" @on-change="handleSearch1" placeholder="请输入区域名称搜索..." style="width: 200px" />
					</Col>
				</Row>
				<Row>
					&nbsp;
				</Row>
				<Table border refs="table" :data="transformerData" v-model="transformerData" :columns="editInlineColumns"></Table>
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
						<Page :page-size="pageSize" :total="dataCount" :current="1" @on-change="changePage"></Page>
					</div>
				</div>
			</div>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import axios from 'axios'
	export default {
		//name: 'hbgsEnvironment',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				modal2: false,
				searchConName1: "",
				transformerData: [],
				editInlineColumns: [{
						title: 'ID',
						width: "10%",
						key: 'id',
						align: 'center',
						sortable: true
					},
					{
						title: '名称',
						width: "10%",
						align: 'center',
						key: 'name',
						sortable: true
					},
					{
						title: '区域',
						width: "10%",
						align: 'center',
						key: 'regionName',
						sortable: true
					},
					{
						title: '渠道',
						width: "10%",
						align: 'center',
						key: 'channel_id',
						sortable: true
					},
					{
						title: '所属配电室',
						width: "10%",
						align: 'center',
						key: 'roomName',
						sortable: true
					},
					{
						title: '类型',
						width: "10%",
						align: 'center',
						key: 'type',
						sortable: true,
						render:(e,params)=>{
							const row = params.row;
							const text = row.type==1 ? "环境" : "烟感";

							return e('span', {}, text);
							
						}
					},
					{
						title: '厂家',
						width: "10%",
						align: 'center',
						key: 'model',
						sortable: true
					},
					{
						title: '型号',
						width: "20%",
						align: 'center',
						key: 'producer',
						sortable: true,
						
					},

					{
						title: '操作',
						align: 'center',
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
												name: 'hbgsEnvironmentEdit',
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
			//获取全部环境信息
			this.$http.get(Api.url + "pdms/env/getEnvAsProject/" + Api.hbgsId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);

					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.transformerData = copy.historyData;
					} else {
						copy.transformerData = copy.historyData.slice(0, copy.pageSize);
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		methods: {
			//搜索触发函数	
			handleSearch1() {
				if(this.searchConName1==""){
					this.transformerData = this.historyData.slice(0, this.pageSize);
				}else{
					
					this.transformerData = this.historyData;
					this.transformerData = this.search(this.transformerData, {
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
			//分页函数
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.transformerData = this.historyData.slice(_start, _end);
			},
			del() {
				var copy = this;
				var id = sessionStorage.delete_id;
				axios.post(Api.url + "pdms/env/deleteEnv", {
						envId: id
					}, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then((response) => {
						copy.historyData = response.data.data;

						copy.dataCount = copy.historyData.length;
						// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
						if(copy.historyData.length < copy.pageSize) {
							copy.transformerData = copy.historyData;
						} else {
							copy.transformerData = copy.historyData.slice(0, copy.pageSize);
						}
						sessionStorage.delete_id = '';
						if(response.data.head == 200) {
							copy.modal2 = false;
							copy.$Message.success(response.data.message);
						}
					})
					.catch((error) => {
						console.log(error);
					})

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