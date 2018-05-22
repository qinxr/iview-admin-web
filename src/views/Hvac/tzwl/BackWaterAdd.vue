<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           分区回水新增
			    </p>
			    <Form 
                    ref="backWaterForm"
                    :model="backWaterForm" 
                    :label-width="120" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="渠道ID：" prop="channel_id">
			                    <div >
			                        <Input v-model="backWaterForm.channel_id" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="分区回水名称：" prop="name">
			                    <div >
			                        <Input v-model="backWaterForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
		                <Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="所属分、集水器：" prop="hex_id">
			                    <div>
			                        <Select slot="append" v-model="backWaterForm.hex_id">
							            <Option v-for="item in hexsData" :value="item.id" :key="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
	                </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="厂家：" prop="producer">
			                    <div >
			                        <Input v-model="backWaterForm.producer" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="位置：" prop="location">
			                    <div >
			                        <Input v-model="backWaterForm.location" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="backWaterForm.description" ></Input>
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
		//name: 'tzwlBackWaterAdd',
		data () {
			return {
				backWaterForm: {
					channel_id: '',
					name: '',
					hex_id: '',	
					producer: '',
					location: '',
					description: '',
				},
				hexsData: [],
				inforValidate: {
	                channel_id: [
	                    { required: true, message: '请输入渠道ID', trigger: 'blur' },
	                ],
	                name: [
	                	{ required: true, message: '请输入分区回水名称', trigger: 'blur' }
	                ],
	                hex_id: [
	                	{ required: true, message: '请选择所属分、集水器', trigger: 'blur' }
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
			//根据项目Id获取分、集水器信息
			Init () {
				const copy = this;
				this.$http.get(Api.url + 'hvac/hexs/getHexAsProject/' + Api.tzwlId, {
					headers: {
						Authorization: "Bearer " + localStorage.getItem("access_token")
					},
				})
				.then(response => {
					//console.log(response.data.data);
					copy.hexsData = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//保存分区回水信息
			Save () {
				const copy = this;
				if(this.backWaterForm.channel_id == '' || this.backWaterForm.name == '' || this.backWaterForm.hex_id == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'hvac/hexTrmns/addHexTrmn', {
						projectId: Api.tzwlId,
						channelId: copy.backWaterForm.channel_id,
						name: copy.backWaterForm.name,
						hexId: copy.backWaterForm.hex_id,
						producer: copy.backWaterForm.producer,
						location: copy.backWaterForm.location,
						description: copy.backWaterForm.description
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