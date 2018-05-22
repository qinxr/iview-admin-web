<template>
	<Row>
		<Col :lg='24'>
		<Card>
			<p slot="title">
				<Icon type="ivu-icon ivu-icon-flash"></Icon>
				变压器信息修改
			</p>
			<Form ref="data" :model="data" :label-width="100" label-position="right" :rules="inforValidate">

				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="区域名称：" prop="region_id">
						<div>
							<Select slot="append" v-model="data.region_id" @on-change='getRoom(data.region_id)'>
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in region" :key="item.id" :value="item.id">{{item.name}}</Option>
							</Select>
						</div>
					</FormItem>
					</Col>
				</Row>
				<Row>
					<Col :lg='6'>&nbsp;</Col>
					<Col :lg='12'>
					<FormItem label="配电室名称：" prop="pd_room_id">
						<div>
							<Select slot="append" v-model="data.pd_room_id">
								<!--<Option value="1">测试</Option>-->
								<Option v-for="item in pdRoom" :key="item.id" :value="item.id">{{item.name}}</Option>
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
		//name: 'hgpdTransformerEdit',
		data() {
			return {
				data: {
					projectId: '',
					region_id: '',
					pd_room_id: '',
					name: '',
					description: "",
				},
				region: "",
				pdRoom: '',
				inforValidate: {
					region_id: [{
						type: 'number',
						required: true,
					}],
					pd_room_id: [{
						required: true,
						message: '请选择配电室',
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
			//根据变压器ID获取变压器信息
			let index = this.$route.params.id;
			axios.get(Api.url + "pdms/transformers/getTransformer/" + index, {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("access_token")
				},
			})
			.then(function(response) {
				copy.data = response.data.data;
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
						axios.post(Api.url + "pdms/transformers/editTransformer/"+index, {
							projectId: Api.pdId,
							regionId: copy.data.region_id,
							roomId: copy.data.pd_room_id,
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
	
	.ivu-input[disabled],
	fieldset[disabled] .ivu-input {
		color: #495060;
	}
</style>