<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ios-home"></Icon>
				配电园区新增
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目名称：" prop="project">
						<div>
							<Input disabled="" v-model="projectName.name"></Input>
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
		name: 'hgpdRegionAdd',
		data() {
			return {
				data: {
					projectId: '',
					name: '',
					description: "",
				},
				project: {

				},
				projectName: '',
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
			const copy = this;
			//项目名称获取
			axios.get(Api.url + "sems/projects/getProjectsAsType/2" , {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.projectName = response.data.data[0];
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
						axios.post(Api.url + "pdms/regions/addRegion", {
								projectId: Api.pdId,
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
										copy.$Message.error(response.data.message);
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
	
	.ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #495060;
	}
</style>