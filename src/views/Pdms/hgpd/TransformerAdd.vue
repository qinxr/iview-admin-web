<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ios-home"></Icon>
				变压器新增
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
					<FormItem label="区域名称：" prop="regionName">
						<div>
							<Select slot="append" v-model="data.regionName" @on-change='getBuilding(data.regionName)'>
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
					<FormItem label="建筑物选择：" prop="buildingId">
						<div>
							<Select slot="append" v-model="data.buildingId" @on-change='getRoom(data.buildingId)'>
								<Option v-for="item in building" :key="item.id" :value="item.id">{{item.name}}</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="配电室名称：" prop="pdRoomName">
						<div>
							<Select slot="append" v-model="data.pdRoomName">
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
					<FormItem label="变压器名称：" prop="name">
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
		name: 'hgpdTransformerAdd',
		data() {
			return {
				data: {
					projectId: '',
					regionName: '',
					pdRoomName: '',
					name: '',
					description: "",
				},
				project: '',
				region: "",
				pdRoom: '',
				building:'',
				inforValidate: {
					regionName: [{
						type: 'number',
						required: true,
						message: '请选择区域名称',
						trigger: 'change'
					}],
					pdRoomName: [{
						type: 'number',
						required: true,
						message: '请选择配电室名称',
						trigger: 'blur'
					}],
					buildingId: [{
						type: 'number',
						required: true,
						message: '请选择建筑物名称',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入变压器名称',
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
					//console.log(copy.project)
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
					//console.log(copy.region)
				})
				.catch(function(error) {
					console.log(error);
				});
		},
		methods: {
			//根据区域ID获取建筑物
			getBuilding(id) {
				const copy = this;
				this.$http.get(Api.url + "pdms/buildings/getBuildingAsRegion/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.building = response.data.data;
						console.log(copy.building)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			//根据建筑物ID获取配电室
			getRoom(id) {
				const copy = this;
				axios.get(Api.url + "pdms/rooms/getRoomAsBuilding/" + id, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						},
					})
					.then(function(response) {
						copy.pdRoom = response.data.data;
						//console.log(copy.pdRoom)
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			RegionAdd() {
				var copy = this;
				this.$refs['data'].validate((valid) => {
					if(valid) {
						axios.post(Api.url + "pdms/transformers/addTransformer", {
								projectId: Api.pdId,
								regionId: copy.data.regionName,
								roomId: copy.data.pdRoomName,
								buildingId: copy.data.buildingId,
								name: copy.data.name,
								description: copy.data.description
							}, {
								headers: {
									Authorization: "Bearer " + localStorage.getItem("access_token")
								}
							})
							.then((response) => {
								//console.log(response.data);
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