<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           设备类型新增
			    </p>
			    <Form 
                    ref="deciveForm"
                    :model="deviceTypeForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
	                <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="设备名称：" prop="name">
			                    <div >
			                        <Input v-model="deviceTypeForm.name" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="设备描述：" prop="description">
			                    <div >
			                        <Input v-model="deviceTypeForm.description" ></Input>
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
		name: 'deviceedit',
		data () {
			return {
				deviceId: '',
				deviceTypeForm: {},
				inforValidate: {
	                name: [
	                    { required: true, message: '请输入设备类型名称', trigger: 'blur' },
	                ],
	                description: [
	                	{ required: false, message: '请输入设备类型描述', trigger: 'blur' }
	                ],
	            },
			}
		},
		methods: {
			//获取指定ID的设备信息
			Init () {
				const copy = this;
				this.deviceId = parseInt(this.$route.params.id.toString());
				this.$http.get(Api.url + 'sems/device/getDeviceAsId/' + this.deviceId, {
					headers: {
	                    Authorization: "Bearer " + localStorage.getItem("access_token")
	                }
				})
				.then(response => {
					console.log(response.data.data);
					copy.deviceTypeForm = response.data.data;
				})
				.catch(error => {
					console.log(error);
				})
			},
			//修改设备信息
			Edit () {
				const copy = this;
				if(this.deviceTypeForm.name == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'sems/device/editDevice/' + this.deviceId, {
						name: copy.deviceTypeForm.name,
						description: copy.deviceTypeForm.description
						
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
			}
		},
		mounted () {
			this.Init(); 
		}
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>