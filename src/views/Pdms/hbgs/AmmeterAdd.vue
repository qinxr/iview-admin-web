<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           配电室新增
			    </p>
			    <Form 
                    ref="ammeterForm"
                    :model="ammeterForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="电表名称：" prop="name">
			                    <div >
			                        <Input v-model="ammeterForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="渠道：" prop="channelId">
			                    <div >
			                        <Input v-model="ammeterForm.channelId" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="区域ID：" prop="regionId">
			                    <div >
			                        <Select slot="append" v-model="ammeterForm.regionId" @on-change="Pdroom(ammeterForm.regionId)">
							            <Option v-for="item in regionData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="配电室ID：" prop="roomId">
			                    <div >
			                        <Select slot="append" v-model="ammeterForm.roomId" @on-change="Transformer(ammeterForm.roomId)">
							            <Option v-for="item in roomData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="变压器ID：" prop="transformerId">
			                    <div >
			                        <Select slot="append" v-model="ammeterForm.transformerId">
							            <Option v-for="item in transformerData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="类型：" prop="type">
			                    <div >
			                        <Select slot="append" v-model="ammeterForm.type">
							            <Option v-for="item in typeData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="回路：" prop="circuit">
			                    <div >
			                        <Input v-model="ammeterForm.circuit" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="位置：" prop="location">
			                    <div >
			                        <Input v-model="ammeterForm.location" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="电流上限：" prop="electricMax">
			                    <div >
			                        <Input v-model="ammeterForm.electricMax" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="功率上限：" prop="powerMax">
			                    <div >
			                        <Input v-model="ammeterForm.powerMax" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="ct变化：" prop="ctChange">
			                    <div >
			                        <Input v-model="ammeterForm.ctChange" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="电表型号：" prop="model">
			                    <div >
			                        <Input v-model="ammeterForm.model" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="厂商：" prop="producer">
			                    <div >
			                        <Input v-model="ammeterForm.producer" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='16'>&nbsp;</Col>
	                	<Col :lg="2">
	                		<Button ref="save" type="success" long @click="Save">保存</Button>
	                	</Col>
	                </Row>
                </Form>
	        </Card>
	    </Col>
	</Row>
</template>

<script>
	export default {
		name: 'hbgsAmmeterAdd',
		data () {
			return {
				typeData: [],
				ammeterForm: {
					name: '',
					channelId: '',
					regionId: '',
					roomId: '',
					transformerId: '',
					type: '',
					circuit: '',
					location: '',
					electricMax: '',
					powerMax: '',
					ctChange: '',
					model: '',
					producer: '',
				},
				regionData: [],
				roomData: [],
				transformerData: [],
				inforValidate: {
	                name: [
	                    { required: true, message: '请输入电表名称', trigger: 'blur' },
	                ],
	                channelId: [
	                    { required: true, message: '请输入渠道', trigger: 'blur' },
	                ],
	                regionId: [
	                    { required: true, message: '请选择区域名称', trigger: 'blur' },
	                ],
	                roomId: [
	                    { required: true, message: '请选择配电室名称', trigger: 'blur' },
	                ],
	                transformerId: [
	                    { required: true, message: '请输入变压器名称', trigger: 'blur' },
	                ],
	                type: [
	                    { required: true, message: '请选择电表类型', trigger: 'blur' },
	                ],
	                circuit: [
	                    { required: false, message: '请输入电表回路', trigger: 'blur' },
	                ],
	                location: [
	                    { required: false, message: '请输入电表安装位置', trigger: 'blur' },
	                ],
	                electricMax: [
	                    { required: false, message: '请输入电流上限', trigger: 'blur' },
	                ],
	                powerMax: [
	                	{ required: false, message: '请输入功率上限', trigger: 'blur' }
	                ],
	                ctChange: [
	                	{ required: false, message: '请输入ct变化', trigger: 'blur' }
	                ],
	                model: [
	                	{ required: false, message: '请输入电表型号', trigger: 'blur' }
	                ],
	                producer: [
	                	{ required: false, message: '请输入电表厂商', trigger: 'blur' }
	                ],
	            },
			}
		},
		mounted () {
			this.Init();
		},
		methods: {
			Pdroom (RegionId) {
				//获取配电室Id
				const copy = this;
				this.$http.get(Api.url + 'pdms/rooms/getRoomAsRegion/' + RegionId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.roomData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
			Transformer (PdroomId) {
				//获取变压器Id
				const copy = this;
				this.$http.get(Api.url + 'pdms/transformers/getTransformerAsRoom/' + PdroomId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.transformerData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
			Init () {
				const copy = this;
				//获取区域Id
				this.$http.get(Api.url + 'pdms/regions/getRegionAsProject/' + Api.hbgsId, {
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
				//获取电表类型
				this.$http.get(Api.url + 'pdms/deviceTypes/getDeviceTypeAsType/1', {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.typeData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
			//保存配电室信息
			Save () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/pm/addPm', {
					name: copy.ammeterForm.name,
					projectId: Api.hbgsId,
					channelId: copy.ammeterForm.channelId,
					regionId: copy.ammeterForm.regionId,
					roomId: copy.ammeterForm.roomId,
					transformerId: copy.ammeterForm.transformerId,
					type: copy.ammeterForm.type,
					circuit: copy.ammeterForm.circuit,
					location: copy.ammeterForm.location,
					electricMax: copy.ammeterForm.electricMax,
					powerMax: copy.ammeterForm.powerMax,
					ctChange: copy.ammeterForm.ctChange,
					model: copy.ammeterForm.model,
					producer: copy.ammeterForm.producer
				}, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data);
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
				.catch(error => {
					console.log(error);
				})
			}
		}
	}
</script>

<style lang="less" scoped>
</style>