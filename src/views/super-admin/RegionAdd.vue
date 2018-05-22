<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ios-home"></Icon>
				新增区域
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目名称：" prop="project">
						<div>
							<Select slot="append" v-model="data.projectId">
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in project" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="区域名称：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
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
					<Button type="success" long @click="RegionAdd">保存</Button>
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
		name: 'regionAdd',
		data() {
			return {
				data: {
					projectId: '',
					name: '',
					description: "",
				},
				project: {

				},
				inforValidate: {
					
					name: [{
						required: true,
						message: '请输入区域名称',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {
			//获取园区项目id
			const copy = this;
			axios.get(Api.url + "sems/projects/getProjectsAsType/3", {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.project = response.data.data;
					console.log(copy.project)
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			RegionAdd() {
				var copy = this;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "hems/regions/addRegion", {
							projectId: copy.data.projectId,
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