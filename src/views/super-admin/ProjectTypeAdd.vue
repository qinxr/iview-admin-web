<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				新增项目类型
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="类型名称：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目类型描述：" prop="description">
						<div>
							<Input v-model="data.description"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="ProjiectTypeAdd">保存</Button>
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
		name: 'projectTypeAdd',
		data() {
			return {
				data: {
					name: '',
					description: '',
				},
				inforValidate: {

					name: [{
						required: true,
						message: '请输入项目类型名称',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {

		},
		methods: {
			ProjiectTypeAdd() {
				var copy = this;
				copy.data.email = copy.data.email + "@huaxinbr.com"
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'sems/projects/addType', {
							name: copy.data.name,
							description: copy.data.description
						}, {
							headers: {
								Authorization: "Bearer " + localStorage.getItem("access_token")
							}
						})
						.then((response) => {
							console.log(response.data);
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
						.catch((error) => {
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