<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="social-buffer"></Icon>
				新增费用科目
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="名称：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="价格：" prop="price">
						<div>
							<Input v-model="data.price"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="描述：" prop="description">
						<div>
							<Input v-model="data.description"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="coursesAdd">保存</Button>
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
		name: 'coursesAdd',
		data() {
			return {
				data: {
					name: '',
					price: '',
					description: '',
				},
				inforValidate: {
					name: [{
						required: true,
						message: '请输入费用科目名称',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {

		},
		methods: {
			coursesAdd() {
				var copy = this;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "sems/courses/addCourses", {
						name: copy.data.name,
						price: copy.data.price,
						description: copy.data.description,
						projectId:1
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
									copy.$Message.success(response.data.message);
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