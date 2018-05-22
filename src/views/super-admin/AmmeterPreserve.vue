<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="ios-bolt"></Icon>
				电表维护
				<!--<Button type="info" style="margin-left: 20px;"><router-link to="/super-admin/regionAdd" class="user-add"><Icon type="plus-round"></Icon>&nbsp;&nbsp;新增区域</router-link></Button>-->
			</p>
			<div class="edittable-table-height-con">
				<Table border refs="table" :data="ammeterData" v-model="ammeterData" :columns="editInlineColumns"></Table>
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
			</div>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import axios from 'axios'
	export default {
		name: 'ammeterPreserve_index',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				modal2: false,
				ammeterData: [],
				editInlineColumns: [{
						title: 'ID',
						width: "5%",
						key: 'id',
						align: 'center',
						sortable: true
					},
					{
						title: '表号',
						width: "10%",
						align: 'center',
						key: 'pmName',
						sortable: true
					},
					{
						title: '客户名称',
						width: "15%",
						align: 'center',
						key: 'customerName',
						sortable: true
					},
					{
						title: '安装位置',
						width: "15%",
						align: 'center',
						key: 'pmPosition',
						sortable: true
					},
					{
						title: '拉闸',
						width: "5%",
						align: 'center',
//						key: 'prjName',
						sortable: true
					},
					{
						title: '合闸',
						width: "5%",
						align: 'center',
//						key: 'prjName',
						sortable: true
					},
					{
						title: '是否自动拉闸',
						width: "10%",
						align: 'center',
						key: 'main_flag',
						sortable: true,
						render:(e,params)=>{
							const row = params.row;
							const text = row.main_flag == 1 ? "是": "否";

							return e('span', {}, text);
							
						}
					},
					{
						title: '科目',
						width: "15%",
						align: 'center',
						key: 'course_id',
						sortable: true
					},
					{
						title: '状态',
						width: "10%",
						align: 'center',
						key: 'state',
						sortable: true,
						render:(e,params)=>{
							const row = params.row;
							const text = row.state == 1 ? "启用": "停用";

							return e('span', {}, text);
							
						}
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
												name: 'ammeterPreserveEdit',
												params: argu
											});
										}
									}
								}, '编辑'),
								
							]);

						}
					}
				]
			}
		},
		mounted() {
			const copy = this;
			this.$http.get(Api.url + "hems/pmsManage/getPmsManage/" + Api.rmId, {
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
						copy.ammeterData = copy.historyData;
					} else {
						copy.ammeterData = copy.historyData.slice(0, copy.pageSize);
					}
				})
				.catch(error => {
					console.log(error);
				})
		},
		methods: {
			changePage(index) {
				// The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
				var _start = (index - 1) * this.pageSize;
				var _end = index * this.pageSize;
				this.ammeterData = this.historyData.slice(_start, _end);
			},
			del() {
				var copy = this;
				var id = sessionStorage.delete_id;
				axios.post(Api.url + "hems/regions/deleteRegion", {
					regionId: id
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
						copy.ammeterData = copy.historyData;
					} else {
						copy.ammeterData = copy.historyData.slice(0, copy.pageSize);
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