<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person-add"></Icon>
				客户新增
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
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
					<FormItem label="客户名称：" prop="customer_name">
						<div>
							<Input v-model="data.customer_name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户电话：" prop="customer_phone">
						<div>
							<Input v-model="data.customer_phone"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="联系人：" prop="contact">
						<div>
							<Input v-model="data.contact"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户地址：" prop="customer_address">
						<div>
							<Input v-model="data.customer_address"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户邮箱：" prop="customer_email">
						<div>
							<Input v-model="data.customer_email"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户状态：" prop="customer_state">
						<div>
							<Select slot="append" v-model="data.customer_state">
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
					<FormItem label="客户余额：" prop="customer_avl">
						<div>
							<Input v-model="data.customer_avl"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="客户描述：" prop="customer_description">
						<div>
							<Input v-model="data.customer_description"></Input>
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
		name: 'rmrsUserAdd',
		data() {
			return {
				prj_data: {
					id: 1
				},
				data: {
					customer_name: "",
					customer_phone: "",
					contact: "",
					customer_address: "",
					customer_email: "",
					customer_state: "",
					customer_avl: "",
					customer_description: ""
				},
				inforValidate: {
					customer_name: [{
						required: true,
						message: '请输入客户名称',
						trigger: 'blur'
					}],
					customer_email: [{
						required: true,
						message: '请输入客户邮箱',
						trigger: 'blur'
					}],
					customer_state: [{
						required: true,
						message: '请选择客户状态',
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
				copy.data.email = copy.data.email + "@huaxinbr.com"
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'hems/customers/addCustomer', {
							projectId: copy.prj_data.id,
							name: copy.data.customer_name,
							phone: copy.data.customer_phone,
							contact: copy.data.contact,
							address: copy.data.customer_address,
							email: copy.data.customer_email,
							state: copy.data.customer_state,
							avl: copy.data.customer_avl,
							description: copy.data.customer_description
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