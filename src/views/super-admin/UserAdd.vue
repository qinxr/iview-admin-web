<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				新增用户
			</p>
			<Form ref="userForm" :model="userForm" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="邮箱：" prop="email">
						<Input v-model="userForm.email">
						<span slot="append">@huaxinbr.com</span>
						</Input>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="权限：" prop="hxbrFlag">
						<div>
							<Select slot="append" v-model="userForm.hxbrFlag">
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
							<Input v-model="userForm.password"></Input>
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
					<Button type="success" long @click="userAdd">保存</Button>
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
		name: 'userAdd',
		data() {
			return {
				userForm: {
					email: '',
					hxbrFlag: "",
					name: '',
					password: '',
					chineseName: '',
					address: '',
					phone: '',
				},
				inforValidate: {
					email: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					hxbrFlag: [{
						required: true,
						message: '请设置权限',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {

		},
		methods: {
			userAdd() {
				var copy = this;
				copy.userForm.email=copy.userForm.email+"@huaxinbr.com"
				this.$refs['userForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "sems/apiUser/addUser", copy.userForm, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("access_token")
							}
						})
						.then(function(response) {
							const statusCode = parseInt(response.data.head);
							switch(statusCode) {

								case 200:
									alert(response.data.message)
									break;
								case 211:
									alert("用户新增失败：缺少必要参数！");
									break;
								case 520:
									alert("服务器端处理失败:用户新增”")
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