<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="edit"></Icon>
				费用科目信息修改
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
		name: 'coursesedit',
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
						message: '费用科目名称不能为空',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入修改后的价格',
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
				let index = parseInt(this.$route.params.id.toString().substr(-1, 1));
				console.log(index);
				axios.get(Api.url + "sems/courses/getCoursesAsId/" + index, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.data = response.data.data;
						console.log(copy.data);
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			userEdit() {
				var copy = this;
				let index = parseInt(this.$route.params.id.toString().substr(-1, 1));
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "sems/courses/editCourses/" + index, {
							name: copy.data.name,
							price: copy.data.price,
							description: copy.data.description,

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