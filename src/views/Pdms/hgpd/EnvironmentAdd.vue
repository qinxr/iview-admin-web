<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ivu-icon ivu-icon-ios-world-outline"></Icon>
				环境信息新增
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<!--<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="项目名称：" prop="project">
						<div>
							<Input disabled="" v-model="project.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>-->
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="环境名称：" prop="name">
						<div>
							<Input v-model="data.name"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="渠道：" prop="channelId">
						<div>
							<Input v-model="data.channelId"></Input>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="区域：" prop="regionId">
						<div>
							<Select slot="append" v-model="data.regionId" @on-change='getRoom(data.regionId)'>
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
					<FormItem label="配电室：" prop="roomId">
						<div>
							<Select slot="append" v-model="data.roomId">
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
					<Button type="success" long @click="EnvAdd">保存</Button>
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
		name: 'hgpdEnvironmentAdd',
		data() {
			return {
				data: {
					projectId: '',
					regionId: '',
					roomId: '',
					name: '',
					channelId:'',
					model: "",
					type:'',
					producer:''
				},
				project: '',
				region: "",
				pdRoom: '',
				inforValidate: {
					channelId: [{
						required: true,
						message: '请输入渠道信息',
						trigger: 'blur'
					}],
					regionId: [{
						type:'number',
						required: true,
						message: '请选择区域名称',
						trigger: 'change'
					}],
					roomId: [{
						type:'number',
						required: true,
						message: '请选择配电室名称',
						trigger: 'change'
					}],
					type: [{
						required: true,
						message: '请选择类型',
						trigger: 'change'
					}],
					name: [{
						required: true,
						message: '请输入电表名称',
						trigger: 'blur'
					}],

				},
			}
		},
		mounted() {
			const copy = this;
			
			//获取项目区域
			axios.get(Api.url + "pdms/regions/getRegionAsProject/" + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(function(response) {
					copy.region = response.data.data;
					console.log(copy.region)
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
			EnvAdd() {
				var copy = this;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "pdms/env/addEnv", {
								projectId: Api.pdId,
								regionId:copy.data.regionId,
								channelId:copy.data.channelId,
								roomId:copy.data.roomId,
								name: copy.data.name,
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