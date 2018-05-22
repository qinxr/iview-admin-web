<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="social-yen"></Icon>
				抄表客户充值
			</p>
			<Form ref="rmrsUserForm" :model="rmrsUserForm" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户名称：" prop="name">
						<div>
							<Input disabled="" v-model="rmrsUserForm.name"></Input>
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
					<FormItem label="充值金额：" prop="pay">
						<div>
							<Input v-model="rmrsUserForm.pay"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="rmrsUserPay">保存</Button>
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
		name: 'rmrsUserPay',
		data() {
			return {
				
				rmrsUserForm: {},
				inforValidate: {
					name: [{
						required: true,
						message: '客户名称不能为空',
						trigger: 'blur'
					}],
					pay: [{
						required: true,
						message: '请输入充值金额',
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
				var copy = this;
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
			rmrsUserPay() {
				var copy = this;
				let pay_id = copy.rmrsUserForm.id;
				this.$refs['rmrsUserForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'hems/customers/customerPay', {
							userId: pay_id,
							pay: copy.rmrsUserForm.pay
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