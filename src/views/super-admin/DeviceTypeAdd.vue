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
			                <FormItem label="设备名称：" prop="deviceTypeName">
			                    <div >
			                        <Input v-model="deviceTypeForm.deviceTypeName" ></Input>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
		            <Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="设备描述：" prop="deviceTypeDescription">
			                    <div >
			                        <Input v-model="deviceTypeForm.deviceTypeDescription" ></Input>
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
		name: 'deviceAdd',
		data () {
			return {
				deviceTypeForm: {
					deviceTypeName: '',
					deviceTypeDescription: '',
				},
				inforValidate: {
	                deviceTypeName: [
	                    { required: true, message: '请输入设备类型名称', trigger: 'blur' },
	                ],
	                deviceTypeDescription: [
	                	{ required: false, message: '请输入设备类型描述', trigger: 'blur' }
	                ],
	            },
			}
		},
		methods: {
			//保存设备类型信息
			Save () {
				const copy = this;
				if(this.deviceTypeForm.deviceTypeName == '') {
					copy.$Message.error('需填信息不能为空，请填写正确的信息');
				} else {
					this.$http.post(Api.url + 'sems/device/addDevice', {
						name: copy.deviceTypeForm.deviceTypeName,
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
			},
		},
	}
</script>

<style>
	.ivu-card-body {
		height: auto;
	}
</style>