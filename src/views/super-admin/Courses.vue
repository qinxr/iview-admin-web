<template>
	<Row class="margin-top-10">
		<Col :lg="24">
		<Card>
			<p slot="title">
				<Icon type="social-buffer"></Icon>
				费用科目
				<Button type="info" style="margin-left: 20px;"><router-link to="/super-admin/coursesAdd" class="user-add"><Icon type="plus-round"></Icon>&nbsp;&nbsp;费用科目新增</router-link></Button>
			</p>
			<div class="edittable-table-height-con">
				<Table border refs="table" :data="coursesData" v-model="coursesData" :columns="editInlineColumns"></Table>
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
		name: 'courses_index',
		data() {
			return {
				pageSize: 10, //每页显示的数据量
				dataCount: 0, //初始化总数据量
				historyData: [], //存所有数据
				modal2: false,
				coursesData: [],
				editInlineColumns: [{
						title: 'ID',
						width: "10%",
						key: 'id',
						align: 'center',
						sortable: true,

					},
					{
						title: '名称',
						align: 'center',
						key: 'name',
						editable: true,
						sortable: true
					},
					{
						title: '价格',
						width: "25%",
						align: 'center',
						key: 'price',
						editable: true,
						sortable: true
					},
					{
						title: '描述',
						width: "20%",
						align: 'center',
						key: 'description',
						sortable: true
					},
					{
						title: '操作',
						align: 'center',
						width: "15%",
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
												name: 'coursesEdit',
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
			this.$http.get(Api.url + "sems/courses/getCourses/" + Api.rmId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					var normal = response.data.data;
					console.log(normal)
					for(var i = 0; i < normal.length; i++) {
						if(normal[i].flag == 1) {
							copy.historyData.push(normal[i])
						}
					}
					console.log(copy.historyData)
					//					copy.historyData = response.data.data;

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.coursesData = copy.historyData;
					} else {
						copy.coursesData = copy.historyData.slice(0, copy.pageSize);
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
				this.coursesData = this.historyData.slice(_start, _end);
			},
			del() {
				var copy = this;
				var id = sessionStorage.delete_id;
				axios.post(Api.url + "sems/courses/deleteCourses/" + Api.rmId, {
					courses_id: id
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					var normal = response.data.data;
					copy.historyData=[];
					for(var i = 0; i < normal.length; i++) {
						if(normal[i].flag == 1) {
							copy.historyData.push(normal[i])
						}
					}
					if(response.data.head == 200) {
						copy.modal2 = false;
						copy.$Message.success(response.data.message);
					} else {
						copy.$Message.error(response.data.message);
					}

					copy.dataCount = copy.historyData.length;
					// 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
					if(copy.historyData.length < copy.pageSize) {
						copy.coursesData = copy.historyData;
					} else {
						copy.coursesData = copy.historyData.slice(0, copy.pageSize);
					}
					sessionStorage.delete_id = '';
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