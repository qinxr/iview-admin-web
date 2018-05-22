<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           水泵编辑
			    </p>
			    <Form 
                    ref="waterPumpForm"
                    :model="waterPumpForm" 
                    :label-width="120" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="渠道ID：" prop="channel_id">
			                    <div >
			                        <Input v-model="waterPumpForm.channel_id" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="水泵名称：" prop="name">
			                    <div >
			                        <Input v-model="waterPumpForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="类型：" prop="type">
			                    <div>
			                        <Select slot="append" v-model="waterPumpForm.type">
							            <Option v-for="item in waterPumpType" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="额定功率：" prop="power">
			                    <div >
			                        <Input v-model="waterPumpForm.power" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="额定电量：" prop="electric">
			                    <div >
			                        <Input v-model="waterPumpForm.electric" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="厂家：" prop="producer">
			                    <div >
			                        <Input v-model="waterPumpForm.producer" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="位置：" prop="location">
			                    <div >
			                        <Input v-model="waterPumpForm.location" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="waterPumpForm.description" ></Input>
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
		//name: 'tzwlWaterPumpEdit',
		data () {
			return {
				waterPumpId: '',
				waterPumpType: [{
					id: 1,
					name: '冷冻水泵'
				}, {
					id: 2,
					name: '冷却水泵'
				}, {
					id: 3,
					name: '热水泵'
				}],
				waterPumpForm: {},
				inforValidate: {
	                channel_id: [
	                    { required: true, message: '请输入渠道ID', trigger: 'blur' },
	                ],
	                name: [
	                	{ required: true, message: '请输入制冷机名称', trigger: 'blur' }
	                ],
	                type: [
	                	{ required: true, message: '请选择水泵类型', trigger: 'blur' }
	                ],
	                power: [
	                	{ required: false, message: '请输入额定功率', trigger: 'blur' }
	                ],
	                electric: [
	                	{ required: false, message: '请输入额定电量', trigger: 'blur' }
	                ],
	                producer: [
	                	{ required: false, message: '请输入厂家', trigger: 'blur' }
	                ],
	                location: [
	                	{ required: false, message: '请输入安装位置', trigger: 'blur'  	}
	                ],
	                description: [
	                	{ required: false, message: '请输入描述信息', trigger: 'blur'  	}
	                ],
	            },
			}
		},
		mounted () {
			this.Init();
		},
		methods: {
			//根据水泵Id获取信息
			Init () {
				const copy = this;
				this.waterPumpId = this.$route.params.id;
				this.$http.get(Api.url + 'hvac/pumps/getPump/' + this.waterPumpId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					}
				})
				.then(response => {
					copy.waterPumpForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//编辑水泵信息
			Edit () {
				const copy = this;
				if(this.waterPumpForm.channel_id == '' || this.waterPumpForm.name == '' || this.waterPumpForm.type == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'hvac/pumps/editPump/' + this.waterPumpId, {
						projectId: Api.tzwlId,
						channelId: copy.waterPumpForm.channel_id,
						name: copy.waterPumpForm.name,
						type: copy.waterPumpForm.type,
						power: copy.waterPumpForm.power,
						electric: copy.waterPumpForm.electric,
						producer: copy.waterPumpForm.producer,
						location: copy.waterPumpForm.location,
						description: copy.waterPumpForm.description
					}, {
						headers: {
							Authorization: "Bearer " + localStorage.getItem("access_token")
						}
					})
					.then(response => {
						//console.log(response.data.data);
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
			},
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>