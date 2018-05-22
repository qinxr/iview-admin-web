<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="edit"></Icon>
				电表维护信息修改
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="表号：" prop="pmName">
						<div>
							{{data.pmName}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户名称：" prop="customerName">
						<div>
							<Select slot="append" v-model="data.customer_id">
								<Option v-for="item in customer" :key="item.id" :value="item.id">{{item.name}}</Option>

							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="安装位置：" prop="pmPosition">
						<div>
							{{data.pmPosition}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="拉合闸：" prop="state">
						<div>
							{{data.state==1?"拉闸":"合闸"}}
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="欠费自动拉闸：" prop="main_flag">
						<div>
							<Select slot="append" v-model="data.main_flag">
								<!--<Option value="1">测试</Option>-->
								<Option value="1">是</Option>
								<Option value="2">否</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="费用科目：" prop="main_flag">
						<div>
							<Select slot="append" v-model="data.course_id">
								<Option v-if="item.flag==1" v-for="item in courses" :value="item.id" :key="item.id">{{item.name}}</Option>

							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="状态：" prop="state">
						<div>
							<Select slot="append" v-model="data.state">
								<Option value="1">启用</Option>
								<Option value="2">停用</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="ammeterPreserveEdit()">保存</Button>
					</Col>
				</Row>
			</Form>
		</Card>
		</Col>
	</Row>
</template>

<script>
	import axios from 'axios'

	export default {
		name: 'ammeterPreserveedit',
		data() {
			return {
				data: {
					pmName: "",
					customerName: "",
					name: '',
					pmPosition: "",
					state: "",
					course_id: '',
					main_flag: '',
					state: ''
				},
				courses: "",
				coursesID: {
					courses_id: ""
				},
				customer: '',
				inforValidate: {
//					name: [{
//						required: true,
//						message: '费用科目名称不能为空',
//						trigger: 'blur'
//					}],
//					price: [{
//						required: true,
//						message: '请输入修改后的价格',
//						trigger: 'blur'
//					}],
				},
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				var copy = this;
				let index = this.$route.params.id;
				console.log(index);
				//获取当前id下信息
				axios.get(Api.url + "hems/pmsManage/getPmsManageAsId/" + index, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.data = response.data.data;
						copy.data.main_flag = copy.data.main_flag.toString();
						copy.data.state = copy.data.state.toString();
						//						copy.data.course_id=copy.data.course_id.toString();
						console.log(copy.data);
					})
					.catch(function(error) {
						console.log(error);
					});
				//获取科目信息
				axios.get(Api.url + "sems/courses/getCourses/" + Api.rmId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.courses = response.data.data;

					})
					.catch(function(error) {
						if(error.message == "Request failed with status code 401") {
							console.log("账户信息已过期！请重新登录！");
							copy.$router.push({
								path: "/login"
							})

						}
					});
				//获取客户列表
				axios.get(Api.url + "hems/customers/getCustomerAsProject/" + Api.rmId, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.customer = response.data.data;
						console.log(copy.datas);
					})
					.catch(function(error) {
						console.log(error);
					});

			},
			ammeterPreserveEdit() {
				var copy = this;
				let index = this.$route.params.id;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "hems/pmsManage/editPmsManage", {
								id: copy.data.id,
								projectId: Api.rmId,
								customerId: copy.data.customer_id,
								mainFlag: parseInt(copy.data.main_flag),
								state: parseInt(copy.data.state),
								courseId: copy.data.course_id

							}, {
								headers: {
									Authorization: "Bearer " + localStorage.getItem("access_token")
								}
							})
							.then(function(response) {
								const statusCode = parseInt(response.data.head);
								switch(statusCode) {

									case 200:
										copy.$Message.success(response.data.message);
										break;
									default:
										copy.$Message.error(response.data.message);
										break;
								}
							})
							.catch(function(error) {
								console.log(error);
							})
					}
				});
			}
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>