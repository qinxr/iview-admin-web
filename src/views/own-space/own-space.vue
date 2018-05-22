<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				用户资料修改
				<Button type="info" style="margin-left: 20px;"><router-link to="/Rmrs/hgyc/passwordChange" class="user-add"><Icon type="edit"></Icon>&nbsp;&nbsp;密码修改</router-link></Button>
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
	import Cookies from 'js-cookie';
	export default {
		name: 'userEdit',
		data() {
			return {
				userForm: {
					email: '',
					name: '',
					password: '',
					chinese_name: '',
					address: '',
					phone: '',
				},
				inforValidate: {

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
					address: [{
						required: true,
						message: '地址信息不能为空',
						trigger: 'blur'
					}],
					phone: [{
						required: true,
						message: '电话不能为空',
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
				var copy = this;
				let email = Cookies.get('user');
				console.log(email);
				axios.get(Api.url + "hems/apiUser/getUserInfos/" + email, {
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
						axios.post(Api.url + "hems/apiUser/changeUserInfos", {
								email: copy.userForm.email,
								name: copy.userForm.name,
								password: copy.userForm.password,
								chinese_name: copy.userForm.chinese_name,
								address: copy.userForm.address,
								phone: copy.userForm.phone,

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