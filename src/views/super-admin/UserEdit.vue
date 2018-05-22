<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				用户资料修改
			</p>
			<Form ref="userForm" :model="userForm" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="邮箱：" prop="email">
						<div>{{userForm.email}}</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="权限：" prop="hxbrFlag">
						<div>
							<Select slot="append" v-model="userForm.hxbr_flag">
								<Option value="0" disabled="">超级管理员</Option>
								<Option value="1">管理员</Option>
								<Option value="2">用户</Option>
								<Option value="3">客户</Option>
								<Option value="4">同事</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="名字：" prop="name">
						<div>
							<Input v-model="userForm.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="密码：" prop="password">
						<div>
							<Input type="password" v-model="userForm.password"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="中文名：" prop="chinese_name">
						<div>
							<Input v-model="userForm.chinese_name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="电话：" prop="phone">
						<div>
							<Input v-model="userForm.phone"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="地址：" prop="address">
						<div>
							<Input v-model="userForm.address"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="userEdit()">保存</Button>
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
		name: 'useredit',
		data() {
			return {
				userForm: {
					email: '',
					hxbr_flag: "",
					name: '',
					password: '',
					chinese_name: '',
					address: '',
					phone: '',
				},
				inforValidate: {
					email: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '如需更改资料请输入密码',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				//获取信息
				var copy=this;
				let index = copy.$route.params.id;
				console.log(index);
				axios.get(Api.url + "sems/apiUser/getUser/" + index, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.userForm = response.data.data;
					console.log(copy.userForm);
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			userEdit() {
				var copy = this;
				let index = copy.$route.params.id;
				this.$refs['userForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "sems/apiUser/editUser/" + index, {
							email: copy.userForm.email,
							name: copy.userForm.name,
							chineseName: copy.userForm.chinese_name,
							address: copy.userForm.address,
							phone: copy.userForm.phone,
							password: copy.userForm.password,
							hxbrFlag:copy.userForm.hxbr_flag
							
						}, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("access_token")
							}
						})
						.then(function (response) {
							const statusCode = parseInt(response.data.head);
							switch (statusCode) {
								
								case 200:
									copy.$Message.success(response.data.message);
									break;
								default:
									copy.$Message.error(response.data.message);
									break;
								
							}
						})
						.catch(function (error) {
							console.log(error);
						});
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