<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="person"></Icon>
				项目类型资料修改
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="名字：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="地址：" prop="description">
						<div>
							<Input v-model="data.description"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="projectTypeEdit()">保存</Button>
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
		name: 'projectTypeedit',
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
			this.init();
		},
		methods: {
			init() {
				//获取信息
				var copy=this;
				let index = copy.$route.params.id;
				console.log(index);
				axios.get(Api.url + 'sems/projects/getType/' + index, {
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
			projectTypeEdit() {
				var copy = this;
				let index = copy.$route.params.id;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + 'sems/projects/updateType/' + index, {
						name: copy.data.name,
						description:copy.data.description
						
					}, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(function (response) {
						const statusCode = parseInt(response.data.head);
						switch (statusCode) {
							case 200:
								copy.$Message.success(response.data.message);
								break;
							default:
								copy.$Message.error(response.data.message);
								break;
							
						}
					})
					.catch(function (error) {
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