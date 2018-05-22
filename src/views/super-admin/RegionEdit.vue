<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ios-home"></Icon>
				区域信息修改
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
				<!--<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目ID：" prop="name">
						<div>
							<Input v-model="data.prj_id" disabled=""></Input>
						</div>
					</FormItem>
					</Col>
				</Row>-->
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
					<Button type="success" long @click="regionEdit()">保存</Button>
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
		name: 'regionedit',
		data() {
			return {
				data: {
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
				let index = parseInt(this.$route.params.id.toString().substr(-1, 1));
				console.log(index);
				axios.get(Api.url + "hems/regions/getRegion/" + index, {
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
			regionEdit() {
				var copy = this;
				let index = parseInt(this.$route.params.id.toString().substr(-1, 1));
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "/hems/regions/editRegion/" + index, {
						projectId: copy.data.prj_id,
							name: copy.data.name,
							description: copy.data.description
						
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