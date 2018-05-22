<template>
	<Row>
		<Col :lg='24'>
			<Card>
				<p slot="title">
	                <Icon type="social-buffer"></Icon>
				           设备新增
			    </p>
			    <Form 
                    ref="deviceTypeForm"
                    :model="deviceTypeForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                	<Row>
	                	<Col :lg='6'>&nbsp;</Col>
	                	<Col :lg='12'>
			                <FormItem label="设备类型：" prop="flag">
			                    <div >
			                        <Select slot="append" v-model="deviceTypeForm.flag">
							            <Option v-for="item in deviceData" :key="item.id" :value="item.id">{{item.name}}</Option>
							        </Select>
			                    </div>
			                </FormItem>
		                </Col>
		            </Row>
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
			                <FormItem label="描述：" prop="description">
			                    <div >
			                        <Input v-model="deviceTypeForm.description" ></Input>
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
		name: 'hbgsDeviceTypeAdd',
		data () {
			return {
				deviceData: [{
					id: 1,
					name: '电表'
				}, {
					id: 2,
					name: '环境'
				}],
				deviceTypeForm: {
					name: '',
					flag: '',
					description: ''
				},
				inforValidate: {
	                flag: [
	                    { required: true, message: '请选择设备类型', trigger: 'blur' },
	                ],
	                name: [
	                	{ required: true, message: '请输入设备名称', trigger: 'blur' }
	                ],
	                description: [
	                	{ required: false, message: '请输入设备描述', trigger: 'blur' }
	                ],
	            },
			}
		},
		methods: {
			//保存设备信息
			Save () {
				const copy = this;
				this.$http.post(Api.url + 'pdms/deviceTypes/addDeviceType', {
					name: copy.deviceTypeForm.name,
					flag: copy.deviceTypeForm.flag,
					description: copy.deviceTypeForm.description
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