<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ivu-icon ivu-icon-flash"></Icon>
				环境信息修改
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目名称：" prop="project">
						<div>
							<Input disabled="" v-model="project.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="电表名称：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<!--<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="渠道：" prop="channel_id">
						<div>
							<Input v-model="data.channel_id"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>-->
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="区域：" prop="region_id">
						<div>
							<Select slot="append" v-model="data.region_id" @on-change='getRoom(data.regionId)'>
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in region" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="配电室：" prop="pd_room_id">
						<div>
							<Select slot="append" v-model="data.pd_room_id">
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in pdRoom" :key="item.id" v-bind:value="item.id">{{item.name}}</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="类型：" prop="type">
						<div>
							<Select slot="append" v-model="data.type">
								<!--<Option value="1">测试</Option>-->
								<Option value="1">环境</Option>
								<Option value="2">烟感</Option>
								
								
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="型号：" prop="model">
						<div>
							<Input v-model="data.model"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="厂商：" prop="producer">
						<div>
							<Input v-model="data.producer"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='16'>&nbsp;</Col>
					<Col :lg="2">
					<Button type="success" long @click="transformerEdit">保存</Button>
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
		//name: 'hgpdEnvironmentEdit',
		data() {
			return {
				data: {
					projectId: '',
					region_id: '',
					pd_room_id: '',
					name: '',
					description: "",
					type:'',
					channel_id:'',
				},
				project: '',
				region: "",
				pdRoom: '',
				inforValidate: {
					region_id: [{
						type:'number',
						required: true,
//						message: '请选择区域名称',
//						trigger: 'change'
					}],
					pd_room_id: [{
						type:'number',
						required: true,
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '电表名称不能为空',
						trigger: 'blur'
					}],
					channel_id: [{
						required: true,
						message: '请输入渠道信息',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {
			const copy = this;
			//项目名称获取
			axios.get(Api.url + "sems/projects/getProjectsAsType/" + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.project = response.data.data[0];
					console.log(copy.project)
				})
				.catch(function(error) {
					console.log(error);
				});
			//获取项目区域
			axios.get(Api.url + "pdms/regions/getRegionAsProject/" + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.region = response.data.data;
					console.log(copy.region);
				})
				.catch(function(error) {
					console.log(error);
				});
			//根据环境ID获取环境信息
			let index = this.$route.params.id;
			axios.get(Api.url + "pdms/env/getEnv/" + index, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.data = response.data.data;
					copy.data.type= copy.data.type.toString();
					console.log(copy.data);
					copy.getRoom(copy.data.region_id)
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			//根据区域ID获取配电室
			getRoom(id) {

				const copy = this;
				axios.get(Api.url + "pdms/rooms/getRoomAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.pdRoom = response.data.data;
						console.log(copy.pdRoom)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			transformerEdit() {
				var copy = this;
				let index = this.$route.params.id;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "pdms/env/editEnv/"+index, {
								projectId: Api.pdId,
								regionId: copy.data.region_id,
								roomId: copy.data.pd_room_id,
								name: copy.data.name,
								description: copy.data.description,
//								channelId:copy.data.channel_id,
								type: copy.data.type,
								model: copy.data.model,
								producer: copy.data.producer
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
	
	.ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #495060;
	}
</style>