<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="social-yen"></Icon>
				抄表客户退款
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
							<Select slot="append" filterable v-model="rmrsUserForm.userid" @on-change="getCustomerAvl(rmrsUserForm.userid)">
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in customerList" :key="item.id" :value="item.id">{{item.name}}</Option>
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
							<Input disabled="" v-model="avlData.avl"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="退款金额：" prop="refund">
						<div>
							<Input v-model="rmrsUserForm.refund"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="rmrsUserPay">确认退款</Button>
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
		name: 'allRmrsUserRefund',
		data() {
			return {
				customerList: "",
				rmrsUserForm: {
					userid:"",
					avl:"",
					refund:""
				},
				avlData:"",
				inforValidate: {
					refund: [{
						required: true,
						message: '请输入退还金额',
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
				//获取客户信息
				axios.get(Api.url + "hems/customers/getCustomerAsProject/" + Api.rmId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.customerList = response.data.data;
					console.log(copy.datas);
				})
				.catch(function(error) {
					console.log(error);
				});
			},
			rmrsUserPay() {
				var copy = this;
				this.$refs['rmrsUserForm'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'hems/customers/customerRefund', {
							userId: copy.rmrsUserForm.userid,
							refund: copy.rmrsUserForm.refund
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

			},
			getCustomerAvl(customerId){
				const copy = this;
				axios.get(Api.url + 'hems/customers/getCustomer/' + customerId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					copy.avlData = response.data.data.customer;
					console.log(copy.avidata);
				})
				.catch(error => {
					console.log(error);
				})
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