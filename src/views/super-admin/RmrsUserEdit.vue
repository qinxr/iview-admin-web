<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="edit"></Icon>
				抄表客户资料修改
			</p>
			<Form ref="rmrsUserForm" :model="rmrsUserForm" :label-width="100" label-position="right" :rules="inforValidate">
			
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目名称：" prop="email">
						<div>
							<Input disabled="" style="color: #000000;" value="北京航港发展（园区抄表及计费）"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户名称：" prop="name">
						<div>
							<Input v-model="rmrsUserForm.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户电话：" prop="phone">
						<div>
							<Input v-model="rmrsUserForm.phone"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="联系人：" prop="contact">
						<div>
							<Input v-model="rmrsUserForm.contact"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户地址：" prop="address">
						<div>
							<Input v-model="rmrsUserForm.address"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户邮箱：" prop="email">
						<div>
							<Input v-model="rmrsUserForm.email"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户状态：" prop="state">
						<div>
							<Select slot="append" v-model="rmrsUserForm.state">
								<Option value="1">启用</Option>
								<Option value="2">停用</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户余额：" prop="avl">
						<div>
							<Input disabled="" v-model="rmrsUserForm.avl"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户描述：" prop="description">
						<div>
							<Input v-model="rmrsUserForm.description"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="rmrsUserEdit">保存</Button>
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
		name: 'rmrsuserEdit',
		data() {
			return {
				prj_rmrsUserForm: {
					id: 1
				},
				rmrsUserForm: {
				},
				inforValidate: {
					name: [{
						required: true,
						message: '客户名称不能为空',
						trigger: 'blur'
					}],
					email: [{
						required: true,
						message: '请输入客户邮箱',
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
				console.log(this.$route.params);
				var copy=this;
				let index = copy.$route.params.id;
				axios.get(Api.url + "hems/customers/getCustomerAsUser/" + index, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.rmrsUserForm = response.data.data[0];
					console.log(copy.rmrsUserForm);
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			rmrsUserEdit() {
				var copy = this;
				let edit_id = copy.rmrsUserForm.id;
				this.$refs['rmrsUserForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'hems/customers/editCustomer/'+edit_id, {
							name: copy.rmrsUserForm.name,
							phone: copy.rmrsUserForm.phone,
							contact: copy.rmrsUserForm.contact,
							address: copy.rmrsUserForm.address,
							email: copy.rmrsUserForm.email,
							state: copy.rmrsUserForm.state,
							description: copy.rmrsUserForm.description
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
	
	.ivu-input[disabled] {
		color: #495060;
	}
</style>