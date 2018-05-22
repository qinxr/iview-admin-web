<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           制冷机新增
			    </p>
			    <Form 
                    ref="refrigeratorForm"
                    :model="refrigeratorForm" 
                    :label-width="120" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="渠道ID：" prop="channel_id">
			                    <div >
			                        <Input v-model="refrigeratorForm.channel_id" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="制冷机名称：" prop="name">
			                    <div >
			                        <Input v-model="refrigeratorForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="电功率：" prop="power">
			                    <div >
			                        <Input v-model="refrigeratorForm.power" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="额定制冷量：" prop="refrigerating_output">
			                    <div >
			                        <Input v-model="refrigeratorForm.refrigerating_output" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="额定制热量：" prop="heating_output">
			                    <div >
			                        <Input v-model="refrigeratorForm.heating_output" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="厂家：" prop="producer">
			                    <div >
			                        <Input v-model="refrigeratorForm.producer" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="位置：" prop="location">
			                    <div >
			                        <Input v-model="refrigeratorForm.location" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="refrigeratorForm.description" ></Input>
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
		name: 'tzwlRefrigeratorAdd',
		data () {
			return {
				refrigeratorForm: {
					channel_id: '',
					name: '',
					producer: '',
					power: '',
					refrigerating_output: '',
					heating_output: '',
					location: '',
					description: '',
				},
				inforValidate: {
	                channel_id: [
	                    { required: true, message: '请输入渠道ID', trigger: 'blur' },
	                ],
	                name: [
	                	{ required: true, message: '请输入制冷机名称', trigger: 'blur' }
	                ],
	                power: [
	                	{ required: false, message: '请输入电功率', trigger: 'blur' }
	                ],
	                refrigerating_output: [
	                	{ required: false, message: '请输入额定制冷量', trigger: 'blur' }
	                ],
	                heating_output : [
	                	{ required: false, message: '请输入额定制热量', trigger: 'blur' }
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
		methods: {
			//保存制冷机信息
			Save () {
				const copy = this;
				if(this.refrigeratorForm.channel_id == '' || this.refrigeratorForm.name == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'hvac/refrigerators/addRefrigerator', {
						projectId: Api.tzwlId,
						channelId: copy.refrigeratorForm.channel_id,
						name: copy.refrigeratorForm.name,
						power: copy.refrigeratorForm.power,
						refrigerating: copy.refrigeratorForm.refrigerating_output,
						heating: copy.refrigeratorForm.heating_output,
						producer: copy.refrigeratorForm.producer,
						location: copy.refrigeratorForm.location,
						description: copy.refrigeratorForm.description
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