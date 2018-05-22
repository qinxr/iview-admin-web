<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="locked"></Icon>
				密码修改
			</p>
			<Form ref="userForm" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
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
					<FormItem label="旧密码：" prop="oldPassword">
						<div>
							<Input type="password" v-model="data.oldPassword"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="新密码：" prop="newPassword">
						<div>
							<Input type="password" v-model="data.newPassword"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="确认密码：" prop="newRepeat">
						<div>
							<Input type="password" v-model="data.newRepeat"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="passwordChange()">保存</Button>
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
					oldPassword: '',
					newPassword: '',
					newRepeat: '',
				},
				data:{
					oldPassword: '',
					newPassword: '',
					newRepeat: '',
				},
				inforValidate: {

					oldPassword: [{
						required: true,
						message: '请输入旧密码',
						trigger: 'blur'
					}],
					newPassword: [{
						required: true,
						message: '新密码不能为空',
						trigger: 'blur'
					}],
					newRepeat: [{
						required: true,
						message: '确认密码不能为空',
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
			passwordChange() {
				console.log(this.data)
				var copy = this;
				let index = copy.$route.params.id;
				this.$refs['userForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "hems/apiUser/changepwd", {
								email: copy.userForm.email,
								newPassword: copy.data.newPassword,
								newPasswordRepeat: copy.data.newRepeat,
								oldPassword: copy.data.oldPassword,

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
										Cookies.set('user', "");
										copy.$router.push({
											name: 'login',
										});
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