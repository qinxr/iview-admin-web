<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           配电室编辑
			    </p>
			    <Form 
                    ref="pdRoomForm"
                    :model="pdRoomForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >	
                	<Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="区域ID：" prop="regionId">
			                    <div >
			                        <Select slot="append" v-model="pdRoomForm.region_id"  @on-change='getBuilding(pdRoomForm.region_id)'>
							            <Option v-for="item in regionData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="建筑物：" prop="buildingId">
			                    <div >
			                        <Select slot="append" v-model="pdRoomForm.building_id">
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
			                    <div >
			                        <Input v-model="pdRoomForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="pdRoomForm.description" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='16'>&nbsp;</Col>
	                	<Col :lg="2">
	                		<Button ref="save" type="success" long @click="Edit">保存</Button>
	                	</Col>
	                </Row>
                </Form>
	        </Card>
	    </Col>
	</Row>
</template>

<script>
	export default {
		//name: 'hgpdPDRoomEdit',
		data () {
			return {
				pdRoomForm: {},
				regionId: '',
				building:'',
				regionData: [],
				inforValidate: {
	                pdRoomName: [
	                    { required: true, message: '请输入配电室名称', trigger: 'blur' },
	                ],
	                regionId: [
	                	{ required: true, message: '请选择区域名称', trigger: 'blur' }
	                ],
	                buildingId: [
	                	{ required: true, message: '请选择建筑物名称', trigger: 'blur' }
	                ],
	                description: [
	                	{ required: false, message: '请输入描述', trigger: 'blur' }
	                ],
	            },
			}
		},
		mounted () {
			this.Init();
		},
		methods: {
			Init () {
				const copy = this;
				this.regionId = this.$route.params.id;
				//根据配电室Id获取配电室信息
				this.$http.get(Api.url + 'pdms/rooms/getRoom/' + this.regionId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.getBuilding(response.data.data.region_id);
					copy.pdRoomForm = response.data.data;
//					copy.pdRoomForm.building_id=copy.pdRoomForm.building_id.toString();
					
				})
				.catch(error => {
					console.log(error);
				});
				//获取区域信息
				this.$http.get(Api.url + 'pdms/regions/getRegionAsProject/' + Api.pdId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.regionData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
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
			//修改配电室信息
			Edit () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/rooms/editRoom/' + this.regionId, {
					name: copy.pdRoomForm.name,
					projectId: Api.pdId,
					regionId: copy.pdRoomForm.region_id,
					description: copy.pdRoomForm.description
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data);
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
				.catch(error => {
					console.log(error);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
</style>