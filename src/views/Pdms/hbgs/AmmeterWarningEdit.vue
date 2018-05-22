<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="ivu-icon ivu-icon-alert-circled"></Icon>
				           电表告警编辑
			    </p>
			    <Form 
                    ref="pmWarningForm"
                    :model="pmWarningForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                	<Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="区域名称：" prop="region_id">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.region_id" @on-change="PDRoom(pmWarningForm.region_id)">
							            <Option v-for="item in regionData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="配电室名称：" prop="pd_room_id">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.pd_room_id" @on-change="Transformer(pmWarningForm.pd_room_id)">
							            <Option v-for="item in pdRoomData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="变压器名称：" prop="transformer_id">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.transformer_id" @on-change="Device(pmWarningForm.transformer_id)">
							            <Option v-for="item in transformerData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="设备名称：" prop="component_id">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.component_id">
							            <Option v-for="item in deviceData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="监测参数：" prop="colomn">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.colomn">
							            <Option v-for="item in colomnData" :key="item" :value="item">{{item}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="规则：" prop="rule">
			                    <div >
			                        <Select slot="append" v-model="pmWarningForm.rule_operator">
							            <Option v-for="item in ruleData" :key="item" :value="item">{{item}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="阈值：" prop="threshold">
			                    <div >
			                        <InputNumber v-model="pmWarningForm.threshold"></InputNumber>
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
		//name: 'hbgsAmmeterWarningEdit',
		data () {
			return {
				pmWarningForm: {},
				regionData: [],
				pdRoomData: [],
				transformerData: [],
				deviceData: [],
				ammWarningId: '',
				colomnData: ['ia', 'ib', 'ic', 'ua', 'ub', 'uc', 'power', 'degree'],
				ruleData: ['>', '>=', '<', '<=', '!=', '='],
				inforValidate: {
	                region_id: [
	                    { required: true, message: '请选择区域名称', trigger: 'blur' },
	                ],
	                pd_room_id: [
	                	{ required: true, message: '请选择配电室名称', trigger: 'blur' }
	                ],
	                transformer_id: [
	                	{ required: true, message: '请选择变压器名称', trigger: 'blur' }
	                ],
	                component_id: [
	                	{ required: true, message: '请选择设备名称', trigger: 'blur' }
	                ],
	                colomn: [
	                	{ required: true, message: '请选择监测参数', trigger: 'blur' }
	                ],
	                rule_operator: [
	                	{ required: true, message: '请选择规则', trigger: 'blur' }
	                ],
	                threshold: [
	                	{ required: true, message: '请选择阈值', trigger: 'blur' }
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
				//获取区域信息
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
				//根据电表告警Id获取电表告警信息
				this.ammWarningId = this.$route.params.id;
				console.log(this.ammWarningId);
				this.$http.get(Api.url + 'pdms/pmWarningSub/getPmWarningSub/' + this.ammWarningId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					//console.log(response.data.data);
					copy.pmWarningForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				});
			},
			//获取配电室信息
			PDRoom (regionId) {
				console.log(1);
				const copy = this;
				this.$http.get(Api.url + 'pdms/rooms/getRoomAsRegion/' + regionId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response=> {
					//console.log(response.data.data);
					copy.pdRoomData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//获取变压器信息
			Transformer (pdRoomId) {
				const copy = this;
				this.$http.get(Api.url + 'pdms/transformers/getTransformerAsRoom/' + pdRoomId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response=> {
					//console.log(response.data.data);
					copy.transformerData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//设备信息获取
			Device (transformerId) {
				const copy = this;
				this.$http.get(Api.url + 'pdms/pm/getPmAsTransformers/' + transformerId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response=> {
					//console.log(response.data.data);
					copy.deviceData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//编辑电表告警信息
			Edit () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/pmWarningSub/editPmWarningSub/' + this.ammWarningId, {
					regionId: copy.pmWarningForm.region_id,
					roomId: copy.pmWarningForm.pd_room_id,
					trfId: copy.pmWarningForm.transformer_id,
					pmId: copy.pmWarningForm.component_id,
					colomn: copy.pmWarningForm.colomn,
					rule: copy.pmWarningForm.rule_operator,
					threshold: copy.pmWarningForm.threshold
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